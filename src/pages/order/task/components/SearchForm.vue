<!-- 搜索表单区域 -->
<template>
  <div class="formBox bg-wt">
    <t-form ref="form" :data="formData" :label-width="70">
      <t-row>
        <t-col>
          <t-form-item label="服务名称：" name="name">
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
        <t-form-item label="状态：" name="status">
            <t-select
              v-model="formData.isActive"
              class="form-item-content"
              :options="STATUS"
              placeholder="请选择"
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
  isActive: ''
})
// 触发父组件的方法
const emit: Function = defineEmits(['handleSearch', 'handleReset'])
// 表单数据
const searchForm = {
  serveTypeId: '',
  name: '',
  isActive: ''
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
