import { getUsers } from "../lib/data";
import Link from "next/link";


export const revalidate = 0; // 禁用缓存

export default async function userList() {
  const users: any = await getUsers();
  return (
    <ul className="mt-2">
      {users.map((user: any) => (
        <li
          key={user.id}
          className="py-5 bg-white px-2 mb-1 rounded-md flex justify-between"
        >
          <div className="w-1/2">
            【{user.name}】【{user.email}】
          </div>
          <div>
            <Link className="ml-4 text-blue-500" href={`/user/${user.id}`}>
              查看详情
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
