<!-- 个人中心 -->
<template>
  <div class="bg-wt contentBox">
    <div class="bodybox bgTable">
      <div class="topBox">
        <div class="cityBox">
          区域名称：<span>{{ regionData.name }}</span>
        </div>
        <div class="bt newButton" @click="handleBuild">新建</div>
      </div>
      <!-- 服务列表 -->
      <regionTableList
        :list-data="listData"
        :pagination="pagination"
        @handleClickSetHot="handleClickSetHot"
        @handleBuild="handleBuild"
        @handleClickDelete="handleClickDelete"
        @fetchData="fetchData"
        @onPageChange="onPageChange"
        @handleEditPrice="handleEditPrice"
      ></regionTableList>
      <!-- end -->
      <!-- 新增服务弹窗 -->
      <addServiceDialog
        :visible="visible"
        :serviceTypeData="serviceTypeData"
        :serviceItemData="serviceItemData"
        @handleClose="handleClose"
        @handleSubmit="handleSubmit"
        @handleServiceTypeChange="handleServiceTypeChange"
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
import { useRoute } from 'vue-router'
import { regionById, serviceList , serviceTypeSimpleList , serviceItemList , serviceAdd , serviceEdit , serviceHot , serviceDelete} from '@/api/service'
import regionTableList from './components/regionTableList.vue' // 服务列表
import addServiceDialog from './components/addServiceDialog.vue'
import Delete from '@/components/Delete/index.vue' // 删除弹层
import Confirm from '@/components/Confirm/index.vue' // 确认弹层

const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const dialogConfirmVisible = ref(false) // 控制确认弹层显示隐藏
const deleteText = ref('此操作将永久删除这条信息，是否继续？') // 删除的内容
const confirmText = ref('此操作将永久下架这条信息，是否继续？') // 确认的内容
const confirmTitle = ref('确认设为热门') // 确认弹窗标题
const listData = ref([]) // 列表数据
const hotId = ref('') // 设为热门的id
const flag = ref(0) //是否是热门
const deleteId = ref('') // 删除的id
const route = useRoute()
const { id } = route.params
const visible = ref(false) // 新增服务弹窗
const requestData = ref({
  isAsc1: 'false',
  isAsc2: '',
  orderBy1: 'updateTime',
  orderBy2: '',
  pageNo: 1,
  pageSize: 10,
  regionId: id
})
// 当前区域城市的数据
const regionData = ref({
  name: ''
})
// 请求服务项数据的参数
const serviceItemRequestData = ref({
  isAsc1: 'true',
  isAsc2: 'false',
  orderBy1: 'sortNum',
  orderBy2: 'updateTime',
  pageNo: 1,
  pageSize: 10,
  name: '',
  serveTypeId: ''
})
// 用于新建框的服务类型数据
const serviceTypeData = ref([])
// 用于新建框的服务项数据
const serviceItemData = ref([])
const pagination = ref({
  defaultPageSize: 8,
  total: 0,
  defaultCurrent: 1 // 默认当前页
}) // 分页

// 获取接口数据
const fetchData = async (val) => {
  await serviceList(val).then((res) => {
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
// 获取城市数据
const fetchRegionData = async () => {
  await regionById(id).then((res) => {
    if(res.code === 200){
      regionData.value = res.data
    }else{
      console.log(res.msg);
    }
  }).catch((err)=>{
    console.log(err);
  })
}
// 获取服务类型数据
const fetchServiceTypeData = async () => {
  await serviceTypeSimpleList().then((res) => {
    if(res.code === 200){
      serviceTypeData.value = res.data
      serviceItemRequestData.value.serveTypeId = res.data[0].id
      fetchServiceItemData()
    }else{
      console.log(res.msg);
    }
  }).catch((err)=>{
    console.log(err);
  })
}
// 切换服务类型
const handleServiceTypeChange = (val) => {
  serviceItemRequestData.value.serveTypeId = val
  fetchServiceItemData()
}
// 关闭弹窗
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
  hotId.value = val.id
  if(val.isHot === 0){
    flag.value = 1
    confirmTitle.value = '确认设为热门'
    confirmText.value = '此操作将将此条数据设为热门，是否继续？'
  }else{
    flag.value = 0
    confirmTitle.value = '确认取消热门'
    confirmText.value = '此操作将将此条数据取消热门，是否继续？'
  }
  dialogConfirmVisible.value = true
}
const handleClickDelete = (val) => {
  deleteId.value = val.id
  dialogDeleteVisible.value = true
}
// 确认设为热门
const handleConfirm = async () => {
  const data = {
    id: hotId.value,
    flag: flag.value
  }
  await serviceHot(data).then((res) => {
    if (res.data.code === 200) {
      MessagePlugin.success('操作成功')
      fetchData(requestData.value)
    }else{
      console.log(res.msg);
    }
  }).catch((err)=>{
    console.log(err)
  })
  dialogConfirmVisible.value = false
  fetchData(requestData.value)
}
// 确认删除
const handleDelete = async() => {
  await serviceDelete (deleteId.value).then((res) => {
    if (res.data.code === 200) {
      MessagePlugin.success('删除成功')
      fetchData(requestData.value)
    }else{
      console.log(res.msg);
    }
  }).catch((err)=>{
    console.log(err)
  })
  dialogDeleteVisible.value = false
  MessagePlugin.success('删除成功')
  fetchData(requestData.value)
}
// 获取服务项数据
const fetchServiceItemData = async () => {
  await serviceItemList(serviceItemRequestData.value).then((res) => {
    console.log(res);
    if(res.code === 200){
      serviceItemData.value = []
      serviceItemData.value = res.data.list
    }else{
      console.log(res.msg);
    }
  }).catch((err)=>{
    console.log(err);
  })
}
// 编辑价格
const handleEditPrice = async(val) => {
  const data = {
    id: val.id,
    price: val.price
  }
  await serviceEdit(data).then((res) => {
    console.log(res)
    if (res.data.code === 200) {
      MessagePlugin.success('修改成功')
      fetchData(requestData.value)
    }else{
      console.log(res.data.msg);
    }
    fetchData(requestData.value)
  }).catch((err)=>{
    console.log(err)
  })
}
// 新增内容提交
const handleSubmit = async (val) => {
  const data = []
  val.forEach((item) => {
    data.push({
      regionId: id,
      serveItemId: item.id,
      price: item.referencePrice
    })
  })
  await serviceAdd(data).then((res) => {
    console.log(res)
    if (res.code === 200) {
      MessagePlugin.success('添加成功')
      visible.value = false
      fetchData(requestData.value)
    }else{
      console.log(res.msg);
    }
    visible.value = false
  }).catch((err)=>{
    console.log(err)
  })
}
// 点击翻页
const onPageChange = (val) => {
  requestData.value.pageNo = val.defaultCurrent
  requestData.value.pageSize = val.defaultPageSize
  fetchData(requestData.value)
}
// 生命周期
onMounted(() => {
  fetchRegionData() // 获取城市数据
  fetchServiceTypeData() // 获取服务类型数据
   // 获取服务项数据
  fetchData(requestData.value) // 获取接口数据
})
</script>

<style lang="less" scoped>
.contentBox {
  padding: 24px 20px 20px;
  min-height: 85vh;
  .bodybox {
    .topBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cityBox {
        color: var(--color-bk3);
        span {
          color: var(--color-bk1);
          margin-left: 6px;
        }
      }
      .newButton{
        width: 88px;
      }
    }
    .regionService {
      margin-top: 26px;
    }
  }
}
</style>
