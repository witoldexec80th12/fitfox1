import React from "react";
import { useAppContext } from "../../context/useAppContext";

import "./userCard.scss";

const UserCard: React.FC = () => {
  const { avatar, fullName, email } = useAppContext();
  return (
    <div className="user-card">
      <div className="user-avatar-wrapper">
        <div className="user-avatar">
          <img src={avatar} alt={`${fullName}'s avatar`} />
        </div>
        <div className="edit-icon">
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.84941 2.03168L1.24811 8.63346C1.2149 8.66676 1.19092 8.70883 1.1795 8.75403L0.447807 11.6909C0.42592 11.7793 0.451899 11.8733 0.516418 11.9378C0.565235 11.9866 0.631753 12.0137 0.699793 12.0137C0.720633 12.0137 0.741949 12.0111 0.762694 12.0059L3.69955 11.2741C3.74532 11.2627 3.7869 11.2388 3.82012 11.2056L10.422 4.60425L7.84941 2.03168Z"
              fill="#00B0B0"
            />
            <path
              d="M12.0581 1.13144L11.3232 0.396608C10.8321 -0.0945173 9.97613 -0.0940415 9.48558 0.396608L8.58545 1.29673L11.1579 3.86922L12.0581 2.96909C12.3034 2.72386 12.4385 2.39746 12.4385 2.05031C12.4385 1.70317 12.3034 1.37676 12.0581 1.13144Z"
              fill="#FF9B57"
            />
          </svg>
        </div>
      </div>
      <div className="user-details">
        <p className="user-name">{fullName}</p>
        <p className="user-email">{email}</p>
      </div>
    </div>
  );
};

export default UserCard;
