import { FC } from "react";

import UserCard from "../../components/UserCard/UserCard";
import PrivateDen from "../../components/PrivateDen/PrivateDen";

import "./profile.scss";
import ListLayout from "../../components/ListLayout/ListLayout";
import { pointHistories, userInfos } from "../../data/dumyTasks";
import ListItem from "../../components/ListItem/ListItem";
import { CopyIcon, PointsIcon, StarIcon } from "../../utils/Icons";
import { ListStyle } from "../../data/types";

const listItemStyle: ListStyle = {
  listStyle: {
    padding: "10px 20px 10px 17px",
  },
  iconStyle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(180deg, #FFFFFF 0%, #CFF6FF 100%)",
    marginRight: "15px",
  },
  btnStyle: {
    cursor: "pointer",
  },
};

const historyItemStyle: ListStyle = {
  listStyle: {
    width: "100%",
    padding: "15px 20px",
    borderRadius: "15px",
  },
  iconStyle: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(180deg, #FFFFFF 0%, #CFF6FF 100%)",
    marginRight: "15px",
  },
  titleStyle: {
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "20.16px",
    marginBottom: "6px",
  },
  textStyle: {
    fontFamily: "inherit",
    color: "#9F9F9F",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "16px",
  },
  btnStyle: {
    display: "flex",
    alignItems: "center",
    padding: "6px 7px",
    border: "1px solid #FFD7BC",
    borderRadius: "15px",
    background: "linear-gradient(180deg, #FFF7F2 0%, #FFD6BA 100%)",
  },
  btnPointStyle: {
    color: "black",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "16px"
  }
};

const ProfilePage: FC = () => {
  return (
    <div className="fitfox-profile">
      <h2>Profile</h2>

      <UserCard />

      <PrivateDen />

      <div className="user-info">
        <ListLayout>
          {userInfos.map((userInfo, index) => (
            <ListItem
              icon={userInfo.icon}
              title={userInfo.title}
              btnIcon={CopyIcon}
              style={listItemStyle}
              key={index}
            />
          ))}
        </ListLayout>
      </div>

      <div className="points-history">
        <h2>Points History</h2>
        <ListLayout>
          {pointHistories.map((pointHistory, index) => (
            <ListItem
              icon={PointsIcon}
              title={pointHistory.title}
              content={pointHistory.date}
              btnIcon={StarIcon}
              btnPoint={pointHistory.point}
              style={historyItemStyle}
              key={index}
            />
          ))}
        </ListLayout>
      </div>
    </div>
  );
};

export default ProfilePage;
