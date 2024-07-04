import { Suspense } from "react"
import User from "../../components/User"
export default async function UserPage({ params }: any) {
  return (
    <div>
      <h1>用户详情：</h1>
      <Suspense fallback={<div>Loading ...</div>}>
        <User id={params.id} />
      </Suspense>
      {/* <User id={params.id} /> */}
      <div
        style={{ width: "100px", height: "100px", background: "gray" }}
      ></div>
    </div>
  )
}
