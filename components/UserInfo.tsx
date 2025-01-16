"use client"

import React, { useContext } from 'react';
// import { UserContext  } from '@/context/UserContext'

function UserInfo() {

  // const contextUser = useContext(UserContext);
  // if (!contextUser) {
  //   throw new Error('userInfo must be used within a SelectedLawdCodeContext.Provider');
  // }
  // const { user, setUser } = contextUser;

  return (
    <div className="flex flex-col p-4">
        {/* <span className=" text-sm text-[#6c757d] font-bold">{user?.userName}</span>
        <span className=" text-sm text-[#adb5bd]">{user?.userDepart} - {user?.userLevel}</span> */}
    </div>
  );
}

export default UserInfo;
