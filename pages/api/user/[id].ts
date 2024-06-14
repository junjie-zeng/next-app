
import { NextApiRequest, NextApiResponse } from 'next';


interface User {
  name: string;
  age: number;
  city: string;
}

// 模拟数据库中的数据
const users: Record<string, User> = {
  "1": {
    name: "red",
    age: 30,
    city: "New York",
  },
  "2": {
    name: "green",
    age: 25,
    city: "Los Angeles",
  },
  "3": {
    name: "orange",
    age: 35,
    city: "Chicago",
  },
  "4": {
    name: "gray",
    age: 10,
    city: "Chang Sha",
  },
};

// 模拟数据库更新
setTimeout(() => {
  console.log("数据库更新了 ...");
  users["1"] = {
    name: "red 改变了 !!!!!!",
    age: 30,
    city: "New York !!!!!!!!",
  };
}, 10000);

// 获取用户数据
export default async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // 模拟从数据库中获取数据
  const user = users[id as string];

  // 模拟从第三方服务获取数据
  // const ret = await fetch(`https://raw.githubusercontent.com/junjie-zeng/next-app/master/public/user.json`).then((res) => res.json());
  // console.log('ret.....', ret);
  // const user = ret[id as string];

  res.status(200).json({ id, user });
}
