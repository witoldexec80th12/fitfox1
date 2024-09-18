import React from "react";
import { advisor } from "../../assets/images";
import "./chatMessage.scss";

interface ChatMessageProps {
  message: string;
  isQuestion: boolean;
  time: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isQuestion,
  time,
}) => {
  return (
    <div className={`chat-message ${isQuestion ? "right" : "left"}`}>
      {!isQuestion && <div className="avatar">
        <img src={advisor} alt="advisor" />
        </div>}
      <div className={`message-content ${isQuestion ? "" : "answer"}`}>
        <p className="text-box">{message}</p>
        <span className="timestamp">{time}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
