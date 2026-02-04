import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

// Use environment variable, fallback to Render URL if not set
const API_BASE_URL = "https://foodieai-backend.onrender.com";

// Debug: Log the API URL (remove this after testing)
console.log("🔍 API_BASE_URL:", API_BASE_URL);
console.log("🔍 VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("🔍 Environment:", import.meta.env.MODE);

export default function CustomerChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const chatBoxRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, typing]);

  async function sendFeedback(dishName, liked) {
    try {
      await axios.post(`${API_BASE_URL}/api/feedback`, { name: dishName, liked });
    } catch (err) {
      console.error("Feedback failed", err);
    }
  }

  async function send() {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setTyping(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/chat/query`, { message: input });
      const dishes =
        res.data.answer?.slice(0, 3) ||
        res.data.reply?.slice(0, 3) ||
        [];


      // Store AI response with dishes
      setMessages((prev) => [...prev, { sender: "ai", dishes }]);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Oops 😕 Couldn't fetch suggestions. Try again." },
      ]);
    }

    setTyping(false);
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🍽️ FoodieAI</h2>
        <p style={styles.subtitle}>Your personal menu buddy</p>
      </div>

      <div style={styles.chatBox} ref={chatBoxRef}>

        {messages.map((msg, i) => (
          <div key={i}>

            {/* USER MESSAGE */}
            {msg.sender === "user" && (
              <div style={styles.userMessageWrapper}>
                <div style={styles.userBubble}>
                  {msg.text}
                </div>
              </div>
            )}

            {/* AI TEXT REPLY */}
            {msg.sender === "ai" && msg.text && (
              <div style={styles.aiMessageWrapper}>
                <div style={styles.aiBubble}>
                  {msg.text}
                </div>
              </div>
            )}

            {/* AI DISH RECOMMENDATIONS - CONVERSATIONAL FORMAT */}
            {msg.sender === "ai" && msg.dishes && msg.dishes.length > 0 && (
              <div style={styles.aiMessageWrapper}>
                <div style={styles.aiBubble}>
                  <div style={styles.aiIntro}>
                    Great choice! Here are my top {msg.dishes.length} recommendations for you:
                  </div>

                  {msg.dishes.map((dish, idx) => (
                    <div key={idx} style={styles.dishItem}>
                      {/* Dish Photo */}
                      {dish.photoUrl ? (
                        <img
                          src={
                            dish.photoUrl.startsWith("/")
                              ? `${API_BASE_URL}${dish.photoUrl}`
                              : dish.photoUrl
                          }
                          alt={dish.name}
                          style={styles.dishPhoto}
                        />
                      ) : (
                        <div style={styles.photoPlaceholder}>
                          🍽️
                        </div>
                      )}

                      {/* Dish Details */}
                      <div style={styles.dishDetails}>
                        <div style={styles.dishHeader}>
                          <span style={styles.dishNumber}>{idx + 1}.</span>
                          <span style={styles.dishName}>{dish.name}</span>
                          <span style={styles.dishPrice}>₹{dish.price}</span>
                        </div>

                        {dish.description && (
                          <div style={styles.dishDescription}>
                            {dish.description}
                          </div>
                        )}

                        {/* Feedback Buttons */}
                        <div style={styles.feedbackButtons}>
                          <button
                            onClick={() => sendFeedback(dish.name, true)}
                            style={styles.likeBtn}
                          >
                            👍 Like
                          </button>
                          <button
                            onClick={() => sendFeedback(dish.name, false)}
                            style={styles.dislikeBtn}
                          >
                            👎 Not for me
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ))}

        {typing && (
          <div style={styles.aiMessageWrapper}>
            <div style={{ ...styles.aiBubble, ...styles.typingBubble }}>
              <span style={styles.typingDot}></span>
              <span style={styles.typingDot}></span>
              <span style={styles.typingDot}></span>
            </div>
          </div>
        )}
      </div>

      <div style={styles.inputWrapper}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && send()}
          placeholder='Try: "something spicy under ₹150"'
          style={styles.input}
        />
        <button onClick={send} style={styles.sendBtn}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box"
  },

  header: {
    textAlign: "center",
    marginBottom: 16,
    padding: "20px",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    flexShrink: 0
  },

  title: {
    margin: 0,
    fontSize: "2rem",
    color: "#2d3748",
    fontWeight: 700
  },

  subtitle: {
    margin: "8px 0 0 0",
    fontSize: "1rem",
    color: "#718096",
    fontWeight: 400
  },

  chatBox: {
    flex: 1,
    background: "#ffffff",
    borderRadius: 16,
    padding: 20,
    overflowY: "auto",
    overflowX: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: 16,
    minHeight: 0,
    scrollBehavior: "smooth"
  },

  userMessageWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 16
  },

  userBubble: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    padding: "12px 16px",
    borderRadius: 18,
    maxWidth: "70%",
    fontSize: "0.95rem",
    lineHeight: 1.5,
    boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
    wordWrap: "break-word"
  },

  aiMessageWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: 16
  },

  aiBubble: {
    background: "#f7fafc",
    color: "#2d3748",
    padding: "16px",
    borderRadius: 18,
    maxWidth: "85%",
    fontSize: "0.95rem",
    lineHeight: 1.6,
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
  },

  aiIntro: {
    marginBottom: 16,
    fontSize: "1rem",
    fontWeight: 500,
    color: "#4a5568"
  },

  dishItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    gap: 12,
    alignItems: "flex-start"
  },

  dishPhoto: {
    width: 80,
    height: 80,
    borderRadius: 12,
    objectFit: "cover",
    flexShrink: 0,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },

  photoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    background: "linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    flexShrink: 0,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },

  dishDetails: {
    flex: 1,
    minWidth: 0
  },

  dishHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    marginBottom: 6,
    flexWrap: "wrap"
  },

  dishNumber: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#667eea"
  },

  dishName: {
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "#2d3748",
    flex: 1,
    minWidth: 0
  },

  dishPrice: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#48bb78",
    flexShrink: 0
  },

  dishDescription: {
    fontSize: "0.9rem",
    color: "#718096",
    marginBottom: 10,
    lineHeight: 1.5
  },

  feedbackButtons: {
    display: "flex",
    gap: 8,
    marginTop: 8,
    flexWrap: "wrap"
  },

  likeBtn: {
    padding: "6px 14px",
    background: "#f0fff4",
    color: "#38a169",
    border: "1px solid #9ae6b4",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 500,
    transition: "all 0.2s",
    boxShadow: "none"
  },

  dislikeBtn: {
    padding: "6px 14px",
    background: "#fff5f5",
    color: "#e53e3e",
    border: "1px solid #fc8181",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 500,
    transition: "all 0.2s",
    boxShadow: "none"
  },

  typingBubble: {
    display: "flex",
    gap: 6,
    padding: "12px 20px",
    alignItems: "center"
  },

  typingDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#cbd5e0",
    animation: "typing 1.4s infinite",
    display: "inline-block"
  },

  inputWrapper: {
    display: "flex",
    gap: 10,
    background: "#ffffff",
    padding: 16,
    borderRadius: 16,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    flexShrink: 0
  },

  input: {
    flex: 1,
    padding: "14px 18px",
    borderRadius: 12,
    border: "2px solid #e2e8f0",
    fontSize: "0.95rem",
    background: "#f7fafc",
    color: "#2d3748",
    outline: "none",
    transition: "all 0.2s",
    fontFamily: "inherit"
  },

  sendBtn: {
    padding: "14px 28px",
    borderRadius: 12,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    cursor: "pointer",
    border: "none",
    fontWeight: 600,
    fontSize: "0.95rem",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
    flexShrink: 0
  },
};
