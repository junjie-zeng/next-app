import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";

type Data = {
  id: string;
  name: string;
  city: string;
};

function mockWait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id;
  // const data = await fetch(`http://localhost:3000/api/user/${id}`).then((res) =>
  //   res.json()
  // );
  const ret = await fetch(
    `https://raw.githubusercontent.com/junjie-zeng/next-app/master/public/user.json`
  ).then((res) => res.json());
  const data = ret[id as string];

  // 模拟服务器耗时
  if (id == "4") {
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
  return (
    <div>
      <h1>动态渲染</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <h3>下面是导航</h3>
      <Link href="/">首页</Link> <br />
      <Link href="/ssr/1">/ssr/1</Link> <br />
      <Link href="/ssr/2">/ssr/2</Link>
    </div>
  );
};

export default SSRPage;
