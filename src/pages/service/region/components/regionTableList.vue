<!-- 基础表格组件 -->
<template>
  <div class="baseList bg-wt">
    <div class="tableBoxs">
      <div class="newBox">
        <button class="bt newBoxbutton" @click="handleBuild()">添加服务</button>
      </div>
      <t-config-provider :global-config="globalLocale">
        <t-table
          :data="data"
          :columns="regionCOLUMN"
          :row-key="rowKey"
          vertical-align="middle"
          :hover="true"
          bordered
          :pagination="
            pagination.total <= 8 || !pagination.total ? null : pagination
          "
          :disable-data-page="pagination.total <= 8"
          :selected-row-keys="selectedRowKeys"
          :loading="dataLoading"
          :sort="sort"
          :filter-value="filterValue"
          :hide-sort-tips="true"
          :show-sort-column-bg-color="true"
          table-layout="fixed"
          table-content-width="100%"
          @page-change="onPageChange"
          @filter-change="FilterChange"
          @sort-change="sortChange"
          @select-change="rehandleSelectChange"
        >
          <!-- 描述 -->
          <template #description="{ row }">
            <div class="description">
              <span>{{ row.description }}</span>
              <span v-if="row.description.length > 36" class="hover">{{
                row.description
              }}</span>
            </div>
          </template>
          <!-- end -->
          <!-- 手机号 -->
          <template #phoneNumber="{ row }">
            <div class="phoneNumber">
              <!-- 手机号做脱敏处理 -->
              <span>
                {{ row.phoneNumber.toString().substring(0, 3) }}
                ****
                {{ row.phoneNumber.toString().substring(7, 4) }}
              </span>
            </div>
          </template>
          <!-- 在表格中添加自定义列 -->
          <template #updateTime="{ row }">
            <div class="updateTime">
              <span>{{ row.updateTime }}</span>
            </div>
          </template>
          <!-- end -->
          <!-- 在操作栏添加删除、编辑、查看三种操作 -->
          <template #op="{ row }">
            <a class="btn-dl btn-split-right" @click="handleClickDelete(row)"
              >删除</a
            >
            <a class="font-bt btn-split-left" @click="handleClickSetHot(row)"
              >设为热门</a
            >
          </template>
          <!-- end -->
        </t-table>
      </t-config-provider>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ListBase'
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { CaretDownSmallIcon } from 'tdesign-icons-vue-next'
import { regionCOLUMN } from '../constants'
// 接收父组件传递的值
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
// 发送事件给父组件
const emit = defineEmits([
  'fetchData',
  'handleClickSetHot',
  'handleBuild',
  'handleClickDelete'
])
// 监听器赋值
watch(props, () => {
  data.value = props.listData
  pagination.value = props.pagination
  dataLoading.value = false
})
// 路由
const router = useRouter()
// 排序
const sort = ref({
  // 按照服务调用次数进行排序
  sortBy: 'serviceCallNumber'
}) // 排序
const globalLocale = ref({
  table: {
    sortIcon: (h) => h && h(CaretDownSmallIcon)
  }
}) // 排序图标
const data: any = ref([])
// 选中的行
const pagination: any = ref({
  defaultPageSize: 8,
  total: 0,
  defaultCurrent: 1, // 默认当前页
  pageSizeOptions: [8, 16, 24, 32],
})
// 索引
const rowKey = 'index' // 行的key
const filterValue = ref({
  status: ''
}) // 过滤
// 加载状态
const dataLoading = ref(true)

// 排序
const sortChange = (val) => {
  // 将排序的结果赋值给sort
  sort.value = val
  // 调用onFilterChange方法进行排序
  onFilterChange(val)
}
// 模拟异步请求进行排序
const onFilterChange = (val) => {
  emit('fetchData', val)
}
// 筛选
const FilterChange = (val) => {
  ONFilterChange(val)
}
// 模拟异步请求进行筛选
const ONFilterChange = (val) => {
  emit('fetchData', val)
}

// 选中的行
const selectedRowKeys = ref([1, 2])
const rehandleSelectChange = (val: number[]) => {
  selectedRowKeys.value = val
}
// 点击查看详情
const handleClickSetHot = (val) => {
  emit('handleClickSetHot', val)
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
  emit('fetchData', {
    defaultCurrent: val.current,
    defaultPageSize: val.pageSize
  })
}

// 点击新建
const handleBuild = () => {
  emit('handleBuild')
}
</script>
<style lang="less" scoped src="../../index.less"></style>
<style lang="less" scoped>
.baseList {
  padding-top: 0 !important;
  :deep(.t-table td) {
    height: 64px !important;
  }
}
.tableBoxs {
  margin: 12px 0 0 0;
}
.newBoxbutton {
  margin-left: 0 !important;
}
:deep(
    .t-table--bordered.t-table__content--scrollable-to-right
      .t-table__cell--fixed-right-first::after
  ) {
  border: none;
}
</style>
