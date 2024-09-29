import React from "react";
import "./askPage.scss";

const AskPage: React.FC = () => {
  return (
    <div className="chat-page">
      <iframe
        src="https://app.twise.ai/cgm-try-1-w5kppv"
        width="100%"
        height="100%"
        style={{ border: "0" }}
        allow="microphone"
        title="Twise Widget"
      ></iframe>
    </div>
  );
};

export default AskPage;
