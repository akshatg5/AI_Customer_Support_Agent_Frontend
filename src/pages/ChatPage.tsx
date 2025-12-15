import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { apiClient } from "@/lib/apiClient";
import { useNavigate } from "react-router-dom";

interface ChatMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) return;

    const fetchHistory = async () => {
      setLoadingHistory(true);
      setError(null);
      try {
        const res = await apiClient.get("/api/chat/history");
        const history: ChatMessage[] =
          res.data?.messages?.map((m: any) => ({
            id: m._id,
            role: m.role,
            content: m.content,
            timestamp: m.timestamp,
          })) ?? [];
        setMessages(history);
      } catch (err: any) {
        console.error("Fetch history error:", err);
        setError(
          err?.response?.data?.error ||
            err?.response?.data?.message ||
            "Failed to fetch chat history"
        );
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchHistory();
  }, [token]);

  const handleSend = async () => {
    if (!input.trim() || !token) return;
    setSending(true);
    setError(null);
    const userMsg: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await apiClient.post("/api/chat/send", {
        message: userMsg.content,
      });
      const { userMessage, assistantMessage } = res.data || {};
      setMessages((prev) => [
        ...prev.slice(0, -1), // replace optimistic user message with server-stamped one
        {
          id: userMessage?.id,
          role: userMessage?.role ?? "user",
          content: userMessage?.content ?? userMsg.content,
          timestamp: userMessage?.timestamp,
        },
        {
          id: assistantMessage?.id,
          role: assistantMessage?.role ?? "assistant",
          content: assistantMessage?.content ?? "No response",
          timestamp: assistantMessage?.timestamp,
        },
      ]);
    } catch (err: any) {
      console.error("Send message error:", err);
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Failed to send message"
      );
      // restore input on failure
      setMessages((prev) => prev.slice(0, -1));
      setInput(userMsg.content);
    } finally {
      setSending(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="p-6 space-y-4 max-w-md w-full text-center">
          <p className="text-lg font-semibold">You need to be logged in.</p>
          <p className="text-sm text-muted-foreground">
            Please log in to access the chat.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate("/login")}>Go to Login</Button>
            <Button variant="outline" onClick={() => navigate("/signup")}>
              Create account
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-3xl space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Chat with AI Support</h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            Home
          </Button>
        </div>

        <Card className="p-4 h-[65vh] overflow-y-auto space-y-3">
          {loadingHistory && <p className="text-sm">Loading history...</p>}
          {!loadingHistory && messages.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Start the conversation by sending a message.
            </p>
          )}
          {messages.map((msg, idx) => {
            const isUser = msg.role === "user";
            const label = isUser ? "You" : "AI Assistant";

            return (
              <div
                key={msg.id ?? idx}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-lg px-3 py-2 max-w-[75%] text-sm ${
                    isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
                      {label}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-current opacity-60" />
                    <span className="text-[10px] opacity-70">
                      {isUser ? "Customer" : "Support Agent"}
                    </span>
                  </div>
                  <div>{msg.content}</div>
                </div>
              </div>
            );
          })}
        </Card>

        <Card className="p-4 space-y-3">
          <textarea
            className="w-full border rounded-md bg-background px-3 py-2 text-sm"
            rows={3}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={sending}
          />
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setInput("")} disabled={sending}>
              Clear
            </Button>
            <Button onClick={handleSend} disabled={sending || !input.trim()}>
              {sending ? "Sending..." : "Send"}
            </Button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </Card>
      </div>
    </div>
  );
}


