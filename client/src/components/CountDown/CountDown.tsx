import React, { useState, useEffect } from "react";
import './countDown.scss';

const CountDown: React.FC = () => {
    // Helper function to calculate remaining time until midnight
    const calculateTimeLeft = () => {
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0); // Midnight of next day

        const timeDiff = midnight.getTime() - now.getTime(); // Difference in milliseconds

        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);

        return { hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        // Function to update the countdown every second
        const countdown = setInterval(() => {
            setTimeLeft(calculateTimeLeft()); // Recalculate time left each second
        }, 1000);

        return () => clearInterval(countdown); // Cleanup on component unmount
    }, []);

    return (
        <div className="fitfox-count">
            <h6 className="count-title">Countdown to a new day</h6>
            <div className="count-remain">
                <div className="count-time">
                    {timeLeft.hours}
                    <span className="time-indicator">hours</span>
                </div>
                <div>:</div>
                <div className="count-time">
                    {timeLeft.minutes}
                    <span className="time-indicator">minutes</span>
                </div>
                <div>:</div>
                <div className="count-time">
                    {timeLeft.seconds}
                    <span className="time-indicator">seconds</span>
                </div>
            </div>
        </div>
    );
}

export default CountDown;
