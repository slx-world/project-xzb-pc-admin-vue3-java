<template>
  <div class="navLaftFloat">
    <ul>
      <li
        v-for="(item, index) in leftMenu"
        :key="index"
        :class="isActive === index ? 'active' : ''"
        @click="scrollTagHandle(index)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 获取父组件值、方法
const props = defineProps({
  leftMenu: {
    type: Array<Object | any>,
    default: () => []
  }
})
// ------定义变量------
const isActive = ref(0)
const listBoxState = ref(true)
onMounted(() => {
  // 监听页面滚动事件
  window.addEventListener('scroll', scrollToTop, true)
})
// 页面滚动
const scrollToTop = (e) => {
  // 获取视窗高度
  const { scrollTop } = e.target // 鼠标滚动的位置
  // const { offsetTop } = document.querySelector('#menuFlag')
  // whether.value = scrollTop > offsetTop
  if (listBoxState.value) {
    // 作用是点击导航栏时，延迟这里执行。
    props.leftMenu.forEach((val, index) => {
      // 获取监听元素距离视窗顶部距离
      const tagOffsetTop = document.querySelector(`#tag${index}`) as any // 获取监听元素本身高度
      const tagscrollHeight = document.querySelector(`#tag${index}`) as any // 如果 dom滚动位置 >= 元素距离视窗距离 && dom滚动位置 <= 元素距离视窗距离+元素本身高度 // 则表示页面已经滚动到可视区了。
      if (tagOffsetTop) {
        if (
          scrollTop >= tagOffsetTop.offsetTop - 100 &&
          scrollTop <=
            tagOffsetTop.offsetTop + tagscrollHeight.scrollHeight - 100
        ) {
          // 导航栏背景色选中
          isActive.value = index
        }
      }
    })
  }
}
// 触发左侧菜单
const scrollTagHandle = (index) => {
  isActive.value = index
  document.querySelector(`#tag${index}`).scrollIntoView()
  listBoxState.value = false
  let timeId
  clearTimeout(timeId)
  timeId = setTimeout(() => {
    listBoxState.value = true
  }, 200)
}
</script>
