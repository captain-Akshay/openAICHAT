import React, { useState } from 'react';
import axios from 'axios';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = async (text) => {
    const newMessage = { text, sender: 'user' };
    setMessages([...messages, newMessage]);
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci/completions',
      {
        prompt: `User: ${text}\nBot:`,
        temperature: 0.5,
        max_tokens: 60,
        n: 1,
        stop: '\n',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer API_KEY`,
        },
      }
    );
    const botResponse = response.data.choices[0].text.trim();
    const botMessage = { text: botResponse, sender: 'bot' };
    setMessages([...messages, botMessage]);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">Chat with AI</div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type a message..."
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleNewMessage(event.target.value);
              event.target.value = '';
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatBot;
