import { FC } from "react";

import UserCard from "../../components/UserCard/UserCard";

import './profile.scss'

const ProfilePage:FC = () => {

    return (
        <div className="fitfox-profile">
            <h2>Profile</h2>

            <UserCard />
        </div>
    )
}

export default ProfilePage;