<!-- 新增编辑弹窗 -->
<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="title"
    :width="777"
    :on-close="onClickCloseBtn"
  >
    <template #body>
      <div class="leftBox">
        <img
          src="@/assets/icon_team_guanbi.png"
          alt=""
          class="shanghua"
          @click="scollTop"
          v-if="currentPage > 1 && typeItems.length > 9"
        />
        <div class="tagBox">
          <div
            v-for="(item, index) in typeItem"
            :key="index"
            :class="activeId === item.id ? 'activeTypeTag typeTag' : 'typeTag'"
            @click="handleSwitchTab(item.id)"
          >
            {{ item.name }}
          </div>
        </div>
        <img
          src="@/assets/icon_team_guanbi2.png"
          alt=""
          class="xiahua"
          @click="scollBottom"
          v-if="currentPage * 9 < typeItems.length && typeItems.length > 9"
        />
      </div>
      <div class="middleBox">
        <t-input
          class="search"
          placeholder="请输入服务关键字"
          v-model="searchKeyword"
          @change="handleSearch"
        >
          <template #suffixIcon>
            <search-icon />
          </template>
        </t-input>
        <NoData v-if="filteredItems.length === 0"></NoData>
        <ul class="serviceBox" v-if="filteredItems.length > 0">
          <li v-for="item in filteredItems" :key="item.id" class="serviceTag">
            <t-checkbox
              @change="(e) => onChange(e, item)"
              v-model="item.checked"
            >
              {{ item.name }}
            </t-checkbox>
            <span>￥44</span>
          </li>
        </ul>
      </div>
      <div class="rightBox">
        <div class="title">已选服务（{{ activeItems.length }}）</div>
        <NoData v-if="activeItems.length === 0"></NoData>
        <div class="cardBox" v-if="activeItems.length > 0">
          <div class="card" v-for="(item, index) in activeItems" :key="index">
            <span>{{ item.name }}</span>
            <img
              src="@/assets/btn_clean.png"
              alt=""
              @click="removeCard(item)"
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="bt bt-grey btn-submit" @click="onClickCloseBtn">
        <span>取消</span>
      </div>
      <div type="submit" class="bt btn-submit">
        <span>添加</span>
      </div>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { MessagePlugin, ValidateResultContext } from 'tdesign-vue-next'
import { SearchIcon } from 'tdesign-icons-vue-next'
import NoData from '@/components/noData/index.vue'
import { forEach } from 'lodash'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  title: {
    type: String,
    default: '添加服务'
  },
  cityList: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const typeItems = [
  { name: '保洁', id: 1 },
  { name: '维修', id: 2 },
  { name: '保洁', id: 3 },
  { name: '维修', id: 4 },
  { name: '保洁', id: 5 },
  { name: '维修', id: 6 },
  { name: '保洁', id: 7 },
  { name: '维修', id: 8 },
  { name: '保洁', id: 9 },
  { name: '维修', id: 10 },
  { name: '保洁', id: 11 },
  { name: '维修', id: 12 },
  { name: '保洁', id: 13 },
  { name: '维修', id: 14 },
  { name: '保洁', id: 15 },
  { name: '维修', id: 16 },
  { name: '保洁', id: 17 },
  { name: '维修', id: 18 },
  { name: '保洁', id: 19 },
  { name: '维修', id: 20 }
]
const typeItem = ref(typeItems.slice(0, 9))
const items = ref({
  1: [
    { id: 1, name: 'Apple', checked: false },
    { id: 2, name: 'Banana', checked: false },
    { id: 3, name: 'Orange', checked: false },
    { id: 4, name: 'Mango' },
    { id: 5, name: 'Pear' },
    { id: 6, name: 'Cherry' },
    { id: 7, name: 'Strawberry' },
    { id: 8, name: 'Nectarine' },
    { id: 9, name: 'Grape' },
    { id: 10, name: 'Blueberry' },
    { id: 11, name: 'Pomegranate' },
    { id: 12, name: 'Carambola' },
    { id: 13, name: 'Plum' },
    { id: 14, name: 'Banana' },
    { id: 15, name: 'Orange' },
    { id: 16, name: 'Mango' },
    { id: 17, name: 'Pear' },
    { id: 18, name: 'Cherry' },
    { id: 19, name: 'Strawberry' },
    { id: 20, name: 'Nectarine' },
    { id: 21, name: 'Grape' },
    { id: 22, name: 'Blueberry' },
    { id: 23, name: 'Pomegranate' },
    { id: 24, name: 'Carambola' },
    { id: 25, name: 'Plum' },
    { id: 26, name: 'Banana' },
    { id: 27, name: 'Orange' },
    { id: 28, name: 'Mango' },
    { id: 29, name: 'Pear' },
    { id: 30, name: 'Cherry' },
    { id: 31, name: 'Strawberry' },
    { id: 32, name: 'Nectarine' },
    { id: 33, name: 'Grape' },
    { id: 34, name: 'Blueberry' },
    { id: 35, name: 'Pomegranate' },
    { id: 36, name: 'Carambola' },
    { id: 37, name: 'Plum' },
    { id: 38, name: 'Banana' }
  ]
})
// 服务类型当前页
const currentPage = ref(1)
// 选中的类型Id
const activeId = ref(1)
const searchKeyword = ref('') // 搜索关键字

const activeItems = ref([])
const filteredItems = ref(items.value[activeId.value])

// 触发父级事件
const emit: Function = defineEmits(['handleClose', 'fetchData'])
// 弹窗
const formVisible = ref(false)
const options = ref([])
// 弹窗标题
const title = ref()

// 点击取消关闭
const onClickCloseBtn = () => {
  // 重置表单
  formVisible.value = false
  // 清空表单数据
  activeItems.value = []
  filteredItems.value.forEach((item) => {
    item.checked = false
  })
  emit('handleClose')
}
// 点击叉号关闭
// 切换选中类型
const handleSwitchTab = (id) => {
  activeId.value = id
  if (id === 2) {
    // filteredItems为空数组
    filteredItems.value = []
  }else {
    if(!items.value[activeId.value]){
      items.value[activeId.value] = []
      filteredItems.value = items.value[activeId.value]
    }else{
      filteredItems.value = items.value[activeId.value]
    }
  }
}
// 选择服务，把内容添加到activeItems，已选择的服务
const onChange = (e, val) => {
  if (e === true) {
    activeItems.value.push(val)
  } else {
    activeItems.value = activeItems.value.filter((item) => item.id !== val.id)
  }
}
// items.value[activeId.value] = items.value[activeId.value].forEach((item) => {
//   item.checked = false;
// });
// 输入字符模糊搜索
const handleSearch = computed(() => {
  if (filteredItems.value.length) {
    filteredItems.value = items.value[activeId.value].filter((item) => {
      return item.name.includes(searchKeyword.value)
    })
  }
})
// 清除已选服务
const removeCard = (item) => {
  activeItems.value = activeItems.value.filter((i) => i.id !== item.id)
  // 将filteredItems中的checked属性重置为false
  filteredItems.value.forEach((i) => {
    if (i.id === item.id) {
      i.checked = false
    }
  })
  if (filteredItems.value.length === 0) {
    items.value[activeId.value].forEach((i) => {
      if (i.id === item.id) {
        i.checked = false
      }
    })
  }
}
// 点击向上滚动
const scollTop = ()=>{
  if(currentPage.value > 1){
    currentPage.value -=1
    typeItem.value = typeItems.slice((currentPage.value-1)*9,currentPage.value*9)
  }
}
// 点击向下滚动
const scollBottom = ()=>{
  if(currentPage.value < Math.ceil(typeItems.length/9)){
    currentPage.value +=1
    typeItem.value = typeItems.slice((currentPage.value-1)*9,currentPage.value*9)
  }
}
// 监听器，监听父级传递的visible值，控制弹窗显示隐藏
watch(
  () => props.visible,
  () => {
    formVisible.value = props.visible
    title.value = props.title
    // 一次100条数据，分多次添加
    options.value = props.cityList
  }
)
</script>
<style lang="less" scoped>
.btn-submit {
  margin-left: 15.5px;
  width: 60px;
}
.leftBox {
  position: relative;
  .shanghua {
    width: 14px;
    position: absolute;
    left: 29px;
    top: 18px;
    cursor: pointer;
  }
  .xiahua {
    width: 14px;
    position: absolute;
    left: 29px;
    bottom: 18px;
    cursor: pointer;
  }
  .tagBox {
    margin: 25px 0;
    height: 302px;
    border-right: 2px solid #e4e7ed;
    // 禁止滚动

    &::-webkit-scrollbar {
      width:0;
    }

    .typeTag {
      margin-right: 18px;
      padding-top: 10px;
      color: var(--color-bk1);
      font-weight: 500;
      letter-spacing: 0.16px;
      font-size: 14px;
      cursor: pointer;
      text-align: center;
      width: 71px;
    }
    .activeTypeTag {
      color: var(--color-main);
      position: relative;
      // 伪类
      &::before {
        position: absolute;
        content: '';
        display: block;
        width: 2px;
        height: 100%;
        right: -20px;
        top: 0;
        background-color: var(--color-main);
      }
    }
  }
}
.middleBox {
  padding: 25px 0px 25px 30px;
  border-right: 1px solid #e4e7ed;
  .search {
    width: 240px;
    height: 32px;
    margin-right: 25.5px;
  }
  .serviceBox {
    height: 252px;
    width: 250px;
    margin-top: 18.4px;
    margin-right: 15.5px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    // 滚动条不占位置
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent; /* 设置滚动条轨道背景色 */
    }
    &::-webkit-scrollbar-thumb {
      width: 4px;
      background-color: #d8d8d8; /* 设置滚动条滑块颜色 */
      border-radius: 2px; /* 设置滚动条滑块的圆角 */
      &:hover {
        background-color: #555; /* 设置滑块的背景色 */
      }
    }
    .serviceTag {
      width: 240px;
      height: 50px;
      border: 1px solid #ebeef5;
      border-top: none;
      display: flex;
      padding-left: 14px;
      padding-right: 26px;
      align-items: center;
      justify-content: space-between;
      span {
        color: var(--color-bk3);
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
      }
      // :deep(.t-checkbox__input) {
      //   width: 14px;
      //   height: 14px;
      //   border: 1px solid #d5d8de;
      //   border-radius: 2px;
      //   background-color: #ffffff;
      // }
      :deep(.t-checkbox__label) {
        margin-left: 9px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 13px;
        color: var(--color-bk1);
        letter-spacing: 0;
        line-height: 14px;
      }
      &:first-child {
        border-top: 1px solid #ebeef5;
      }
    }
  }
}
.rightBox {
  padding-top: 24.5px;

  width: 328.5px;
  .title {
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: 14px;
    padding-left: 29.5px;
    color: var(--color-bk1);
    letter-spacing: 0.16px;
    height: 34px;
  }
  .cardBox {
    width: 303px;
    height: 278px;
    padding-left: 29.5px;
    padding-top: 5px;
    display: flex;
    box-sizing: content-box;
    flex-wrap: wrap;
    overflow-y: auto;
    scroll-behavior: smooth;
    align-content: flex-start;
    // 滚动条不占位置
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent; /* 设置滚动条轨道背景色 */
    }
    &::-webkit-scrollbar-thumb {
      width: 4px;
      background-color: #d8d8d8; /* 设置滚动条滑块颜色 */
      border-radius: 2px; /* 设置滚动条滑块的圆角 */
      &:hover {
        background-color: #555; /* 设置滑块的背景色 */
      }
    }
    // 一行显示两个
    .card {
      padding-left: 13px;
      padding-right: 13px;
      width: 133px;
      height: 40px;
      background: #ffffff;
      box-shadow: 0 1px 4px 3px #00000008;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-right: 22px;
      margin-bottom: 15px;
      &:nth-child(2n) {
        margin-right: 0;
      }
      span {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        line-height: 14px;
        color: var(--color-bk1);
      }
      img {
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
    }
  }
}
:deep(.t-textarea__limit) {
  color: var(--color-bk4);
  right: 10px;
}
:deep(.t-dialog__footer) {
  display: flex;
  justify-content: flex-end;
  padding: 22px 32px 24px;
}
:deep(.t-dialog__body) {
  border-bottom: 1px solid #e4e7ed;
  padding: 0 37px 0 17.5px;
  display: flex;
}
:deep(.noData img) {
  width: 157.3px;
  height: 143px;
  margin-top: 55.5px;
  margin-bottom: 9px;
}
:deep(.noData p) {
  margin-bottom: 9px;
}
</style>
