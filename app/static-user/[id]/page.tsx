import { getUserById, getUsers } from "../../lib/data"


// 主要用于生成静态路径的参数
export async function generateStaticParams() {
  const users: any = await getUsers()
  return users.map((user: any) => ({
    id: user.id,
  }))
}

export default async function staticPage({ params }: any) {
  const users = await getUserById(params.id)
  return (
    <div>
      <h1>用户详情：</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  )
}
