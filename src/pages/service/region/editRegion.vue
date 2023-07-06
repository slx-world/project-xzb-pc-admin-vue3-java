<!-- 个人中心 -->
<template>
  <div class="bg-wt contentBox">
    <div class="bodybox bgTable">
      <t-form ref="form" label-align="top" :data="formData">
        <div class="topBox">
          <div class="leftBox">
            <t-form-item label="区域名称" name="account">
              <t-select
                placeholder="请选择"
                filterable
                :options="cityList"
                :scroll="{ type: 'virtual' }"
                class="wt-400"
                :popup-props="{
                  overlayInnerStyle: { height: '300px' },
                  bufferSize: '100'
                }"
              />
            </t-form-item>
          </div>
        </div>
      </t-form>
      <div class="regionService">区域服务</div>
      <!-- 服务列表 -->
      <regionTableList
        :list-data="listData"
        :pagination="pagination"
        @handleClickSetHot="handleClickSetHot"
        @handleBuild="handleBuild"
        @handleClickDelete="handleClickDelete"
        @fetchData="fetchData"
      ></regionTableList>
      <!-- end -->
      <!-- 新增服务弹窗 -->
      <addServiceDialog
        :visible="visible"
        @handleClose="handleClose"
      ></addServiceDialog>
      <!-- end -->
      <!-- 删除弹窗 -->
      <Delete
        :dialog-delete-visible="dialogDeleteVisible"
        :delete-text="deleteText"
        @handle-delete="handleDelete"
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
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
// 城市选择框数// 引入接口
import { getTabList } from '@/api/list'
import regionTableList from './components/regionTableList.vue' // 服务列表
import addServiceDialog from './components/addServiceDialog.vue'
import Delete from '@/components/Delete/index.vue' // 删除弹层
import Confirm from '@/components/Confirm/index.vue' // 确认弹层
import { cityList } from './city'
const formData = ref({
  account: '',
  nickname: '',
  description: '',
  region: '',
  address: '',
  phone: '',
  headPortrait: ''
})
const pagination = ref({
  defaultPageSize: 8,
  total: 0,
  defaultCurrent: 1, // 默认当前页
  pageSizeOptions: [8, 16, 24, 32],
}) // 分页
const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const dialogConfirmVisible = ref(false) // 控制确认弹层显示隐藏
const deleteText = ref('此操作将永久删除这条信息，是否继续？') // 删除的内容
const confirmText = ref('此操作将永久下架这条信息，是否继续？') // 确认的内容
const confirmTitle = ref('确认设为热门') // 确认弹窗标题
const listData = ref([]) // 列表数据
const form = ref(null) // 表单
const visible = ref(false) // 新增服务弹窗
// 获取接口数据

const fetchData = async (val) => {
  await getTabList()
    .then((res: any) => {
      listData.value = res.data.list
      pagination.value.total = res.data.list.length
    })
    .catch((err: any) => {
      console.log(err, 123)
    })
}
const handleClose = () => {
  visible.value = false
  dialogDeleteVisible.value = false
  dialogConfirmVisible.value = false
}
const handleBuild = () => {
  visible.value = true
}
// 设为热门
const handleClickSetHot = (val) => {
  console.log(val)
}
const handleClickDelete = (val) => {
  console.log(val)
}
// 确认上下架
const handleConfirm = () => {
  dialogConfirmVisible.value = false
  MessagePlugin.success('操作成功')
  fetchData(pagination.value)
}
// 确认删除
const handleDelete = () => {
  dialogDeleteVisible.value = false
  MessagePlugin.success('删除成功')
  fetchData(pagination.value)
}
// 生命周期
onMounted(() => {
  fetchData(pagination.value)
})
</script>

<style lang="less" scoped>
.contentBox {
  padding: 80px 100px;
  min-height: 85vh;
  .bodybox {
    .topBox {
      width: 100%;
      display: flex;
      .leftBox {
        width: 48%;
        height: 100%;
        background-color: #fff;
        margin-right: 100px;
        .upbutton {
          margin-top: 24px;
        }
      }
    }
    .regionService {
      margin-top: 26px;
    }
  }
}
</style>
