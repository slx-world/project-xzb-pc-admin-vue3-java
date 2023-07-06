<!-- 基础表格组件 -->
<template>
  <div>
    <div class="bg-wt">
      <div class="tableBoxs">
        <div class="newBox">
          <button class="bt newBoxbutton" @click="handleBuild()">新建</button>
        </div>
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
          :show-sort-column-bg-color="true"
          table-layout="auto"
          @page-change="onPageChange"
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
                      >
                        <!-- <span><browse-icon size="1.4em" /> 预览</span> -->
                      </div>
                    </div>
                  </template>
                </t-image-viewer>
              </span>
              <span>{{ row.name }}</span>
            </div>
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
          <!-- 在表格中添加自定义列 -->
          <template #updateTime="{ row }">
            <div class="updateTime">
              <span>{{ row.updateTime }}</span>
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
    <!-- 删除弹窗 -->
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
import { isNumber } from 'lodash'
import { COLUMNS } from '../constants'
// tab切换组件
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
  dataLoading.value = false
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
  emit('fetchData', {
    defaultCurrent: val.current,
    defaultPageSize: val.pageSize
  })
}

// 点击新建
const handleBuild = () => {
  emit('handleBuild')
}

// 控制弹窗
</script>
<style lang="less" scoped>
.newBox {
  margin-bottom: 16px;
  display: flex;
  .newBoxbutton {
    // 右对齐
    margin-left: auto;
    width: 88px;
  }
}
.name {
  img {
    width: 32px;
    height: 32px;
    vertical-align: bottom;
    border-radius: 4px;
  }
  display: flex;
  align-items: center;
  span {
    display: contents;
  }
}
.updateTime {
  font-family: HelveticaNeue;
}
.t-col-2 {
  display: flex;
}
.line {
  padding: 0 7.5px;
  // 在框线外一边扩展7.5px
}
.btn-split-right {
  padding-right: 7.5px;
}
.btn-split-left {
  padding-left: 7.5px;
}
:deep(.t-table td) {
  height: 49px;
  padding-top: 0;
  padding-bottom: 0;
}
.description {
  // 自动折行，超出两行显示省略号
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 252px;
  .hover {
    display: none;
    position: absolute;
    // 位于div上方中间位置
    bottom: -57px;
    width: 334px;
    font-size: 12px;
    background-color: #fff;
    line-height: 17px;
    box-shadow: 0 0 8px 1px rgba(34, 40, 51, 0.12);
    border-radius: 4px;
    padding: 15px;
    color: var(--color-bk1);
    word-break: break-all;
    z-index: 100;
    &::after {
      content: '';
      position: absolute;
      top: -5px;
      left: 5%;
      width: 10px;
      height: 10px;
      transform: rotate(45deg);
      background-color: #fff;
      // box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.05);
    }
  }
  &:hover {
    .hover {
      display: block;
    }
  }
}
:deep(.t-table__body) {
  tr {
    &:nth-last-child(2),
    &:last-child {
      .hover {
        bottom: 59px;
        &::after {
          top: 60px;
          bottom: -5px;
        }
      }
    }
  }
}
.descriptionheight {
  margin-top: 10px;
  margin-bottom: 10px;
}
.bg-wt {
  padding-top: 20px;
}
</style>
