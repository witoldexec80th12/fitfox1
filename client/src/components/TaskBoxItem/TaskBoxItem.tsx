import { FC } from "react";

import "./boxItem.scss";

interface TaskBoxItemProps {
	icon: string;
	title: string;
	content?: string;
	point: number;
}

const TaskBoxItem: FC<TaskBoxItemProps> = (props) => {
	const {icon, title, point} = props;

	return (
		<div className="fitfox-box">
			<img src={icon} alt="box icon" />
            <h5>{title}</h5>
            <p>{point}</p>
		</div>
	)
}

export default TaskBoxItem;
