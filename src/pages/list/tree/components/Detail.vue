<!-- 树状列表筛选详情，弃用-->
<template>
  <div class="topBox">
    <div class="title">退款申请</div>
    <div class="item">
      <div class="tag">
        <span>取货单号：</span>
        <span class="label">{{ treeData.index }}</span>
      </div>
      <div class="tag">
        <span>状态：</span>
        <span class="label">
          <span v-if="treeData.status == 0">待审核</span>
          <span v-else-if="treeData.status == 1">待取货</span>
          <span v-else-if="treeData.status == 2">已取货</span>
          <span v-else-if="treeData.status == 3">已完成</span>
        </span>
      </div>
      <div class="tag">
        <span>销售单号：</span>
        <span class="label">{{ treeData.saleOrderNumber }}</span>
      </div>
      <div class="tag">
        <span>子订单：</span>
        <span class="label">{{ treeData.subOrderchildrenNumber }}</span>
      </div>
    </div>
  </div>
  <div class="bottomBox">
    <div class="title">用户信息</div>
    <div class="item">
      <div class="tag">
        <span>用户姓名：</span>
        <span class="label">{{ treeData.userName }}</span>
      </div>
      <div class="tag">
        <span>联系电话：</span>
        <span class="label">{{ treeData.userPhone }}</span>
      </div>
      <div class="tag">
        <span>常用仓库：</span>
        <span class="label">{{ treeData.commonWarehouse }}</span>
      </div>
      <div class="tag">
        <span>取货地址：</span>
        <span class="label">{{ treeData.address }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  treeData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>
<style lang="less" scoped>
.title {
  line-height: 24px;
  font-weight: 500;
  font-size: 16px;
  color: var(--color-bk2);
  margin-bottom: 16px;
}
.item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 32px;
  .tag {
    width: 33%;
    margin-bottom: 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: var(--color-bk2);
    .label {
      font-size: 14px;
      color: var(--color-bk3);
    }
  }
}
// 第二个item不要border-bottom
.bottomBox {
  min-width: 810px;
  .item {
    border-bottom: none;
  }
}
.topBox {
  min-width: 810px;
}
</style>
