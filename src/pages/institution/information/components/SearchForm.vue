<!-- 搜索表单区域 -->
<template>
  <div class="formBox bg-wt">
    <t-form ref="form" :data="formData" :label-width="60">
      <t-row>
        <t-col>
          <t-form-item label="手机号：" name="phone">
            <t-input
              v-model="formData.phone"
              class="form-item-content"
              type="search"
              placeholder="请输入"
              clearable
            />
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="状态：" name="status">
            <t-radio-group  v-model="formData.status">
              <t-radio :value="1">全部</t-radio>
              <t-radio :value="2">正常</t-radio>
              <t-radio :value="3">冻结</t-radio>
            </t-radio-group>
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
import { ref} from 'vue'
const props = defineProps({
  initSearch: {
    type: Number,
    default: 0
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
// 表单数据
const formData = ref({
  phone: '',
  status: 1
})
// 触发父组件的方法
const emit: Function = defineEmits(['handleSearch', 'handleReset'])
// 表单数据
const searchForm = {
  phone: '',
  status: 1
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
</script>

<style lang="less" scoped></style>
<style lang="less" scoped src="../../index.less"></style>
