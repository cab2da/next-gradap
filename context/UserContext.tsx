// "use client"

import { IUserInfo } from "@/types";
import { createContext } from "react";

// 컨텍스트 타입 정의
type UserContextType = {
    user: IUserInfo | null; 
    setUser: React.Dispatch<React.SetStateAction<IUserInfo | null>>;
  };
  // type UserContextType = {
  //   userName: string | null; 
  //   setUserName: React.Dispatch<React.SetStateAction<string | null>>;
  // };
  

const UserContext = createContext<UserContextType | null>(null);

export { UserContext };

// "use client"
// import { createContext, useState, useContext, ReactNode } from 'react';
// import { IUserInfo } from '@/types';

// type UserContextType = {
//   userInfo: IUserInfo | null;
//   setUserInfo: (userInfo: IUserInfo) => void;
// };

// const UserContext = createContext<UserContextType | null>(null);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

//   return (
//     <UserContext.Provider value={{ userInfo, setUserInfo }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // useUserContext 훅 정의
// export const useUserContext = (): UserContextType => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUserContext must be used within a UserProvider');
//   }
//   return context;
// };
