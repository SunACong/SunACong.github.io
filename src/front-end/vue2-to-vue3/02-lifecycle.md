---
# 这是文章的标题
title: 生命周期 
# 你可以自定义封面图片
cover: 
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 1
# 设置作者
author: SunByte
# 设置写作时间
date: 2024-09-18
# 一个页面可以有多个分类
category:
  - 知识文档
# 一个页面可以有多个标签
tag:
  - vue
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: false
# 你可以自定义页脚
footer: 欢迎来到SunByte的博客世界
# 你可以自定义版权信息
copyright: © 2024 SunByte. All rights reserved.
---

本章将带你熟悉Vue 3的生命周期钩子，了解它们在组件中的作用和用法。

<!-- more -->

## 生命周期示意图

![vue3生命周期钩子](https://cn.vuejs.org/assets/lifecycle_zh-CN.W0MNXI0C.png)


## Vue 3 生命周期钩子

Vue 3 的生命周期钩子是作为 Composition API 的一部分引入的。它们以函数的形式存在，可以在 `setup` 函数中导入并使用。

::: tip
vue3引入了新的生命周期钩子，如果想使用**组合式的API**，需要在setup中使用。

但是您仍然可以在vue3项目中使用**选项式的API**，但是并不建议您混合使用。
:::


如果您想了解更多vue3中生命周期钩子的使用，可以参考以下链接：[官方文档：生命周期钩子API](https://cn.vuejs.org/api/composition-api-lifecycle.html)

## 使用示例

```javascript
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';

export default {
  setup() {
    onBeforeMount(() => {
      console.log('组件挂载前');
    });

    onMounted(() => {
      console.log('组件已挂载');
    });

    onBeforeUpdate(() => {
      console.log('组件更新前');
    });

    onUpdated(() => {
      console.log('组件已更新');
    });

    onBeforeUnmount(() => {
      console.log('组件卸载前');
    });

    onUnmounted(() => {
      console.log('组件已卸载');
    });
  }
};