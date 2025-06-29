'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Github, 
  Mail, 
  Heart, 
  Zap, 
  Users, 
  Volume2, 
  Sparkles, 
  Download, 
  Music,
  Star,
  Award,
  Target,
  Lightbulb,
  Code,
  Palette
} from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Users,
      title: 'No Voice Actors Needed',
      description: 'Skip the hassle of hiring and coordinating voice talent. Our AI handles all character voices automatically with professional quality.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Volume2,
      title: 'Premium Murf AI Voices',
      description: 'Choose from our curated collection of realistic AI voices that sound natural and engaging, bringing your characters to life.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Generation',
      description: 'Transform your story into a complete audio drama in under 30 seconds. No more weeks of production time.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Sparkles,
      title: 'Smart Character Detection',
      description: 'AI automatically identifies speakers and dialogue from your script, saving you hours of manual work and setup.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Music,
      title: 'Background Music Integration',
      description: 'Add atmospheric soundtracks that perfectly complement your story\'s mood and enhance the listening experience.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Download,
      title: 'Professional Quality Output',
      description: 'Export broadcast-ready MP3 files that sound like they were produced in a professional studio environment.',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const technologies = [
    { name: 'Next.js', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'shadcn/ui', category: 'Components' },
    { name: 'Murf AI', category: 'Voice Generation' },
    { name: 'GPT-4', category: 'Text Analysis' },
    { name: 'FFmpeg', category: 'Audio Processing' }
  ];

  const stats = [
    { value: '8', label: 'AI Voices', icon: Volume2 },
    { value: '30s', label: 'Avg Generation', icon: Zap },
    { value: '99.9%', label: 'Uptime', icon: Award },
    { value: '4.9★', label: 'User Rating', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/10 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/5 px-4 py-2">
              <Sparkles className="mr-2 h-4 w-4" />
              About StoryVox
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Revolutionizing
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                Audio Storytelling
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              We believe every story deserves to be heard. Our AI-powered platform makes professional 
              audio drama production accessible to everyone, from indie authors to major publishers.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-purple-500 rounded-2xl p-4 shadow-xl">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/5">
              <Award className="mr-2 h-4 w-4" />
              Core Features
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Why Choose
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"> StoryVox</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover the powerful features that make audio drama creation effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="border"
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 shadow-lg`}>
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

      {/* Technology Stack */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/5">
              <Code className="mr-2 h-4 w-4" />
              Technology Stack
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Built with
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"> Modern Technology</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Powered by the latest advances in AI, web development, and audio processing
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
              {technologies.map((tech, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-6 text-center">
                    <div className="text-lg font-semibold mb-2">
                      {tech.name}
                    </div>
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                      {tech.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 border-primary/20">
              <CardContent className="relative p-12">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-8 w-8 text-red-500" />
                    <span className="text-2xl font-semibold">Built with Passion</span>
                    <Heart className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  StoryVox is crafted with passion by developers who believe in the power of 
                  storytelling and the potential of AI to democratize creative expression.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" size="lg" className="border-2">
                    <Github className="mr-2 h-5 w-5" />
                    View on GitHub
                  </Button>
                  <Button variant="outline" size="lg" className="border-2">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-500 rounded-xl p-3 shadow-lg">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To make professional audio drama production accessible to creators worldwide. 
                  Whether you're a novelist wanting to bring your characters to life, an educator 
                  creating engaging content, or a content creator exploring new formats, 
                  StoryVox empowers you to transform text into immersive audio experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-3 shadow-lg">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We envision a world where every story can be heard, where the barriers between 
                  written and audio content disappear, and where creators of all backgrounds can 
                  produce professional-quality audio dramas without the traditional constraints 
                  of cost, time, and technical complexity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="max-w-4xl mx-auto border-2 border-primary/30">
            <CardContent className="relative p-12 lg:p-16 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-500 rounded-2xl p-4 shadow-xl">
                  <Palette className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Transform Your Stories?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of creators who are already bringing their narratives to life 
                with AI-powered audio drama generation.
              </p>
              <Button asChild size="lg" className="gradient-button text-lg px-8 py-6">
                <a href="/app" className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Start Creating Now</span>
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}