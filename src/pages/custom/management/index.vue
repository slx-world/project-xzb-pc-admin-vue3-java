<!-- 基础列表页（带图） -->
<template>
  <div class="base-up-wapper bgTable min-h">
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
      :isActive="0"
      @handleSetupContract="handleSetupContract"
      @handleBuild="handleBuild"
      @handleClickFreeze="handleClickFreeze"
      @fetchData="fetchData"
      @onPageChange="onPageChange"
      @handleSortChange="handleSortChange"
    ></tableList>
    <!-- end -->
    <!-- 新增，编辑弹窗 -->
    <DialogForm
      :visible="visible"
      :title="title"
      :data="DialogFormData"
      @handleClose="handleClose"
      @fetchData="fetchData"
    />
    <!-- end -->
    <!-- 删除弹窗 -->
    <Delete
      :dialog-delete-visible="dialogFreezeVisible"
      :delete-text="deleteText"
      @handle-delete="handleFreeze"
      @handle-close="handleClose"
    ></Delete>
    <!-- end -->
    <!-- 上架/下架弹窗 -->
    <Confirm
      :title="confirmTitle"
      :dialog-confirm-visible="dialogConfirmVisible"
      :confirm-text="confirmText"
      @handle-confirm="handleConfirm"
      @handle-close="handleClose"
    ></Confirm>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { getCustomList, customFreeze } from '@/api/custom'
import { forEach } from 'lodash'
import DialogForm from './components/DialogForm.vue' // 新增,编辑弹窗.
import tableList from './components/TableList.vue' // 表格
import Delete from '@/components/Delete/index.vue' // 删除弹层
import Confirm from '@/components/Confirm/index.vue' // 确认弹层
import searchFormBox from './components/SearchForm.vue' // 搜索框表单

const route = useRoute()
const router = useRouter()
const visible = ref(false) // 新增，编辑弹窗
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 列表数据加载loading
const DialogFormData = ref({}) // 弹窗表单内容
const title = ref('新建') // 弹窗标题
const confirmTitle = ref('确认下架') // 确认弹窗标题
const dialogFreezeVisible = ref(false) // 控制删除弹层显示隐藏
const dialogConfirmVisible = ref(false) // 控制确认弹层显示隐藏
const deleteText = ref('此操作将永久删除这条信息，是否继续？') // 删除的内容
const confirmText = ref('此操作将永久下架这条信息，是否继续？') // 确认的内容
const initSearch = ref() // 条转过来的携带数据
const typeSelect = ref([]) // 服务类型下拉框数据
const freezeId = ref('') // 删除的id
// 分页
const pagination = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
})
const requestData = ref({
  isAsc1: true,
  orderBy1: 'createTime',
  pageNo: 1,
  pageSize: 10,
  name: '',
  serveTypeId: '',
  nickname: '',
  phone: ''
}) // 请求参数
// 上下架数据
const setupContractData = ref({
  id: '',
  flag: 0
})
// 生命周期
onMounted(() => {
  fetchData(requestData.value)
})
// 搜索功能
const handleSearch = (val) => {
  requestData.value.nickname = val.nickname
  requestData.value.phone = val.phone
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
// 获取列表数据
const fetchData = async (val) => {
  dataLoading.value = true
  await getCustomList(val)
    .then((res) => {
      console.log(res)
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
  dialogFreezeVisible.value = false // 关闭删除弹层
  dialogConfirmVisible.value = false // 关闭确认弹层
}
// 点击新建
const handleBuild = () => {
  router.push('/personnel/information/informationDetail')
}
// 上下架
const handleSetupContract = (val, id) => {
  dialogConfirmVisible.value = true
  setupContractData.value.id = val.id
  if (id !== 2) {
    confirmTitle.value = '确认上架'
    confirmText.value = '确定上架该服务吗？'
    setupContractData.value.flag = 2
  } else {
    confirmTitle.value = '确认下架'
    confirmText.value = '确定下架该服务吗？'
    setupContractData.value.flag = 1
  }
}
// 确认上下架
const handleConfirm = async () => {
  await customFreeze(setupContractData.value)
    .then((res) => {
      if (res.data.code === 200) {
        dialogConfirmVisible.value = false
        MessagePlugin.success('操作成功')
        fetchData(requestData.value)
      } else {
        MessagePlugin.error(res.data.msg)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 确认删除
const handleFreeze = async () => {
  await customFreeze(freezeId.value).then((res) => {
    if (res.code === 200) {
      dialogFreezeVisible.value = false
      MessagePlugin.success('删除成功')
      fetchData(requestData.value)
    } else {
      MessagePlugin.error(res.msg)
    }
  })
}
// 点击冻结
const handleClickFreeze = (row) => {
  freezeId.value = row.id
  // 编辑弹窗
  visible.value = true
  title.value = '冻结原因'
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
    }
  })
  fetchData(requestData.value)
}
// 翻页
const onPageChange = (val) => {
  requestData.value.pageNo = val.defaultCurrent
  requestData.value.pageSize = val.defaultPageSize
  fetchData(requestData.value)
}
</script>
<style lang="less" scoped>

</style>
