import React from "react"
import { getUserById } from "../lib/data"

interface Props {
  id: string
}


export default async function User(props: Props) {
  const users:any = await getUserById(props.id)
  const user = users[0]
  // 模拟请求耗时
  if (user.name === "blue") {
    await new Promise((resolve) => setTimeout(resolve, 3000))
  }

  return (
    <div>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  )
}
