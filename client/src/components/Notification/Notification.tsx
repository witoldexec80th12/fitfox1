import React from "react";
import "./notification.scss";
import { close } from "../../assets/images";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div className="notification">
      {message}
      <button className="close-btn" onClick={onClose}>
        <img src={close} />
      </button>
    </div>
  );
};

export default Notification;
