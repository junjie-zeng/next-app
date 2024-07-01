import { getUsers } from "../lib/data";
import Item from "./components/Item";

export const revalidate = 0; // 禁用缓存

export default async function UserListPage() {
  const users = await getUsers();
  // console.log(users);

  return (
    <div>
      <h1>用户列表</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} --- {user.email} <Item user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}
