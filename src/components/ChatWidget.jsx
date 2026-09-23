import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Mail, Phone } from "lucide-react";
import { chatQuickReplies, chatWelcome } from "../constants/chatbot";
import { siteConfig } from "../constants/siteConfig";
import { getBotReply } from "../services/chatService";
import { classNames } from "../utils/classNames";
import "./ChatWidget.css";

const welcomeMessage = { id: "welcome", from: "bot", text: chatWelcome };

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isOpen, isSending]);

  const pushMessage = (message) => setMessages((prev) => [...prev, message]);

  const sendMessage = async (rawText, intentId) => {
    const text = rawText.trim();
    if (!text || isSending) return;

    pushMessage({ id: `u-${Date.now()}`, from: "user", text });
    setInput("");
    setIsSending(true);

    try {
      const { reply } = await getBotReply(text, messages, intentId);
      pushMessage({ id: `b-${Date.now()}`, from: "bot", text: reply });
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}`;

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-panel" role="dialog" aria-label="Chat with West Ventures">
          <div className="chat-panel-header">
            <div>
              <p className="chat-panel-title">West Ventures</p>
              <p className="chat-panel-subtitle">Usually replies within minutes</p>
            </div>
            <button
              type="button"
              className="chat-panel-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="chat-panel-messages" ref={listRef} aria-live="polite">
            {messages.map((message) => (
              <div
                key={message.id}
                className={classNames(
                  "chat-bubble",
                  message.from === "user" ? "chat-bubble--user" : "chat-bubble--bot"
                )}
              >
                {message.text}
              </div>
            ))}
            {isSending && (
              <div className="chat-bubble chat-bubble--bot chat-bubble--typing" aria-label="Typing">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>

          {!isSending && (
            <div className="chat-quick-replies">
              {chatQuickReplies.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className="chat-quick-reply"
                  onClick={() => sendMessage(item.label, item.id)}
                  disabled={isSending}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          <form className="chat-input-row" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type a message..."
              aria-label="Type a message"
            />
            <button type="submit" aria-label="Send message" disabled={isSending || !input.trim()}>
              <Send size={16} />
            </button>
          </form>

          <div className="chat-panel-footer">
            <a href={`mailto:${siteConfig.email}`} className="chat-footer-link">
              <Mail size={14} /> Email
            </a>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="chat-footer-link">
              <Phone size={14} /> WhatsApp
            </a>
            <a href="#contact" className="chat-footer-link" onClick={() => setIsOpen(false)}>
              Contact form
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        className={classNames("chat-toggle", isOpen && "is-open")}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
