import { Suspense } from "react"
import Slow from "../components/Slow"
import UserList from "../components/UserList"

export const revalidate = 0 // 禁用缓存

export default async function HomePage() {
  console.log("服务端渲染 ...")
  return (
    <div className="p-5">
      <h1>用户列表</h1>
      <UserList />
      <h1 className="mt-5">模拟耗时组件</h1>
      <div>
        {/* <Suspense fallback={"Loading..."}> */}
        <Slow time={3000} text={"有点慢"} />
        {/* </Suspense> */}
        {/* <Suspense fallback={"Loading..."}> */}
        <Slow time={5000} text={"更慢"} />
        {/* </Suspense> */}
      </div>
    </div>
  )
}
