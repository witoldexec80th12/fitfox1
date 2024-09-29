import React from "react";
import './countDown.scss';

const CountDown: React.FC = () => {

    return (
        <div className="fitfox-count">
            <h6 className="count-title">Countdown to a new day</h6>
            <div className="count-remain">
                <div className="count-time">
                    20
                    <span className="time-indicator">hours</span>
                </div>
                <div>:</div>
                <div className="count-time">
                    10
                    <span className="time-indicator">minutes</span>
                </div>
                <div>:</div>
                <div className="count-time">
                <span className="time-indicator">seconds</span>
                    00
                </div>
            </div>
        </div>
    )
}

export default CountDown;