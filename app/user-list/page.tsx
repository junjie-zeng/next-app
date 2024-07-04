import { getUsers } from "../lib/data";
import Item from "./components/Item";

// export const revalidate = 0; // 禁用缓存

export default async function UserListPage() {
  const users: any = await getUsers();
  console.log('服务端渲染 ...');
  
  return (
    <div>
      <h1>用户列表</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {user.name} --- {user.email} <Item user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}
