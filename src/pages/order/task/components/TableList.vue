<!-- 基础表格组件 -->
<template>
  <div class="baseList bg-wt min-h">
    <div class="tableBoxs">
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
          :loading="dataLoading"
          :sort="sort"
          showSizeChanger
          :hide-sort-tips="true"
          :show-sort-column-bg-color="true"
          table-layout="fixed"
          :multiple-sort="true"
          table-content-width="100%"
          @page-change="onPageChange"
          @sort-change="sortChange"
        >
          <!-- 空页面 -->
          <template #empty>
            <NoData></NoData>
          </template>
          <!-- 服务类型图标 -->
          <template #serveTypeIcon="{ row }">
            <div class="headPortrait">
              <img
                :src="row.serveItemIcon"
                alt=""
                class="tdesign-demo-image-viewer__ui-image--img"
              />
            </div>
          </template>
          <!-- end -->
          <!-- 服务类型图片 -->
          <template #img="{ row }">
            <div class="headPortrait">
              <t-image-viewer :images="[row.img]">
                <template #trigger="{ open }">
                  <div class="tdesign-demo-image-viewer__ui-image">
                    <img
                      alt="test"
                      :src="row.img"
                      class="tdesign-demo-image-viewer__ui-image--img"
                    />
                    <div
                      class="tdesign-demo-image-viewer__ui-image--hover"
                      @click="open"
                    >
                      <span><ZoomInIcon size="1.8em" /></span>
                    </div>
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
            <a
              :class="
                row.saleStatus === 2
                  ? 'text-forbidden btn-dl btn-split-right'
                  : 'btn-dl btn-split-right'
              "
              @click="handleClickCancel(row)"
              >取消</a
            >
            <!-- <a
              :class="
                row.saleStatus === 2
                  ? 'text-forbidden font-bt line'
                  : 'font-bt line'
              "
              @click="handleClickRefund(row)"
              >退款</a
            > -->
            <a
              class="font-bt btn-split-left"
              @click="handleDetail(row)"
              >查看</a
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
import { CaretDownSmallIcon, ZoomInIcon } from 'tdesign-icons-vue-next'
import { COLUMNS } from '../constants'
import NoData from '@/components/noData/index.vue'
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
  'handleBuild',
  'handleClickCancel',
  'handleSortChange',
  'onPageChange',
  'handleClickRefund'
])
// 监听器赋值
watch(props, () => {
  data.value = props.listData
  pagination.value = props.pagination
  dataLoading.value = false
})
// 行key
const rowKey = ref('id')
// 路由
const router = useRouter()
// 排序
const sort = ref([
  {
    // 按照服务调用次数进行排序
    sortBy: 'sortNum'
  },
  {
    sortBy: 'updateTime'
  }
]) // 排序
const globalLocale = ref({
  table: {
    sortIcon: (h) => h && h(CaretDownSmallIcon)
  }
}) // 排序图标
const data: any = ref([])
// 分页器
const pagination: any = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
})
// 加载状态
const dataLoading = ref(true)

// 排序
const sortChange = (val) => {
  sort.value = val
  emit('handleSortChange', val)
}

// 点击退款
const handleClickRefund = (val) => {
  emit('handleClickRefund', val)
}

// 查看详情
const handleDetail = (val) => {
  router.push('/order/orderList/orderDetail/' + val.id)
}
// 点击删除
const handleClickCancel = (row: { rowIndex: any }) => {
  emit('handleClickCancel', row)
}
// 点击翻页
const onPageChange = (val) => {
  pagination.value.defaultCurrent = val.current
  pagination.value.defaultPageSize = val.pageSize
  emit('onPageChange', {
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
  :deep(.t-table td) {
    height: 64px !important;
  }
}
.headPortrait {
  display: flex;
  align-items: center;
}
:deep(.t-table__filter-icon) {
  display: none;
}
</style>
