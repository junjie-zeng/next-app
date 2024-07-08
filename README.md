### Next.js

### 目录

1. 什么是 Next.js
2. Next.js 解决了什么问题
3. 创建第一个 Next.js 应用
4. 项目结构介绍
5. 路由与导航
6. 创建数据库
7. 获取数据（动态渲染、静态渲染）
8. 流式传输
9. api 路由

### 1. 什么是 Next.js？

    Next.js 是一个用于构建全栈 Web 应用程序的 React 框架。

### 2. Next.js 解决了什么问题

    解决React(单页面应用)存在的一些问题

## 什么是单页面应用

    单页面应用（Single Page Application，SPA）是一种 Web 应用程序的架构模式，它使用动态加载页面内容的方式，实现在单个 HTML 页面中提供整个应用所需的交互体验。

    常见的单页面应用开发框架：React、Vue、Angular

## 单页面存在的一些问题

    1. 依赖js环境
    2. 首屏加载慢
    3. 不利于seo

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
│   ├── api/
│   │   └── user.ts
├── public/
├── next.config.js
├── package.json
```

- **.next**：构建输出的默认目录，包含了编译后的页面、静态资源以及构建相关的文件。
- **app/**：基于文件系统的路由，用于存放应用的页面和组件
- **public/**：存放静态资源，如图片、字体等。
- **next.config.js**：Next.js 配置文件。
- **package.json**：项目依赖和脚本。

### 5. 路由与导航

#### 路由

    Next.js 使用的是文件系统路由。`app` 目录中的每个文件都对应一个路由。

#### 基本用法

    在 app 目录中创建文件和文件夹来定义路由：

    app/page.tsx 对应 /
    app/user/page.tsx 对应 /user
    app/user/[id].tsx 对应 /user/:id

#### app/page.tsx

```tsx
import React from "react"

const HomePage = () => {
  return (
    <div>
      <h1>Hello Next.js!</h1>
    </div>
  )
}

export default HomePage
```

#### app/about/page.tsx

```tsx
import React from "react"

const AboutPage = () => {
  return (
    <div>
      <h1>AboutPage</h1>
    </div>
  )
}

export default AboutPage
```

#### 动态路由

app/user/[id].tsx

```tsx
import { useRouter } from "next/router"

const User = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>User ID: {id}</h1>
    </div>
  )
}

export default User
```

访问 http://localhost:3000/user/123，显示 `User ID: 123`。

#### 导航

在 Next.js 中，使用 Link 组件在应用程序的页面之间进行链接。

```tsx
  import Link from "next/link";

  <Link href="/">pages/index</Link>
  <Link href="/ssr/1">ssr/1</Link>
```

### 6. 创建数据库

1. 在 github 创建仓库，上传代码
   <img src="https://raw.githubusercontent.com/junjie-zeng/next-app/master/public/images/create-data-1.jpeg" />
2. 注册 Vercel 账号 [官方地址](https://vercel.com/)<br/>
   选择免费的 "hobby" 计划
   <img src="https://raw.githubusercontent.com/junjie-zeng/next-app/master/public/images/create-data-2.jpeg" />
   选择 "Continue with GitHub" 来连接你的 GitHub 和 Vercel 账户
   <img src="https://raw.githubusercontent.com/junjie-zeng/next-app/master/public/images/create-data-3.jpeg" />
3. 导入指定仓库，导入项目
   <img src="https://raw.githubusercontent.com/junjie-zeng/next-app/master/public/images/create-data-4.jpeg" />
   给项目取一个名字，然后点击 Deploy（部署）。
   <img src="https://raw.githubusercontent.com/junjie-zeng/next-app/master/public/images/create-data-5.jpeg" />
   部署成功
   <img src="https://raw.githubusercontent.com/junjie-zeng/next-app/master/public/images/create-data-6.jpeg" />

4. 数据库创建<br/>
   选择 Storage 选项卡
   <img src="https://raw.githubusercontent.com/junjie-zeng/next-app/master/public/images/create-data-7.jpeg" />
   创建数据库
   <img src="https://raw.githubusercontent.com/junjie-zeng/next-app/master/public/images/create-data-8.jpeg" />
   选择 Postgres 创建
   <img src="https://raw.githubusercontent.com/junjie-zeng/next-app/master/public/images/create-data-9.jpeg" />
   连接
   <img src="https://raw.githubusercontent.com/junjie-zeng/next-app/master/public/images/create-data-10.jpeg" />
   连接后，转到 .env.local 选项卡，点击 “Show secret” 并复制片段
   <img src="https://raw.githubusercontent.com/junjie-zeng/next-app/master/public/images/create-data-11.jpeg" />
5. 安装依赖

   npm install @vercel/postgres

6. 获取数据

```ts
import { sql } from "@vercel/postgres"

// 获取所有用户数据
export const getUsers = async () => {
  try {
    const { rows } = await sql`SELECT * FROM users`
    return rows
  } catch (error) {
    console.log(error)
  }
}
```

### 7. 获取数据（动态渲染、静态渲染）

#### 静态渲染（Static Rendering）

    1. 数据获取和渲染
        位置：服务端
        时机：构建部署、（数据发生变更时）

    2. 静态渲染的结果
        可以被分发、缓存

    3. 静态+缓存的收益
        更快的访问网页体验
        减轻服务器的负担
        利于seo

    4. 使用场景
        没有变化的数据
        多页面共享的数据

#### 动态渲染（Dynamic Rendering）

    1. 数据获取和渲染
        位置：服务端
        时机：每个用户请求时

    2. 动态渲染的收益
        显示实时数据

    3. 使用场景
        需要变化的数据
        每个用户请求的数据不同

### 7. 流式传输

#### 什么是流式传输？

    流式传输是一种数据传输技术，它通过将数据分割成多个小块（chunks）发送给客户端，实现了内容的渐进式呈现。

#### 解决了什么问题？

    流式传输能减少页面加载的阻塞，让用户能够更早地参与到页面的交互中，而不需要等待整个界面的完全加载。

#### next.js 中有两种实现流式传输的方式：

    1. 页面级别，使用loading.tsx文件
    2. 对于特定组件，使用<Supence>

### 7. API 路由

#### 什么是 API 路由

    在Next.js中，API路由可以让开发者直接在Next.js项目中编写Node.js后端代码来处理客户端发来的 API 请求


#### 创建 API 路由

    在 `app/api` 目录下创建 API 端点：

#### app/api/getUsers/route.ts

```ts
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM users`;
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
```

访问 `http://localhost:3000/api/getUsers`，可以看到返回的 JSON 数据。



























<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


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
