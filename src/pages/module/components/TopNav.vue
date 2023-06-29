<template>
  <div id="menuFlag" class="menuNav" :class="whether ? 'isFixed' : ''">
    <div class="navTit">
      <span>{{ title }}</span>

      <div v-if="navData.length > 1" class="navTop">
        <span
          v-for="(item, index) in navData"
          :key="index"
          :class="isTopActive === index ? 'topActive' : ''"
          @click="handleNav(index)"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 获取父组件值、方法
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  navData: {
    type: Array<Object | any>,
    default: () => []
  }
})
// ------定义变量------
const emit = defineEmits(['getTopActive'])
const whether = ref(false)
const isTopActive = ref(0)
onMounted(() => {
  // 监听页面滚动事件
  console.log(window)
  window.addEventListener('scroll', scrollToTop, true)
})
// 页面滚动
const scrollToTop = (e) => {
  // 获取视窗高度
  const { scrollTop } = e.target // 鼠标滚动的位置
  const { offsetTop } = document.querySelector('#menuFlag') as any
  whether.value = scrollTop > offsetTop
  console.log(111, offsetTop)
}
//
const handleNav = (index) => {
  isTopActive.value = index
  emit('getTopActive', index)
}
</script>
