import { FC } from "react";

import "./listItem.scss";

interface ListItemProps {
  icon?: string | React.FC;
  title: string;
  content?: string;
  btnIcon?: React.FC;
  btnPoint?: number;
  style?: any;
  onClick?: () => void;
}

const ListItem: FC<ListItemProps> = (props) => {
  const { icon, title, content, btnIcon, btnPoint, style, onClick } = props;

  const renderIcon = () => {
    if (typeof icon === "string") {
      return <div className="list-icon" style={style?.iconStyle || {}}><img src={icon} alt="item icon" /></div>;
    } else if (typeof icon === "function") {
      const IconComponent = icon as FC; // Cast to functional component type
      return <div className="list-icon" style={style?.iconStyle || {}}><IconComponent /></div>;
    }
    return null; // If icon is not provided
  };

  const renderBtnIcon = () => {
    if (btnIcon) {
        const BtnIconComponent = btnIcon as FC;
        return <BtnIconComponent />;
    }
    return null;
  }

  return (
    <div className="fitfox-list-item" style={style?.listStyle || {}} onClick={onClick}>
      <div className="list-content">
        {renderIcon()}
        <div className="list-main">
          <h5 style={style.titleStyle}>{title}</h5>
          {content && <p style={style.textStyle}>{content}</p>}
        </div>
      </div>
      <div className="list-action" style={style?.btnStyle || {}}>
        {renderBtnIcon()}
        <p style={style.btnPointStyle}>{btnPoint ? `+${btnPoint}` : ''}</p>
      </div>
    </div>
  );
};

export default ListItem;
