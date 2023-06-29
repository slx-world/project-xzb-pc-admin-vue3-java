<!-- 用户名密码登录 - 风格一 -->
<template>
  <switchBar :data="tableBar" @changeId="changeId"></switchBar>
  <t-form
    ref="form"
    :class="['item-container', `login-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <!-- 密码登录 -->
    <template v-if="type == 2">
      <t-form-item name="account">
        <t-input
          v-model="formData.account"
          size="large"
          placeholder="账户"
          autocomplete="both"
          :format="formataccount"
          clearable
        >
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input
          v-model="formData.password"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          placeholder="密码"
          :format="formataccount"
          onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"
          autocomplete="both"
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
        </t-input>
      </t-form-item>

      <div class="check-container remember-pwd">
        <t-checkbox>自动登录</t-checkbox>
        <span class="font-bt tip">忘记密码</span>
      </div>
    </template>

    <!-- 扫码登陆
  <template v-else-if="type == 'qrcode'">
      <div class="tip-container">
        <span class="tip">请使用微信扫一扫登录</span>
        <span class="refresh">刷新 <t-icon name="refresh" /> </span>
      </div>
      <qrcode-vue value="" :size="192" level="H" />
    </template> -->

    <!-- 手机号登陆 -->
    <template v-else>
      <t-form-item name="phone">
        <t-input
          v-model="formData.phone"
          size="large"
          placeholder="手机号"
          onkeyup="this.value=this.value.replace(/\D/g,'')"
          :format="formatPhone"
        >
          <template #prefix-icon>
            <t-icon name="mobile" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item class="verification-code" name="verifyCode">
        <t-input
          v-model="formData.verifyCode"
          size="large"
          :format="formatPhone"
          placeholder="验证码"
          onkeyup="this.value=this.value.replace(/\D/g,'')"
        >
          <template #prefix-icon>
            <t-icon name="mail" />
          </template>
        </t-input>
        <t-button variant="outline" :disabled="countDown > 0" @click="sendCode">
          {{ countDown == 0 ? '获取验证码' : `${countDown}秒后可重发` }}
        </t-button>
      </t-form-item>
      <div class="check-container remember-pwd">
        <t-checkbox>记住手机号</t-checkbox>
      </div>
    </template>

    <t-form-item class="btn-container">
      <!-- <t-button block size="large" class="bt" type="submit"> 登录 </t-button> -->

      <t-loading v-if="loadSt" indicator class="bt load"></t-loading>
      <button v-else class="bt" type="submit">登录</button>
    </t-form-item>
  </t-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MessagePlugin } from 'tdesign-vue-next'
import type { FormInstanceFunctions, FormRule } from 'tdesign-vue-next'
import { useCounter } from '@/hooks'
import { useUserStore } from '@/store'
import { userLogins, getUserInfo } from '@/api/user'
import switchBar from '@/components/switchBar/switchBarindex.vue' // tab切换组件
import { validatePhone, validateCode } from '@/utils/validate'
import { tableBar } from './commonData'
// tab切换数据
const userStore = useUserStore()
// 登录loadding
const loadSt = ref(false)

const INITIAL_DATA = {
  phone: '',
  account: 'admin',
  password: 'admin',
  verifyCode: '',
  checked: false
}

const FORM_RULES: Record<string, FormRule[]> = {
  phone: [
    // 手机号校验
    {
      required: true,
      message: '请输入手机号',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validatePhone,
      message: '请输入正确格式的手机号',
      type: 'error',
      trigger: 'blur'
    }
  ],
  account: [{ required: true, message: '账号必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
  verifyCode: [
    { required: true, message: '验证码必填', type: 'error' },
    {
      validator: validateCode,
      message: '请输入正确格式的验证码',
      type: 'error',
      trigger: 'blur'
    }
  ]
}

const type = ref(2)

const form = ref<FormInstanceFunctions>()
const formData = ref({ ...INITIAL_DATA })
const showPsw = ref(false)

const [countDown, handleCounter] = useCounter()

const changeId = (val: number) => {
  type.value = val
}

const router = useRouter()
const route = useRoute()

/**
 * 发送验证码
 */
const sendCode = () => {
  form.value.validate({ fields: ['phone'] }).then((e) => {
    if (e === true) {
      handleCounter()
    }
  })
}

const onSubmit = async ({ validateResult }) => {
  if (validateResult === true) {
    loadSt.value = true
    // 登录相关
    userLogins(formData.value).then(async (res) => {
      if (res.code === 200) {
        // 用户token写入 pinia
        await userStore.login(res.data)
        // 获取用户信息 并存入pinia
        const { data } = await getUserInfo()
        userStore.setUserInfo(data)
        loadSt.value = false
        // 登录成功， 转入首页
        MessagePlugin.success('登录成功')
        const redirect = route.query.redirect as string
        const redirectUrl = redirect
          ? decodeURIComponent(redirect)
          : '/dashboard'
        router.push(redirectUrl)
      } else {
        MessagePlugin.success(res.msg)
      }
    })
  }
}
const formatPhone = (val: string) => {
  return val.replace(/\s/g, '').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
const formataccount = (val: string) => {
  return val.replace(/\s/g, '')
}
</script>

<style lang="less" scoped>
@import url('../index.less');
</style>
