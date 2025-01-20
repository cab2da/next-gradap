"use client"

import { IUserInfo } from '@/types';
import { useState, useEffect } from 'react';

const UserData = () => {
  const [user, setUser] = useState<IUserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
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
        setUser(data.user); // 유저 정보 저장
      } catch (error: any) {
        setError(error.message); // 에러 처리
      }
    };

    fetchUserData(); // 컴포넌트가 마운트되면 호출
  }, []); // 빈 배열을 사용하여 최초 한번만 실행

  return { user, error };
};

export default UserData;
