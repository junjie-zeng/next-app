import { GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { getUserById, getUsers } from "../lib/data";
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

export async function getStaticPaths() {
  // 获取所有用户
  const data: any = await getUsers();
  // 生成所有路径
  const paths = data.map((row: Data) => {
    return {
      params: { id: row.id },
    };
  });
  console.log("getStaticPaths ...");
  return {
    paths,
    fallback: "blocking",
    // fallback: false,
    // fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const id = context.params?.id as string;
  // 获取数据
  const data = await getUserById(id);
  // 模拟服务器耗时
  if (id == "4") {
    await mockWait(3000);
  }

  console.log("ssg ....");

  return {
    props: {
      data,
    },
  };
};

const Ssg = ({ data }: { data: Data }) => {
  const router = useRouter();
  console.log("isFallback", router.isFallback ? "加载中..." : "准备渲染了 ...");

  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <h1>静态渲染 </h1>
      <pre> {JSON.stringify(data, null, 2)} </pre>
    </div>
  );
};

export default Ssg;
