import Link from "next/link";
import { useRouter } from "next/router";



const AboutPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>About 页面：{id}</h1>
      <h3>获取到的动态路由参数：{id}</h3>
      <h3>下面是导航</h3>
      <Link href="/about/1">about 1</Link> <br />
      <Link href="/about/2">about 2</Link>
    </div>
  );
};

export default AboutPage;
