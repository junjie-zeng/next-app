import React from "react";
import Link from "next/link";

export default function Nav() {
  return (
    <div>
      <Link href="/">首页</Link>
      <Link href="/ssr/1">/ssr/1</Link>
      <Link href="/ssr/2">/ssr/2</Link>
      <Link href="/ssg/1">/ssg/2</Link>
      <Link href="/ssg/2">/ssg/2</Link>
    </div>
  );
}
