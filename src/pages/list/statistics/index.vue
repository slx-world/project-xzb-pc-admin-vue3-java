<!-- 数据统计列表页 -->
<template>
  <div class="statistics-wapper">
    <div class="bg-wt mb-24">
      <!-- 基本数据 -->
      <BaseData></BaseData>
      <!-- end -->
    </div>
    <div class="bg-wt">
      <!-- 搜索 -->
      <SearchFrom
        :pagination="
          pagination.total <= 10 || !pagination.total ? null : pagination
        "
        @handleSearch="handleSearch"
        @handleReset="handleReset"
      ></SearchFrom>
      <!-- end -->
    </div>
    <div class="bg-wt">
      <!-- 新增 -->
      <div class="newBox newAdd">
        <button class="bt newBoxbutton" @click="handleAdd()">新建</button>
      </div>
      <!-- end -->
      <!-- 列表 -->
      <List
        :list-data="listData"
        :pagination="
          pagination.total <= 10 || !pagination.total ? null : pagination
        "
        :data-loading="dataLoading"
        @handle-open-delete="handleOpenDelete"
        @get-status="getStatus"
        @handle-open-form-dialog="handleOpenFormDialog"
      ></List>
      <!-- end -->
      <!-- 新增编辑表单 -->
      <DialogForm
        :visible="dialogFormVisible"
        :data="formData"
        @handle-close="handleCloseDialog"
      ></DialogForm>
      <!-- end -->
      <!-- 删除弹层 -->
      <Delete
        :dialog-delete-visible="dialogDeleteVisible"
        :delete-text="deleteText"
        @handle-delete="handleDelete"
        @handle-close="handleClose"
      ></Delete>
      <!-- end -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
// 接口
import { getList } from '@/api/list'
// 组件
// 基础统计数据
import BaseData from './components/Data.vue'
// 搜索
import SearchFrom from './components/SearchForm.vue'
// 列表组件
import List from './components/List.vue'
// 删除弹层
import Delete from '@/components/Delete/index.vue'
// 新增编辑表单
import DialogForm from './components/DialogForm.vue'
// ------定义变量------
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 是否显示加载
const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const dialogFormVisible = ref(false) // 控制新增编辑表单弹层显示隐藏
const deleteText = ref('此操作将永久删除这条信息，是否继续？') // 删除的内容
const baseId = ref(null) // 列表id
const formData = ref({}) // 表单详情
// 分页
const pagination = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
} as any)
// ------生命周期------
onMounted(() => {
  getBaseList()
})
// ------定义方法------
// 获取基本数据
const getBaseList = async () => {
  dataLoading.value = true
  try {
    const res: any = await getList() // mock数据
    listData.value = res.data.list
    pagination.value.total = res.data.list.length
  } finally {
    dataLoading.value = false
  }
}
// 获取筛选数据
const getStatus = (val) => {
  // 具体根据不同的需求和后端定义的筛选参数来改下面参数名
  // 例如：
  pagination.value.status = val.sortby
  getBaseList()
}
// 新建
const handleAdd = () => {
  dialogFormVisible.value = true
}
// 打开新增编辑弹层
const handleOpenFormDialog = (val) => {
  formData.value = JSON.parse(JSON.stringify(val))
  baseId.value = val.index
  dialogFormVisible.value = true
}
// 关闭新增编辑弹层
const handleCloseDialog = () => {
  dialogFormVisible.value = false
}
// 确认删除
const handleDelete = () => {
  MessagePlugin.success('删除成功!')
  handleClose()
}
// 打开删除弹层
const handleOpenDelete = (val) => {
  baseId.value = val.index
  dialogDeleteVisible.value = true
}
// 关闭删除弹层
const handleClose = () => {
  dialogDeleteVisible.value = false
}
// 搜索功能
const handleSearch = () => {
  // 根据搜索框的内容进行搜索
  getBaseList()
}
// 重置，清空搜索框
const handleReset = () => {
  // 清空搜索框的全部内容并且重新获取数据
  // 重置页码
  pagination.value.defaultCurrent = 1
  getBaseList()
}
// // 设置每页条数
// const handleSizeChange = (val) => {
//   pagination.value.defaultPageSize = val
//   // 刷新列表
//   getBaseList()
// }
// // 当前页
// const handleCurrentChange = (val) => {
//   pagination.value.defaultCurrent = val.current
  pagination.value.defaultPageSize = val.pageSize
//   // 刷新列表
//   getBaseList()
// }
</script>
