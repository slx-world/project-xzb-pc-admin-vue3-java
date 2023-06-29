<template>
  <div>
    <!-- 风格一的登录 -->
    <div v-if="setting.layout.value === 'side'" class="login-wrapper">
      <login-header />
      <div class="login-container">
        <div class="title-container">
          <h1 class="title">
            <img src="@/assets/test-img/logofull.png" alt="" class="logo" />
          </h1>
        </div>
        <login v-if="type === 'login'" />
        <register v-else @register-success="switchType('login')" />
      </div>
      <div class="companyFooter">
        Copyright @ 2019-2020 Tencent. All Rights Reserved
      </div>
    </div>
    <!-- 风格二的登录 -->
    <div v-else class="login-wrapper type2">
      <login-header />
      <div class="left">
        <div class="login-container">
          <div class="title-container">
            <h1 class="title">
              <img src="@/assets/test-img/logofull.png" alt="" class="logo" />
            </h1>
          </div>
          <login2 v-if="type === 'login'" />
        </div>
        <footer class="copyright">
          Copyright @ 2021-2022 czri. All Rights Reserved
        </footer>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import Login from './components/Login.vue'
import Login2 from './components/Login2.vue'
import Register from './components/Register.vue'
import LoginHeader from './components/Header.vue'
// 设置相关操作
import { useSettingStore } from '@/store'

const settingStore = useSettingStore()
const setting = storeToRefs(settingStore)

const type = ref('login')
const switchType = (val: string) => {
  type.value = val
}
</script>

<style lang="less" scoped>
@import url('./index.less');
// 分格二样式 如果使用分格一 直接删除
.type2 {
  flex-direction: row;
  .login-container {
    background: transparent;
    top: auto;
    left: auto;
    transform: translateX(0);
  }
  .left {
    min-width: 600px;
    height: 100%;
    background: #f7faff;
    // 内容居中
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .right {
    min-width: 766px;
    width: 100%;
    height: 100%;
    background: #f7faff;
    background-image: url(@/assets/test-img/bj2.png);
    // 撑满父元素
    background-size: cover;
    background-repeat: no-repeat;
  }
}

//风格一登录样式
.login-wrapper {
  position: relative;
  .companyFooter {
    position: absolute;
    bottom: 0;
    background-color: transparent;
    left: 50%;
    transform: translateX(-50%);
    color: #c0d1ff;
  }
}
.logo {
  width: 167px;
  height: 60px;
}
</style>
