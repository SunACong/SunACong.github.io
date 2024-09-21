---
# 这是文章的标题
title: vuepress-theme-hope部署
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 1
# 设置作者
author: SunByte
# 一个页面可以有多个分类
category:
  - 使用指南
# 一个页面可以有多个标签
tag:
  - 部署
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: false
# 你可以自定义页脚
footer: 欢迎来到SunByte的博客世界
# 你可以自定义版权信息
copyright: © 2024 SunByte. All rights reserved.
---

在本教程中，我们将学习如何使用 VuePress-theme-hope 创建一个静态网站，并通过 GitHub Pages 和 GitHub Actions 进行部署和自动化发布。

<!-- more -->

## 环境准备

- GitHub 账号。
- [Node.js](https://nodejs.org/)( ≥ 18，建议 20)。
- 对应版本的包管理器，如 [pnpm](https://pnpm.io/)、[yarn](https://yarnpkg.com/) 或 [npm](https://www.npmjs.com/)。

## 创建 VuePress 项目

1. **创建项目目录**：

   ```bash
   建议使用纯英文路径
   ```

2. **初始化项目模板**（使用 npm 作为示例）

   ```bash
   npm init vuepress-theme-hope@latest <文件夹参数>
   ```
    ::: tip
    `<文件夹参数>` 代表 VuePress Theme Hope 项目的文件夹名称，会将项目生成至当前目录下的该文件夹内。
    :::

    ::: important
    按照提示一步步创建项目所需配置，对于是否需要github action配置，可选可不选，教程后面会提供方法。
    :::

3. **创建文档目录**

   ::: tabs # cmd

    @tab npm
    ```bash
    npm run docs:dev 启动开发服务器

    npm run docs:build 构建项目并输出

    npm run docs:clean-dev 清除缓存并启动开发服务器
    ```

    @tab pnpm
    ```bash
    pnpm docs:dev 启动开发服务器

    pnpm docs:build 构建项目并输出

    pnpm docs:clean-dev 清除缓存并启动开发服务器
    ```
    @tab yarn
    ```bash
    yarn docs:dev 启动开发服务器

    yarn docs:build 构建项目并输出

    yarn docs:clean-dev 清除缓存并启动开发服务器
    ```
    :::

## Github配置

1. **创建 GitHub 仓库**

    - 登录到 GitHub 并创建一个新的仓库。

    - 确保仓库名称格式为: `<用户名>.github.io`。

    ::: tip
    本文部署属于个人项目,github只能有一个个人项目主页, 如需要配置项目主页, 本文暂不提供参考.
    :::

2. **开启权限**

    - 在仓库的Settings页面配置权限, 路径为`Settings` > `Action` > `genaral` > `workflow permissions` > `Read and write permissions`:

    
    ![配置权限](assets/install-deploy/vuepress-deploy-01.png =600x)

3. **新建分支**

    - 新建仓库内默认只有`main`主分支

    - 在主分支的基础上新建一个`gh-pages`分支

    ::: tip
    主分支用来存储项目代码

    `gh-pages`分支用来部署dist包。
    :::

    - 切换Github Pages的分支为`gh-pages`分支

    ![配置Github Page分支为gh-pages](assets/install-deploy/vuepress-deploy-04.png =600x)



4. **生成ACCESS_TOKEN**

    - 需要生成一个Token来方便我们后期的Action自动化编译打包发布到`gh-pages`分支。

    - 路径: `Settings` > `Developer settings` > `Personal access tokens` > `Generate new token`

    ![生成ACCESS_TOKEN](assets/install-deploy/vuepress-deploy-02.png =600x)

5. **保存ACCESS_TOKEN至你的仓库**

    - 生成的Token需要保存到你的仓库: `Settings` > `Secrets and variables` > `Actions` > `New secret`

    - 保存的`Name`为`ACCESS_TOKEN`

    - 保存的`Secret`为你生成的Token

    ![保存ACCESS_TOKEN](assets/install-deploy/vuepress-deploy-03.png =600x)

    ::: tip
    到达这一步, 你的Github配置已经完结。

    :::

## GitHub Actions 配置文件

1. **项目根目录创建 `.github/workflows/deploy.yml`**：
   ```yaml
   name: 部署文档

    on:
    push:
        branches:
        # 确保这是你正在使用的分支名称
        - main

    jobs:
    deploy-gh-pages:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout
            uses: actions/checkout@v3
            with:
            fetch-depth: 0
            # 如果你文档需要 Git 子模块，取消注释下一行
            # submodules: true

        - name: 设置 Node.js
            uses: actions/setup-node@v3
            with:
            node-version: 18
            cache: npm

        - name: 安装依赖
            run: npm ci

        - name: 构建文档
            env:
            NODE_OPTIONS: --max_old_space_size=8192
            run: |-
            npm run docs:build
            > src/.vuepress/dist/.nojekyll
        - name: 部署文档
            uses: JamesIves/github-pages-deploy-action@v4
            env:
            # 这是你在 GitHub 上创建的个人访问令牌
            ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
            with:
            # 这是文档部署到的分支名称
            branch: gh-pages
            folder: src/.vuepress/dist
   ```

## 部署到 GitHub Pages

1. **初始化 本地Git 仓库**（如果尚未初始化）：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **关联 GitHub 仓库**并推送代码：
   ```bash
   git remote add origin <github仓库地址>
   git branch -M main
   git push -u origin main
   ```

3. **触发部署**：

    ::: tip
    推送到Github之后,在Action选项内会有相应的Action, 点击即可查看Action的执行情况。
    :::

   - 每次推送到 `main` 分支时，GitHub Actions 将自动运行并部署你的 VuePress 网站。

   ![验证Action是否生效](assets/install-deploy/vuepress-deploy-05.png =600x)

## 访问你的网站

部署完成后，你可以访问 `https://<用户名>.github.io/` 来查看你的网站。

通过以上步骤，你已经成功使用 VuePress-theme-hope 创建了一个静态网站，并通过 GitHub Pages 和 GitHub Actions 进行了部署和自动化发布。
