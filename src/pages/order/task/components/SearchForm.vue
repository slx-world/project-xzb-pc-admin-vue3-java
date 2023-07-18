<!-- 搜索表单区域 -->
<template>
  <div class="formBox bg-wt">
    <t-form ref="form" :data="formData" :label-width="70">
      <t-row>
        <t-col>
          <t-form-item label="订单编号：" name="name">
            <t-input
              v-model="formData.name"
              class="form-item-content"
              type="search"
              placeholder="请输入"
              clearable
            />
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="客户姓名：" name="name">
            <t-input
              v-model="formData.name"
              class="form-item-content"
              type="search"
              placeholder="请输入"
              clearable
            />
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="服务类型：" name="serveTypeId">
            <t-select
              v-model="formData.serveTypeId"
              class="form-item-content"
              :options="typeSelectList"
              placeholder="请选择"
              clearable
            />
          </t-form-item>
        </t-col>
        <t-col>
        <t-form-item label="创建时间：" name="status">
          <t-date-range-picker
              v-model="formData.updateTime"
              placeholder="日期"
              :presets="presets"
              clearable
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
import { ref, watchEffect } from 'vue'
import { STATUS } from '@/constants'
import { forEach } from 'lodash'
const props = defineProps({
  initSearch:{
    type: Number,
    default:0
  },
  typeSelect: {
    type: Array<{
      id: string
      name: string
    }>,
    default: () => {
      return []
    }
  }
})
const typeSelectList = ref([])
// 表单数据
const formData = ref({
  serveTypeId: '',
  name: '',
  isActive: '',
  updateTime: []
})
// 触发父组件的方法
const emit: Function = defineEmits(['handleSearch', 'handleReset'])
// 表单数据
const searchForm = {
  serveTypeId: '',
  name: '',
  isActive: '',
  updateTime: []
}
// 重置表单
const handleReset = () => {
  formData.value = { ...searchForm }
  emit('handleSearch', formData.value)
}
// 搜索表单
const handleSearch = () => {
  emit('handleSearch', formData.value)
}
// 时间选择器tag
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
}) 
watchEffect(()=>{
  if(props.initSearch){
    console.log(props.initSearch,'props.initSearch');
    formData.value.serveTypeId = props.initSearch.toString()
  }
  typeSelectList.value = props.typeSelect.map((item) => {
    return {
      label: item.name,
      value: item.id
    }
  })
})
</script>

<style lang="less" scoped></style>
<style lang="less" scoped src="../../index.less"></style>
