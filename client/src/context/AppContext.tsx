import React, { createContext, useState, ReactNode, useEffect } from "react";

import defaultAvatar from "../assets/images/defaultAvatar.png";
import { initCloudStorage, initInitData } from "@telegram-apps/sdk";
import { HealthTask } from "../data/types";
import { healthTasks } from "../data/dumyTasks";
import { getUser } from "../services/userService";

interface AppContextProps {
  userName: string;
  userID: string;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  fullName: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  isAvailableAccess: boolean;
  setisAvailableAccess: React.Dispatch<React.SetStateAction<boolean>>;
  uploadType: string; // breakfast, lunch, dinner, blood
  setUploadType: React.Dispatch<React.SetStateAction<string>>;
  userDailyTask: HealthTask[];
  setUserDailyTask: React.Dispatch<React.SetStateAction<HealthTask[]>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const cloudStorage = initCloudStorage();
  const initData = initInitData();

  // const [score, setScore] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [userID, setUserID] = useState<string>('');
  // const [userPic, setUserPic] = useState<string>('');
  // const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [isAvailableAccess, setisAvailableAccess] = useState<boolean>(false);
  const [uploadType, setUploadType] = useState<string>("blood");
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [fullName, setFullName] = useState<string>("Jones Duo");
  const [email, setEmail] = useState<string>("jones.duo@gmail.com");
  const [userDailyTask, setUserDailyTask] = useState<HealthTask[]>(healthTasks);

  useEffect(() => {
    const tgUser = initData?.user;

    if (tgUser) {
        setUserName(tgUser.username || tgUser.firstName);

        // getUserProfilePicture(tgUser.id || 1).then(photoUrl => {
        //     if (photoUrl) {
        //         console.log("User's profile picture URL:", photoUrl);
        //         setUserPic(photoUrl);
        //     } else {
        //         console.log("Failed to retrieve the profile picture.");
        //     }
        // });

        cloudStorage.get('userID')
            .then((userID) => {
                if (userID) {
                    setUserID(userID);
                } else {
                    cloudStorage.set('userID', tgUser.id.toString());
                    setUserID(tgUser.id.toString());
                }
            })
    } else {
        console.log('Failed to get user data.');
    }
  }, [initData?.user, cloudStorage]);

  useEffect(() => {
    const getUserInfo = async () => {
      const result = await getUser(userID);
      if (result.success) {
        if (result.data.userInfo.accessCode || result.data.userInfo.labData) {
          setisAvailableAccess(true);
        }
      }
    }

    getUserInfo();
  }, [userID])

  return (
    <AppContext.Provider
      value={{
        isAvailableAccess,
        setisAvailableAccess,
        uploadType,
        setUploadType,
        avatar,
        setAvatar,
        fullName,
        setFullName,
        email,
        setEmail,
        userName,
        userID,
        userDailyTask,
        setUserDailyTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
