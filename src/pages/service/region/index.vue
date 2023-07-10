<!-- 基础列表页（带图） -->
<template>
  <router-view v-if="url !== '/service/region'"></router-view>
  <div v-else class="base-up-wapper bgTable">
    <!-- 搜索表单区域 -->
    <!-- <searchFormBox
      @handleSearch="handleSearch"
      @handleReset="handleReset"
    ></searchFormBox> -->
    <!-- end -->
    <!-- 表格 -->
    <tableList
      :list-data="listData"
      :pagination="pagination"
      @handleBuild="handleBuild"
      @handleClickDelete="handleClickDelete"
      @handleClickEdit="handleClickEdit"
      @fetchData="fetchData"
      @handleSort="handleSort"
      @onPageChange="onPageChange"
    ></tableList>
    <!-- end -->
    <!-- 新增，编辑弹窗 -->
    <DialogForm
      ref="dialogForm"
      :visible="visible"
      :title="title"
      :cityList="cityList"
      :edit="edit"
      :formData="formData"
      @handleClose="handleClose"
      @confirmEdit="confirmEdit"
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

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { useRoute } from 'vue-router'
import { regionList, regionAdd, regionEdit, regionDelete } from '@/api/service'
import { cityList } from './city'
import DialogForm from './components/DialogForm.vue' // 新增,编辑弹窗.
import tableList from './components/TableList.vue' // 表格
import Delete from '@/components/Delete/index.vue' // 删除弹层

const route = useRoute()
const visible = ref(false) // 新增，编辑弹窗
const listData = ref([]) // 列表数据
const dialogForm = ref(null) // 弹窗
const title = ref('新增区域') // 弹窗标题
const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const deleteText = ref('此操作将永久删除这条信息，是否继续？') // 删除的内容
const url = ref('') // 当前路由
const edit = ref(false) // 是否是编辑
const editId = ref('') // 编辑的id
// 分页
const pagination = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
})
// 请求数据参数
const requestData = ref({
  isAsc1: 'false',
  isAsc2: '',
  orderBy1: 'updateTime',
  orderBy2: '',
  pageNo: 1,
  pageSize: 10
})
// 表单内容
const formData = ref({
  cityCode: '',
  name: '',
  managerPhone: '',
  managerName: ''
}) // 表单内容
const deleteId = ref('') // 删除的id
// 生命周期
onMounted(() => {
  fetchData(requestData.value)
})
// 分页
// 获取列表数据
const fetchData = async (val) => {
  await regionList(val).then((res) => {
    if(res.code === 200){
      listData.value = res.data.list
    pagination.value.total = Number(res.data.total)
    }else{
      MessagePlugin.error(res.msg)
    }
  }).catch((err) => {
    console.log(err);
  })
}
// 关闭弹窗
const handleClose = () => {
  visible.value = false // 关闭新增弹窗
  dialogDeleteVisible.value = false // 关闭删除弹层
}
// 点击新建
const handleBuild = () => {
  edit.value = false
  // 显示新建弹窗
  visible.value = true
  // 将弹窗的标题改为新建
  title.value = '新增区域'
}
// 点击编辑
const handleClickEdit = (val) => {
  editId.value = val.id
  formData.value.cityCode = val.cityCode
  formData.value.name = val.name
  formData.value.managerPhone = val.managerPhone
  formData.value.managerName = val.managerName
  visible.value = true
  // 将弹窗的标题改为新建
  edit.value = true
  title.value = '编辑区域'
}
// 确认新增或编辑
const confirmEdit = async (val) =>{
  if (title.value === '新增区域') {
    // 新增
    await regionAdd(val).then((res) => {
      if(res.code === 200){
        MessagePlugin.success('新增成功')
        dialogForm.value.onClickCloseBtn()
      fetchData(requestData.value)
      }else{
        MessagePlugin.error(res.msg)
      }
    }).catch((err) => {
    console.log(err);
  })
  } else {
    // 编辑
    await regionEdit({managerName:val.managerName,managerPhone:val.managerPhone}, editId.value).then((res) => {
      console.log(res);
      if(res.data.code === 200){
        MessagePlugin.success('编辑成功')
        dialogForm.value.onClickCloseBtn()
        fetchData(requestData.value)
      }else{
        MessagePlugin.error(res.data.msg)
      }
    }).catch((err) => {
    console.log(err);
  })
  }
}
// 点击删除
const handleClickDelete = (row) => {
  dialogDeleteVisible.value = true
  deleteId.value = row.id
}
// 确认删除
const handleDelete = async () => {
  await regionDelete(deleteId.value).then((res) => {
    console.log(res);
    if(res.code === 200){
      MessagePlugin.success('删除成功')
      dialogDeleteVisible.value = false
      fetchData(requestData.value)
    }else{
      MessagePlugin.error(res.msg)
    }
  }).catch((err) => {
    console.log(err);
  })
}
// 点击排序
const handleSort = (val) => {
  if(val.descending === true){
    requestData.value.isAsc1 = 'false'
    fetchData(requestData.value)
  }else{
    requestData.value.isAsc1 = 'true'
    fetchData(requestData.value)
  }
}
// 点击翻页
const onPageChange = (val) => {
  requestData.value.pageNo = val.defaultCurrent
  requestData.value.pageSize = val.defaultPageSize
  fetchData(requestData.value)
}
// 监听
watchEffect(() => {
  if (route.path === '/service/region') {
    url.value = route.path
    fetchData(requestData.value)
  } else {
    url.value = route.path
    fetchData(requestData.value)
  }
})
</script>
