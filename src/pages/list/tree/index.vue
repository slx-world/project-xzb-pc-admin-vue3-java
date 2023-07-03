<!-- 树状列表页 -->
<template>
  <div class="tree-wapper bgTable fx br-2">
    <!-- 左半部分树 -->
    <div class="left">
      <Tree @getTreeData="getTreeData" />
    </div>
    <!-- end -->
    <!-- 右半部分列表 -->
    <div class="right">
      <div class="bgTable">
        <div class="baseList">
          <!-- 搜索表单 -->
          <searchFormBox
            :pagination="
          pagination.total <= 10 || !pagination.total ? null : pagination
        "
            @handleSearch="handleSearch"
            @handleReset="handleReset"
          ></searchFormBox>
          <!-- end -->
          <!-- 表格 -->
          <tableList
            :list-data="treeData"
            :pagination="
          pagination.total <= 10 || !pagination.total ? null : pagination
        "
            @handleSetupContract="handleSetupContract"
            @handleBulid="handleBulid"
            @handleClickDelete="handleClickDelete"
            @getTreeData="getTreeData"
          ></tableList>
          <!-- end -->
          <!-- 新增，编辑弹窗 -->
          <dialog-form
            :visible="visible"
            :title="title"
            :data="DialogFormdata"
            :form-data="formData"
            @handleClose="handleClose"
            @getTreeData="getTreeData"
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
      </div>
    </div>
    <!-- end -->
  </div>
</template>

<script lang="ts">
export default {
  name: 'ListTree'
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { getList } from '@/api/list'
import Tree from './components/Tree.vue' // 左侧树
import DialogForm from './components/DialogForm.vue' // 新增,编辑弹窗.
import Delete from '@/components/Delete/index.vue' // 删除弹层
import tableList from './components/TableList.vue' // 表格
import searchFormBox from './components/SearchForm.vue' // 搜索框表单

const visible = ref(false) // 新增，编辑弹窗
const dataLoading = ref(false)
const DialogFormdata = ref({}) // 弹窗表单内容
const title = ref('新建') // 弹窗标题
const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const deleteText = ref('此操作将永久删除这条信息，是否继续？') // 删除的内容
// 获取树列表数据
const treeData = ref([])
// 分页
const pagination = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
})
// 搜索表单
const searchForm = {
  index: '',
  status: undefined,
  serviceCallNumber: undefined,
  updateTime: []
}
// 生命周期
onMounted(() => {
  getTreeData(pagination.value)
})
// 获取树列表数据
const getTreeData = async (val) => {
  dataLoading.value = true
  const res: any = await getList() // 获取列表数据,当前为mock接口，后续会替换为真实接口，并接受真实数据传值
  try {
    treeData.value = res.data.list
    pagination.value.total = res.data.list.length
  } finally {
    dataLoading.value = false
  }
}
const formData = ref({ ...searchForm }) // 表单内容
// 搜索功能
const handleSearch = (val) => {
  // 根据搜索框的内容进行搜索
  getTreeData(val)
}
// 重置，清空搜索框
const handleReset = () => {
  // 清空搜索框的全部内容并且重新获取数据
  // 重置页码
  pagination.value.defaultCurrent = 1
  getTreeData(pagination.value)
  // 重新渲染table
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
  getTreeData(pagination.value)
}
// 点击删除
const handleClickDelete = (row: { rowIndex: any }) => {
  dialogDeleteVisible.value = true
}
</script>

<style lang="less" scoped>
.tree-wapper {
  .left {
    width: 223px;
    background: #ffffff;
    padding: var(--space-main);
    border-right: 1px solid var(--color-border);
  }
  .right {
    width: 100%;
    // background: #ffffff;
  }
}
</style>
