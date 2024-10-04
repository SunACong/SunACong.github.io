import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    "intro",
    {
      text: "幻灯片",
      icon: "person-chalkboard",
      link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    },
  ],
  "/front-end/": [
    {
      text: "vue3快速入门",
      prefix: "vue2-to-vue3/",
      children: [
        {text: "基础知识", icon: "", link: "01-start"},
        {text: "生命周期", icon: "", link: "02-lifecycle"},
        {text: "侦听器", icon: "", link: "03-watch"},
        {text: "计算属性", icon: "", link: "04-compute"},
        {text: "组件", icon: "", link: "05-components"},
      ],
    },
    {
      text: "快速上手react",
      prefix: "qucik-to-react/",
      children: [
         
      ],
    }
  ],
  "/project/": [
    {
      text: " ",
      prefix: "Practical-Experience/",
      link: "Practical-Experience/",
      children: [
        {text: "数据库表设计规范", icon: "", link: "01-数据库表设计规范"},
      ],
    },
  ],
  "/install-deploy/": [
    "vuepress-deploy",
    "docker-install"
  ]
});
