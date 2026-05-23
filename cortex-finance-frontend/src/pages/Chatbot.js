import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import api from '../api/mockService';

const initialMessages = [
  { 
    id: 1, 
    type: 'ai', 
    text: "Hello! I am your **Cortex AI Financial Assistant**. I've successfully analyzed your recent bank statement. \n\nHow can I help you today? You can ask me to categorize your expenses or find unusual transactions." 
  }
];

const suggestedPrompts = [
  "Summarize my spending last month",
  "How can I reduce my expenses?",
  "Show me my recurring subscriptions",
  "Are there any unusual transactions?"
];

const Chatbot = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await api.post('/chat', { message: text });
      const aiMsg = { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: response.data.reply 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', text: "Sorry, I am having trouble connecting to the server right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col h-full bg-bgPrimary relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-accentCyan/10 to-transparent pointer-events-none z-0"></div>
      
      <div className="flex items-center gap-4 px-8 py-6 border-b border-glassBorder z-10 bg-bgPrimary/80 backdrop-blur-md">
        <div className="relative">
          <div className="absolute inset-0 bg-accentCyan rounded-full blur-md opacity-50 animate-pulse"></div>
          <div className="w-12 h-12 rounded-full bg-accentCyan/20 border border-accentCyan/50 flex items-center justify-center text-accentCyan relative z-10">
            <Bot size={24} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Cortex AI Assistant</h2>
          <p className="text-sm text-accentCyan flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-accentCyan animate-pulse"></span>
            Online and ready
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6 z-10 scroll-smooth">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex gap-4 max-w-[85%] ${msg.type === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'user' ? 'bg-slate-700 text-slate-300' : 'bg-accentCyan/20 text-accentCyan border border-accentCyan/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]'}`}>
                {msg.type === 'ai' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.type === 'user' ? 'bg-accentPurple/20 text-white border border-accentPurple/30 rounded-tr-none' : 'glass-panel rounded-tl-none border-accentCyan/20'}`}>
                {msg.type === 'user' ? (
                  <p className="text-sm md:text-base">{msg.text}</p>
                ) : (
                  <div className="markdown-body text-slate-200">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4 max-w-[85%]"
          >
            <div className="w-10 h-10 rounded-full bg-accentCyan/20 text-accentCyan border border-accentCyan/30 shadow-[0_0_10px_rgba(0,240,255,0.2)] flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div className="glass-panel p-4 rounded-2xl rounded-tl-none border-accentCyan/20 flex items-center gap-3">
              <span className="text-accentCyan font-medium text-sm">AI is thinking</span>
              <div className="flex gap-1 mt-1">
                <span className="w-1.5 h-1.5 bg-accentCyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-accentCyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-accentCyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {!isTyping && messages.length < 3 && (
        <div className="px-8 pb-4 z-10">
          <p className="flex items-center gap-2 text-textSecondary text-sm font-medium mb-3">
            <Sparkles size={16} className="text-accentPurple" /> Suggested Prompts
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt, idx) => (
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.98 }}
                key={idx} 
                className="px-4 py-2 text-sm rounded-lg glass-panel text-slate-300 hover:text-white border-glassBorder hover:border-accentCyan/30 transition-colors"
                onClick={() => handleSend(prompt)}
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <div className="p-6 z-10 border-t border-glassBorder bg-bgPrimary">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="relative max-w-4xl mx-auto"
        >
          <input 
            type="text" 
            placeholder="Ask Cortex about your finances..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accentCyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all pr-16"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center rounded-lg bg-accentCyan text-slate-900 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} className="mr-0.5 mt-0.5" />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Chatbot;
