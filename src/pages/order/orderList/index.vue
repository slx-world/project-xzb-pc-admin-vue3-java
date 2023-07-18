<!-- 基础列表页（带图） -->
<template>
  <router-view v-if="url !== '/order/orderList'"></router-view>
  <div v-else class="base-up-wapper bgTable min-h">
    <div class="bg-wt mb-24">
      <!-- 基本数据 -->
      <BaseData></BaseData>
      <!-- end -->
    </div>
    <!-- 搜索表单区域 -->
    <searchFormBox
      :initSearch="initSearch"
      :typeSelect="typeSelect"
      @handleSearch="handleSearch"
      @handleReset="handleReset"
    ></searchFormBox>
    <!-- end -->
    <!-- 表格 -->
    <tableList
      :list-data="listData"
      :pagination="pagination"
      @handleClickCancel="handleClickCancel"
      @fetchData="fetchData"
      @onPageChange="onPageChange"
      @handleClickRefund="handleClickRefund"
      @handleSortChange="handleSortChange"
    ></tableList>
    <!-- end -->
    <!-- 新增，编辑弹窗 -->
    <DialogForm
      :visible="visible"
      :title="title"
      :label="label"
      :data="DialogFormData"
      @handleClose="handleClose"
      @fetchData="fetchData"
    />
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { useRoute, useRouter } from 'vue-router'
import {
  serviceTypeSimpleList,
  serviceItemList,
} from '@/api/service'
import { forEach } from 'lodash'
// 基础统计数据
import BaseData from './components/Data.vue'
import DialogForm from './components/DialogForm.vue' // 新增,编辑弹窗.
import tableList from './components/TableList.vue' // 表格
import searchFormBox from './components/SearchForm.vue' // 搜索框表单

const route = useRoute()
const router = useRouter()
const visible = ref(false) // 新增，编辑弹窗
const listData = ref([]) // 列表数据
const label = ref('') // 弹窗label
const dataLoading = ref(false) // 列表数据加载loading
const DialogFormData = ref({}) // 弹窗表单内容
const title = ref('新建') // 弹窗标题
const url = ref('') // 当前路由
const initSearch = ref() // 条转过来的携带数据
const typeSelect = ref([]) // 服务类型下拉框数据
// 分页
const pagination = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
})
const requestData = ref({
  isAsc1: true,
  isAsc2: false,
  orderBy1: 'sortNum',
  orderBy2: 'updateTime',
  pageNo: 1,
  pageSize: 10,
  name: '',
  serveTypeId: ''
}) // 请求参数
// 生命周期
onMounted(() => {
  fetchData(requestData.value)
})
// 搜索功能
const handleSearch = (val) => {
  requestData.value.name = val.name
  requestData.value.serveTypeId = val.serveTypeId
  fetchData(requestData.value)
}
// 分页

// 重置，清空搜索框
const handleReset = () => {
  // 清空搜索框的全部内容并且重新获取数据
  // 重置页码
  pagination.value.defaultCurrent = 1
  fetchData(requestData.value)
  // 重新渲染table
}
// 获取服务类型下拉框数据
const getServiceTypeSimpleList = async () => {
  await serviceTypeSimpleList()
    .then((res) => {
      if (res.code === 200) {
        typeSelect.value = res.data
      } else {
        MessagePlugin.error(res.message)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 获取列表数据
const fetchData = async (val) => {
  dataLoading.value = true
  await serviceItemList(val)
    .then((res) => {
      if (res.code === 200) {
        listData.value = res.data.list
        pagination.value.total = Number(res.data.total)
        dataLoading.value = false
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 关闭弹窗
const handleClose = () => {
  visible.value = false // 关闭新增弹窗
}
// 点击取消
const handleClickCancel = (row) => {
  visible.value = true
  title.value = '请填写取消原因'
  label.value = '取消原因：'
}
// 排序
const handleSortChange = (val) => {
  forEach(val, (item) => {
    if (item.sortBy === 'sortNum') {
      if (item.descending === true) {
        requestData.value.isAsc1 = false
      } else {
        requestData.value.isAsc1 = true
      }
    } else {
      if (item.descending === true) {
        requestData.value.isAsc2 = false
      } else {
        requestData.value.isAsc2 = true
      }
    }
  })
  fetchData(requestData.value)
}
// 打开退款弹窗
const handleClickRefund = (row) => {
  visible.value = true
  title.value = '填写退款原因'
  label.value = '退款原因：'
}
// 翻页
const onPageChange = (val) => {
  requestData.value.pageNo = val.defaultCurrent
  requestData.value.pageSize = val.defaultPageSize
  fetchData(requestData.value)
}
watchEffect(() => {
  if (route.path === 'order/orderList') {
    url.value = 'order/orderList'
    getServiceTypeSimpleList()
    fetchData(requestData.value)
  } else {
    url.value = route.path
    getServiceTypeSimpleList()
    fetchData(requestData.value)
  }
  if (!initSearch.value && route.query.id) {
    initSearch.value = route.query.id
    requestData.value.serveTypeId = initSearch.value
    fetchData(requestData.value)
    router.replace({
      path: route.path,
      query: {}
    })
  }
})
</script>
<style lang="less" scoped>

.min-h{
    min-height: 720px !important;
  }
</style>