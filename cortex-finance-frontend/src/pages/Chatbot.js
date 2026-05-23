import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import './Chatbot.css';

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

  const handleSend = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay for the "thinking state"
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg = { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: generateAIResponse(text) 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 2000);
  };

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('spending') || q.includes('expenses')) {
      return "### 📊 Spending Analysis\nYou spent **₹24,532** last week.\n\nHere is your top spending breakdown:\n1. **Rent**: 40%\n2. **Food/Dining**: 35%\n3. **Shopping**: 15%\n\n> *AI Tip: To save more, consider reducing food delivery frequency.*";
    }
    if (q.includes('subscriptions') || q.includes('recurring')) {
      return "I found **3 active subscriptions** in your statement:\n\n| Service | Amount |\n| --- | --- |\n| Netflix | ₹649 |\n| Spotify | ₹119 |\n| Amazon Prime | ₹299 |\n\n**Total:** ₹1,067/month.";
    }
    if (q.includes('unusual')) {
      return "⚠️ **Alert:** There is one unusual transaction detected:\n\n- **Swiggy (₹450)** at 10:23 AM today. \n\nThis is **40% higher** than your average weekday food delivery order.";
    }
    return "I can help you analyze your finances using AI. Try clicking one of the suggested prompts or ask me about your spending patterns!";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="chatbot-container"
    >
      <div className="chat-header glass-panel">
        <div className="ai-profile">
          <div className="ai-avatar pulse-animation">
            <Bot size={24} />
          </div>
          <div>
            <h2>Cortex AI Assistant</h2>
            <p className="status-indicator"><span className="dot online"></span> Online and ready</p>
          </div>
        </div>
      </div>

      <div className="chat-body glass-panel">
        <div className="messages-list">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`message-wrapper ${msg.type}`}
              >
                <div className="message-avatar">
                  {msg.type === 'ai' ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div className="message-bubble">
                  {msg.type === 'user' ? (
                    <p>{msg.text}</p>
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown-body">
                      {msg.text}
                    </ReactMarkdown>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="message-wrapper ai"
            >
              <div className="message-avatar pulse-animation"><Bot size={18} /></div>
              <div className="message-bubble typing-container">
                <span className="thinking-text">AI is thinking</span>
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {!isTyping && (
          <div className="suggested-prompts-container">
            <p className="prompts-label"><Sparkles size={16} className="cyan" /> Suggested Prompts</p>
            <div className="prompts-grid">
              {suggestedPrompts.map((prompt, idx) => (
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={idx} 
                  className="prompt-btn glass-panel"
                  onClick={() => handleSend(prompt)}
                >
                  {prompt}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-area glass-panel">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="chat-form"
        >
          <input 
            type="text" 
            placeholder="Ask Cortex about your finances..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            type="submit" 
            className="btn btn-primary send-btn"
            disabled={!input.trim() || isTyping}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Chatbot;
