<!-- 个人中心 -->
<template>
  <div class="topBox bg-wt">
    <div class="title">基本信息</div>
    <div class="body">
      <div class="left">
        <img
          src="https://img1.baidu.com/it/u=3709586903,1286591012&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          alt=""
        />
      </div>
      <div class="right">
        <div class="leftBox">
          <div class="tag">
            <div class="label">人员姓名</div>
            <div class="content">{{ formData.name }}</div>
          </div>
          <div class="tag">
            <div class="label">手机号</div>
            <div class="content">
              {{
                // 18899998888脱敏处理
                formData.phone.slice(0, 3) +
                ' ' +
                formData.phone.slice(3, 7) +
                ' ' +
                formData.phone.slice(7, 11)
              }}
            </div>
          </div>
          <div class="tag" v-if="formData.accountLockReason">
            <div class="label">冻结原因</div>
            <div class="content">{{formData.accountLockReason}}</div>
          </div>
        </div>
        <div class="rightBox">
          <div class="tag">
            <div class="label">认证状态</div>
            <div class="content" v-if="formData.verifyStatus === 0">未认证</div>
            <div class="content" v-if="formData.verifyStatus === 1">认证中</div>
            <div class="content" v-if="formData.verifyStatus === 2">
              认证通过
            </div>
            <div class="content" v-if="formData.verifyStatus === 3">
              认证失败
            </div>
          </div>
          <div class="tag">
            <div class="label">账号状态</div>
            <div class="content">
              {{ formData.status === 1 ? '冻结' : '正常' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bodyBox bg-wt">
    <switchBar :data="tableBar" @changeId="changeId"></switchBar>
    <!-- 认证信息 -->
    <div class="authentication" v-if="isActive === 3">
      <div class="authTag">
        <div class="authLabel">姓名：</div>
        <div class="authContent">张三</div>
      </div>
      <div class="authTag">
        <div class="authLabel">身份证号：</div>
        <div class="authContent">130887199912876543</div>
      </div>
      <div class="authImgBox">
        <div class="authImgTag">
          <div class="authLabel">身份证正面</div>
          <img
            src="https://img1.baidu.com/it/u=3083143000,4007391502&fm=253&fmt=auto&app=138&f=JPEG?w=417&h=278"
            alt=""
          />
        </div>
        <div class="authImgTag">
          <div class="authLabel">身份证反面</div>
          <img
            src="https://image2.sina.com.cn/dy/c/2004-03-29/U48P1T1D3073262F23DT20040329135445.jpg"
            alt=""
          />
        </div>
        <div class="authImgTag">
          <div class="authLabel">证明资料</div>
          <img
            src="https://file1.renrendoc.com/fileroot_temp2/2021-1/17/67176dca-8acc-482a-a6b5-7b8131cc4078/67176dca-8acc-482a-a6b5-7b8131cc40781.gif"
            alt=""
          />
        </div>
      </div>
    </div>
    <tableList
      v-show="isActive !== 3"
      :list-data="listData"
      :pagination="pagination"
      :isActive="isActive"
      @handleSortChange="handleSortChange"
    ></tableList>
  </div>
</template>
<script lang="ts">
export default {
  name: 'UserIndex'
}
</script>
<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import switchBar from '@/components/switchBar/switchBartop.vue'
import { servicePersonDetail } from '@/api/service'
import { useRouter, useRoute } from 'vue-router'
import tableList from './components/TableList.vue' // 表格
// 引用正则
import { MessagePlugin } from 'tdesign-vue-next'
const isActive = ref() // 当前选中的tab
const route = useRoute()
const { id } = route.params
const previewData = reactive({
  title: '',
  img: '',
  detailImg: ''
}) // 预览数据
const formData = ref({
  phone: '',
  verifyStatus: 0,
  accountLockReason: '',
  name: '',
  status: 0
})
// 服务人员请求数据
const listData = ref([]) // 表格数据
const pagination = reactive({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
}) // 分页数据
const tableBar = ref([
  {
    id: 1,
    name: '服务数据'
  },
  {
    id: 2,
    name: '提现数据'
  },
  {
    id: 3,
    name: '认证信息'
  },
  {
    id: 4,
    name: '违约记录'
  }
])

// 生命周期
onMounted(() => {
  isActive.value = 1
  if (id) {
    getData(id)
  }
})
// 获取接口数据
const getData = async (val) => {
  await servicePersonDetail(val).then((res) => {
    if (res.code == 200) {
      formData.value = res.data
    } else {
      MessagePlugin.error(res.msg)
    }
  })
}

// 翻页
const handleSortChange = (val) => {
  pagination.defaultCurrent = val
}
// 切换tab
const changeId = (val) => {
  isActive.value = val
}
</script>

<style lang="less" scoped>
.topBox {
  padding: 36px 49px;
  margin-bottom: 25px;
  .title {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-bk1);
    margin-bottom: 30px;
  }
  .body {
    display: flex;
    .left {
      margin-right: 70px;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .right {
      width: 100%;
      display: flex;
      .leftBox,
      .rightBox {
        width: 50%;
        .tag {
          display: flex;
          margin-bottom: 30px;
          &:last-child {
            margin-bottom: 5px;
          }
          .label {
            width: 56px;
            height: 20px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: var(--color-bk3);
            margin-right: 36px;
            letter-spacing: 0;
            text-align: justify;
          }
          .content {
            height: 20px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: var(--color-bk1);
            letter-spacing: 0;
            text-align: justify;
          }
        }
      }
    }
  }
}
.bodyBox {
  padding: 24px 20px 30px 23px;
  :deep(.headBox) {
    padding-bottom: 12px;
    margin-bottom: 19.5px;
    // tab
    .sw-box {
      .title {
        padding-left: 3px;
        padding-right: 3px;
        margin-right: 36px;
      }
      .line {
        padding-left: 3px;
        padding-right: 3px;
        &::before {
          bottom: -12px;
        }
      }
    }
  }
  .authentication {
    padding-top: 30px;
    .authTag {
      display: flex;
      margin-bottom: 30px;
      .authLabel {
        margin-right: 6px;
        color: var(--color-bk3);
      }
      .authContent {
        color: var(--color-bk1);
      }
    }
    .authImgBox {
      // 一行两个
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .authImgTag {
        width: 48%;
        margin-bottom: 27.5px;
        &:last-child {
          margin-bottom: 0;
        }
        .authLabel {
          margin-bottom: 25px;
          color: var(--color-bk3);
        }
        img {
          width: 409.17px;
          height: 269px;
        }
      }
    }
  }
  :deep(.tableBoxs) {
    margin: 0;
  }
}
</style>
