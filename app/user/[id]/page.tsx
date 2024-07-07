
import User from "../../components/User";


export const revalidate = 0; // 禁用缓存

export default async function UserPage({ params }: any) {
  return (
    <div className="p-5">
      <h1>动态渲染-(用户详情)：</h1>
      <User id={params.id} />
    </div>
  );
}
