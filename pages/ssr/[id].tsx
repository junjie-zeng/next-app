import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getUserById } from "../lib/data";
import { useState } from "react";

type Data = {
  id: string;
  name: string;
  email: string;
  password: string;
};

function mockWait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id as string;
  const data = await getUserById(id);
  // 模拟服务器耗时
  if (id == "410544b2-4001-4271-9855-fec4b6a6442c") {
    await mockWait(3000);
  }

  console.log("ssr getServerSideProps ...");

  return {
    props: {
      data,
    },
  };
};

const SSRPage = ({ data }: { data: Data }) => {
  // 存储状态
  const [userDetail, setUserDetail] = useState(data);
  // 修改用户信息
  const handleUpdateUser = async (name: string) => {
    const params = {
      id: "410544b2-4001-4271-9855-fec4b6a6442d",
      name: name,
      email: `${name}@nextmail.com`,
    };

    // 调用api修改用户信息
    const ret = await fetch("/api/user/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await ret.json();

    console.log("用户更新 ...", data);

    // 修改状态
    setUserDetail(data);
  };
  return (
    <div>
      <h1>动态渲染</h1>
      <div className="bg-pink-200 p-4">
        <pre>{JSON.stringify(userDetail, null, 2)}</pre>
      </div>
      <button onClick={() => handleUpdateUser("RED")}>
        修改用户red的信息为大写
      </button>
      &nbsp;
      <button onClick={() => handleUpdateUser("red")}>
        修改用户RED的信息为小写
      </button>
    </div>
  );
};

export default SSRPage;
