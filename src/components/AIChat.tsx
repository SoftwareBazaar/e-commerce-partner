import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface Msg { role: "user" | "assistant"; content: string; }

export const AIChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hey! I'm your trading tools assistant. Ask me about EAs, indicators, mentorship, or how to choose what's right for you." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: 9e9, behavior: "smooth" }); }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-chat", {
        body: { messages: next },
      });
      if (error) throw error;
      setMessages([...next, { role: "assistant", content: data?.reply ?? "Sorry, I couldn't respond." }]);
    } catch (e: any) {
      setMessages([...next, { role: "assistant", content: "Connection error. Please try again." }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="AI assistant"
        className="fixed bottom-6 right-24 z-40 h-14 w-14 rounded-full bg-gradient-primary text-primary-foreground shadow-lg glow-primary flex items-center justify-center hover:scale-105 transition-transform"
      >
        {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </button>

      <div className={cn(
        "fixed bottom-24 right-6 z-40 w-[min(380px,calc(100vw-3rem))] h-[520px] max-h-[70vh] rounded-2xl border border-border bg-card shadow-2xl flex flex-col transition-all origin-bottom-right",
        open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none",
      )}>
        <div className="flex items-center gap-2 p-4 border-b border-border">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <p className="font-semibold text-sm">NeuroAlgo AI</p>
            <p className="text-xs text-muted-foreground">Trading tools assistant</p>
          </div>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap",
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
              )}>{m.content}</div>
            </div>
          ))}
          {busy && <div className="text-xs text-muted-foreground">Thinking...</div>}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-3 border-t border-border flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything..." className="bg-input" />
          <Button type="submit" size="icon" disabled={busy} className="bg-gradient-primary text-primary-foreground"><Send className="h-4 w-4" /></Button>
        </form>
      </div>
    </>
  );
};
