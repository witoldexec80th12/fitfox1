import React from "react";

import "./boxItem.scss";

interface TaskBoxItemProps {
	icon?: React.ReactNode;
	photo?: string;
	title: string;
	content?: string;
	point: number;
	onClick?: () => void;
}

const TaskBoxItem: React.FC<TaskBoxItemProps> = (props) => {
	const { icon, photo, title, point, onClick } = props;

	return (
		<div className="fitfox-box">
			<div className="photo">
				{
					photo ? <img src={photo} alt="meal photo" /> : icon
				}
			</div>
			<button className="task-btn" onClick={onClick}>
				{
					!title.toLocaleLowerCase().includes("walking") &&
					<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M13.2255 10.3493C13.2255 12.1279 11.7786 13.5748 10 13.5748C8.22137 13.5748 6.77503 12.1279 6.77503 10.3493C6.77503 8.5707 8.22137 7.1238 10 7.1238C11.7786 7.1238 13.2255 8.57125 13.2255 10.3493ZM20 5.76924V14.9305C20 16.1518 19.0098 17.142 17.7885 17.142H2.21153C0.990214 17.142 0 16.1518 0 14.9305V5.76924C0 4.54792 0.990214 3.5577 2.21153 3.5577H4.93172V2.79251C4.93172 1.72379 5.79753 0.857422 6.86681 0.857422H13.1332C14.2025 0.857422 15.0683 1.72379 15.0683 2.79251V3.55715H17.7885C19.0098 3.5577 20 4.54792 20 5.76924ZM14.8842 10.3493C14.8842 7.65623 12.6931 5.46515 10 5.46515C7.30746 5.46515 5.11638 7.65623 5.11638 10.3493C5.11638 13.0424 7.30746 15.2335 10 15.2335C12.6931 15.2335 14.8842 13.0424 14.8842 10.3493Z" fill="white" />
					</svg>
				}
				{title}
			</button>
			<p>{point}</p>
		</div>
	)
}

export default TaskBoxItem;
