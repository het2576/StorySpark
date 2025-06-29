from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from uuid import uuid4
import firebase_admin
from firebase_admin import credentials, firestore
import os
import requests
from dotenv import load_dotenv

# ---------------------------
# Load Environment Variables
# ---------------------------
load_dotenv()

# ---------------------------
# Constants from .env
# ---------------------------
cred_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
murf_key = os.getenv("MURF_API_KEY")
gemini_key = os.getenv("GEMINI_API_KEY")
MAX_SCRIPT_LENGTH = int(os.getenv("MAX_SCRIPT_LENGTH", 100000))  # Safe prod default
MUSIC_DIR = "assets/music"

# ---------------------------
# Firebase Setup
# ---------------------------
if not cred_path or not os.path.exists(cred_path):
    raise RuntimeError("Firebase credentials file not found or path not set in .env")
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)
db = firestore.client()

# ---------------------------
# FastAPI App Setup
# ---------------------------
app = FastAPI(title="StorySpark Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Models
# ---------------------------
class ScriptAnalysisRequest(BaseModel):
    script: str
    options: Optional[dict] = {"detectNarrator": True, "minDialogueLength": 10}

class VoiceAssignment(BaseModel):
    voiceId: str

class AudioGenerationRequest(BaseModel):
    script: str
    characters: List[dict]
    settings: dict

class AuthLoginRequest(BaseModel):
    username: str
    password: str

class User(BaseModel):
    id: str
    username: str

class StoryNextRequest(BaseModel):
    current_scene: str
    user_command: str

class VoiceCommandRequest(BaseModel):
    audio_data: str

class MusicApplyRequest(BaseModel):
    jobId: str
    mood: str

# ---------------------------
# Auth (Mock)
# ---------------------------
users_db = {
    "admin": {"id": "1", "password": "secret"}
}

def get_current_user():
    return User(id="1", username="admin")

# ---------------------------
# Endpoint: Script Analyzer
# ---------------------------
@app.post("/api/analyze/script")
def analyze_script(req: ScriptAnalysisRequest):
    if len(req.script) > MAX_SCRIPT_LENGTH:
        raise HTTPException(status_code=400, detail="Script too long.")
    job_id = f"analysis_{uuid4()}"
    characters = []
    for line in req.script.strip().split("\n"):
        if ":" in line:
            name, _ = line.split(":", 1)
            existing = next((c for c in characters if c["name"] == name), None)
            if existing:
                existing["dialogueCount"] += 1
            else:
                characters.append({"name": name, "dialogueCount": 1, "estimatedGender": "unknown"})
    db.collection("analysis_jobs").document(job_id).set({"characters": characters})
    return {"success": True, "data": {"jobId": job_id, "characters": characters}}

@app.get("/api/analyze/status/{job_id}")
def check_analysis_status(job_id: str):
    doc = db.collection("analysis_jobs").document(job_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"success": True, "data": {"jobId": job_id, "characters": doc.to_dict()["characters"]}}

# ---------------------------
# Endpoint: Voice List from Murf
# ---------------------------
@app.get("/api/voices")
def get_voices_from_murf():
    headers = {
        "api-key": murf_key
    }
    response = requests.get("https://api.murf.ai/v1/speech/voices", headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch voices from Murf")

    voices = response.json()
    return {"success": True, "data": voices}

@app.post("/api/voices/{voice_id}/preview")
def generate_voice_preview(voice_id: str):
    sample_text = "Hi, I am a voice sample from Murf!"
    headers = {
        "api-key": murf_key,
        "Content-Type": "application/json"
    }
    payload = {
        "voiceId": voice_id,
        "text": sample_text,
        "format": "mp3"
    }
    response = requests.post("https://api.murf.ai/v1/speech/generate", headers=headers, json=payload)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to generate preview")

    return {"success": True, "preview_url": response.json().get("audio_url")}

# ---------------------------
# Endpoint: Audio Generation
# ---------------------------
@app.post("/api/audio/generate")
def generate_audio(req: AudioGenerationRequest):
    if len(req.script) > MAX_SCRIPT_LENGTH:
        raise HTTPException(status_code=400, detail=f"Script too long. Max allowed is {MAX_SCRIPT_LENGTH} characters.")

    voice_id = req.characters[0].get("voiceId")
    if not voice_id:
        raise HTTPException(status_code=400, detail="Missing 'voiceId' in characters")

    job_id = f"audio_gen_{uuid4()}"
    headers = {
        "api-key": murf_key,
        "Content-Type": "application/json"
    }
    payload = {
        "text": req.script,
        "voiceId": voice_id,
        "format": "mp3"
    }
    response = requests.post("https://api.murf.ai/v1/speech/generate", headers=headers, json=payload)

    print("Murf API response:", response.status_code, response.json())

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail=f"Failed to generate audio: {response.text}")

    job_data = response.json()
    audio_url = job_data.get("audioFile")

    db.collection("audio_jobs").document(job_id).set({
        "status": "completed",
        "audioUrl": audio_url,
        "voiceId": payload["voiceId"]
    })
    return {"success": True, "data": {"jobId": job_id, "audioUrl": audio_url}}

@app.get("/api/audio/status/{job_id}")
def get_audio_status(job_id: str):
    doc = db.collection("audio_jobs").document(job_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Audio job not found")
    return {"success": True, "data": {"jobId": job_id, **doc.to_dict()}}

@app.get("/api/audio/{job_id}/download")
def download_audio(job_id: str):
    doc = db.collection("audio_jobs").document(job_id).get()
    if not doc.exists or doc.to_dict().get("status") != "completed":
        raise HTTPException(status_code=404, detail="Audio not ready")
    return {"success": True, "downloadUrl": doc.to_dict()["audioUrl"]}

@app.post("/api/files/upload")
def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith(".txt"):
        raise HTTPException(status_code=400, detail="Only .txt files are supported")
    return {"success": True, "message": f"File '{file.filename}' uploaded successfully."}

@app.post("/api/files/validate")
def validate_script_file(file: UploadFile = File(...)):
    content = file.file.read().decode("utf-8")
    if not content or ":" not in content:
        raise HTTPException(status_code=400, detail="Invalid script format")
    return {"success": True, "message": "Script format is valid."}

@app.post("/api/auth/login")
def login(req: AuthLoginRequest):
    user = users_db.get(req.username)
    if not user or user['password'] != req.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"success": True, "user": {"id": user["id"], "username": req.username}}

@app.get("/api/auth/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {"success": True, "user": current_user.dict()}

@app.post("/api/story/next")
def story_next(req: StoryNextRequest):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={gemini_key}"
    headers = {
        "Content-Type": "application/json"
    }
    payload = {
        "contents": [
            {"parts": [{"text": f"{req.current_scene}\n\nUser says: {req.user_command}"}]}
        ]
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail=f"Gemini API call failed: {response.text}")

    result = response.json()
    next_scene = result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No response")
    return {"success": True, "data": {"next_scene": next_scene}}

@app.post("/api/command/detect")
def detect_command(req: VoiceCommandRequest):
    return {"success": True, "detected_command": "go left"}
