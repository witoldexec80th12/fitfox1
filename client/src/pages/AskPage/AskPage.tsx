import React, { useState } from "react";

import ChatMessage from "../../components/ChatMessage/ChatMessage";
import InputBox from "../../components/InputBox/InputBox";
import Notification from "../../components/Notification/Notification";
import "./askPage.scss";

const AskPage: React.FC = () => {
  const [messages, setMessages] = useState<
    { content: string; isQuestion: boolean; time: string }[]
  >([]);
  const [notification, setNotification] = useState(
    "Ask us any question, as simple or as complex, and our team of expert nutritionists, and our proprietary technology will make sure you get an answer. The more questions you ask, the more points you will get."
  );

  const handleSendMessage = (message: string) => {
    const time = new Date().toLocaleTimeString();
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: message, isQuestion: true, time },
    ]);
    setTimeout(() => {
      fitFoxAnswer();
    }, 2000);
  };

  const fitFoxAnswer = () => {
    const time = new Date().toLocaleTimeString();
    const message = "This is the answer!";
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: message, isQuestion: false, time },
    ]);
  };

  const closeNotification = () => setNotification("");

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="header">
        <h1>Ask</h1>
      </div>

      {notification && (
        <Notification message={notification} onClose={closeNotification} />
      )}

      {/* Chat Content */}
      <div className="chat-container">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg.content}
            isQuestion={msg.isQuestion}
            time={msg.time}
          />
        ))}
      </div>

      {/* Input Box */}
      <InputBox onSendMessage={handleSendMessage} />
    </div>
  );
};

export default AskPage;
