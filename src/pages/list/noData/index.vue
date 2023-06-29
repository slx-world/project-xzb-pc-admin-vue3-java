<!-- 无数据列表页 -->
<template>
  <div class="base-no-data bg-wt">
    <div class="baseList MH-716">
      <searchFormBox
        :pagination="pagination"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
      ></searchFormBox>
      <!-- 表格 -->
      <tableList
        :list-data="listData"
        :pagination="null"
        @handleSetupContract="handleSetupContract"
        @handleBulid="handleBulid"
        @handleClickDelete="handleClickDelete"
        @fetchData="fetchData"
      ></tableList>
      <!-- 生产环境禁用操作弹窗 -->
      <ProdDisabled
        :confirm-visible="prodDisabledVisible"
        :type="type"
        @handleClose="handleClose"
      ></ProdDisabled>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ListBase',
  components: { tableList, searchFormBox }
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getList } from '@/api/list'
import tableList from './components/tableList.vue' // 表格
import searchFormBox from './components/searchForm.vue' // 搜索框表单
import ProdDisabled from '@/components/Message/ProdDisabled.vue' // 删除弹窗

const visible = ref(false) // 新增，编辑弹窗
const confirmVisible = ref(false) // 删除弹窗
const listData = ref([]) // 列表数据
const dataLoading = ref(false)
const DialogFormdata = ref({}) // 弹窗表单内容
const title = ref('新建') // 弹窗标题
const prodDisabledVisible = ref(false)
const type = ref('incomplete') // incomplete功能未完成 forbidden功能禁止
// 分页
const pagination = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
})
// 搜索框表单内容
const searchForm = {
  index: '',
  status: undefined,
  serviceCallNumber: undefined,
  updateTime: []
}
const formData = ref({ ...searchForm }) // 表单内容
// 生命周期
onMounted(() => {
  fetchData(pagination.value)
})
// 搜索功能
const handleSearch = (val) => {
  // 根据搜索框的内容进行搜索
  fetchData(val)
}
// 重置，清空搜索框
const handleReset = () => {
  // 清空搜索框的全部内容并且重新获取数据
  // 重置页码
  pagination.value.defaultCurrent = 1
  fetchData(pagination.value)
  // 重新渲染table
}
// 获取列表数据
const fetchData = async (val) => {
  dataLoading.value = true
  try {
    const res: any = await getList() // 获取列表数据,当前为mock接口，后续会替换为真实接口，并接受真实数据传值
    listData.value = []
    pagination.value.total = res.data.list.length
  } finally {
    dataLoading.value = false
  }
}
// 关闭弹窗
const handleClose = () => {
  visible.value = false // 关闭新增弹窗
  confirmVisible.value = false // 关闭删除弹窗
  prodDisabledVisible.value = false
  // 刷新页面
  fetchData(pagination.value)
}
// 点击新建
const handleBulid = (params) => {
  // // 显示新建弹窗
  // visible.value = true
  // // 将弹窗的标题改为新建
  // title.value = '新建'
  type.value = params
  prodDisabledVisible.value = true
}
// 点击编辑
const handleSetupContract = (val) => {
  DialogFormdata.value = JSON.parse(JSON.stringify(val))
  // 显示新建弹窗
  visible.value = true
  // 将弹窗的标题改为新建
  title.value = '编辑'
}
// 点击删除
const handleClickDelete = (row: { rowIndex: any }) => {
  confirmVisible.value = true
}
</script>
<style lang="less" scoped>
.bg-wt {
  .MH-716 {
    min-height: 644px;
  }
}
</style>
