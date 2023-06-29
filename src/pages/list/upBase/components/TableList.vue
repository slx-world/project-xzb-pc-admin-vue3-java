<!-- 基础表格组件 -->
<template>
  <div class="baseList">
    <div class="tableBoxs">
      <div class="newBox">
        <button class="bt newBoxbutton" @click="handleBulid()">新建</button>
      </div>
      <t-table
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        vertical-align="middle"
        :hover="true"
        :pagination="pagination"
        :disable-data-page="pagination.total <= 10"
        :selected-row-keys="selectedRowKeys"
        :loading="dataLoading"
        :sort="sort"
        :filter-value="filterValue"
        :hide-sort-tips="true"
        :show-sort-column-bg-color="true"
        table-layout="fixed"
        table-content-width="100%"
        @filter-change="FilterChange"
        @sort-change="sortChange"
        @select-change="rehandleSelectChange"
      >
        <!-- 添加昵称 -->
        <template #name="{ row }">
          <div class="name">
            <span>
              <t-image-viewer :images="[row.headPortrait]">
                <template #trigger="{ open }">
                  <div class="tdesign-demo-image-viewer__ui-image">
                    <img
                      alt="test"
                      :src="row.headPortrait"
                      class="tdesign-demo-image-viewer__ui-image--img"
                    />
                    <div
                      class="tdesign-demo-image-viewer__ui-image--hover"
                      @click="open"
                    ></div>
                  </div>
                </template>
              </t-image-viewer>
            </span>
            <span>{{ row.name }}</span>
          </div>
        </template>
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
          <a class="font-bt line" @click="handleSetupContract(row)">编辑</a>
          <a class="font-bt btn-split-left" @click="handleClickDetail()"
            >查看</a
          >
        </template>
        <!-- end -->
      </t-table>
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
// import { isNumber } from 'lodash'
import { COLUMNS } from '../constants'
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
  'handleSetupContract',
  'handleBulid',
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
const data: any = ref([])
// 选中的行
const pagination: any = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
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
  // const timer = setTimeout(() => {
  //   if (val) {
  //     data.value = data.value
  //       .concat()
  //       .sort((a, b) =>
  //         val.descending
  //           ? b[val.sortBy] - a[val.sortBy]
  //           : a[val.sortBy] - b[val.sortBy]
  //       )
  //   } else {
  //     // 如果没有排序，就按照原来的顺序进行排序
  //     data.value = data.value.concat().sort((a, b) => a.index - b.index)
  //   }
  //   clearTimeout(timer)
  // }, 100)
}
// 筛选
const FilterChange = (val) => {
  ONFilterChange(val)
}
// 模拟异步请求进行筛选
const ONFilterChange = (val) => {
  emit('fetchData', val)
  // const timer = setTimeout(() => {
  //   data.value = data.value.filter((timer) => {
  //     let result = true
  //     if (isNumber(val.status)) {
  //       result = timer.status === val.status
  //     }
  //     return result
  //   })
  //   clearTimeout(timer)
  // }, 150)
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

// 点击新建
const handleBulid = () => {
  emit('handleBulid')
}
</script>
<style lang="less" scoped src="../../index.less"></style>
<style lang="less" scoped>
.baseList {
  :deep(.t-table td) {
    height: 64px !important;
  }
}
</style>
