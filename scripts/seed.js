const { db } = require("@vercel/postgres");

const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442b",
    name: "admin",
    email: "admin@nextmail.com",
    password: "admin",
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442c",
    name: "blue",
    email: "blue@nextmail.com",
    password: "888888",
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442d",
    name: "red",
    email: "red@nextmail.com",
    password: "666666",
  },
];

async function seedUsers(client) {
  try {
    // id扩展
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // 创建表
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${user.password})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await client.end();
}

main().catch((err) => {
  console.error("报错啦！！！", err);
});
