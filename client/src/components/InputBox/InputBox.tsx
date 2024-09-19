import React, { useState } from "react";
import "./inputBox.scss";

interface InputBoxProps {
  onClickMic: () => void;
  onSendMessage: (message: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSendMessage, onClickMic }) => {
  const [message, setMessage] = useState("");

  const handleSendClick = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="input-container">
      <div className="input-box">
        <input
          type="text"
          placeholder="Ask your question here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="icons">
          <button className="upload-icon">
            <svg
              width="16"
              height="25"
              viewBox="0 0 16 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.8125 25C3.50418 25 0 21.4958 0 17.1875V6.25C0 5.67398 0.466728 5.2084 1.0416 5.2084C1.61667 5.2084 2.0834 5.67398 2.0834 6.25V17.1875C2.0834 20.3459 4.65317 22.9166 7.8125 22.9166C10.9718 22.9166 13.5416 20.3459 13.5416 17.1875V5.7291C13.5416 3.71876 11.9062 2.0834 9.8959 2.0834C7.88536 2.0834 6.25 3.71876 6.25 5.7291V16.1459C6.25 17.0073 6.95095 17.7084 7.8125 17.7084C8.67405 17.7084 9.375 17.0073 9.375 16.1459V6.25C9.375 5.67398 9.84173 5.2084 10.4166 5.2084C10.9917 5.2084 11.4584 5.67398 11.4584 6.25V16.1459C11.4584 18.1562 9.82285 19.7916 7.8125 19.7916C5.80215 19.7916 4.1666 18.1562 4.1666 16.1459V5.7291C4.1666 2.57092 6.73637 0 9.8959 0C13.0552 0 15.625 2.57092 15.625 5.7291V17.1875C15.625 21.4958 12.1208 25 7.8125 25Z"
                fill="#AAAAAA"
              />
            </svg>
          </button>
          <button className="send-icon" onClick={handleSendClick}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.8696 9.99853C19.8696 10.7074 19.4123 11.3385 18.617 11.7366L2.67291 19.7087C2.2845 19.9029 1.90581 20 1.55624 20C1.05034 20 0.604644 19.7864 0.322078 19.4087C0.0802951 19.0775 -0.152749 18.5046 0.128846 17.5725L1.92523 11.5813C1.98349 11.4065 2.02233 11.1939 2.04175 10.9695H11.8781C12.4122 10.9695 12.8492 10.5326 12.8492 9.99853C12.8492 9.46447 12.4122 9.02751 11.8781 9.02751H2.04175C2.02136 8.80418 1.98252 8.59055 1.92523 8.41577L0.128846 2.4246C-0.152749 1.49242 0.080295 0.919521 0.323049 0.589375C0.798847 -0.0514957 1.70189 -0.197148 2.67291 0.28836L18.618 8.26041C19.4132 8.65853 19.8696 9.28969 19.8696 9.99853Z"
                fill="#AAAAAA"
              />
            </svg>
          </button>
        </div>
      </div>
      <button className="mic-btn" onClick={onClickMic}>
        <svg
          width="18"
          height="25"
          viewBox="0 0 18 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.65386 17.3073C9.97615 17.3073 11.1077 16.8365 12.0492 15.8954C12.9905 14.9543 13.4612 13.8222 13.4612 12.5V4.80782C13.4612 3.48564 12.9909 2.35395 12.0492 1.41238C11.1077 0.471021 9.97615 0 8.65386 0C7.33173 0 6.19998 0.471021 5.25846 1.41238C4.3169 2.35379 3.84619 3.48564 3.84619 4.80782V12.5C3.84619 13.8221 4.31711 14.9543 5.25846 15.8954C6.19982 16.8365 7.33173 17.3073 8.65386 17.3073Z"
            fill="white"
          />
          <path
            d="M17.022 9.90076C16.8323 9.71043 16.6064 9.61523 16.346 9.61523C16.0858 9.61523 15.8605 9.71043 15.6699 9.90076C15.4798 10.091 15.3847 10.3164 15.3847 10.5767V12.4999C15.3847 14.3529 14.7259 15.9378 13.4088 17.2549C12.0921 18.5721 10.507 19.2306 8.65387 19.2306C6.80084 19.2306 5.21586 18.5721 3.89867 17.2549C2.58164 15.9382 1.92318 14.353 1.92318 12.4999V10.5767C1.92318 10.3164 1.82799 10.091 1.63776 9.90076C1.44743 9.71043 1.22231 9.61523 0.961723 9.61523C0.701138 9.61523 0.475757 9.71043 0.285528 9.90076C0.095141 10.091 0 10.3164 0 10.5767V12.4999C0 14.7134 0.738815 16.6391 2.21602 18.2765C3.69329 19.914 5.5187 20.853 7.69231 21.0932V23.0766H3.84621C3.58578 23.0766 3.36045 23.1719 3.17017 23.3622C2.97984 23.5524 2.88464 23.7778 2.88464 24.0382C2.88464 24.2982 2.97984 24.5241 3.17017 24.7143C3.36045 24.9044 3.58578 24.9999 3.84621 24.9999H13.4613C13.7216 24.9999 13.9473 24.9045 14.1373 24.7143C14.3279 24.5241 14.4231 24.2983 14.4231 24.0382C14.4231 23.7779 14.3279 23.5524 14.1373 23.3622C13.9473 23.1719 13.7217 23.0766 13.4613 23.0766H9.61565V21.0932C11.7889 20.853 13.6141 19.914 15.0916 18.2765C16.569 16.6391 17.308 14.7134 17.308 12.4999V10.5767C17.308 10.3164 17.2126 10.0913 17.022 9.90076Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default InputBox;