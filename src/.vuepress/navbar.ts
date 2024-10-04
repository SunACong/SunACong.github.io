import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/demo/",
  "/install-deploy/",
  {
    text: "前端",
    icon: "laptop-code",
    prefix: "/front-end/",
    children: [
      "vue2-to-vue3/",
      "qucik-to-react/"
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
