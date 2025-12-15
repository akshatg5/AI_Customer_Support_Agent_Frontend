import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { apiClient } from "@/lib/apiClient";

type Mode = "login" | "signup";

interface AuthFormProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  onAuthSuccess?: () => void;
}

export function AuthForm({ mode, onModeChange, onAuthSuccess }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isSignup = mode === "signup";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (isSignup) {
        const response = await apiClient.post("/api/auth/signup", {
          name,
          email,
          password,
        });
        setSuccess("Signup successful. You can now log in.");
        console.log("Signup response:", response.data);
      } else {
        const response = await apiClient.post("/api/auth/login", {
          email,
          password,
        });
        setSuccess("Login successful!");
        console.log("Login response:", response.data);
        // Example: store token in localStorage for later use
        if (response.data?.token) {
          localStorage.setItem("authToken", response.data.token);
          if (onAuthSuccess) onAuthSuccess();
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            {isSignup ? "Create an account" : "Welcome back"}
          </h1>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => onModeChange(isSignup ? "login" : "signup")}
          >
            {isSignup ? "Have an account? Log in" : "New here? Sign up"}
          </Button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="space-y-1">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-md border bg-background"
                placeholder="Jane Doe"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md border bg-background"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md border bg-background"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? isSignup
                ? "Signing up..."
                : "Logging in..."
              : isSignup
              ? "Sign up"
              : "Log in"}
          </Button>
        </form>

        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-emerald-600" role="status">
            {success}
          </p>
        )}
      </Card>
    </div>
  );
}


