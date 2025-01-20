"use client";

import { UserSubContext } from '@/context/UserSubContext'
import { useContext } from 'react';

const UserDetailPage = () => {
  const contextUser = useContext(UserSubContext);
  if (!contextUser) {
     throw new Error('userInfo must be used within a SelectedLawdCodeContext.Provider');
  }
  const { userSub, setUserSub } = contextUser;

  return (
    <div>
      <h1>유저 상세보기</h1>
      <p>유저 ID: </p>
    </div>
  );
};

export default UserDetailPage;
