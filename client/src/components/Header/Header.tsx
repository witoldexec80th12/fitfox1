import React from "react";
import "./header.scss";
import { defaultAvatar } from "../../assets/images";

const Header: React.FC = () => {

    return (
        <div className="fitfox-header">
            <div className="header-profile">
                <div className="user-avatar">
                    <img src={defaultAvatar} alt="user avatar" />
                </div>
                <div className="user-welcome">
                    <h5>
                        Hello, Jones
                    </h5>
                    <p>
                        Welcome to FitFox
                    </p>
                </div>
            </div>
            <div className="user-point">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#FFB300" />
                    <path d="M11.9997 21.4287C17.2069 21.4287 21.4282 17.2074 21.4282 12.0001C21.4282 6.79285 17.2069 2.57153 11.9997 2.57153C6.79242 2.57153 2.57111 6.79285 2.57111 12.0001C2.57111 17.2074 6.79242 21.4287 11.9997 21.4287Z" fill="#FF8F00" />
                    <path d="M12.3607 6.57014L13.8643 9.6169L17.2266 10.1055C17.5565 10.1534 17.6882 10.5588 17.4495 10.7915L15.0166 13.1631L15.5909 16.5118C15.6472 16.8403 15.3024 17.0909 15.0073 16.9357L12 15.3547L8.99264 16.9357C8.69757 17.0909 8.3527 16.8403 8.40905 16.5118L8.98338 13.1631L6.55042 10.7915C6.31171 10.5589 6.44345 10.1534 6.77332 10.1055L10.1356 9.6169L11.6392 6.57014C11.7868 6.27122 12.2132 6.27122 12.3607 6.57014Z" fill="#ECEFF1" />
                </svg>
                <span>2000</span>
            </div>
        </div>
    )
};

export default Header;