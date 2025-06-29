'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Mic, 
  Sparkles, 
  Zap, 
  Download, 
  ArrowRight, 
  Play, 
  Users, 
  Volume2, 
  Music,
  Star,
  CheckCircle,
  Wand2,
  Headphones,
  FileText,
  Clock,
  Github,
  Twitter,
  Mail,
  Heart
} from 'lucide-react';

export default function Home() {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: FileText,
      title: 'Smart Script Analysis',
      description: 'AI automatically detects characters, dialogue, and narrative elements from your story.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Character Voice Mapping',
      description: 'Assign unique AI voices to each character with our premium voice library.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Volume2,
      title: 'Realistic AI Voices',
      description: 'Powered by Murf AI for natural, expressive character voices.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Music,
      title: 'Background Soundscapes',
      description: 'Add atmospheric music and sound effects to enhance your story.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate complete audio dramas in under 30 seconds.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Download,
      title: 'Professional Export',
      description: 'Download broadcast-quality MP3 files ready for distribution.',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const stats = [
    { value: '8', label: 'Premium AI Voices' },
    { value: '30s', label: 'Average Generation' },
    { value: '100%', label: 'Automated Process' },
    { value: '4.9★', label: 'User Rating' }
  ];

  const steps = [
    {
      step: '01',
      title: 'Upload Your Story',
      description: 'Paste your script or upload a text file. Our AI will automatically analyze and detect characters.',
      icon: FileText
    },
    {
      step: '02',
      title: 'Assign Voices',
      description: 'Choose from premium AI voices for each character. Preview and adjust until perfect.',
      icon: Headphones
    },
    {
      step: '03',
      title: 'Generate & Download',
      description: 'Click generate and get your professional audio drama ready for sharing in seconds.',
      icon: Download
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Seamless Hero Section */}
      <section className="relative overflow-hidden hero-gradient">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>
        
        <div className="relative container mx-auto px-4 lg:px-8 py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <Badge variant="secondary" className="mb-8 px-6 py-3 bg-primary/10 text-primary border-primary/20 text-sm font-medium">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered Audio Drama Platform
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
              <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                Transform Stories Into
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent animate-gradient-x">
                Immersive Audio Dramas
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              No voice actors needed. No complex editing. Just paste your story and watch AI create 
              a professional multi-voice audio drama in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button asChild size="lg" className="text-lg px-8 py-6 gradient-button group">
                <Link href="/app" className="flex items-center space-x-2">
                  <Wand2 className="h-5 w-5" />
                  <span>Create Audio Drama</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToFeatures} className="text-lg px-8 py-6 border-2">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Seamlessly connected */}
      <section id="features" className="py-24 lg:py-32 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/5">
              <Star className="mr-2 h-4 w-4" />
              Premium Features
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
              Everything You Need for
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"> Audio Excellence</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Professional-quality results with zero technical expertise required
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="simple-card border"
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-4 shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 lg:py-40 bg-gradient-to-b from-background to-muted/30 relative">
        {/* Subtle dividing line at the top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/5">
              <Clock className="mr-2 h-4 w-4" />
              Simple Process
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
              From Text to Audio in
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"> 3 Easy Steps</span>
            </h2>
            <p className="text-xl text-muted-foreground mt-8">
              Our streamlined process makes professional audio drama creation accessible to everyone
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-24">
              {steps.map((item, index) => (
                <div key={index} className="text-center relative">
                  {/* Connection line for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-24 h-0.5 bg-gradient-to-r from-primary/40 to-transparent" />
                  )}
                  
                  <div className="mb-10">
                    <div className="relative w-24 h-24 mx-auto bg-gradient-to-r from-primary to-purple-500 rounded-3xl p-6 shadow-xl">
                      <item.icon className="h-12 w-12 text-white" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center text-sm font-bold text-primary shadow-lg">
                        {item.step}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-2xl lg:text-3xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg max-w-sm mx-auto">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Clean design with subtle background effects */}
      <section className="py-32 lg:py-40 relative overflow-hidden">
        {/* Subtle dividing line at the top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
        
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-12">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-8 border border-primary/20">
                <CheckCircle className="h-4 w-4" />
                <span>Ready to Transform Your Stories?</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight mb-8">
                Start Creating Amazing
                <br />
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Audio Dramas Today
                </span>
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                Join thousands of creators who are already bringing their stories to life with AI-powered voices
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-12 py-6 gradient-button">
                <Link href="/app" className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Get Started Free</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-12 py-6 border-2">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-gradient py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-primary to-purple-500 p-3 rounded-xl">
                  <Mic className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                    StoryVox
                  </span>
                  <span className="text-sm text-muted-foreground">AI Audio Drama Platform</span>
                </div>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                Transform any story into an immersive audio drama with AI voices. 
                No voice actors needed, no complex editing required.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
                <li><Link href="/app" className="text-muted-foreground hover:text-primary">Create Audio</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Help Center</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Built with</span>
                <Heart className="h-4 w-4 text-red-500" />
                <span>using Next.js, Tailwind CSS, shadcn/ui, Murf AI & GPT-4</span>
              </div>
              <div className="text-sm text-muted-foreground">
                © 2024 StoryVox. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}