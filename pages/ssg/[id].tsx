import { GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

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

export async function getStaticPaths() {
  let paths = [{ params: { id: "1" } }, { params: { id: "2" } }];
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
  const id = context.params?.id;
  // 获取数据
  const data = await fetch(
    `https://next-app-brown-one.vercel.app/api/user/${id}`
  ).then((res) => res.json());
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

  const handlePush = (id: string) => {
    router.push(`/ssg/${id}`);
  };

  console.log("isFallback", router.isFallback ? "加载中..." : "准备渲染了 ...");

  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <h1>静态渲染 </h1>
      <pre> {JSON.stringify(data, null, 2)} </pre>
      <h3>下面是导航</h3>
      <button
        onClick={() => {
          handlePush("1");
        }}
      >
        用户1
      </button>
      <button
        onClick={() => {
          handlePush("2");
        }}
      >
        用户2
      </button>
      <button
        onClick={() => {
          handlePush("3");
        }}
      >
        用户3
      </button>
    </div>
  );
};

export default Ssg;
