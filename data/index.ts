import { query } from "../scripts/postgres";

// 获取所有用户数据
export const getUsers = async () => {
  try {
    const { rows } = await query(`SELECT * FROM users`);
    return rows;
  } catch (error) {
    console.log("getUsers ...", error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const { rows } = await query(`SELECT * FROM users WHERE id = '${id}'`);
    return rows;
  } catch (error) {
    console.log("getUserById error:", error);
  }
};
