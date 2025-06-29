'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Play, 
  Pause, 
  Download, 
  Sparkles, 
  Volume2, 
  Music, 
  Users, 
  Loader2,
  FileText,
  Wand2,
  CheckCircle,
  Settings,
  Headphones,
  RotateCcw
} from 'lucide-react';

interface Character {
  name: string;
  voice: string;
  dialogueCount: number;
  color: string;
}

export default function AppPage() {
  const [story, setStory] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [audioGenerated, setAudioGenerated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundMusic, setBackgroundMusic] = useState('');
  const [activeTab, setActiveTab] = useState('script');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simplified Murf AI voices (limited selection)
  const voices = [
    { id: 'sarah', name: 'Sarah', description: 'Warm Female Voice' },
    { id: 'marcus', name: 'Marcus', description: 'Professional Male Voice' },
    { id: 'emily', name: 'Emily', description: 'Young Female Voice' },
    { id: 'david', name: 'David', description: 'Mature Male Voice' },
    { id: 'luna', name: 'Luna', description: 'Sophisticated Female Voice' }
  ];

  // Simplified music options
  const musicOptions = [
    { value: 'dramatic', label: 'Dramatic' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'romance', label: 'Romance' },
    { value: 'peaceful', label: 'Peaceful' }
  ];

  const characterColors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-yellow-500 to-orange-500',
    'from-indigo-500 to-purple-500'
  ];

  const sampleStory = `Chapter 1: The Discovery

SARAH: (excited) I can't believe we actually found it! The ancient temple, just like the map described.

MARCUS: (cautious) Sarah, we need to be careful. These ruins have been untouched for centuries. Who knows what dangers lurk inside?

SARAH: Come on, Marcus! Where's your sense of adventure? This could be the archaeological discovery of the century!

NARRATOR: As Sarah stepped forward, her torch illuminated intricate carvings on the temple walls. The air grew thick with mystery and anticipation.

MARCUS: (sighing) Alright, but we stick together. And at the first sign of trouble, we're out of here.

SARAH: (laughing) Deal! But first, let's see what secrets this place holds.

NARRATOR: The ancient stones seemed to whisper stories of forgotten civilizations as the two explorers ventured deeper into the mysterious temple.`;

  const analyzeStory = async () => {
    if (!story.trim()) return;
    
    setIsAnalyzing(true);
    setActiveTab('characters');
    
    // Simulate AI analysis
    setTimeout(() => {
      const detectedCharacters: Character[] = [
        { name: 'SARAH', voice: '', dialogueCount: 3, color: characterColors[0] },
        { name: 'MARCUS', voice: '', dialogueCount: 2, color: characterColors[1] },
        { name: 'NARRATOR', voice: '', dialogueCount: 2, color: characterColors[2] }
      ];
      
      setCharacters(detectedCharacters);
      setIsAnalyzing(false);
    }, 2500);
  };

  const updateCharacterVoice = (characterName: string, voice: string) => {
    setCharacters(prev => 
      prev.map(char => 
        char.name === characterName ? { ...char, voice } : char
      )
    );
  };

  const generateAudio = async () => {
    const unassignedVoices = characters.filter(char => !char.voice);
    if (unassignedVoices.length > 0) {
      alert('Please assign voices to all characters before generating audio.');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setActiveTab('generate');
    
    // Simulate generation progress
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsGenerating(false);
          setAudioGenerated(true);
          return 100;
        }
        return prev + 8;
      });
    }, 200);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const loadSample = () => {
    setStory(sampleStory);
    setActiveTab('script');
  };

  const resetAll = () => {
    setStory('');
    setCharacters([]);
    setAudioGenerated(false);
    setGenerationProgress(0);
    setBackgroundMusic('');
    setActiveTab('script');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStory(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/10 to-background py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-4 py-2">
            <Wand2 className="mr-2 h-4 w-4" />
            AI Audio Drama Creator
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Create Your Audio Drama
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your story into an immersive multi-voice audio experience with AI
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 mx-auto bg-muted/50 p-1 rounded-xl border border-border/50">
              <TabsTrigger value="script" className="flex items-center space-x-2 rounded-lg">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Script</span>
              </TabsTrigger>
              <TabsTrigger value="characters" className="flex items-center space-x-2 rounded-lg" disabled={characters.length === 0}>
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Characters</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2 rounded-lg" disabled={characters.length === 0}>
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
              <TabsTrigger value="generate" className="flex items-center space-x-2 rounded-lg" disabled={characters.length === 0}>
                <Volume2 className="h-4 w-4" />
                <span className="hidden sm:inline">Generate</span>
              </TabsTrigger>
            </TabsList>

            {/* Script Tab */}
            <TabsContent value="script" className="space-y-6">
              <Card className="border">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Story Script</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={resetAll} className="flex items-center space-x-2">
                      <RotateCcw className="h-4 w-4" />
                      <span>Reset</span>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      variant="outline" 
                      onClick={loadSample}
                      className="flex-1"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Load Sample Story
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Text File
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="story-input" className="text-sm font-medium">
                      Paste your story script here
                    </Label>
                    <Textarea
                      id="story-input"
                      placeholder="Enter your story script with character names in CAPS followed by dialogue..."
                      value={story}
                      onChange={(e) => setStory(e.target.value)}
                      className="min-h-[400px] resize-none"
                    />
                  </div>
                  
                  <Button 
                    onClick={analyzeStory} 
                    disabled={!story.trim() || isAnalyzing}
                    className="w-full gradient-button text-lg py-6"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing Script with AI...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Analyze Script & Detect Characters
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Characters Tab */}
            <TabsContent value="characters" className="space-y-6">
              <Card className="border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Characters Detected</span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">{characters.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {characters.map((character, index) => (
                      <Card key={index} className="border">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${character.color}`} />
                              <Badge variant="outline" className="font-mono border-primary/30">{character.name}</Badge>
                              <span className="text-sm text-muted-foreground">
                                {character.dialogueCount} line{character.dialogueCount !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm font-medium mb-2 block">
                                Assign Voice
                              </Label>
                              <Select 
                                value={character.voice} 
                                onValueChange={(value) => updateCharacterVoice(character.name, value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose a voice..." />
                                </SelectTrigger>
                                <SelectContent>
                                  {voices.map((voice) => (
                                    <SelectItem key={voice.id} value={voice.id}>
                                      <div className="flex flex-col">
                                        <span className="font-medium">{voice.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                          {voice.description}
                                        </span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              disabled={!character.voice}
                              className="w-full"
                            >
                              <Headphones className="h-4 w-4 mr-2" />
                              Preview Voice
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Music className="h-5 w-5" />
                    <span>Audio Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      Background Music Style
                    </Label>
                    <Select value={backgroundMusic} onValueChange={setBackgroundMusic}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose background music style..." />
                      </SelectTrigger>
                      <SelectContent>
                        {musicOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Generate Tab */}
            <TabsContent value="generate" className="space-y-6">
              <Card className="border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Volume2 className="h-5 w-5" />
                    <span>Audio Generation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!audioGenerated && !isGenerating && (
                    <div className="text-center space-y-4">
                      <div className="p-8 border-2 border-dashed border-border/50 rounded-lg">
                        <Volume2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">Ready to Generate</h3>
                        <p className="text-muted-foreground mb-6">
                          All characters have voices assigned. Click below to create your audio drama.
                        </p>
                        <Button 
                          onClick={generateAudio}
                          className="gradient-button text-lg py-6 px-8"
                          size="lg"
                        >
                          <Sparkles className="mr-2 h-5 w-5" />
                          Generate Audio Drama
                        </Button>
                      </div>
                    </div>
                  )}

                  {isGenerating && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="relative w-20 h-20 mx-auto mb-4">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full blur-lg opacity-50 animate-pulse" />
                          <div className="relative w-20 h-20 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center shadow-xl">
                            <Loader2 className="h-8 w-8 text-white animate-spin" />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Generating Your Audio Drama</h3>
                        <p className="text-muted-foreground">AI is creating voices and mixing audio...</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{generationProgress}%</span>
                        </div>
                        <Progress value={generationProgress} className="h-3" />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="p-4 border rounded-lg">
                          <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
                          <div className="text-sm font-medium">Script Analyzed</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
                          <div className="text-sm font-medium">Voices Generated</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <Loader2 className="h-6 w-6 mx-auto mb-2 animate-spin text-primary" />
                          <div className="text-sm font-medium">Mixing Audio</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {audioGenerated && (
                    <div className="space-y-6">
                      <Alert className="border-green-500/20 bg-green-500/10">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertDescription className="text-green-700 dark:text-green-300">
                          Your audio drama has been generated successfully! 🎉
                        </AlertDescription>
                      </Alert>

                      <Card className="border-2 border-primary/20">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <h4 className="font-semibold text-lg">Audio Preview</h4>
                              <p className="text-sm text-muted-foreground">Your generated audio drama</p>
                            </div>
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              3:42 duration
                            </Badge>
                          </div>
                          
                          {/* Simulated Waveform */}
                          <div className="relative mb-6">
                            <div className="flex items-center justify-center h-20 bg-background/20 rounded-lg border-2 border-border/30 overflow-hidden">
                              <div className="flex items-end space-x-1 h-16">
                                {Array.from({ length: 80 }, (_, i) => (
                                  <div
                                    key={i}
                                    className={`bg-gradient-to-t from-primary to-purple-500 w-1 rounded-t ${
                                      isPlaying ? 'animate-pulse' : ''
                                    }`}
                                    style={{
                                      height: `${Math.random() * 100}%`,
                                      animationDelay: `${i * 20}ms`
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-center gap-4">
                            <Button onClick={togglePlayback} variant="outline" size="lg" className="flex-shrink-0">
                              {isPlaying ? (
                                <Pause className="h-5 w-5" />
                              ) : (
                                <Play className="h-5 w-5" />
                              )}
                            </Button>
                            <Separator orientation="vertical" className="h-8" />
                            <Button className="flex-1 gradient-button text-lg py-6" size="lg">
                              <Download className="mr-2 h-5 w-5" />
                              Download MP3
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}