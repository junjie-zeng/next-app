import React from "react";
import Item from "./Item";
import { getUserById } from "../lib/data";

export const revalidate = 0; // 禁用缓存

interface Props {
  id: string;
}

export default async function User(props: Props) {
  const users: any = await getUserById(props.id);
  const user = users[0];
  console.log('user ...',user);
  

  return (
    <div className="bg-white p-4 rounded-md shadow-md mt-2">
      <Item user={user} />
    </div>
  );
}
