'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mic, Moon, Sun, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Create', href: '/app' },
  { name: 'About', href: '/about' },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn(
      mobile ? 'flex flex-col space-y-6' : 'hidden lg:flex lg:space-x-8'
    )}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => mobile && setOpen(false)}
          className={cn(
            'relative text-sm font-medium transition-all duration-300 hover:text-primary group',
            pathname === item.href 
              ? 'text-primary' 
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {item.name}
          <span className={cn(
            'absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 transition-all duration-300',
            pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
          )} />
        </Link>
      ))}
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-lg rounded-full group-hover:blur-xl transition-all duration-300" />
              <div className="relative bg-gradient-to-r from-primary to-purple-500 p-2 rounded-xl">
                <Mic className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                StoryVox
              </span>
              <span className="text-xs text-muted-foreground -mt-1">AI Audio Drama</span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <NavLinks />
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative overflow-hidden group"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              
              <Button asChild className="hidden lg:inline-flex bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/app" className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Get Started</span>
                </Link>
              </Button>
              
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-xl">
                  <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                  <div className="flex flex-col space-y-8 mt-8">
                    <NavLinks mobile />
                    <Button asChild className="w-full bg-gradient-to-r from-primary to-purple-500 text-white">
                      <Link href="/app" onClick={() => setOpen(false)} className="flex items-center justify-center space-x-2">
                        <Sparkles className="h-4 w-4" />
                        <span>Get Started</span>
                      </Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}