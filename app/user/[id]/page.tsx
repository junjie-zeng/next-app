
import User from "../../components/User";


export const revalidate = 0; // 禁用缓存

export default async function UserPage({ params }: any) {
  const id = params.id;
  return (
    <div className="p-5">
      <h1>动态渲染-(用户详情)：{id}</h1>
      <User id={id} />
    </div>
  );
}
