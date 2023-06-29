<!-- 首页 -->
<template>
  <div class="container home-wrapper">
    <!-- 顶部 card  -->
    <top-panel class="row-container" />
    <!-- 中部图表  -->
    <middle-chart class="row-container" />
    <!-- 列表排名 -->
    <rank-list class="row-container" />
    <!-- 出入库概览 -->
    <output-overview class="row-container" />
  </div>
</template>

<script setup lang="ts">
import TopPanel from './components/TopPanel.vue'
import MiddleChart from './components/MiddleChart.vue'
import RankList from './components/RankList.vue'
import OutputOverview from './components/OutputOverview.vue'
</script>

<style scoped>
.row-container:not(:last-child) {
  margin-bottom: 16px;
}
:deep() .t-card__body {
  padding-top: 0;
}
:deep(a) {
  cursor: pointer;
}
:deep(a:active) {
  color: #1c55cf;
}
:deep(a:hover) {
  color: rgba(0, 97, 253, 0.8);
}
</style>
