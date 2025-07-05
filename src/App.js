import React, { useState } from "react";

const gradientBg = {
  minHeight: "100dvh",
  minWidth: "100vw",
  background: "linear-gradient(135deg,rgb(20, 156, 247) 0%,rgb(85, 39, 252) 100%)",
  padding: 0,
  margin: 0,
  overflow: "auto",
  boxSizing: "border-box"
};

function App() {
  // Reply Suggestion states
  const [receivedMsg, setReceivedMsg] = useState("");
  const [reply, setReply] = useState([]);
  const [replyLoading, setReplyLoading] = useState(false);
  const [replyMood, setReplyMood] = useState("flirty");
  const [replyPlatform, setReplyPlatform] = useState("Instagram");
  const [fromGender, setFromGender] = useState("boy");
  const [toGender, setToGender] = useState("girl");

  // Suggest Reply
  const handleReply = async () => {
    setReplyLoading(true);
    setReply([]);
    try {
      const res = await fetch("http://localhost:5000/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: receivedMsg,
          mood: replyMood,
          platform: replyPlatform,
          fromGender,
          toGender,
        }),
      });

      const data = await res.json();
      const suggestions = data.reply
        .split(/\d\.\s/)
        .map((r) => r.trim())
        .filter((r) => r.length > 0 && !/suggestion:/i.test(r));
      setReply(suggestions);
    } catch (err) {
      console.error("Error generating reply:", err);
      setReply(["Something went wrong!"]);
    } finally {
      setReplyLoading(false);
    }
  };

  return (
    <div style={gradientBg}>
      <div
        style={{
          fontFamily: "Poppins, Arial, sans-serif",
          width: "98vw",
          maxWidth: "420px",
          margin: "0 auto",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <div
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.17)",
            borderRadius: "20px",
            boxShadow: "0 6px 26px 0 rgba(31,38,135,0.19)",
            backdropFilter: "blur(9px)",
            border: "1px solid rgba(255,255,255,0.20)",
            padding: "26px 8px 22px 8px",
            marginTop: "18px",
            marginBottom: "20px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "19px" }}>
            <div
              style={{
                fontSize: "2.08rem",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: 2,
                textShadow: "0 2px 11px #333",
                lineHeight: "1.12"
              }}
            >
              DMGameChanger
            </div>
            <div style={{ fontSize: "1.01rem", color: "#f7f7f7", marginTop: 4 }}>
              Get <span style={{ color: "#ffd966", fontWeight: 600 }}>instant, smart DM replies</span> for any message!
            </div>
          </div>

          <div style={{ marginBottom: "15px", color: "#fff", fontWeight: 600, fontSize: "1.09rem" }}>
            📩 Reply Suggestion
          </div>

          <div style={{ marginBottom: 11 }}>
            <label style={{ color: "#f3f3f3", fontSize: "0.98rem" }}>Message Mood:</label>
            <select value={replyMood} onChange={(e) => setReplyMood(e.target.value)}
              style={selectInputStyle}>
              <option value="flirty">Flirty</option>
              <option value="funny">Funny</option>
              <option value="savage">Savage</option>
              <option value="emotional">Emotional</option>
            </select>
          </div>

          <div style={{ marginBottom: 11 }}>
            <label style={{ color: "#f3f3f3", fontSize: "0.98rem" }}>Platform:</label>
            <select value={replyPlatform} onChange={(e) => setReplyPlatform(e.target.value)}
              style={selectInputStyle}>
              <option value="Instagram">Instagram</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Bumble">Bumble</option>
            </select>
          </div>

          <div style={{ marginBottom: 11 }}>
            <label style={{ color: "#f3f3f3", fontSize: "0.98rem" }}>Your Gender:</label>
            <select value={fromGender} onChange={(e) => setFromGender(e.target.value)}
              style={selectInputStyle}>
              <option value="boy">Male</option>
              <option value="girl">Female</option>
            </select>
          </div>

          <div style={{ marginBottom: 11 }}>
            <label style={{ color: "#f3f3f3", fontSize: "0.98rem" }}>Sender's Gender (The person you are replying to):</label>
            <select value={toGender} onChange={(e) => setToGender(e.target.value)}
              style={selectInputStyle}>
              <option value="boy">Male</option>
              <option value="girl">Female</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Paste the message you received here..."
            value={receivedMsg}
            onChange={(e) => setReceivedMsg(e.target.value)}
            style={inputFieldStyle}
          />

          <button
            onClick={handleReply}
            disabled={replyLoading || !receivedMsg.trim()}
            style={{
              width: "100%",
              background: replyLoading ? "#c0c0c0" : "linear-gradient(90deg,#ffb347,#ffcc33)",
              color: "#313131",
              border: "none",
              borderRadius: "15px",
              fontWeight: 700,
              fontSize: "1.12rem",
              margin: "19px 0 0 0",
              padding: "12px 0",
              cursor: replyLoading ? "wait" : "pointer",
              boxShadow: "0 2px 6px 0 rgba(80,80,80,0.12)",
              transition: "background 0.14s"
            }}
          >
            {replyLoading ? "Generating reply..." : "Suggest Reply"}
          </button>

          {reply.length > 0 && (
            <div style={{
              background: "rgba(255,255,255,0.99)",
              color: "#232323",
              borderRadius: "14px",
              marginTop: "20px",
              padding: "14px 14px 7px 14px",
              boxShadow: "0 2px 10px 0 rgba(80,80,80,0.06)"
            }}>
              <strong style={{ color: "#e68a00", fontSize: "1.05rem" }}>🤖 Suggested Replies:</strong>
              <ol style={{ paddingLeft: "20px", marginTop: "10px", marginBottom: "2px", fontSize: "1.04rem" }}>
                {reply.map((r, idx) => (
                  <li key={idx} style={{ marginBottom: "6px" }}>{r}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
        <div style={{ color: "#e0e0e0", marginTop: "28px", fontSize: "0.84rem", textAlign: "center", letterSpacing: 1 }}>
          &copy; {new Date().getFullYear()} DMGameChanger by <span style={{ color: "#ffd966", fontWeight: 500 }}>Chief&GPT</span>
        </div>
      </div>
    </div>
  );
}

// Styles for select and input
const selectInputStyle = {
  width: "100%",
  padding: "8px 7px",
  borderRadius: "8px",
  border: "1.2px solid #c0c0c0",
  fontSize: "1.01rem",
  background: "#f7f7fa",
  marginTop: "4px"
};

const inputFieldStyle = {
  width: "100%",
  padding: "10px 7px",
  marginTop: "6px",
  borderRadius: "8px",
  border: "1.2px solid #c0c0c0",
  fontSize: "1.03rem",
  background: "#fafaff"
};

export default App;
