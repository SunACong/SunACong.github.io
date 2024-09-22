---
# 这是文章的标题
title: 组件
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 1
# 设置作者
author: SunByte
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

本章将带你了解vue3中的组件，包括组件的注册、Props、监听事件、插槽、依赖注入、异步组件等。

<!-- more -->

## 组件注册

在vue3中如果想使用组件，需要先进行注册，有两种方式：全局注册、局部注册。

### 全局注册

使用 Vue 应用实例的 `.component()` 方法，让组件在当前 Vue 应用中全局可用。

下面代码中，我们全局注册了两个组件：`ButtonCounter` 和 `HelloWorld`，你可以在任何组件中使用它们。

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import ButtonCounter from './components/ButtonCounter.vue'
import HelloWorld from './components/HelloWorld.vue'

createApp(App)
 .component('ButtonCounter', ButtonCounter)
 .component('HelloWorld', HelloWorld)
 .mount('#app')
```

### 局部注册

在vue3中你可以在setup中导入组件，无需显示注册。

```javascript
<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue"
</script>

<template>
  <HelloWorld msg="Vite + Vue" /> 
</template> 
```

如果你没有在setup中导入组件，那么你需要在components选项式中显式注册。

```javascript
import HelloWorld from "./components/HelloWorld.vue"

export default {
  components: {
    HelloWorld
  },
  setup() {
    // ...
  }
}

```
::: warning 注意事项
1. 在命名组件时，通常采用PascalCase（帕斯卡命名法），即每个单词的首字母大写，例如：`HelloWorld`。

2. 不必要的全局组件不要注册，因为全局组件在编译时，无论你使用与否，都会被包含在最终的构建输出中。这会导致构建输出变得很大，并且可能会影响页面的加载性能。

3. 如果你需要引入的全局组件很多，我建议你使用 `插件自动注册全局组件` 或者 `命名空间组件` 来优化你的`main.js`
:::

## Props

## 事件

## 组件v-model

## 透传Attribute

## 插槽

## 依赖注入

## 异步组件

## 参考文档

- [官网：计算属性](https://cn.vuejs.org/guide/essentials/computed.html#basic-example)
