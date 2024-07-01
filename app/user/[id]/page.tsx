import { getUserById } from "../../lib/data";

export default async function UserPage({ params }: any) {
  const user = await getUserById(params.id);
  return (
    <div>
      <h1>用户详情：</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
