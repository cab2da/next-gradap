
import { IUserInfo } from "@/types";
import { createContext } from "react";

// 컨텍스트 타입 정의
type UserSubContextType = {
    userSub: IUserInfo | null; 
    setUserSub: React.Dispatch<React.SetStateAction<IUserInfo | null>>;
  };
const UserSubContext = createContext<UserSubContextType | null>(null);

export { UserSubContext };
