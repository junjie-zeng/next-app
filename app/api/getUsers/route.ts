import { NextApiRequest } from "next";
import { sql } from "@vercel/postgres";

export async function GET(request: NextApiRequest) {
  try {
    const { rows } = await sql`SELECT * FROM users`;
    return Response.json(rows);
  } catch (error) {
    console.log(error);
  }
}
