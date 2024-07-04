import { sql } from "@vercel/postgres"
// import { unstable_noStore as noStore } from "next/cache"

// 获取所有用户数据
export const getUsers = async () => {
  try {
    // noStore()
    const { rows } = await sql`SELECT * FROM users`
    return rows
  } catch (error) {
    console.log(error)
  }
}

export const getUserById = async (id: string) => {
  try {
    const { rows } = await sql`SELECT * FROM users WHERE id = ${id}`
    return rows
  } catch (error) {
    console.log(error)
  }
}
