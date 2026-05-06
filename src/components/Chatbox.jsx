import React, { useState, useRef, useEffect } from 'react';

const Chatbox = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Welcome to Furaha Event Decorations! ✨ I'm your personal event planning assistant. Ask me about our services, packages, pricing, or how we can make your dream event a reality!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are a warm, elegant AI assistant for Furaha Event Decorations — a premium event planning company based in Kenya. 
You help clients with:
- Information about event services: weddings, birthdays, corporate events, baby showers, graduations
- Pricing guidance (packages are in KES)
- Decoration themes and ideas
- Booking and consultation inquiries
- General event planning advice

Tone: Friendly, professional, and enthusiastic about creating beautiful events. Keep responses concise and helpful. Use occasional tasteful emojis. Always encourage clients to explore the website or book a consultation for personalized quotes.`,
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const reply = data.content?.map((b) => b.text || '').join('') || "I'm sorry, I couldn't process that. Please try again.";
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Oops! Something went wrong. Please try again shortly. ' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickReplies = ['Our services', 'Wedding packages', 'Get a quote', 'Contact us'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Jost:wght@300;400;500&display=swap');

        /* ── TOGGLE BUTTON ── */
        .furaha-chat-toggle {
          position: fixed;
          left: 1.5rem;
          bottom: 2rem;
          z-index: 1050;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #c9a84c 0%, #e8c97a 50%, #c9a84c 100%);
          box-shadow: 0 4px 20px rgba(180,130,60,0.45), 0 0 0 0 rgba(201,168,76,0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: pulse-ring 2.5s ease-out infinite;
        }
        .furaha-chat-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 28px rgba(180,130,60,0.55);
        }
        .furaha-chat-toggle svg {
          width: 26px;
          height: 26px;
          color: #fff;
          transition: transform 0.3s ease;
        }
        .furaha-chat-toggle.is-open svg {
          transform: rotate(90deg);
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 4px 20px rgba(180,130,60,0.45), 0 0 0 0 rgba(201,168,76,0.4); }
          70%  { box-shadow: 0 4px 20px rgba(180,130,60,0.45), 0 0 0 14px rgba(201,168,76,0); }
          100% { box-shadow: 0 4px 20px rgba(180,130,60,0.45), 0 0 0 0 rgba(201,168,76,0); }
        }

        /* ── CHAT WINDOW ── */
        .furaha-chat-window {
          position: fixed;
          left: 1.5rem;
          bottom: 5.5rem;
          z-index: 1049;
          width: 340px;
          max-width: calc(100vw - 2rem);
          height: 520px;
          max-height: calc(100vh - 8rem);
          display: flex;
          flex-direction: column;
          background: #fffdf9;
          border: 1px solid #f0e0c8;
          border-radius: 4px;
          box-shadow: 0 20px 60px rgba(140,100,30,0.18), 0 4px 16px rgba(0,0,0,0.08);
          transform-origin: bottom left;
          transform: scale(0.85) translateY(20px);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease;
          overflow: hidden;
        }
        .furaha-chat-window.is-open {
          transform: scale(1) translateY(0);
          opacity: 1;
          pointer-events: all;
        }

        /* ── HEADER ── */
        .furaha-chat-header {
          background: linear-gradient(135deg, #1a120a 0%, #2d1f0e 100%);
          padding: 1rem 1.2rem 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .furaha-chat-header::before {
          content: '';
          position: absolute;
          top: -20px; right: -20px;
          width: 100px; height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%);
        }
        .furaha-chat-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: #1a120a;
          font-weight: 600;
          position: relative;
        }
        .furaha-chat-avatar::after {
          content: '';
          position: absolute;
          bottom: 1px; right: 1px;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #4ade80;
          border: 2px solid #2d1f0e;
        }
        .furaha-chat-header-info { flex: 1; }
        .furaha-chat-header-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 600;
          color: #e8c97a;
          letter-spacing: 0.04em;
          margin: 0;
          line-height: 1.2;
        }
        .furaha-chat-header-status {
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          color: rgba(232,201,122,0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 0;
        }
        .furaha-chat-close {
          background: transparent;
          border: none;
          color: rgba(232,201,122,0.6);
          cursor: pointer;
          font-size: 1.1rem;
          line-height: 1;
          padding: 0.2rem;
          transition: color 0.2s;
          flex-shrink: 0;
        }
        .furaha-chat-close:hover { color: #e8c97a; }

        /* ── MESSAGES ── */
        .furaha-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          scroll-behavior: smooth;
        }
        .furaha-chat-messages::-webkit-scrollbar { width: 4px; }
        .furaha-chat-messages::-webkit-scrollbar-track { background: transparent; }
        .furaha-chat-messages::-webkit-scrollbar-thumb { background: #f0e0c8; border-radius: 2px; }

        .furaha-msg {
          display: flex;
          flex-direction: column;
          max-width: 82%;
          animation: msg-in 0.3s ease;
        }
        @keyframes msg-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .furaha-msg.user { align-self: flex-end; align-items: flex-end; }
        .furaha-msg.assistant { align-self: flex-start; align-items: flex-start; }

        .furaha-msg-bubble {
          padding: 0.65rem 0.9rem;
          border-radius: 2px;
          font-family: 'Jost', sans-serif;
          font-size: 0.83rem;
          font-weight: 400;
          line-height: 1.65;
        }
        .furaha-msg.user .furaha-msg-bubble {
          background: linear-gradient(135deg, #c9a84c, #b8940a);
          color: #fff;
          border-bottom-right-radius: 0;
        }
        .furaha-msg.assistant .furaha-msg-bubble {
          background: #fff;
          border: 1px solid #f0e0c8;
          color: #5c4a2a;
          border-bottom-left-radius: 0;
        }
        .furaha-msg-time {
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem;
          color: #c9b08a;
          margin-top: 0.25rem;
          letter-spacing: 0.05em;
        }

        /* ── TYPING INDICATOR ── */
        .furaha-typing {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 0.65rem 0.9rem;
          background: #fff;
          border: 1px solid #f0e0c8;
          border-radius: 2px;
          border-bottom-left-radius: 0;
          width: fit-content;
        }
        .furaha-typing span {
          width: 6px; height: 6px;
          background: #c9a84c;
          border-radius: 50%;
          animation: typing-dot 1.2s ease infinite;
        }
        .furaha-typing span:nth-child(2) { animation-delay: 0.2s; }
        .furaha-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing-dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        /* ── QUICK REPLIES ── */
        .furaha-quick-wrap {
          padding: 0 1rem 0.75rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          flex-shrink: 0;
        }
        .furaha-quick-btn {
          padding: 0.3rem 0.75rem;
          border: 1px solid #c9a84c;
          background: transparent;
          color: #8b6914;
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          cursor: pointer;
          border-radius: 20px;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .furaha-quick-btn:hover { background: #c9a84c; color: #fff; }

        /* ── INPUT ── */
        .furaha-chat-input-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-top: 1px solid #f0e0c8;
          background: #fffdf9;
          flex-shrink: 0;
        }
        .furaha-chat-input {
          flex: 1;
          border: 1px solid #f0e0c8;
          border-radius: 2px;
          padding: 0.5rem 0.75rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          color: #5c4a2a;
          background: #fff;
          outline: none;
          resize: none;
          height: 38px;
          transition: border-color 0.2s;
          line-height: 1.4;
        }
        .furaha-chat-input:focus { border-color: #c9a84c; }
        .furaha-chat-input::placeholder { color: #c9b08a; }
        .furaha-send-btn {
          width: 38px;
          height: 38px;
          border-radius: 2px;
          border: none;
          background: linear-gradient(135deg, #c9a84c, #b8940a);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .furaha-send-btn:hover:not(:disabled) { background: linear-gradient(135deg, #a8882e, #8b6914); transform: scale(1.05); }
        .furaha-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .furaha-send-btn svg { width: 16px; height: 16px; }

        /* ── BRANDING ── */
        .furaha-chat-brand {
          text-align: center;
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          color: #c9b08a;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.4rem 0 0.6rem;
          flex-shrink: 0;
        }
      `}</style>

      {/* TOGGLE BUTTON */}
      <button
        className={`furaha-chat-toggle ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        title={open ? 'Close Assistant' : 'Chat with Furaha Assistant'}
        aria-label="Open AI chat assistant"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            <circle cx="9" cy="10" r="0.5" fill="currentColor"/>
            <circle cx="12" cy="10" r="0.5" fill="currentColor"/>
            <circle cx="15" cy="10" r="0.5" fill="currentColor"/>
          </svg>
        )}
      </button>

      {/* CHAT WINDOW */}
      <div className={`furaha-chat-window ${open ? 'is-open' : ''}`} role="dialog" aria-label="Furaha Event Decorations AI Assistant">

        {/* Header */}
        <div className="furaha-chat-header">
          <div className="furaha-chat-avatar">F</div>
          <div className="furaha-chat-header-info">
            <p className="furaha-chat-header-name">Furaha Assistant</p>
            <p className="furaha-chat-header-status">Online · Event Planning Expert</p>
          </div>
          <button className="furaha-chat-close" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
        </div>

        {/* Messages */}
        <div className="furaha-chat-messages">
          {messages.map((msg, i) => (
            <div className={`furaha-msg ${msg.role}`} key={i}>
              <div className="furaha-msg-bubble">{msg.content}</div>
              <span className="furaha-msg-time">
                {new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {loading && (
            <div className="furaha-msg assistant">
              <div className="furaha-typing">
                <span/><span/><span/>
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* Quick Replies — only show at start */}
        {messages.length <= 1 && (
          <div className="furaha-quick-wrap">
            {quickReplies.map((q) => (
              <button
                key={q}
                className="furaha-quick-btn"
                onClick={() => { setInput(q); setTimeout(sendMessage, 50); }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="furaha-chat-input-row">
          <textarea
            className="furaha-chat-input"
            placeholder="Ask about our services..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
          />
          <button className="furaha-send-btn" onClick={sendMessage} disabled={loading || !input.trim()} aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

        <div className="furaha-chat-brand">Powered by Furaha  </div>
      </div>
    </>
  );
};

export default Chatbox;