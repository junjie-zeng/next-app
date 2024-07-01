import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

// 更新用户
export default async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id, name, email } = req.body;

    if (!id || !name || !email) {
      return res.status(400).json({ error: "名称、邮箱和密码是必填的" });
    }

    try {
      const ret = await sql`
        UPDATE users
        SET name = ${name}, email = ${email}
        WHERE id = ${id}
        RETURNING *;
      `;

      if (ret.rowCount === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(ret.rows);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
