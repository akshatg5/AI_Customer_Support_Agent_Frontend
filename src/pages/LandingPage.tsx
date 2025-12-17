"use client";

import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { MessageSquare, Shield, Clock, Sparkles } from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-6xl w-full space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              AI-Powered Customer Support
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
              Minimal AI Customer Support Agent
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-pretty">
              Authenticate securely, chat with an AI assistant, and keep your
              support history in one place. Built with a minimal, clean design
              so you can focus on the experience.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/signup")}
                className="text-base px-8"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login")}
                className="text-base px-8"
              >
                Sign In
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Secure Authentication</h3>
              <p className="text-sm text-muted-foreground">
                JWT-based auth with bcrypt password hashing for maximum security
              </p>
            </Card>

            <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">AI Assistant</h3>
              <p className="text-sm text-muted-foreground">
                Chat with an intelligent AI that understands your needs
              </p>
            </Card>

            <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Chat History</h3>
              <p className="text-sm text-muted-foreground">
                All your conversations are stored and easily accessible
              </p>
            </Card>

            <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Clean Design</h3>
              <p className="text-sm text-muted-foreground">
                Minimal interface that lets you focus on what matters
              </p>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
