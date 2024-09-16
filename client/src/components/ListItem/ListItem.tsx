import { FC } from "react";

import "./listItem.scss";

interface ListItemProps {
    icon?: string;
    title: string;
    content?: string;
    btnIcon?: string;
    btnPoint: number;
}

const ListItem: FC<ListItemProps> = (props) => {
    const {icon, title, content, btnIcon, btnPoint} = props;

    return (
        <div className="fitfox-list-item">
            <div className="list-content">
                {icon && <img src={icon} alt="item icon" />}
                <div>
                    <h5>{title}</h5>
                    {content && <p>{content}</p>}
                </div>
            </div>
            <div className="list-action">
                {btnIcon && <img src={btnIcon} />}
                <p>{btnPoint}</p>
            </div>
        </div>
    )
}

export default ListItem;