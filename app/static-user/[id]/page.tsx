import { getUsers } from "../../lib/data";
import User from "../../components/User";

// 主要用于生成静态路径的参数
export async function generateStaticParams() {
  const users: any = await getUsers();
  return users.map((user: any) => ({
    id: user.id,
  }));
}

export default async function staticPage({ params }: any) {
  console.log("根据id去获取数据 ...");
  const id = params.id;
  return (
    <div className="p-5">
      <h1>静态渲染（用户详情）</h1>
      <User id={id} />
    </div>
  );
}
