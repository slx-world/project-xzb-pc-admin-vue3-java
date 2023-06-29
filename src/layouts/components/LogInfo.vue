<!-- 侧边栏退出栏 -->
<template>
  <div v-if="!settingStore.isSidebarCompact" class="navUserCont">
    <div class="fx fx-sb">
      <div class="header-user-account">
        <div class="baseInfo">
          <img
            class="header-user-avatar"
            name="user-circle"
            src="@/assets/pic-touxiang@2x(1).png"
          />
          <span class="header-user-name">Admin</span>
        </div>
        <span v-if="setting.layout.value === 'side'" class="splitLine"></span>
        <div class="logoutBox btn-hover-active" @click="handleLogout">
          <span class="header-user-logout"
            ><svg
              t="1675158094942"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2924"
              width="20px"
              height="20px"
              style="vertical-align: sub"
            >
              <path
                d="M184.552727 768l0-512c0-38.539636 31.278545-69.818182 69.818182-69.818182l302.545455 0L556.916364 139.636364l-325.818182 0c-51.432727 0-93.090909 41.658182-93.090909 93.090909l0 558.545455c0 51.432727 41.658182 93.090909 93.090909 93.090909l325.818182 0 0-46.545455-302.545455 0C215.784727 837.818182 184.552727 806.539636 184.552727 768zM924.113455 495.522909l-164.584727-164.584727c-9.076364-9.076364-23.831273-9.076364-32.907636 0-9.076364 9.076364-9.076364 23.831273 0 32.907636l124.834909 124.834909L394.007273 488.680727c-12.846545 0-23.272727 10.426182-23.272727 23.272727s10.426182 23.272727 23.272727 23.272727l457.448727 0-124.834909 124.834909c-9.076364 9.076364-9.076364 23.831273 0 32.907636 9.076364 9.076364 23.831273 9.076364 32.907636 0l164.584727-164.584727C933.189818 519.354182 933.189818 504.645818 924.113455 495.522909z"
                fill="#737373"
                p-id="2925"
              ></path>
            </svg>
          </span>
          <span v-if="setting.layout.value === 'top'" class="topLogout"
            >退出</span
          >
        </div>
      </div>
      <div class="header-user-list btn-hover-active">
        <span @click="changeCollapsed">
          <t-icon
            class="collapsed-icon"
            name="view-list"
            src="https://tdesign.gtimg.com/icon/default-demo/index.js"
          />
        </span>
      </div>
    </div>
  </div>
  <div v-if="settingStore.isSidebarCompact" class="put navUserCont">
    <div class="fx fx-sb">
      <div class="header-user-account">
        <img
          class="header-user-avatar"
          name="user-circle"
          src="@/assets/pic-touxiang@2x(1).png"
        />
      </div>
      <div class="header-user-logout btn-hover-active" @click="handleLogout">
        <svg
          t="1675158094942"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2924"
          width="20px"
          height="20px"
          style="vertical-align: sub"
        >
          <path
            d="M184.552727 768l0-512c0-38.539636 31.278545-69.818182 69.818182-69.818182l302.545455 0L556.916364 139.636364l-325.818182 0c-51.432727 0-93.090909 41.658182-93.090909 93.090909l0 558.545455c0 51.432727 41.658182 93.090909 93.090909 93.090909l325.818182 0 0-46.545455-302.545455 0C215.784727 837.818182 184.552727 806.539636 184.552727 768zM924.113455 495.522909l-164.584727-164.584727c-9.076364-9.076364-23.831273-9.076364-32.907636 0-9.076364 9.076364-9.076364 23.831273 0 32.907636l124.834909 124.834909L394.007273 488.680727c-12.846545 0-23.272727 10.426182-23.272727 23.272727s10.426182 23.272727 23.272727 23.272727l457.448727 0-124.834909 124.834909c-9.076364 9.076364-9.076364 23.831273 0 32.907636 9.076364 9.076364 23.831273 9.076364 32.907636 0l164.584727-164.584727C933.189818 519.354182 933.189818 504.645818 924.113455 495.522909z"
            fill="#000000"
            p-id="2925"
          ></path>
        </svg>
      </div>
      <div class="header-user-list btn-hover-active">
        <span @click="changeCollapsed">
          <t-icon
            class="collapsed-icon"
            name="view-list"
            src="https://tdesign.gtimg.com/icon/default-demo/index.js"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store'
import type { MenuRoute } from '@/types/interface'

const props = defineProps({
  theme: {
    type: String,
    default: ''
  },
  layout: {
    type: String,
    default: 'top'
  },
  showLogo: {
    type: Boolean,
    default: true
  },
  menu: {
    type: Array as PropType<MenuRoute[]>,
    default: () => []
  },
  isFixed: {
    type: Boolean,
    default: false
  },
  isCompact: {
    type: Boolean,
    default: false
  },
  maxLevel: {
    type: Number,
    default: 3
  }
})

const router = useRouter()
const settingStore = useSettingStore()
const setting = storeToRefs(settingStore)
// toggleSettingPanel，展示设置面板
const toggleSettingPanel = () => {
  settingStore.updateConfig({
    showSettingPanel: true
  })
}
// 展示面包屑
const showBreadcrumb = ref(false)
// 改变侧边栏收缩状态
const changeCollapsed = () => {
  settingStore.updateConfig({
    isSidebarCompact: !settingStore.isSidebarCompact
  })
  showBreadcrumb.value = !showBreadcrumb.value
}
// 点击退出
const handleLogout = () => {
  router.push({
    path: '/login',
    query: { redirect: encodeURIComponent(router.currentRoute.value.fullPath) }
  })
}
</script>
<style lang="less" scoped></style>
