---
# 这是文章的标题
title: 基础知识 
# 你可以自定义封面图片
cover: 
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 1
# 设置作者
author: SunByte
# 设置写作时间
date: 2024-09-16
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

本文适用于Vue 3与Vue 2不同的内容，本篇博客作者将以尽量少的文字来展现两者之间的不同，让你快速了解Vue 3中的一些关键变化。

<!-- more -->

## 模板语法

Vue 3在模板语法上没有太大变化，需要注意以下以下几个组件，有时候有奇效哦！例如：

- **Fragment、Teleport 和 Suspense**：
  - **Fragment**：允许多个根节点的组件。
  ```vue
  <template>
    <Fragment>
      <div>Part 1</div>
      <div>Part 2</div>
    </Fragment>
  </template>
  ```
  - **Teleport**：将组件的子节点传输到DOM中的其他位置。
  ```vue
  <template>
    <Teleport to="#modal">
      <div>Modal Content</div>
    </Teleport>
  </template>
  ```
  - **Suspense**：用于异步组件的加载状态。
  ```vue
  <template>
    <Suspense>
      <template #default>
        <AsyncComponent />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </template>
  ```


## 条件渲染

  条件渲染v-if指令并没有太多变化，记住当你需要多个元素的状态绑定时，使用`<template>`标签进行对元素进行包裹。

  ```vue
  <template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </template>
  ```

## 列表渲染

Vue 3在列表渲染方面引入了 `v-for` 的一些改进：

- **更灵活的 `v-for` 语法**：现在你可以在 `v-for` 指令中直接使用 `item of list` 这样的语法，而不需要声明索引。
  ```vue
  <template>
    <div v-for="item of items" :key="item.id">
      {{ item.name }}
    </div>
  </template>
  ```
- **对象数组的遍历**：
  ```vue
  <li v-for="(value, key, index) in myObject">
    {{ index }}. {{ key }}: {{ value }}
  </li>
  ```
  ```js
  const myObject = reactive({
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2016-04-10'
  })
  ```

## 事件处理

事件处理在Vue 3中得到了改进：

- **事件修饰符**：Vue 3为事件修饰符引入了新的方式，如 `.stop` 和 `.prevent` 现在可以链式调用，例如 `@click.prevent.self`。

  ```vue
  <!-- 单击事件将停止传递 -->
  <a @click.stop="doThis"></a>

  <!-- 提交事件将不再重新加载页面 -->
  <form @submit.prevent="onSubmit"></form>

  <!-- 修饰语可以使用链式书写 -->
  <a @click.stop.prevent="doThat"></a>

  <!-- 也可以只有修饰符 -->
  <form @submit.prevent></form>

  <!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
  <!-- 例如：事件处理器不来自子元素 -->
  <div @click.self="doThat">...</div>
  ```
  :::tip
  使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。<hr>
  因此使用 `@click.prevent.self `会阻止元素及其子元素的所有点击事件的默认行为，<hr>
  而 `@click.self.prevent` 则只会阻止对元素本身的点击事件的默认行为。
  :::
- **键盘 & 鼠标 修饰符**：Vue 为一些常用的按键和鼠标操作提供了别名：
  1. **键盘按键别名**
  ```bash
  .enter
  .tab
  .delete (捕获“Delete”和“Backspace”两个按键)
  .esc
  .space
  .up
  .down
  .left
  .right
  ```
  2. **系统级按键别名**
  ```bash
  .ctrl
  .alt
  .shift
  .meta
  ```
  3. **鼠标操作别名**
  ```bash
  .left
  .right
  .middle
  ```
  4. **.exact 修饰符**

  .exact 修饰符允许精确控制触发事件所需的系统修饰符的组合。
  ```vue
  <!-- 当按下 Ctrl 时，即使同时按下 Alt 或 Shift 也会触发 -->
  <button @click.ctrl="onClick">A</button>

  <!-- 仅当按下 Ctrl 且未按任何其他键时才会触发 -->
  <button @click.ctrl.exact="onCtrlClick">A</button>

  <!-- 仅当没有按下任何系统按键时触发 -->
  <button @click.exact="onClick">A</button>
  ```

## 表单绑定

Vue 3对表单绑定没有什么变化。

- **修饰符**：你可以为v-model增加一些修饰符来满足你的部分需要。
  1. **`.lazy​`**

  默认情况下，v-model 会在每次 input 事件后更新数据。你可以添加 lazy 修饰符来改为在每次 change 事件后更新数据。

    ```vue
  <!-- 在 "change" 事件后同步更新而不是 "input" -->
  <input v-model.lazy="msg" />
  ```

  2. **`.number`**

  让用户输入自动转换为数字，如果该值无法被 `parseFloat()` 处理，那么将返回原始值。
  
  `number` 修饰符会在输入框有 `type="number"` 时自动启用。

  ```vue
  <input v-model.number="age" />
  ```
  3. **`.trim​`**

  自动去除用户输入内容中两端的空格。

  ```vue
  <input v-model.trim="msg" />
  ```


## Class与Style绑定

vue3中的Class与Style绑定与vue2相比没有什么变化：

  1. **对象数组绑定**：你可以使用**对象**或者**数组**来动态地绑定Class和Style。
  ```vue
  <template>
    <div :class="{ active: isActive, 'text-danger': hasError }">
      Content
    </div>
  </template>
  ```
  2. **内联样式绑定**：
  ```vue
  <template>
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">
      Styled Content
    </div>
  </template>
```

加上vue3更方便的响应式数据，可以让你更方便的进行动态的操作这些class和style。


