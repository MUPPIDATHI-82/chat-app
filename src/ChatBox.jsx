import React, { useEffect, useState } from 'react';
import './ChatBox.css';
import { db, auth } from './firebase'; // your firebase config file
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Query messages collection, ordered by timestamp ascending
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));

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
    if (input.trim() === '') return;

    try {
      // Add message to Firestore with current user and timestamp
      await addDoc(collection(db, 'messages'), {
        text: input,
        sender: auth.currentUser ? auth.currentUser.email : 'Anonymous',
        createdAt: serverTimestamp(),
      });
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-messages">
        {messages.map((msg) => (
          <div key={msg.id} className="chat-message">
            <strong>{msg.sender}: </strong> {msg.text}
          </div>
        ))}
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
