<!-- 基础表格组件 -->
<template>
  <div class="baseList bg-wt">
    <div class="tableBoxs">
      <t-table
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        vertical-align="middle"
        :hover="true"
        :pagination="null"
        :selected-row-keys="selectedRowKeys"
        :loading="dataLoading"
        :sort="sort"
        :filter-value="filterValue"
        :hide-sort-tips="true"
        :show-sort-column-bg-color="true"
        table-layout="auto"
        @filter-change="FilterChange"
        @sort-change="sortChange"
        @select-change="rehandleSelectChange"
      >
        <template #empty>
          <NoData></NoData>
        </template>
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
            <span>{{ row.updateTime }}123</span>
          </div>
        </template>
        <!-- 在操作栏添加删除、编辑、查看三种操作 -->
        <template #op="{ row }">
          <a class="btn-dl btn-split-right" @click="handleClickDelete(row)"
            >删除</a
          >
          <a class="font-bt line" @click="handleSetupContract(row)">编辑</a>
          <a class="font-bt btn-split-left" @click="handleClickDetail()"
            >查看</a
          >
        </template>
      </t-table>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NoData'
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { isNumber } from 'lodash'
import { COLUMNS } from '../constants'
import NoData from '@/components/noData/index.vue'

const props = defineProps({
  listData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  pagination: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const emit = defineEmits([
  'fetchData',
  'handleSetupContract',
  'handleBuild',
  'handleClickDelete'
])
// 监听器赋值
watch(props, () => {
  data.value = props.listData
  pagination.value = props.pagination
})
const router = useRouter()
const sort = ref({
  // 按照服务调用次数进行排序
  sortBy: 'serviceCallNumber'
}) // 排序
const data: any = ref([])
const pagination: any = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
})

const rowKey = 'index' // 行的key
const filterValue = ref({
  status: ''
}) // 过滤
// 加载状态
const dataLoading = ref(false)

// 排序
const sortChange = (val) => {
  // 将排序的结果赋值给sort
  sort.value = val
  // 调用onFilterChange方法进行排序
  onFilterChange(val)
}
// 模拟异步请求进行排序
const onFilterChange = (val) => {
  const timer = setTimeout(() => {
    if (val) {
      data.value = data.value
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
}
// 筛选
const FilterChange = (val) => {
  ONFilterChange(val)
}
// 模拟异步请求进行筛选
const ONFilterChange = (val) => {
  emit('fetchData', pagination.value)
  const timer = setTimeout(() => {
    data.value = data.value.filter((timer) => {
      let result = true
      if (isNumber(val.status)) {
        result = timer.status === val.status
      }
      return result
    })
    clearTimeout(timer)
  }, 150)
}

// 选中的行
const selectedRowKeys = ref([1, 2])
const rehandleSelectChange = (val: number[]) => {
  selectedRowKeys.value = val
}
// 点击查看详情
const handleClickDetail = () => {
  router.push('/detail/base')
}
// 打开编辑弹窗
const handleSetupContract = (val) => {
  emit('handleSetupContract', val)
}
// 点击删除
const deleteIdx = ref(-1) // 删除的索引
const handleClickDelete = (row: { rowIndex: any }) => {
  emit('handleClickDelete', row)
  deleteIdx.value = row.rowIndex
}
// 点击翻页
const onPageChange = (val) => {
  pagination.value.defaultCurrent = val.current
  pagination.value.defaultPageSize = val.pageSize
  emit('fetchData', {
    defaultCurrent: val.current,
    defaultPageSize: val.pageSize
  })
}
</script>
<style lang="less" scoped src="../../index.less"></style>
