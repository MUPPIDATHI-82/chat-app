import React, { useEffect, useState } from "react";
import "./ChatBox.css";
import { db, auth } from "./firebase"; // your firebase config file
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Query messages collection, ordered by timestamp ascending
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

    // Subscribe to realtime updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (input.trim() === "") return;

    try {
      // Add message to Firestore with current user and timestamp
      await addDoc(collection(db, "messages"), {
        text: input,
        sender: auth.currentUser ? auth.currentUser.email : "Anonymous",
        createdAt: serverTimestamp(),
      });
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-messages">
        {[...messages].reverse().map((msg, idx) => {
          const time = msg.createdAt
            ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";

          // Extract username before '@'
          const username = msg.sender ? msg.sender.split("@")[0] : "Anonymous";

          return (
            <div key={idx} className="chat-message">
              <div className="message-text">{msg.text}</div>
              <div className="message-info">
                <span className="message-sender">{username}</span>
                <span className="message-time">{time}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chatbox-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
