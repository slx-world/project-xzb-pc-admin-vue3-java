<!-- 基础列表页（带图） -->
<template>
  <div class="base-up-wapper bgTable">
    <!-- 搜索表单区域 -->
    <searchFormBox
      @handleSearch="handleSearch"
      @handleReset="handleReset"
    ></searchFormBox>
    <!-- end -->
    <!-- 表格 -->
    <tableList
      :list-data="listData"
      :pagination="pagination"
      @handleSetupContract="handleSetupContract"
      @handleBulid="handleBulid"
      @handleClickDelete="handleClickDelete"
      @fetchData="fetchData"
    ></tableList>
    <!-- end -->
    <!-- 新增，编辑弹窗 -->
    <DialogForm
      :visible="visible"
      :title="title"
      :data="DialogFormdata"
      :form-data="formData"
      @handleClose="handleClose"
      @fetchData="fetchData"
    />
    <!-- end -->
    <!-- 删除弹窗 -->
    <Delete
      :dialog-delete-visible="dialogDeleteVisible"
      :delete-text="deleteText"
      @handle-delete="handleDelete"
      @handle-close="handleClose"
    ></Delete>
    <!-- end -->
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
import { MessagePlugin } from 'tdesign-vue-next'
import { getList } from '@/api/list'
import DialogForm from './components/DialogForm.vue' // 新增,编辑弹窗.
import tableList from './components/TableList.vue' // 表格
import Delete from '@/components/Delete/index.vue' // 删除弹层
import searchFormBox from './components/SearchForm.vue' // 搜索框表单

const visible = ref(false) // 新增，编辑弹窗
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 列表数据加载loading
const DialogFormdata = ref({}) // 弹窗表单内容
const title = ref('新建') // 弹窗标题
const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const deleteText = ref('此操作将永久删除这条信息，是否继续？') // 删除的内容
// 分页
const pagination = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
})
// 搜索框表单
const searchForm = {
  index: '',
  status: undefined,
  serviceCallNumber: undefined,
  updateTime: []
}
// 表单内容
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
// 分页

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
    listData.value = res.data.list
    pagination.value.total = res.data.list.length
  } finally {
    dataLoading.value = false
  }
}
// 关闭弹窗
const handleClose = () => {
  visible.value = false // 关闭新增弹窗
  dialogDeleteVisible.value = false // 关闭删除弹层
}
// 点击新建
const handleBulid = () => {
  // 显示新建弹窗
  visible.value = true
  // 将弹窗的标题改为新建
  title.value = '新建'
}
// 点击编辑
const handleSetupContract = (val) => {
  DialogFormdata.value = JSON.parse(JSON.stringify(val))
  // 显示新建弹窗
  visible.value = true
  // 将弹窗的标题改为新建
  title.value = '编辑'
}
// 确认删除
const handleDelete = () => {
  dialogDeleteVisible.value = false
  MessagePlugin.success('删除成功')
  fetchData(pagination.value)
}
// 点击删除
const handleClickDelete = (row: { rowIndex: any }) => {
  dialogDeleteVisible.value = true
}
</script>
