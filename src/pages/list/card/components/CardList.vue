<!-- 卡片列表 -->
<template>
  <div class="bg-list">
    <div
      v-for="item in productList.slice(
        pagination.pageSize * (pagination.current - 1),
        pagination.pageSize * pagination.current
      )"
      :key="item.index"
      class="list-card-items"
    >
      <!-- 卡片布局 -->
      <div class="card">
        <div class="headbox">
          <div>{{ item.modelNumber }}</div>
          <!-- 卡片图标 -->
          <div>
            <span class="btn-modify" @click="handleSetupContract(item)"
              ><img src="@/assets/test-img/modify.png" alt="" class="modify" />
              <img
                src="@/assets/test-img/modify-hover.png"
                alt=""
                class="modify-hover"
              />
              <img
                src="@/assets/test-img/modify-anxia.png"
                alt=""
                class="modify-anxia"
              />
            </span>
            <span class="btn-delete" @click="handleClickDelete(item)">
              <img src="@/assets/test-img/delete.png" alt="" class="delete" />
              <img
                src="@/assets/test-img/delete-hover.png"
                alt=""
                class="delete-hover" />
              <img
                src="@/assets/test-img/delete-active.png"
                alt=""
                class="delete-active"
            /></span>
          </div>
          <!-- end -->
        </div>
        <div class="bodybox">
          <div>
            <span>模型类型：</span>
            <span v-if="item.type == 1">验证码</span>
            <span v-if="item.type == 2">密码</span>
            <span v-if="item.type == 3">手机号</span>
          </div>
          <div>
            <span>模型名称：</span>
            <span>{{ item.name }}</span>
          </div>
          <div>
            <span>创建时间：</span>
            <span>{{ item.createTime }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="pagination.total > 36" class="list-card-pagination">
      <t-pagination
        v-model="pagination.current"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-size-options="[24, 36]"
        @page-size-change="onPageSizeChange"
        @current-change="onCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 接收父组件的数据
const props = defineProps({
  productList: {
    type: Array<any>,
    default: () => {
      return []
    }
  },
  pagination: {
    type: Object,
    default: () => {
      return {}
    }
  },
  onPageSizeChange: {
    type: Function,
    default: () => {
      return {}
    }
  },
  onCurrentChange: {
    type: Function,
    default: () => {
      return {}
    }
  }
})
const pagination = ref(props.pagination)
const emit = defineEmits([
  'onCurrentChange',
  'handleSetupContract',
  'handleClickDelete'
])
// 点击新增
const handleSetupContract = (item: any) => {
  emit('handleSetupContract', item)
}
// 点击删除
const deleteIdx = ref(-1) // 删除的索引
const handleClickDelete = (row: { rowIndex: any }) => {
  emit('handleClickDelete', row)
  deleteIdx.value = row.rowIndex
}
</script>

<style lang="less" scoped>
.bg-list {
  min-width: 925px;
  .list-card-items {
    margin-right: 14px;
    margin-bottom: 14px;
    float: left;
    // min-width: 286px;
    width: calc(16.66% - 11.66px);
    &:nth-child(6n) {
      margin-right: 0;
    }
    .card {
      padding: 14px;
      background-color: var(--color-white);
      .headbox {
        display: flex;
        justify-content: space-between;
        margin-bottom: 14px;
        color: var(--color-bk2);
        font-weight: 500;
        font-size: 18px;
        line-height: 25px;
        height: 25px;
        .btn-modify {
          vertical-align: middle;
          cursor: pointer;
          &:first-child {
            margin-right: 13.5px;
          }
          .modify-hover {
            display: none;
          }
          .modify-anxia {
            display: none;
          }
          &:hover {
            .modify {
              display: none;
            }
            .modify-hover {
              display: inline-block;
            }
          }
          &:active {
            .modify {
              display: none;
            }
            .modify-anxia {
              display: inline-block;
            }
            .modify-hover {
              display: none;
            }
          }
          img {
            width: 20px;
            height: 21px;
          }
        }
        .btn-delete {
          vertical-align: middle;
          cursor: pointer;
          &:first-child {
            margin-right: 13.5px;
          }
          .delete-hover {
            display: none;
          }
          .delete-active {
            display: none;
          }
          &:hover {
            .delete {
              display: none;
            }
            .delete-hover {
              display: inline-block;
            }
          }
          &:active {
            .delete {
              display: none;
            }
            .delete-active {
              display: inline-block;
            }
            .delete-hover {
              display: none;
            }
          }
          img {
            width: 20px;
            height: 21px;
          }
        }
      }
      .bodybox {
        div {
          margin-bottom: 4px;
          color: var(--color-bk3);
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
// 利用媒体监测当屏幕宽度大于1920px时，设置每行显示6个，小于1920px大于1600排序时，设置每行显示5个，小于1600px大于1366px时，设置每行显示4个，小于1366时，设置每行显示3个

@media screen and (min-width: 1800px) and (max-width: 1920px) {
  .bg-list {
    .list-card-items {
      float: left;
      width: calc(16.66% - 11.66px);
      &:nth-child(6n) {
        margin-right: 0;
      }
    }
  }
}
@media screen and (min-width: 1524px) and (max-width: 1800px) {
  .bg-list {
    .list-card-items {
      float: left;
      width: calc(20% - 11.2px);
      &:nth-child(5n) {
        margin-right: 0;
      }
      &:nth-child(6n) {
        margin-right: 14px;
      }
      &:nth-child(30n) {
        margin-right: 0;
      }
    }
  }
}
@media screen and (min-width: 1274px) and (max-width: 1524px) {
  .bg-list {
    .list-card-items {
      float: left;
      width: calc(25% - 10.5px);
      &:nth-child(4n) {
        margin-right: 0;
      }
      &:nth-child(6n) {
        margin-right: 14px;
      }
      &:nth-child(12n) {
        margin-right: 0;
      }
    }
  }
}
@media (max-width: 1274px) {
  .bg-list {
    .list-card-items {
      float: left;
      width: calc(33.3% - 9.34px);
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>
