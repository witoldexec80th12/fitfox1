import React, { createContext, useState, ReactNode } from "react";

interface AppContextProps {
  isBloodExamExist: boolean;
  setIsBloodExamExist: React.Dispatch<React.SetStateAction<boolean>>;
  uploadType: string; // breakfast, lunch, dinner, blood
  setUploadType: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const cloudStorage = initCloudStorage();
  // const initData = initInitData();

  // const [score, setScore] = useState<number>(0);
  // const [userName, setUserName] = useState<string>('');
  // const [userID, setUserID] = useState<string>('');
  // const [userPic, setUserPic] = useState<string>('');
  // const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [isBloodExamExist, setIsBloodExamExist] = useState<boolean>(false);
  const [uploadType, setUploadType] = useState<string>("blood");

  // useEffect(() => {
  //   const tgUser = initData?.user;

  //   if (tgUser) {
  //       setUserName(tgUser.username || tgUser.firstName);

  //       getUserProfilePicture(tgUser.id || 1).then(photoUrl => {
  //           if (photoUrl) {
  //               console.log("User's profile picture URL:", photoUrl);
  //               setUserPic(photoUrl);
  //           } else {
  //               console.log("Failed to retrieve the profile picture.");
  //           }
  //       });

  //       cloudStorage.get('userID')
  //           .then((playerID) => {
  //               if (playerID) {
  //                   setUserID(playerID);
  //               } else {
  //                   cloudStorage.set('userID', tgUser.id.toString());
  //                   setUserID(tgUser.id.toString());
  //               }
  //           })
  //   } else {
  //       console.log('Failed to get user data.');
  //   }
  // });

  return (
    <AppContext.Provider
      value={{
        isBloodExamExist,
        setIsBloodExamExist,
        uploadType,
        setUploadType
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
