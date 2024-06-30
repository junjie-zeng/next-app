import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Nav from "../../components/Nav";
import { getUserById } from "../../data";

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
  const id = context.params?.id as string;
  const data = await getUserById(id);
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
      <Nav />
      <h1>动态渲染</h1>
      <div className="bg-gray-200 p-4">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default SSRPage;
