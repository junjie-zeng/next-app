This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.





###  Next.js  



   
### 目录
1. 什么是 Next.js
2. Next.js 能做什么 
3. 创建第一个 Next.js 应用
4. 项目结构介绍 
5. 路由与导航
6. 数据获取（动态渲染 和 静态渲染）
7. API 路由

### 1. 什么是 Next.js？
    Next.js 是一个用于构建全栈 Web 应用程序的 React 框架。您可以使用 React Components 构建用户界面，并使用 Next.js 实现附加功能和优化。

### 2. next.js能做什么
  解决React(单页面应用)存在的一些问题

  ## 什么是单页面应用
    单页面应用（Single Page Application，SPA）是一种 Web 应用程序的架构模式，它使用动态加载页面内容的方式，实现在单个 HTML 页面中提供整个应用所需的交互体验。

    常见的单页面应用开发框架：React、Vue、Angular

  ## 单页面存在的一些问题
    1. 依赖js环境
    2. 首屏加载慢 
    3. 安全性
    4. 不利于seo

  ## 解决方案
    服务端渲染
  
  ## 客户端渲染与服务端渲染
  <img src="https://raw.githubusercontent.com/junjie-zeng/blogs/master/assets/images/next-ssr.png" />





### 3. 创建 Next.js 应用

使用官方命令创建新项目：

```bash
npx create-next-app@latest my-next-app
cd my-next-app
npm run dev
```

这样，我们就有了一个基础的 Next.js 应用，可以在 `http://localhost:3000` 上访问。

### 4. 项目结构介绍

创建的 Next.js 项目包含以下目录和文件：

```
my-next-app/
├── .next
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
├── pages/
│   ├── about/
│   │   └── index.tsx
│   ├── api/
│   │   └── user.ts
├── public/
├── next.config.js
├── package.json
```

- **.next**：构建输出的默认目录，包含了编译后的页面、静态资源以及构建相关的文件。
- **app/**：基于文件系统的路由，用于存放应用的页面和组件（Next.js 13引入的新特性）
- **pages/**：基于文件系统的路由，存放应用的页面和组件。
- **public/**：存放静态资源，如图片、字体等。
- **next.config.js**：Next.js 配置文件。
- **package.json**：项目依赖和脚本。

### 5. 路由与导航

    Next.js 使用文件系统路由。`pages` 目录中的每个文件和文件夹都对应一个路由。
    它简化了路由配置，并且能直观的体现这个url的结构。

#### 基本用法

    在 pages 目录中创建文件和文件夹来定义路由：

    文件系统路由，pages/index.tsx 对应 /，pages/about/index.tsx 对应 /about。



#### pages/index.tsx

```tsx
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>Hello Next.js!</h1>
    </div>
  );
};

export default HomePage;
```

#### pages/about/index.tsx

```tsx
import React from 'react';

const AboutPage = () => {
  return (
    <div>
      <h1>AboutPage</h1>
    </div>
  );
};

export default AboutPage;
```

#### 动态路由
app/user/[id].tsx

```tsx
import { useRouter } from 'next/router';

const User = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>User ID: {id}</h1>
    </div>
  );
};

export default User;
```
  访问 http://localhost:3000/user/123，显示 `User ID: 123`。

#### 导航
  ```tsx
    import Link from "next/link";


    <Link href="/">pages/index</Link>
    <Link href="/ssr/1">ssr/1</Link>
  ```

### 6. 数据获取（动态渲染 和 静态渲染）

  ### 核心方法
    getServerSideProps
    getStaticProps
    getStaticPaths

  ## 动态渲染（Dynamic Rendering）
    当每个请求到达时，服务器都会重新计算数据并生成页面内容
    这种方式可用于需要根据用户请求动态生成的内容，例如根据请求参数来动态生成不同内容的页面。

  ## 静态渲染（Static Rendering）
    在构建时生成页面，并且页面内容在每次请求时都保持不变，不会发生变化。
    这种页面内容生成方式在每个请求时只获取一次，之后不再更新。

#### 使用 `getServerSideProps` 进行 动态渲染

```tsx
import React from 'react';

export async function getServerSideProps({params}) {
  const { id } = params;
  const response = await fetch(`https://api/data/${id}`);
  const data = await response.json();

  return {
    props: { data },
  };
}

const SSRPage = ({ data }) => {
  return (
    <div>
      <h1>动态渲染</h1>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  );
};

export default SSRPage;
```

#### 使用 `getStaticProps` `getStaticPaths` 进行 静态渲染


```tsx
import React from 'react';


export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: "blocking", 
    // fallback: false,
    // fallback:true ,
  };
}

export async function getStaticProps({params}) {
  const id = params.id;
  const response = await fetch(`https://api/data/${id}`);
  const data = await response.json();

  return {
    props: { data },
  };
}

const SSGPage = ({ data }) => {
  return (
    <div>
      <h1>静态渲染</h1>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  );
};

export default SSGPage;
```

### 7. API 路由

    Next.js 内置了 API 路由，可以创建 API 端点，编写服务器端代码，以处理客户端发来的 API 请求

#### 创建 API 路由

    在 `pages/api` 目录下创建 API 端点：

#### pages/api/user.ts

```ts
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello, world!' });
}
```

访问 `http://localhost:3000/api/user/1`，可以看到返回的 JSON 数据。



#### 总结
2. **关于next**：Next.js 是什么？能做什么？解决了什么问题？怎么创建一个next.js应用？
3. **项目结构**：了解 Next.js 项目的基本目录和文件结构。
4. **路由和导航**：使用文件系统路由和动态路由，掌握 Link 组件的使用。
5. **数据获取**：静态渲染和动态渲染的基本用法。
6. **API 路由**：在 Next.js 中创建和使用 API 路由。



















