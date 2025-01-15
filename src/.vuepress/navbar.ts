import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/demo/",
  "/安装部署/",
  {
    text: "前端",
    icon: "laptop-code",
    prefix: "/前端/",
    children: [
      "vue3教程/",
      "react快速入门/",
      "typescript入门/"
    ],
  },
  {
    text: "项目实战",
    icon: "laptop-code",
    prefix: "/project/",
    children: [
      "Practical-Experience/",
      "S-Pay-Mall/",
    ]
  },
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
