<template>
  <div>
    <div class="form-step-container">
      <!-- 简单步骤条 -->
      <t-card :bordered="false">
        <t-steps class="step-container" :current="activeForm" status="process">
          <t-step-item title="填写转账信息" content="这里是提示文字" />
          <t-step-item title="确认转账信息" content="这里是提示文字" />
          <t-step-item title="完成" content="这里是提示文字" />
        </t-steps>
      </t-card>
      <div class="formBox">
        <t-form
          v-show="activeForm === 0"
          class="step-form"
          :data="formData1"
          :rules="FORM_RULES"
          label-align="right"
          @submit="(result) => onSubmit(result, 1)"
        >
          <t-form-item label="付款账户：" name="payAccount">
            <t-input
              v-model="formData1.payAccount"
              class="mw-480"
              placeholder="请输入"
              clearable
            />
          </t-form-item>
          <t-form-item label="收款账户：" name="account">
            <t-select
              v-model="formData1.type"
              class="demo-select-base"
              clearable
            >
              <t-option
                v-for="(item, index) in NAME_OPTIONS"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
                {{ item.label }}
              </t-option>
            </t-select>
            <t-input
              v-model="formData1.account"
              placeholder="请输入"
              class="account"
              :disabled="!formData1.type"
              clearable
            />
          </t-form-item>
          <t-form-item label="收款人姓名：" name="name">
            <t-input
              v-model="formData1.name"
              class="mw-480"
              placeholder="请输入"
              clearable
            />
          </t-form-item>
          <t-form-item label="转账金额：" name="amount">
            <t-input
              v-model="formData1.amount"
              class="mw-480"
              placeholder="请输入"
              suffix="元"
              clearable
            />
          </t-form-item>
          <t-form-item>
            <button theme="primary" type="submit" class="bt next">
              下一步
            </button>
          </t-form-item>
        </t-form>
      </div>
      <!-- 分步表单1 -->

      <!-- 分步表单2 -->
      <div v-show="activeForm === 1" class="formBox">
        <div style="min-width: 508px">
          <div v-show="activeForm === 1" class="rule-tips">
            <t-alert
              theme="info"
              title="确认转账后，资金将直接打入对方账户，无法退回。"
              :close="true"
            >
            </t-alert>
          </div>
          <div class="formBoxbody">
            <div class="confirm Title">
              <div class="itemTitle">付款账户：</div>
              <div class="item">{{ formData1.payAccount }}</div>
            </div>
            <div class="confirm Title">
              <div class="itemTitle">收款账号：</div>
              <div class="item">{{ formData1.account }}</div>
            </div>
            <div class="confirm Title">
              <div class="itemTitle">收款人姓名：</div>
              <div class="item">{{ formData1.name }}</div>
            </div>
            <div class="confirm Title">
              <div class="itemTitle">转账金额：</div>
              <div class="item">
                <span>{{
                  formData1.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }}</span
                >元
              </div>
            </div>
          </div>
          <div class="formBoxbottom">
            <t-form
              v-show="activeForm === 1"
              class="step-form"
              :data="formData2"
              :rules="FORM_RULES"
              label-align="right"
              @reset="onReset(0)"
              @submit="(result) => onSubmit(result, 2)"
            >
              <t-form-item label="支付密码：" name="password">
                <t-input
                  v-model="formData2.password"
                  :style="{ minWidth: '346px' }"
                  class="password"
                  type="password"
                  placeholder="请输入支付密码123456"
                  autocomplete="username"
                  clearable
                />
              </t-form-item>
              <t-form-item>
                <button
                  type="reset"
                  theme="default"
                  variant="base"
                  class="next bt bt-grey"
                >
                  上一步
                </button>
                <button class="submit-btn bt" theme="primary" type="submit">
                  提 交
                </button>
              </t-form-item>
            </t-form>
          </div>
        </div>
      </div>

      <!-- 分步表单3 -->
      <div class="formBox">
        <div v-show="activeForm === 2">
          <div class="step-form-4">
            <t-icon
              name="check-circle-filled"
              style="color: #27ba9b"
              size="72px"
            />
            <p class="text">操作成功</p>
            <p class="tips">预计两小时内到账</p>
            <div class="button-group">
              <button
                theme="primary"
                class="again bt bt-grey"
                @click="complete"
              >
                查看账单
              </button>
              <button
                variant="base"
                theme="default"
                class="again bt"
                @click="onReset(0)"
              >
                再转一笔
              </button>
            </div>
          </div>
          <div class="formBoxbody-3 formBoxbody">
            <div class="Title">
              <div class="itemTitle">付款账户：</div>
              <div class="item">{{ formData1.payAccount }}</div>
            </div>
            <div class="Title">
              <div class="itemTitle">收款账号：</div>
              <div class="item">{{ formData1.account }}</div>
            </div>
            <div class="Title">
              <div class="itemTitle">收款人姓名：</div>
              <div class="item">{{ formData1.name }}</div>
            </div>
            <div class="Title">
              <div class="itemTitle">转账金额：</div>
              <div class="item">
                <span>{{
                  formData1.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }}</span
                >元
                <span class="Bigitem">
                  <!-- 将formData1.amount的值转变为大写元 -->
                  ({{ changeAmount(formData1.amount) }})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FormStep'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { MessagePlugin, ValidateResultContext } from 'tdesign-vue-next'
import { addList, validatePassword } from '@/api/form' // 导入接口

import {
  FORM_RULES,
  NAME_OPTIONS,
  INITIAL_DATA1,
  INITIAL_DATA2
} from './constants'

const formData1 = ref({ ...INITIAL_DATA1 })
const formData2 = ref({ ...INITIAL_DATA2 })
const activeForm = ref(0)

const onSubmit = (result: ValidateResultContext<FormData>, val: number) => {
  if (result.validateResult === true) {
    if (val === 1) {
      // 调用接口
      addList(formData1.value).then((res: any) => {
        if (res.code === 200) {
          activeForm.value = val
        } else {
          alert(res.msg)
        }
      })
    }
    if (val === 2) {
      // 调用接口
      validatePassword(formData2.value).then((res: any) => {
        if (res.code === 200 && res.msg !== '密码错误') {
          activeForm.value = val
        } else {
          MessagePlugin.error(res.msg)
        }
      })
    }
  }
}
// 重置表单
const onReset = (val: number) => {
  formData1.value = { ...INITIAL_DATA1 }
  formData2.value = { ...INITIAL_DATA2 }
  activeForm.value = val
}
const complete = () => {
  window.location.reload()
}
// 创建函数将金额转换为大写
const changeAmount = (amount: string) => {
  // 将num的类型定义为number或者string
  let num: string = amount // 将输入的字符串转换为数字
  let strOutput = '' // 输出的中文金额字符串
  let strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分' // 金额单位
  num += '00' // 金额的分为单位
  const intPos = num.indexOf('.')
  if (intPos >= 0) {
    num = num.substring(0, intPos) + num.substr(intPos + 1, 2)
  }
  strUnit = strUnit.substr(strUnit.length - num.length)
  for (let i = 0; i < num.length; i++) {
    strOutput +=
      '零壹贰叁肆伍陆柒捌玖'.substr(parseInt(num.substr(i, 1), 10), 1) +
      strUnit.substr(i, 1)
  }
  return strOutput
    .replace(/零角零分$/, '整')
    .replace(/零[仟佰拾]/g, '零')
    .replace(/零{2,}/g, '零')
    .replace(/零([亿|万])/g, '$1')
    .replace(/零+元/, '元')
    .replace(/亿零{0,3}万/, '亿')
    .replace(/^元/, '零元')
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
