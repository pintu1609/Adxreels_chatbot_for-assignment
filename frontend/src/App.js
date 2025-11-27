// import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! Ask me anything." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // 🔥 Auto scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);


  async function sendMessage(e) {
    e && e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), sender: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res =  await fetch(`${process.env.REACT_APP_BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text })
      });
      const data = await res.json();
      const botMsg = { id: Date.now() + 1, sender: "bot", text: data.reply || "No reply" };
      setMessages((m) => [...m, botMsg]);
    } catch (err) {
      const errMsg = { id: Date.now()+2, sender: "bot", text: "Error: Could not reach server." };
      setMessages((m) => [...m, errMsg]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="chat-container">
      <h2>AI Chatbot — Short Assignment</h2>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <div className="bubble">{msg.text}</div>
          </div>
        ))}
        {loading && <div className="message bot"><div className="bubble">Thinking...</div></div>}
         <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
