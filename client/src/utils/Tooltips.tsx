import React from "react";
import "./tooltip.scss";

export const BreakfastTooltip: React.FC = () => (
    <div className="fitfox-tooltip">
        Click on the Breakfast Icon to upload your Breakfast photos. Do this every morning. Each streak of 7 will be rewarded with double points.
    </div>
)

export const LunchTooltip: React.FC = () => (
    <div className="fitfox-tooltip">
        Click on the Lunch Icon to upload your Lunch photos. Do this every afternoon. Each streak of 7 will be rewarded with double points.
    </div>
)

export const DinnerTooltip: React.FC = () => (
    <div className="fitfox-tooltip">
        Click on the Dinner Icon to upload your Dinner photos. Do this every evening. Each streak of 7 will be rewarded with double points.
    </div>
)

export const WalkingTooltip: React.FC = () => (
    <div className="fitfox-tooltip">
        Go walking with our sponsored walking app and upload a screenshot of the result. Streaks of 20 gives you double points.
    </div>
)