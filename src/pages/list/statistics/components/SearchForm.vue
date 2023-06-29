<!--搜索页-->
<template>
  <div class="formBox">
    <t-form ref="ruleForm" :data="pagination" :label-width="70">
      <t-row>
        <t-col>
          <t-form-item label="规则编号：" name="index">
            <t-input
              v-model="pagination.index"
              class="form-item-content"
              type="search"
              placeholder="请输入"
            />
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="状态：" name="status">
            <t-select
              v-model="pagination.status"
              class="form-item-content"
              :options="STATUS"
              placeholder="请选择"
            />
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="规则：" name="serviceCallNumber">
            <t-input
              v-model="pagination.serviceCallNumber"
              class="form-item-content"
              placeholder="请输入"
            />
          </t-form-item>
        </t-col>
        <!-- 选择日期区间-->
        <t-col>
          <t-form-item label="创建时间：" name="updateTime">
            <t-date-range-picker
              v-model="pagination.updateTime"
              placeholder="日期"
              :presets="presets"
              :clearable="true"
            />
          </t-form-item>
        </t-col>
        <t-col class="searchBtn">
          <button class="bt-grey wt-60" @click="handleReset()">重置</button>
          <button class="bt wt-60" @click="handleSearch()">搜索</button>
        </t-col>
      </t-row>
    </t-form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { STATUS } from '@/constants'
// 获取父组件值、方法
// const props = defineProps({
//   //   分页信息
//   // pagination: {
//   //   type: Object,
//   //   default: () => ({})
//   // }
// })

// ------定义变量------
const ruleForm = ref(null) // 定义表单ref
const presets = ref({
  近一周: [
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    new Date()
  ],
  近三天: [
    new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
    new Date()
  ],
  近一天: [new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), new Date()]
}) // 时间选择器tag
// 父组件方法
const emit = defineEmits(['handleSearch', 'handleReset'])
const pagination = ref<Object | any>({})
// ------定义方法------
// 重置表单
const handleReset = () => {
  ruleForm.value.reset() // 清除表单
  emit('handleSearch')
}
// 搜索表单
const handleSearch = () => {
  emit('handleSearch')
}
</script>
<style lang="less" scoped src="../../index.less"></style>
