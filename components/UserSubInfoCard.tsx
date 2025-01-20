"use client"

import { UserSubContext } from '@/context/UserSubContext';
// import { IUserInfo } from '@/types';
import React, { useEffect, useState, useContext } from 'react';
import UserData from '@/components/UserData'; 

function UserInfoCard() {
  // const [user, setUser] = useState<IUserInfo | null>(null);

  

  const contextUserSub = useContext(UserSubContext);
  if (!contextUserSub) {
     throw new Error('userInfo must be used within a SelectedLawdCodeContext.Provider');
  }
  const { userSub, setUserSub } = contextUserSub;
  
  useEffect(() => {
    if (userSub?.userID === '')
    {
      const { user, error } = UserData(); 
      setUserSub(user);
    }
  }, [userSub]);

  
  return (
    <div className="flex flex-col">
        <span className=" text-sm text-[#6c757d] font-bold">{userSub?.userName}</span>
        <span className=" text-sm text-[#495057]">{userSub?.userDepart} - {userSub?.userLevel}</span>
    </div>
  );
}

export default UserInfoCard;
