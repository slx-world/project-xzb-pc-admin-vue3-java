<!--列表页-->
<template>
  <div class="baseList">
    <div class="tableBoxs">
      <t-table
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        vertical-align="middle"
        :hover="true"
        :pagination="pagination"
        :loading="dataLoading"
        :hide-sort-tips="true"
        :show-sort-column-bg-color="true"
        table-layout="auto"
        @page-change="onPageChange"
        @filter-change="FilterChange"
        @sort-change="sortChange"
      >
        <!-- 描述 -->
        <template #description="{ row }">
          <div
            :class="{
              description: true,
              descriptionheight: row.description.length > 18
            }"
          >
            <span>{{ row.description }}</span>
            <span v-if="row.description.length > 36" class="hover">{{
              row.description
            }}</span>
          </div>
        </template>
        <!-- 更新时间-->
        <template #updateTime="{ row }">
          <div class="updateTime">
            <span>{{ row.updateTime }}</span>
          </div>
        </template>
        <!-- 在操作栏添加删除、编辑、查看三种操作 -->
        <template #op="{ row }">
          <a class="btn-dl btn-split-right" @click="handleOpenDelete(row)"
            >删除</a
          >
          <a class="font-bt line" @click="handleEdit(row)">编辑</a>
          <a class="font-bt btn-split-left" @click="handleClickDetail()"
            >查看</a
          >
        </template>
      </t-table>
      <!-- 分页 -->
      <!-- <div class="paginationBox">
        <t-pagination
          v-model="pagination.defaultCurrent"
          :page-size="pagination.defaultPageSize"
          :total="pagination.total"
          :total-content="false"
          :page-size-options="[15, 24, 36]"
          @page-size-change="onPageSizeChange"
          @current-change="onCurrentChange"
        />
      </div> -->
      <!-- end -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { isNumber } from 'lodash'
import { COLUMNS } from '../constants'
// 获取父组件值、方法
const props = defineProps({
  // 获取列表数据
  listData: {
    type: Array,
    default: () => []
  },
  // 加载中
  dataLoading: {
    type: Boolean,
    default: false
  },
  //   分页信息
  pagination: {
    type: Object,
    default: () => ({})
  }
})
// 监听器赋值
watch(props, () => {
  data.value = props.listData
})
// ------定义变量------
// 父组件方法
const emit = defineEmits([
  'getStatus',
  'handleOpenFormDialog',
  'handleOpenDelete',
  'handleClickDelete'
  // 'handleSizeChange',
  // 'handleCurrentChange'
])
const router = useRouter()
const data: any = ref([])
const rowKey = 'index' // 行的key
// ------定义方法------
// 排序
const sortChange = (val) => {
  // 排序有两种情况
  // 1、前端筛选
  const dataArr = props.listData
  const timer = setTimeout(() => {
    if (val) {
      data.value = dataArr
        .concat()
        .sort((a, b) =>
          val.descending
            ? b[val.sortBy] - a[val.sortBy]
            : a[val.sortBy] - b[val.sortBy]
        )
    } else {
      // 如果没有排序，就按照原来的顺序进行排序
      data.value = data.value.concat().sort((a, b) => a.index - b.index)
    }
    clearTimeout(timer)
  }, 100)
  // 2、把筛选参数传给后端，后端来做筛选
  emit('getStatus', val)
}
// 筛选
const FilterChange = (val) => {
  const dataArr = props.listData
  // 筛选有两种情况
  // 1、前端筛选
  const timer = setTimeout(() => {
    data.value = dataArr.filter((timer) => {
      let result = true
      if (isNumber(val.status)) {
        result = (timer as any).status === val.status
      }
      return result
    })
    clearTimeout(timer)
  }, 150)
  // 2、把筛选参数传给后端，后端来做筛选
  emit('getStatus', val)
}
// 点击查看详情
const handleClickDetail = () => {
  router.push('/detail/base')
}
// 打开编辑弹窗
const handleEdit = (val) => {
  emit('handleOpenFormDialog', val)
}
// 打开弹层
const handleOpenDelete = (val) => {
  emit('handleOpenDelete', val)
}
const onPageChange = (pageInfo) => {
  emit('getStatus', pageInfo)
}
// 点击删除
// const handleClickDelete = (row) => {
//   emit('handleClickDelete', row)
// }
// // 设置每页条数
// const onPageSizeChange = (pageInfo) => {
//   emit('handleSizeChange', pageInfo.pageSize)
//   emit('handleCurrentChange', pageInfo.current)
// }
// // 当前页
// const onCurrentChange = (index, pageInfo) => {
//   emit('handleCurrentChange', pageInfo)
// }
</script>
<style lang="less" scoped src="../../index.less"></style>
