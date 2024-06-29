import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../scripts/postgres";

// 获取用户id获取数据
export default async function getUserById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { rows } = await query(`SELECT * FROM users WHERE id = '${id}'`);
  res.status(200).json(rows);
}
