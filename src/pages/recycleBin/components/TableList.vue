<!-- 基础表格组件 -->
<template>
  <div class="baseList bg-wt">
    <div class="tableBoxs">
      <div class="newBox">
        <button class="bt newBoxbutton" @click="handleBuild()">新建</button>
      </div>
      <t-config-provider :global-config="globalLocale">
      <t-table
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        vertical-align="middle"
        :hover="true"
        :pagination="
          pagination.total <= 10 || !pagination.total ? null : pagination
        "
        :disable-data-page="pagination.total <= 10"
        :selected-row-keys="selectedRowKeys"
        :loading="dataLoading"
        :sort="sort"
        :filter-value="filterValue"
        :hide-sort-tips="true"
        :multiple-sort="false"
        :filterRow="true"
        :show-sort-column-bg-color="true"
        table-layout="fixed"
        table-content-width="100%"
        @page-change="onPageChange"
        @filter-change="FilterChange"
        @sort-change="sortChange"
        @select-change="rehandleSelectChange"
      >
        <!-- 服务类型图标 -->
        <template #headPortrait="{ row }">
          <div class="headPortrait">
            <img
              :src="row.headPortrait"
              alt=""
              class="tdesign-demo-image-viewer__ui-image--img"
            />
          </div>
        </template>
        <!-- end -->
        <!-- 服务类型图片 -->
        <template #pictureArray="{ row }">
          <div class="headPortrait">
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
          <a class="font-bt btn-split-right line
          " @click="handleViewServices(row)">查看服务项</a>
          <a class="font-bt line" @click="handleSetupContract(row)">编辑</a>
          <a class="font-bt btn-split-left" @click="handleDisable(row)">禁用</a>
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
import { CaretDownSmallIcon } from 'tdesign-icons-vue-next';
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
  'handleBuild',
  'handleClickDelete',
  'handleDisable'
])
// 监听器赋值
watch(props, () => {
  data.value = props.listData
  pagination.value = props.pagination
  dataLoading.value = false
})
const filterValue = ref({});
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
const globalLocale = ref({
  table: {
    sortIcon: (h) => h && h(CaretDownSmallIcon),
  },
});
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
  console.log(val);
  filterValue.value = val
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
const handleDisable = (val) => {
  console.log(val)
  emit('handleDisable', val)
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

// 点击新建
const handleBuild = () => {
  emit('handleBuild')
}

// 点击查看服务项
const handleViewServices = (val) => {
  router.push({
    path: 'ServiceList',
    query: {
      id: val.id
    }
  })
}
</script>
<style lang="less" scoped src="../../index.less"></style>
<style lang="less" scoped>
.baseList {
  :deep(.t-table td) {
    height: 64px !important;
  }
}
.headPortrait {
  display: flex;
  align-items: center;
}
</style>
