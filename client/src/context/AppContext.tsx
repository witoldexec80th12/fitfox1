import React, { createContext, useState, ReactNode, useEffect } from "react";

import defaultAvatar from "../assets/images/defaultAvatar.png";
import { initCloudStorage, initInitData } from "@telegram-apps/sdk";

interface AppContextProps {
  userName: string;
  userID: string;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  fullName: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  isBloodExamExist: boolean;
  setIsBloodExamExist: React.Dispatch<React.SetStateAction<boolean>>;
  uploadType: string; // breakfast, lunch, dinner, blood
  setUploadType: React.Dispatch<React.SetStateAction<string>>;
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
  const [isBloodExamExist, setIsBloodExamExist] = useState<boolean>(false);
  const [uploadType, setUploadType] = useState<string>("blood");
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [fullName, setFullName] = useState<string>("Jones Duo");
  const [email, setEmail] = useState<string>("jones.duo@gmail.com");

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

  return (
    <AppContext.Provider
      value={{
        isBloodExamExist,
        setIsBloodExamExist,
        uploadType,
        setUploadType,
        avatar,
        setAvatar,
        fullName,
        setFullName,
        email,
        setEmail,
        userName,
        userID
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
