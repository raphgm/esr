import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Send, X, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { VoiceRecorder, AudioPlayer } from "./VoiceRecorder";

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  initialContext?: string;
}

export default function ChatDrawer({
  isOpen,
  onClose,
  initialPrompt = "",
  initialContext = "general",
}: ChatDrawerProps) {
  const [messages, setMessages] = useState<
    { role: "user" | "model"; text: string; audioUrl?: string; audioDuration?: number }[]
  >([
    {
      role: "model",
      text: "Hello! I am REMOGIGS AI, your dedicated digital co-pilot. I can assist you with building course summaries, analyzing local supplier pricing, formatting invoices, drafting RFQs, or polishing your career CV. What can we achieve together today?",
    },
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const lastSentPromptRef = useRef<string | null>(null);

  const sendMessageText = async (text: string) => {
    const query = text.trim();
    if (!query || isLoading) return;

    // Append user message
    const updatedMessages = [
      ...messages,
      { role: "user" as const, text: query },
    ];
    setMessages(updatedMessages);
    setInputMsg("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          context: initialContext,
          history: updatedMessages.slice(0, -1), // pass historical messages
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with REMOGIGS AI server.");
      }

      const data = await response.json();
      setMessages([
        ...updatedMessages,
        { role: "model" as const, text: data.reply || "No response received." },
      ]);
    } catch (err: any) {
      setMessages([
        ...updatedMessages,
        {
          role: "model" as const,
          text: `⚠️ Error: ${err.message || "An error occurred."}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && initialPrompt) {
      setInputMsg(initialPrompt);
      if (lastSentPromptRef.current !== initialPrompt) {
        lastSentPromptRef.current = initialPrompt;
        const timer = setTimeout(() => {
          sendMessageText(initialPrompt);
        }, 300);
        return () => clearTimeout(timer);
      }
    } else if (!isOpen) {
      lastSentPromptRef.current = null;
    }
  }, [isOpen, initialPrompt]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleRecordComplete = (audioUrl: string, duration: number) => {
    const updatedMessages = [
      ...messages,
      { role: "user" as const, text: "🎤 Voice note", audioUrl, audioDuration: duration },
    ];
    setMessages(updatedMessages);
    setIsLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I've received your audio note. I have logged this feedback. Do you want me to convert this into a structured task?",
        },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessageText(inputMsg);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-end z-50">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="bg-slate-950 max-w-lg w-full h-full shadow-2xl flex flex-col justify-between overflow-hidden text-white border-l-4 border-purple-600 rounded-xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-slate-950 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500 text-white p-2.5 border border-white/20 shadow-sm rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider">
                    REMOGIGS AI Digital Co-pilot
                  </h3>
                  <p className="text-[10px] text-white/50 font-mono tracking-widest uppercase">
                    Powered by Gemini • Context: {initialContext.toUpperCase()}
                  </p>
                </div>
              </div>

              <button
                id="btn-close-ai"
                onClick={onClose}
                className="bg-slate-900 hover:bg-purple-500 hover:text-white text-white/75 p-2 border border-white/10 cursor-pointer transition-colors rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Pane */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-slate-950">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[85%] ${
                    msg.role === "user"
                      ? "self-end items-end"
                      : "self-start items-start"
                  }`}
                >
                  <span className="text-[9px] text-white/50 font-bold tracking-widest uppercase mb-1">
                    {msg.role === "user" ? "User" : "REMOGIGS AI"}
                  </span>
                  <div
                    className={`p-4 rounded-xl text-xs leading-relaxed whitespace-pre-wrap border ${
                      msg.role === "user"
                        ? "bg-purple-500 text-white border-purple-600 shadow-sm"
                        : "bg-slate-900 border-white/10 text-white/90 shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="self-start items-start max-w-[85%] flex flex-col">
                  <span className="text-[9px] text-white/50 font-bold tracking-widest uppercase mb-1">
                    REMOGIGS AI
                  </span>
                  <div className="bg-slate-900 border border-white/10 p-4 rounded-xl flex items-center gap-2 shadow-sm">
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input form */}
            <form
              onSubmit={handleSendMessage}
              className="p-5 border-t border-white/10 bg-slate-950 flex gap-2 items-center"
            >
              <div className="flex-1 flex items-center bg-slate-900 border border-white/15 rounded-xl pr-2 focus-within:border-purple-600 transition-colors">
                <input
                  type="text"
                  placeholder="Ask REMOGIGS AI anything..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none font-medium"
                />
                {!inputMsg && (
                   <VoiceRecorder onRecordComplete={handleRecordComplete} compact={true} />
                )}
              </div>
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-700 text-white p-3.5 border border-white/20 rounded-xl cursor-pointer transition-colors shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none shrink-0"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
