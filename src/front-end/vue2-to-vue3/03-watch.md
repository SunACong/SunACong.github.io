---
# 这是文章的标题
title: 监听器
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 1
# 设置作者
author: SunByte
# 设置写作时间
date: 2024-09-19
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

Vue 3 中的watch与vue2中的watch在使用方式上更加便捷，并且引入了新的watchEffect函数，让侦听器变得更加灵活。

<!-- more -->

## vue3中的侦听器

在 Vue 3 中，你可以使用 `watch` 和 `watchEffect` 函数来创建侦听器。

- **`watch`**：用于侦听特定的响应式引用或计算属性，并在它们变化时执行回调函数。
- **`watchEffect`**：自动侦听其回调函数内部使用的所有响应式状态，并在任何相关数据变化时重新运行。

::: tip
watch可以传入三个参数`侦听数据源` `回调函数` `配置`
:::

### 数据源

watch 可以侦听以下类型的数据源：

- ref：响应式引用。
- reactive：响应式对象。
- computed：计算属性。
- Getter 函数：返回响应式数据的函数。
- 以上数据源组成的数组。

```javascript
import { ref, reactive, computed, watch } from 'vue';

export default {
  setup() {
    // ref 数据源
    const count = ref(0);

    // reactive 数据源
    const state = reactive({
      firstName: 'Vue',
      lastName: '3'
    });

    // computed 数据源
    const fullName = computed(() => `${state.firstName} ${state.lastName}`);

    // Getter 函数作为数据源
    const doubleCount = () => count.value * 2;

    // 侦听 ref 数据源
    watch(count, (newVal, oldVal) => {
      console.log(`count changed from ${oldVal} to ${newVal}`);
    });

    // 侦听 reactive 数据源
    watch(() => state.firstName, (newVal, oldVal) => {
      console.log(`firstName changed from ${oldVal} to ${newVal}`);
    });

    // 侦听 computed 数据源
    watch(fullName, (newVal, oldVal) => {
      console.log(`fullName changed from ${oldVal} to ${newVal}`);
    });

    // 侦听 Getter 函数数据源
    watch(doubleCount, (newVal, oldVal) => {
      console.log(`doubleCount changed from ${oldVal} to ${newVal}`);
    });

    // 侦听以上数据源组成的数组
    watch([count, () => state.lastName, fullName], ([newCount, newLastName, newFullName], [oldCount, oldLastName, oldFullName]) => {
      console.log(`count changed from ${oldCount} to ${newCount}`);
      console.log(`lastName changed from ${oldLastName} to ${newLastName}`);
      console.log(`fullName changed from ${oldFullName} to ${newFullName}`);
    });

    return {
      count,
      state,
      fullName,
      doubleCount
    };
  }
};
```
### 回调函数

当watch侦听的数据源发生变化时，回调函数会被触发。回调函数接收新值、旧值和一个用于清理副作用的回调函数`（onCleanup）`作为参数。

- **`onCleanup`**: 
  - 清理资源：用于清理在回调函数中创建的任何资源，例如定时器、事件监听器或订阅。
  - 防止内存泄漏：确保组件销毁时，相关的资源也被适当地清理，避免内存泄漏。

::: tip
onCleanup 可以用来保证在最新的一次回调触发后，不会被前面的回调函数覆盖。
:::

```javascript
import { ref, watch } from 'vue';

export default {
setup() {
  watch(source, async (old, new, OnCleanup) => {
    // 是否过期是标志
    let expired = false
    // 注册过期回调
    OnCleanup(()=> {
      expired = true
    })
    const res = await fetch('something')
    // 如果未过期，那么可以取res为finalData
    if (!expired) {
      finalData = res
    }
  })
};
```

### 配置选项

watch 接受一个配置对象作为第三个参数，提供以下选项：

- `deep`：是否进行深度监听。
- `immediate`：是否在侦听开始时立即执行回调。
- `flush`：回调函数的触发时机。
  - `pre`：默认，dom 更新前调用
  - `post`: dom 更新后调用，sync 同步调用。
- `onTrack / onTrigger`：**用于调试的钩子**。在依赖收集和回调函数触发时被调用。

## watchEffect

watchEffect 接受一个函数和一个配置对象作为参数，这个函数会在 watchEffect 被创建时立即执行一次，之后每当追踪到的响应式状态变化时，该函数都会重新执行。

```javascript
import { ref, watchEffect } from 'vue';

export default {
  setup() {
    const state = ref(0);

    watchEffect(() => {
      console.log(`The state is now: ${state.value}`);
      // 这里的代码会立即执行一次，并在 state 变化时再次执行
    });

    // 示例：更改 state 触发 watchEffect
    function changeState() {
      state.value++;
    }

    return {
      state,
      changeState
    };
  }
};
```

## watchEffect 与 watch 的区别

1. **执行时机**：
    - watchEffect 立即执行，并在其依赖的响应式数据变化时重新执行。<br>
    - watch 惰性执行，仅在被侦听的数据变化时执行。

2. **依赖追踪**：
    - watchEffect 自动追踪其内部访问的所有响应式数据。<br>
    - watch 需要明确指定要侦听的数据源。

3. **回调参数**：
    - watchEffect 回调不接受新旧值参数。<br>
    - watch 回调接受新值和旧值作为参数。

4. **清理机制**：
    - watchEffect 没有内置清理机制，需要手动处理。<br>
    - watch 可以通过返回的停止函数进行清理。

5. **使用场景**：
    - watchEffect 适合不需要新旧值比较的副作用操作。<br>
    - watch 适合需要根据数据变化执行具体逻辑的场景。