
import { IUserInfo } from "@/types";
import { createContext } from "react";

// 컨텍스트 타입 정의
type UserContextType = {
    user: IUserInfo | null; 
    setUser: React.Dispatch<React.SetStateAction<IUserInfo | null>>;
  };
const UserContext = createContext<UserContextType | null>(null);

export { UserContext };
