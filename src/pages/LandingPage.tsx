import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-3xl w-full flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Minimal AI Customer Support Agent
          </h1>
          <p className="text-muted-foreground text-lg">
            Authenticate securely, chat with an AI assistant, and keep your
            support history in one place. Built with a minimal, clean design so
            you can focus on the experience.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={() => navigate("/signup")}>
              Get started – Sign up
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
              I already have an account
            </Button>
          </div>
        </div>

        <Card className="flex-1 w-full p-6 space-y-3">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Features
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• JWT-based signup, login, and logout</li>
            <li>• Secure password hashing with bcrypt</li>
            <li>• Protected chat experience with your AI assistant</li>
            <li>• Stored chat history for every authenticated user</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}


