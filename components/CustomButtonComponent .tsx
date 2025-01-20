"use client";

import React, { useContext } from "react";
import { Ellipsis } from "lucide-react";
import { UserSubContext } from "@/context/UserSubContext";
import { useRouter } from "next/navigation";

const CustomButtonComponent = (params: any) => {
  const { data } = params; // 현재 행(row)의 데이터
  const contextUserSub = useContext(UserSubContext);
  const router = useRouter();

  if (!contextUserSub) {
    throw new Error(
      "UserSubContext must be used within a SelectedLawdCodeContext.Provider"
    );
  }

  const { setUserSub } = contextUserSub;

  const handleClick = () => {
    // 현재 행의 데이터를 setUserSub에 저장
    const userInfo = {
      userID: data.user_id ?? "",
      userName: data.user_name ?? "",
      userDepart: data.user_depart ?? "",
      userLevel: data.user_position ?? "",
    };

    setUserSub(userInfo);

    // 원하는 링크로 이동
    router.push("/mega/Dashboard/reportDetail/Weekly");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center translate-y-3"
    >
      <Ellipsis size={16} />
    </button>
  );
};

export default CustomButtonComponent;
