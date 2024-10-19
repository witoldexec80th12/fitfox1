import { FC, useState } from "react";

import UserCard from "../../components/UserCard/UserCard";
import PrivateDen from "../../components/PrivateDen/PrivateDen";

import "./profile.scss";
import ListLayout from "../../components/ListLayout/ListLayout";
import { userInfos } from "../../data/dumyTasks";
import ListItem from "../../components/ListItem/ListItem";
import { ContactIcon, CopyIcon, KeyIcon } from "../../utils/Icons";
import { ListStyle } from "../../data/types";
import SignupModal from "../../components/Signup/Signup";

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

const listStyle: ListStyle = {
  listStyle: {
    width: "100%",
    padding: "15px 20px",
    borderRadius: "15px",
    cursor: "pointer"
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
  titleStyle: {
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "20.16px",
    marginBottom: "6px",
  },
}

const ProfilePage: FC = () => {
  const [showChangePwd, setShowChangePwd] = useState<boolean>(false);

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
        <h2>Account</h2>
        <ListLayout>
          {[<ListItem
            title="Change Password"
            icon={KeyIcon}
            style={listStyle}
            onClick={() => setShowChangePwd(true)}
          />]}
        </ListLayout>
      </div>

      <div className="points-history">
        <h2>Coming Soon</h2>
        <ListLayout>
          <ListItem
            title="FitFox Referral Program"
            icon={ContactIcon}
            style={listStyle}
          />
          <ListItem
            title="Health Privacy Airdrop"
            icon={ContactIcon}
            style={listStyle}
          />
          <ListItem
            title="AI Food Tracker"
            icon={ContactIcon}
            style={listStyle}
          />
        </ListLayout>
      </div>

      {showChangePwd && <SignupModal isChangePwd={true} onClose={() => setShowChangePwd(false)} />}
    </div>
  );
};

export default ProfilePage;
