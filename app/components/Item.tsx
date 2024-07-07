"use client";

import React, { useState } from "react";

export default function Item({ user }: any) {
  const [data, setData] = useState(user);

  // 修改用户信息
  const handleClick = async (flag: boolean) => {
    const { id, name } = data;
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

    const user = await ret.json();
    setData(user[0]);
    console.log("用户更新 ...", user);
  };

  return (
    <div className="mt-2">
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => handleClick(true)}
      >
        改为大写
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
        onClick={() => handleClick(false)}
      >
        改为小写
      </button>
    </div>
  );
}
