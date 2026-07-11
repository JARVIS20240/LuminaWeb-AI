"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi, I'm LuminaWeb AI. How can I help you learn more about my creator's work?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Sorry, something went wrong. Please try again.` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat assistant"
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-foreground text-background shadow-2xl z-50 transition-transform hover:scale-110 hover:bg-neutral-800 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white border border-gray-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-white text-black p-4 flex justify-between items-center border-b border-gray-200">
              <div>
                <h3 className="font-semibold tracking-tight">LuminaWeb AI</h3>
                <p className="text-xs text-gray-500">Digital Assistant</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat assistant"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain p-4 flex flex-col gap-4 bg-[#f7f7f7]">
              {messages.map((msg, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={index}
                  className={`max-w-[85%] rounded-2xl p-3 text-sm break-words whitespace-pre-wrap ${msg.role === "user"
                      ? "bg-white text-black border border-gray-200 shadow-sm self-end rounded-tr-sm"
                      : "bg-black text-white self-start rounded-tl-sm"
                    }`}
                >
                  {msg.content}
                </motion.div>
              ))}
              {isLoading && (
                <div className="bg-black text-white self-start rounded-2xl rounded-tl-sm p-3 flex gap-1">
                  <Loader2 className="animate-spin text-gray-400" size={16} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-200">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-[#f7f7f7] border border-gray-200 rounded-full py-3 pl-4 pr-12 text-sm text-black focus:outline-none focus:ring-1 focus:ring-black"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2 bg-black text-white rounded-full disabled:cursor-not-allowed transition-opacity"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
