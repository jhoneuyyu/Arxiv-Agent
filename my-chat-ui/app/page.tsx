'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your Arxiv Research Agent. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const currentHistory = [...messages, userMessage];

      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: currentHistory }),
      });

      if (!res.ok) throw new Error('Failed to fetch response');

      const data = await res.json();
      const agentMessage: Message = { role: 'assistant', content: data.message };
      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error connecting to the agent.' },
        { role: 'assistant', content: 'Ensure the backend server is running on port 8000.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-950 to-slate-900 text-gray-100">
      {/* Header */}
      <header className="flex-none p-6 border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
          <h1 className="text-xl font-semibold tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Arxiv Research Agent
          </h1>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[85%] sm:max-w-[75%] px-6 py-4 rounded-2xl shadow-xl transition-all duration-300
                  ${msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white/10 backdrop-blur-md border border-white/10 text-gray-100 rounded-bl-sm'
                  }
                `}
              >
                <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-light">
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start w-full">
              <div className="max-w-[75%] px-6 py-4 rounded-2xl rounded-bl-sm bg-white/5 border border-white/5 backdrop-blur-sm">
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" />
                  <span className="text-xs text-gray-400 ml-2 animate-pulse">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-none p-4 sm:p-6 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative group rounded-xl bg-white/5 border border-white/10 focus-within:border-blue-500/50 focus-within:bg-white/10 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 backdrop-blur-lg"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything regarding research papers..."
              className="w-full bg-transparent border-none text-white placeholder-gray-400 px-6 py-4 focus:ring-0 focus:outline-none text-base"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25"
            >
              <svg
                className="w-5 h-5 transform group-focus-within:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="text-[10px] text-gray-500 tracking-wider uppercase">Powered by AgentLightning</p>
          </div>
        </div>
      </div>
    </main>
  );
}
