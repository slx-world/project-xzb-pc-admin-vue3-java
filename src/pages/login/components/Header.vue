<template>
  <header class="login-header">
    <div> 
      <span @click="toggleSettingPanel('side')">登录风格一</span>
      <span @click="toggleSettingPanel('top')">登录风格二</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store'

const settingStore = useSettingStore()
const toggleSettingPanel = layout => {
  settingStore.updateConfig({
    layout
  })
}
</script>

<style lang="less" scoped>
.login-header {
  position: absolute;
  width: 100%;
  z-index: 9999;
  padding: 10px 4px;
  display: flex;
  justify-content:flex-end;
  align-items: center;
  span{
    border-radius: 6px;
    color: var(--color-bk6);
    border:solid 1px var(--color-bk6);
    font-size: 10px;
    margin-right: 10px;
    padding: 2px 8px;
    cursor: pointer;
  }
}
</style>
