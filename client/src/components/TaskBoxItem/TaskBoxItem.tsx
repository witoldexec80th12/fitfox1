import { FC } from "react";

import "./boxItem.scss";

interface TaskBoxItemProps {
	icon: string;
	title: string;
	content?: string;
	point: number;
	onClick?: () => void;
}

const TaskBoxItem: FC<TaskBoxItemProps> = (props) => {
	const {icon, title, point, onClick} = props;

	return (
		<div className="fitfox-box" onClick={onClick}>
			<img src={icon} alt="box icon" />
            <h5>{title}</h5>
            <p>{point}</p>
		</div>
	)
}

export default TaskBoxItem;
