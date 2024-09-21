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
      // icon: "laptop-code",
      prefix: "vue2-to-vue3/",
      // link: "vue2-to-vue3/",
      children: [
        {text: "基础知识", icon: "file", link: "01-start"},
        {text: "生命周期", icon: "file", link: "02-lifecycle"},
        {text: "侦听器", icon: "file", link: "03-watch"},
        {text: "计算属性", icon: "file", link: "04-compute"},
      ],
    },
    {
      text: "快速上手react",
      prefix: "qucik-to-react/",
      // link: "qucik-to-react/"
      children: [
        
      ],
    }
  ],
  "/install-deploy/": [
    "vuepress-deploy",
    "docker-install"
  ]
});
