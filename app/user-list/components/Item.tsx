"use client";

import React from "react";
import Link from "next/link";

export default function Item({ user }: any) {
  const { id, name } = user;
  const handleClick = async (flag: boolean) => {
    const _name = flag ? name.toUpperCase() : name.toLowerCase();
    const params = {
      id,
      name: _name,
      email: `${_name}@nextmail.com`,
    };

    // 调用api修改用户信息
    const ret = await fetch("/api/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await ret.json();

    console.log("用户更新 ...", data);
  };

  return (
    <>
      <button onClick={() => handleClick(true)}>改为大写</button>
      <button onClick={() => handleClick(false)}>改为小写</button>
      <Link href={`/user/${id}`}>查看详情</Link>
    </>
  );
}
