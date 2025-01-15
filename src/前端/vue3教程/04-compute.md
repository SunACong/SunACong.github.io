---
# 这是文章的标题
title: 计算属性
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

Vue 3 的计算属性通过 Composition API 提供了更灵活和强大的功能，使得代码更加模块化和可维护。

<!-- more -->

## 使用场景

如果我们需要根据一个对象或者数组的属性来动态地更新另一个属性，那么计算属性就非常有用。

例如，我们有一个用户对象，其中包含了姓名、出生日期和性别等属性。

我们希望根据用户的性别属性来渲染处不同的颜色标签

```javascript
import { reactive, computed } from 'vue';

export default {
  setup() {
    // 定义一个响应式用户对象
    const user = reactive({
      name: 'SunByte',
      bornDate: '1999-06-18',
      gender:'male'
    })

    // 定义一个计算属性，根据性别返回不同的颜色标签
    const genderColor = computed(() => {
      switch (user.gender) {
        case 'male':
          return 'blue';
        case 'female':
          return 'pink';
        case 'other':
          return 'green';
        default:
          return 'gray';
      }
    });

    // 返回响应式对象和计算属性，以便在模板中使用
    return {
      user,
      genderColor
    };
  }
};
```
在 Vue 模板中，你可以这样使用这个计算属性, 当 user.gender 发生变化时，计算属性 genderColor 也会相应地更新，从而改变标签的颜色。

```vue
<div>
  <h1>{{ user.name }}</h1>
  <p>Gender: <span :style="{ color: genderColor }">Label</span></p>
</div>
```
## 方法和计算属性的区别

我们可以将计算属性替换为一个方法，也可以实现同样的效果，但是为啥计算属性会更好呢？

- 两种方式在结果上确实是完全相同的，然而，**不同之处在于计算属性值会基于其响应式依赖被缓存, 一个计算属性仅会在其响应式依赖更新时才重新计算**。这意味着只要 user.gender 不改变，无论多少次访问 genderColor 都会立即返回先前的计算结果，而不用重复执行 getter 函数。


## 可写计算属性

计算属性默认是只读，通常我也们也只建议读，需要写时可以通过同时创建 `getter` 和 `setter` 来实现。

```vue
<script setup>
  import { ref, computed } from 'vue'

  const firstName = ref('John')
  const lastName = ref('Doe')

  const fullName = computed({
    // getter
    get() {
      return firstName.value + ' ' + lastName.value
    },
    // setter
    set(newValue) {
      // 注意：我们这里使用的是解构赋值语法
      [firstName.value, lastName.value] = newValue.split(' ')
    }
  })
</script>
```

::: warning 注意事项
1. 不要改变其他状态、在 getter 中做异步请求或者更改 DOM！<br>

2. 避免直接修改计算属性值，计算属性返回值是一个”快照“，更新一个快照是没有意义的，通常对于计算属性的返回值只读。
:::

## 参考文档

- [官网：计算属性](https://cn.vuejs.org/guide/essentials/computed.html#basic-example)
