<!-- 个人中心 -->
<template>
  <div class="bg-wt contentBox">
    <div class="bodybox bgTable">
      <div class="topBox">
        <div class="cityBox">
          区域名称：<span>{{ regionData.name }}</span>
        </div>
      </div>
      <div class="bodyBox">
        <t-form
          ref="form"
          label-align="top"
          :rules="rules"
          :data="formData"
          @submit="onSubmit"
        >
          <div class="title">服务费设置</div>
          <div class="cardBox">
            <div class="left">
              <t-form-item label="商户佣金比例" name="name">
                <t-input
                  class="form-item-content"
                  placeholder="请输入"
                  :style="{ minWidth: '134px' }"
                  clearable
                />
              </t-form-item>
            </div>
            <div class="right">
              <t-form-item label="服务人员佣金比例" name="name">
                <t-input
                  class="form-item-content"
                  placeholder="请输入"
                  :style="{ minWidth: '134px' }"
                  clearable
                />
              </t-form-item>
            </div>
          </div>
          <div class="title">调度设置</div>
          <div class="cardBox">
            <div class="left">
              <t-form-item label="服务人员派单范围（公里）" name="name">
                <t-input
                  class="form-item-content"
                  placeholder="请输入"
                  :style="{ minWidth: '134px' }"
                  clearable
                />
              </t-form-item>
              <t-form-item label="抢单转派单时长（小时）" name="name">
                <t-input
                  class="form-item-content"
                  placeholder="请输入"
                  :style="{ minWidth: '134px' }"
                  clearable
                />
              </t-form-item>
            </div>
            <div class="right">
              <t-form-item label="机构派单范围（公里）" name="name">
                <t-input
                  class="form-item-content"
                  placeholder="请输入"
                  :style="{ minWidth: '134px' }"
                  clearable
                />
              </t-form-item>
              <t-form-item label="未接单提醒（小时）" name="name">
                <t-input
                  class="form-item-content"
                  placeholder="请输入"
                  :style="{ minWidth: '134px' }"
                  clearable
                />
              </t-form-item>
            </div>
          </div>
          <div class="footBox">
            <div class="updateInfo" @click="handleBack">
              <span class="bt bt-grey">返回</span>
            </div>
            <button class="bt updateInfo">提交</button>
          </div>
        </t-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { useRoute, useRouter } from 'vue-router'
import {
  regionById,
  serviceList,
  serviceTypeSimpleList,
  serviceItemList,
} from '@/api/service'
const listData = ref([]) // 列表数据
const route = useRoute()
const router = useRouter()
const { id } = route.params
const formData = ref()
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
  await serviceList(val)
    .then((res) => {
      if (res.code === 200) {
        listData.value = res.data.list
        pagination.value.total = Number(res.data.total)
      } else {
        MessagePlugin.error(res.msg)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 获取城市数据
const fetchRegionData = async () => {
  await regionById(id)
    .then((res) => {
      if (res.code === 200) {
        regionData.value = res.data
      } else {
        console.log(res.msg)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 获取服务类型数据
const fetchServiceTypeData = async () => {
  await serviceTypeSimpleList()
    .then((res) => {
      if (res.code === 200) {
        serviceTypeData.value = res.data
        serviceItemRequestData.value.serveTypeId = res.data[0].id
        fetchServiceItemData()
      } else {
        console.log(res.msg)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

// 获取服务项数据
const fetchServiceItemData = async () => {
  await serviceItemList(serviceItemRequestData.value)
    .then((res) => {
      console.log(res)
      if (res.code === 200) {
        serviceItemData.value = []
        serviceItemData.value = res.data.list
      } else {
        console.log(res.msg)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 返回上一级
const handleBack =()=>{
  router.push('/service/region')
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
  padding: 80px 100px 50px;
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
      .newButton {
        width: 88px;
      }
    }
    .bodyBox {
      margin-top: 32px;
      .title {
        height: 22px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: 18px;
        color: var(--color-bk1);
        line-height: 22px;
        margin-bottom: 30px;
      }
      .cardBox {
        display: flex;
        margin-bottom: 10px;
        .left {
          width: 48%;
          height: 100%;
          background-color: #fff;
          margin-right: 110px;
          .upbutton {
            margin-top: 24px;
          }
        }
      }
      .right {
        width: 48%;
        height: 100%;
        background-color: #fff;
        :deep(.t-button .t-button__text) {
          color: var(--color-bk2);
        }
      }
      .footBox {
        margin-top: 47px;
        display: flex;
        justify-content: center;
        .updateInfo {
          width: 60px;
          margin-right: 16px;
        }
      }
    }
    :deep(.t-form__item) {
      margin-bottom: 30px;
    }
    .regionService {
      margin-top: 26px;
    }
  }
}
</style>
