import { sql } from "@vercel/postgres";

export async function POST(req: any) {
  try {
    const { id, name, email } = await req.json();
    const ret = await sql`
          UPDATE users
          SET name = ${name}, email = ${email}
          WHERE id = ${id}
          RETURNING *;
        `;

    if (ret.rowCount === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(ret.rows), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
