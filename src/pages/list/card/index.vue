<!-- 卡片列表页 -->
<template>
  <div>
    <!-- 表格列表 -->
    <CardList
      v-if="pagination.total > 0 && !dataLoading"
      :product-list="productList"
      :pagination="
          pagination.total <= 10 || !pagination.total ? null : pagination
        "
      :on-page-size-change="onPageSizeChange"
      :on-current-change="onCurrentChange"
      @handleSetupContract="handleSetupContract"
      @handleClickDelete="handleClickDelete"
    />
    <!-- end -->
    <!-- loading -->
    <div v-else-if="dataLoading" class="list-card-loading">
      <t-loading size="small" text="加载数据中..." />
    </div>
    <!-- end -->
    <!-- 新增编辑弹层 -->
    <dialog-form
      :visible="visible"
      :title="title"
      :data="DialogFormdata"
      :form-data="formData"
      @handleClose="handleClose"
      @fetchData="fetchData"
    />
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
</template>

<script lang="ts">
export default {
  name: 'ListCard'
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { getCardList } from '@/api/list'
import CardList from './components/CardList.vue'
import DialogForm from './components/DialogForm.vue' // 新增,编辑弹窗.
import Delete from '@/components/Delete/index.vue' // 删除弹层
// 初始化数据
const INITIAL_DATA = {
  index: 1,
  type: '',
  modelNumber: '',
  name: '',
  createTime: ''
}
const visible = ref(false) // 新增，编辑弹窗
const title = ref('') // 弹窗标题
const DialogFormdata = ref({}) // 弹窗表单内容
const pagination = ref({ current: 1, pageSize: 36, total: 0 }) // 分页
const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const deleteText = ref('此操作将永久删除这条信息，是否继续？') // 删除的内容
// 列表数据
const productList = ref([])
// 列表数据加载loading
const dataLoading = ref(true)
// 获取数据
const fetchData = async () => {
  try {
    const res = await getCardList()
    productList.value = res.data.list
    pagination.value = {
      ...pagination.value,
      total: res.data.list.length
    }
  } catch (e) {
    console.log(e)
  } finally {
    dataLoading.value = false
  }
}
// 生命周期
onMounted(() => {
  fetchData()
})
// 重置数据
const formData = ref({ ...INITIAL_DATA })
// 关闭弹窗
const handleClose = () => {
  visible.value = false // 关闭新增弹窗
  dialogDeleteVisible.value = false // 关闭删除弹层
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
  fetchData()
}
// 点击删除
const handleClickDelete = (row: { rowIndex: any }) => {
  dialogDeleteVisible.value = true
}
const onPageSizeChange = (size: number) => {
  pagination.value.pageSize = size
  pagination.value.current = 1
}
const onCurrentChange = (current: number) => {
  pagination.value.current = current
  fetchData()
}
</script>

<style lang="less" scoped>
.list-card-loading {
  display: flex;
  justify-content: center;
  height: 45vw;
}
</style>
