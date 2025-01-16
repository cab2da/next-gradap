"use client"

import { UserContext } from "@/context/UserContext";
import { IUserInfo } from "@/types";
import { useState } from "react";

export default function MegaLayout({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<IUserInfo | null>(null);
  
  return (
   
      <div className="border-none">

        <UserContext.Provider value={{user, setUser}}> 
          {children}
        </UserContext.Provider>
        
      </div>
   
  );
}

