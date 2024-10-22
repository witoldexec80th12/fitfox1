import React, { createContext, useState, ReactNode, useEffect } from "react";

import defaultAvatar from "../assets/images/defaultAvatar.png";
import { initCloudStorage, initInitData } from "@telegram-apps/sdk";
import { HealthTask, UserData } from "../data/types";
import { healthTasks } from "../data/dumyTasks";
import { getUser } from "../services/userService";
import { getMealInfo } from "../services/dataService";

interface AppContextProps {
  userName: string;
  userID: string;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  fullName: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  point: number;
  setPoint: React.Dispatch<React.SetStateAction<number>>;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  isAvailableAccess: boolean;
  setisAvailableAccess: React.Dispatch<React.SetStateAction<boolean>>;
  uploadType: string; // breakfast, lunch, dinner, walk, blood
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

  const [userName, setUserName] = useState<string>('');
  const [userID, setUserID] = useState<string>('');
  // const [userPic, setUserPic] = useState<string>('');
  const [isAvailableAccess, setisAvailableAccess] = useState<boolean>(false);
  const [uploadType, setUploadType] = useState<string>("blood");
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [fullName, setFullName] = useState<string>("Jones Duo");
  const [email, setEmail] = useState<string>("");
  const [point, setPoint] = useState<number>(0);
  const [userData, setUserData] = useState<UserData>({
    tgGroupId: "",
    stepnId: "",
    stepnPassword: "",
    labData: ""
  })
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
      if (!userID) return;
      const result = await getUser(userID);
      if (result.success) {
        if (result.data.userInfo.accessCode || result.data.userInfo.labData) {
          setisAvailableAccess(true);
          setFullName(result.data.first_name);
          setEmail(result.data.email ? result.data.email : "");
          setPoint(result.data.point);
          setUserData({
            tgGroupId: result.data.userInfo.tgGroupId,
            stepnId: result.data.userInfo.stepnId,
            stepnPassword: result.data.userInfo.stepnPassword,
            labData: result.data.userInfo.labData,
          })
        }
      }
    }
    getUserInfo();
  }, [userID])

  useEffect(() => {
    const getInfo = async () => {
      if (!userID) return
      const result = await getMealInfo(userID);
      if (result.success) {
        console.log("result: ", result.data);
        setUserDailyTask((prevTask) => {
          return [
            {
              ...prevTask[0],
              photo: result.data.meals.breakfast ? result.data.meals.breakfast : ""
            },
            {
              ...prevTask[1],
              photo: result.data.meals.lunch ? result.data.meals.lunch : ""
            },
            {
              ...prevTask[2],
              photo: result.data.meals.dinner ? result.data.meals.dinner : ""
            },
            {
              ...prevTask[3],
              photo: result.data.meals.walking ? result.data.meals.walking : ""
            },
          ]
        })
      }
    }
    getInfo();
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
        point,
        setPoint,
        userName,
        userID,
        userData,
        setUserData,
        userDailyTask,
        setUserDailyTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
