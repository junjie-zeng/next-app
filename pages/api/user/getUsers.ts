import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../scripts/postgres";

// 获取所有用户数据
export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { rows } = await query(`SELECT * FROM users`);
  res.status(200).json(rows);
}
