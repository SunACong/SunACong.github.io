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

如果你没有在setup中导入组件，那么你需要在components选项式中显式注册。

```javascript
<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue"
</script>

<template>
  <HelloWorld msg="Vite + Vue" /> 
</template> 
```

::: warning 注意事项
1. 在命名组件时，通常采用PascalCase（帕斯卡命名法），即每个单词的首字母大写，例如：`HelloWorld`。

2. 不必要的全局组件不要注册，因为全局组件在编译时，无论你使用与否，都会被包含在最终的构建输出中。这会导致构建输出变得很大，并且可能会影响页面的加载性能。

3. 如果你需要引入的全局组件很多，我建议你使用 `插件自动注册全局组件` 或者 `命名空间组件` 来优化你的`main.js`
:::

## Props

### 声明一个Props

在使用 `<script setup>` 的单文件组件中，`props` 可以使用 `defineProps()` 宏来声明：

```vue
<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>
```

通常建议用对象形式的`props`来声明，代码可读性更高，还可以对`props`进行类型检查。

### 传递Props细节

1. **Props命名规范**

在传递`props`时命名往往采用`camelCase`方式。

```javascript
defineProps({
  greetingMessage: String
})

<span>{{ greetingMessage }}</span>
```
在父组件向子组件传递`props`时通常采用 `kebab-case` 形式。
```javascript
<MyComponent greeting-message="hello" />
```
2. **传递的值类型**

我们只选择特殊的数据类型来介绍。

Boolean: 
```vue
<!-- Boolean 仅写上 prop 但不传值，会隐式转换为 `true` -->
<BlogPost is-published />

<!-- 等同于传入 :is-published="false" -->
<BlogPost />
```
Object: 
```vue
const post = {
  id: 1,
  title: 'My Journey with Vue'
}

<BlogPost v-bind="post" />
// 上面这段代码等价于下面这段代码
<BlogPost :id="post.id" :title="post.title" />
```

### 单向数据流

所有的 props 都遵循着单向绑定原则，props 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。

如果你需要更改，一般建议有两种方式：

1. **子组件重新定义**

```js
const props = defineProps(['initialCounter'])

// 计数器只是将 props.initialCounter 作为初始值
// 像下面这样做就使 prop 和后续更新无关了
const counter = ref(props.initialCounter)
```

2. **利用计算属性**

```js
const props = defineProps(['size'])

// 该 prop 变更时计算属性也会自动更新
const normalizedSize = computed(() => props.size.trim().toLowerCase())
```

## 事件

子组件`<template>` 可以通过`$emit`来触发自定义事件
```vue
<button @click="$emit('someEvent')">Click Me</button>
```
在 `<template>` 中使用的 `$emit` 方法不能在组件的 `<script setup>` 部分中使用，但 `defineEmits()` 会返回一个相同作用的函数。

父组件可以通过 @ 来监听事件

```vue
<MyComponent @some-event="callback" />
```
::: tip
1. 在子组件自定义事件时，建议使用`camelCase` 形式，在父组件监听时使用`kebab-case`的方式来传递事件名。
:::

通过`defineEmits`来显式的定义事件。

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```
`defineEmits`只能在 `<script setup>` 的顶级作用域中使用。

## 插槽

vue3 中有三种插槽使用方式与 vue2 类似，分别是：默认插槽、具名插槽、作用域插槽。

### 默认插槽

在外部没有提供任何内容的情况下，可以为插槽指定默认内容。

子组件 `MyComponent`

```vue 子组件
<template>
  <div>
    <slot>
      <p>默认插槽内容</p>
    </slot>
  </div>
</template>
```

父组件

```vue 父组件
<template>
  <div>
    <MyComponent>
      <p>我是父组件自定义插槽内容</p>
    </MyComponent>
  </div>
</template>
```
### 具名插槽

子组件 `MyComponent`

```vue 子组件
<template>
  <div>
    <slot name="header">
      <p>默认插槽内容</p>
    </slot>
  </div>
</template>
```

父组件 

`v-slot` 有对应的简写 `#`，因此 `<template v-slot:header>` 可以简写为 `<template #header>`

```vue 父组件
<template>
  <div>
    <MyComponent>
      <template #header>
        <p>我是父组件自定义插槽内容</p>
      </template>
    </MyComponent>
  </div>
</template>
```

### 作用域插槽

默认情况下，父组件是无法访问到子组件的内容的。<br>

然而在某些场景下插槽的内容可能想要同时使用父组件域内和子组件域内的数据。要做到这一点，我们需要一种方法来让子组件在渲染时将一部分数据提供给插槽。<br>

可以像对组件传递 `props` 那样，向一个插槽的出口上传递 `attributes`：

子组件 `MyComponent`

```vue 子组件
<template>
  <div>
    <slot :user="user">
      <p>默认插槽内容</p>
    </slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({
  name: 'John Doe',
  age: 30
})
</script>
```

父组件

```vue 父组件
<template>
  <div>
    <MyComponent>
      <template #default="slotProps">
        <p>我是父组件自定义插槽内容，用户名：{{ slotProps.user.name }}</p>
      </template>
    </MyComponent>
  </div>
</template>
```

子组件传入插槽的 `props` 作为了 `v-slot` 指令的值，可以在插槽内的表达式中访问。

![子组件提供attributes给父组件](https://cn.vuejs.org/assets/scoped-slots.B67tIPc5.svg)

## 待更新 

本章还有以下几个知识点未更新，这些知识点需要在以后的实际项目中更容易掌握，请期待。。。。

- 透传Attribute

- 依赖注入

- 异步组件

## 参考文档

- [官网：组件](https://cn.vuejs.org/guide/components/registration.html)
