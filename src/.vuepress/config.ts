import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "",
  description: "SunByte的博客世界",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
