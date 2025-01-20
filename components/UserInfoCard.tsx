"use client"

import { IUserInfo } from '@/types';
import React, { useEffect, useState } from 'react';

function UserInfoCard() {
  const [user, setUser] = useState<IUserInfo | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // 쿠키를 포함
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const data = await response.json();
        setUser(data.user); // 디코딩된 사용자 정보 저장
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  
  return (
    <div className="flex flex-col">
        <span className=" text-sm text-[#6c757d] font-bold">{user?.userName}</span>
        <span className=" text-sm text-[#495057]">{user?.userDepart} - {user?.userLevel}</span>
    </div>
  );
}

export default UserInfoCard;
