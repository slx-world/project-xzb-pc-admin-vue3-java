<template>
  <div class="bg-wt moduleMain ht pd-24">
    <div id="scrollTag" class="containerBox">
      <div class="navLaftFloat">
        <ul>
          <li
            v-for="(item, index) in leftMenu"
            :key="index"
            :class="isActive === index ? 'active' : ''"
            @click="scrollTagHandle(index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- <div id="menuFlag" class="navTop" :class="whether ? 'isFixed' : ''">
        <span
          v-for="(item, index) in navData"
          :key="index"
          :class="isTopActive === index ? 'topActive' : ''"
          @click="handleNav(index)"
          >{{ item }}</span
        >
      </div> -->
      <!-- <div v-if="isTopActive === 0"> -->
      <!-- 卡片列表-带排序 -->
      <div id="tag0" class="moduleBox">
        <div class="title">列表(可排序)</div>
        <div class="text">
          很多时候TD组件库普通表格满足不了我们的设计需求，而且样式改起来也比较麻烦，所以需要自定义列表，此列表的功能有上下排序、删除
        </div>
        <div class="boxPt12">
          <!-- 列表组件 -->
          <CardListSort
            :card-base-data="cardBaseData"
            @get-card-sort="getCardSort"
          ></CardListSort>
          <!-- end -->
        </div>
      </div>
      <!-- end -->
      <!-- 卡片列表-折叠框 -->
      <div id="tag1" class="moduleBox">
        <div class="title">列表(可展开1)</div>
        <div class="text">
          自定义卡片列表：这是一个由Collapse
          折叠面板和自定义的列表结合共有两级，一级列表是章信息，展开后的列表是每章下的小节，可编辑、排序、添加(小节)、删除功能
        </div>
        <div>
          TD组件库链接:<a
            href="https://tdesign.tencent.com/vue/components/collapse"
            >Collapse 折叠面板</a
          >
        </div>
        <div class="boxPt12">
          <!-- 列表组件 -->
          <CollapseList></CollapseList>
          <!-- end -->
        </div>
      </div>
      <!-- end -->
      <!-- 可下拉展开的列表 -->
      <div id="tag2" class="moduleBox">
        <div class="title">列表(可展开2)</div>
        <div class="text">
          下拉展开列表，表格提供可收纳功能，展开后进一步查看详细内容
        </div>
        <div>
          TD组件库链接:<a
            href="https://tdesign.tencent.com/vue-next/components/Table#%E5%8F%AF%E5%B1%95%E5%BC%80%E5%92%8C%E6%94%B6%E8%B5%B7%E7%9A%84%E8%A1%A8%E6%A0%BC"
            >可展开和收起的表格</a
          >
        </div>
        <div class="boxPt12">
          <DropList></DropList>
        </div>
      </div>
      <!-- end -->
      <!-- 带tab的列表 -->
      <div id="tag3" class="moduleBox">
        <div class="title">列表(带tab)</div>
        <div class="text">
          <p>TD组件库 t-table、自定义好的tab切换组件组成</p>
        </div>
        <div>
          TD组件库链接:<a
            href="https://tdesign.tencent.com/vue-next/components/table"
            >表格</a
          >
        </div>
        <div class="boxPt12">
          <TabList></TabList>
        </div>
      </div>
      <!-- end -->
      <!-- 树形列表 -->
      <div id="tag4" class="moduleBox">
        <div class="title">列表(树状)</div>
        <div class="text">
          树形结构的表格，表格提供展开/收起节点，删除节点功能
        </div>
        <div>
          TD组件库链接:<a
            href="https://tdesign.tencent.com/vue-next/components/Table#%E6%A0%91%E5%BD%A2%E7%BB%93%E6%9E%84%E7%9A%84%E8%A1%A8%E6%A0%BC"
            >树形节点表格</a
          >
        </div>
        <div class="boxPt12">
          <TreeList></TreeList>
        </div>
      </div>
      <!-- end -->
      <!-- 带列表的弹窗 -->
      <div id="tag5" class="moduleBox">
        <div class="title">弹窗(带列表)</div>
        <div class="text">
          <p>1、在TD弹出层里嵌套了表格和分页</p>
          <p>
            2、在TD弹出层里嵌套了表格,加了滚动分页，向下滚动的时候顶部标题固定，只有内容滚动
          </p>
        </div>
        <div>
          TD组件库链接:<a
            href="https://tdesign.tencent.com/vue-next/components/dialog"
            >对话框</a
          >、
          <a href="https://tdesign.tencent.com/vue-next/components/table"
            >table表格</a
          >
        </div>
        <!-- 列表组件 -->
        <div class="boxPt12 newBox">
          <button class="bt newBoxbutton" @click="handleOpenDialog()">
            分页标签
          </button>
          <button class="bt newBoxbutton" @click="handleOpenScrollDialog()">
            滚动分页
          </button>
        </div>
        <!-- end -->
        <!-- 带列表的弹窗-普通分页 -->
        <ListDialog
          :dialog-visible="dialogVisible"
          :dialog-data="dialogData"
          :pagination="
          pagination.total <= 10 || !pagination.total ? null : pagination
        "
          :maxi-num="maxiNum"
          :select-data="selectData"
          @handle-close-dialog="handleCloseDialog"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
          @handle-submit="handleSubmit"
        ></ListDialog>
        <!-- end -->
        <!-- 带列表的弹窗-滚动分页 -->
        <ListScrollDialog
          :dialog-visible="dialogScrollVisible"
          :dialog-data="dialogData"
          :pagination="
          pagination.total <= 10 || !pagination.total ? null : pagination
        "
          :pages="pages"
          :maxi-num="maxiNum"
          :select-data="selectData"
          @handle-close-dialog="handleCloseScrollDialog"
          @get-pages="getPages"
          @handle-submit="handleSubmit"
          @get-list="getDialList"
        ></ListScrollDialog>
        <!-- end -->
      </div>
      <!-- end -->
      <!-- 带tab的弹窗 -->
      <div id="tag6" class="moduleBox">
        <div class="title">弹窗(带tab)</div>
        <div class="text">
          <p>在TD弹出层里嵌套了tab 切换和table表格</p>
        </div>
        <div>
          TD组件库链接:<a
            href="https://tdesign.tencent.com/vue-next/components/tabs"
            >tab选项卡</a
          >、
          <a href="https://tdesign.tencent.com/vue-next/components/table"
            >table表格</a
          >
        </div>
        <div class="boxPt12 newBox">
          <button class="bt newBoxbutton" @click="handleTabOpenDialog()">
            tab弹窗
          </button>
        </div>
        <TabDialog
          :dialog-tab-visible="dialogTabVisible"
          :dialog-data="dialogData"
          :pagination="
          pagination.total <= 10 || !pagination.total ? null : pagination
        "
          :maxi-num="maxiNum"
          :select-data="selectData"
          @handle-closetab-dialog="handleClosetabDialog"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
          @get-pages="getPages"
          @handle-submit="handleSubmit"
        ></TabDialog>
      </div>
      <!-- end -->
      <!-- 带单位的弹窗 -->
      <div id="tag7" class="moduleBox">
        <div class="title">弹窗(带表单)</div>
        <div class="text">
          <p>1、在TD弹出层里嵌套了表单和</p>
          <p>
            2、在TD弹出层里嵌套了的表单里面附加了带单位的功能，并且添加了相应的正则验证
          </p>
        </div>
        <div>
          TD组件库链接:<a
            href="https://tdesign.tencent.com/vue-next/components/dialog"
            >对话框</a
          >、
          <a href="https://tdesign.tencent.com/vue-next/components/form"
            >form表单</a
          >
        </div>
        <div class="newBox">
          <button class="bt newBoxbutton" @click="handleUnitDialog()">
            单位弹窗
          </button>
        </div>
        <UnitDialog
          :visible="UnitDialogvisible"
          :title="UnitDialogtitle"
          :data="UnitDialogFormdata"
          :form-data="UnitformData"
          @handleClose="handleUnitClose"
        ></UnitDialog>
      </div>
      <!-- end -->
      <!-- 禁用和未实现功能弹窗 -->
      <div id="tag8" class="moduleBox">
        <div class="title">禁用提示</div>
        <div class="text">
          1、禁用提示（包含两个文案1、功能未开发 2、功能已开发不可点击 ）
        </div>
        <div class="text">2、弹窗在页面上下居中，左右居中的位置</div>
        <div class="boxPt12 newBox">
          <button
            class="bt newBoxbutton"
            @click="handleOpenByProdDisabled('incomplete')"
          >
            功能未实现
          </button>
          <button
            class="bt newBoxbutton"
            @click="handleOpenByProdDisabled('forbidden')"
          >
            功能禁止
          </button>
        </div>
        <!-- 生产环境禁用操作弹窗 -->
        <ProdDisabled
          :confirm-visible="prodDisabledVisible"
          :type="type"
          @handleClose="handleCloseByProdDisabled"
        ></ProdDisabled>
      </div>
      <!-- end -->
      <!-- 动态增加数据 -->
      <div id="tag9" class="moduleBox">
        <div class="title">动态增加数据</div>
        <div class="text">
          <p>
            在TDfrom里input结合自定义的新增/删除按钮实现，添加按钮固定在第一行，点击添加可添加新的iput框，新添加的内容永远在最下方
          </p>
        </div>
        <div>
          TD组件库链接:<a
            href="https://tdesign.tencent.com/vue-next/components/input"
            >input输入框</a
          >
        </div>
        <div class="boxPt12">
          <AddInput
            :base-data="inputDataChange"
            @handle-input-add="handleInputAdd"
            @handle-input-delete="handleInputDelete"
          ></AddInput>
        </div>
      </div>
      <!-- end -->
      <!-- 穿梭框 -->
      <div id="tag10" class="moduleBox">
        <div class="title">穿梭框</div>
        <div class="text">
          在TD的穿梭框组件上新增了
          hover功能,穿梭框+tooltip文字提示,hover提示内容区域高度不固定,随着内容的多少,上下撑开
        </div>
        <div>
          TD组件库链接:<a
            href="https://tdesign.tencent.com/vue-next/components/transfer"
            >穿梭框</a
          >、<a href="https://tdesign.tencent.com/vue-next/components/tooltip"
            >hover</a
          >
        </div>
        <div class="boxPt12">
          <!-- 穿梭框组件 -->
          <Transfer :transfer-item-data="transferItemData"></Transfer>
          <!-- end -->
        </div>
      </div>
      <!-- end -->
      <!-- </div> -->
      <!-- <div v-if="isTopActive === 1">
        <div id="tag0" class="moduleBox">
          <div class="title">列表(可排序)</div>
          <div>
            <p>cardBaseData:要传给子组件的数据</p>
            <p>
              getCardSort:列表进行操作的时候用此方法，方便刷新列表数据。比如：排序、删除
            </p>
          </div>
        </div>
        <div id="tag3" class="moduleBox">
          <div class="title">弹窗(带tab)</div>
          <div>
            <p>dialogTabVisible:弹层的显示与隐藏</p>
            <p>dialogData:弹层的列表数据</p>
            <p>pagination:分页信息</p>
            <p>maxiNum:最多选择的数量</p>
            <p>selectData:详情获取已经选择的选项</p>
            <p>handleCloseDialog:关闭弹层方法</p>
            <p>handleSizeChange:设置弹层列表的每页数据的数量</p>
            <p>handleCurrentChange:设置弹层列表的当前页</p>
            <p>handleSubmit:提交弹层的内容方法</p>
            <p>getPages:获取当前页</p>
          </div>
        </div>
        <div id="tag5" class="moduleBox">
          <div class="title">弹窗(带列表)</div>
          <div>
            <p>dialogVisible:弹层的显示与隐藏</p>
            <p>dialogData:弹层的列表数据</p>
            <p>pagination:分页信息</p>
            <p>maxiNum:最多选择的数量</p>
            <p>selectData:详情获取已经选择的选项</p>
            <p>handleCloseDialog:关闭弹层方法</p>
            <p>handleSizeChange:设置弹层列表的每页数据的数量</p>
            <p>handleCurrentChange:设置弹层列表的当前页</p>
            <p>handleSubmit:提交弹层的内容方法</p>
            <p>pages:总页数</p>
            <p>getPages:获取当前页</p>
            <p>getList:列表进行操作的时候用此方法，方便操作时刷新列表数据</p>
          </div>
        </div>

        <div id="tag7" class="moduleBox">
          <div class="title">弹窗(带表单)</div>
          <div>
            <p>visible:弹层的显示与隐藏</p>
            <p>title:弹层标题</p>
            <p>data:表单数据</p>
            <p>handleClose:弹层关闭方法</p>
          </div>
        </div>
        <div id="tag8" class="moduleBox">
          <div class="title">禁用提示</div>
          <div>
            <p>confirmVisible:弹层的显示与隐藏</p>
            <p>type:类型</p>
            <p>handleClose:弹层关闭方法</p>
          </div>
        </div>
        <div id="tag9" class="moduleBox">
          <div class="title">动态增加数据</div>
          <div>
            <p>baseData:弹层的显示与隐藏</p>
            <p>handleInputAdd:添加一个文本框表单</p>
            <p>handleInputDelete:删除一个文本框表单</p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 接口
import { getTransferList, getcardSortList, getDialogList } from '@/api/list'

// 组件
// 穿梭框
import Transfer from '@/czriComponents/Transfer/index.vue'
// 卡片列表页(带排序)
import CardListSort from '@/czriComponents/CardListSort/index.vue'
// 折叠数据组件
import CollapseList from '@/czriComponents/CardListCollapse/index.vue'

// 列表弹层
import ListDialog from '@/czriComponents/ListDialog/index.vue'
// 列表滚动分页弹层
import ListScrollDialog from '@/czriComponents/ListScrollDialog/index.vue'
// 带tab的弹窗组件
import TabDialog from '@/czriComponents/TabDialog/index.vue'
// 动态增加数据 input
import AddInput from '@/czriComponents/AddInput/index.vue'
// 带tab的列表
import TabList from '@/czriComponents/tabList/index.vue'
// 带单位的弹窗
import UnitDialog from '@/czriComponents/UnitDialog/index.vue'
// 可下拉展开的列表
import DropList from '@/czriComponents/dropList/index.vue'
// 树形列表
import TreeList from '@/czriComponents/treeList/index.vue'
// 禁用提示弹窗
import ProdDisabled from '@/components/Message/ProdDisabled.vue' // 删除弹窗
// ------定义变量------
// 穿梭框
const transferItemData = ref([]) // 穿梭框数据
// 卡片列表(带排序)
const cardBaseData = ref([]) // 卡片列表数据
// 列表弹层
const dialogVisible = ref(false) // 普通分页弹层列表显示与隐藏
const dialogScrollVisible = ref(false) // 滚动分页弹层列表显示与隐藏
const dialogData = ref([]) // 弹层列表数据
const dataLoading = ref(false) // 加载loading
const pages = ref(0) // 总页数
const maxiNum = ref(5) // 传给子组件最后选择的数量
const UnitDialogvisible = ref(false) // 单位弹窗显示与隐藏
const UnitDialogtitle = ref('') // 单位弹窗标题
const UnitDialogFormdata = ref([]) // 单位弹窗数据
const UnitformData = ref([]) // 单位弹窗表单数据
const prodDisabledVisible = ref(false) // 禁用提示弹窗显隐
const type = ref('incomplete') // incomplete功能未完成 forbidden功能禁止
const isActive = ref(0)
const whether = ref(false)
const leftMenu = ref([
  '列表(可排序)',
  '列表(可展开1)',
  '列表(可展开2)',
  '列表(带Tab)',
  '列表(树状)',
  '弹窗(带列表)',
  '弹窗(带Tab)',
  '弹窗(带表单)',
  '禁用提示',
  '动态增加数据',
  '穿梭框'
])
// const navData = ref(['示例', 'API'])
const selectData = ref([
  {
    id: 4,
    introduce:
      '红河哈尼族彝族自治州办公用品采购项目红河哈尼族彝族自治州办公用品采购项目红河哈尼族彝族自治州办公用品采购项目红河哈尼族彝族自治州办公用品采购项目\t',
    isShow: false,
    name: '常刚',
    num: '3',
    phone: 13413361400,
    photo: 'https://tdesign.gtimg.com/starter/cloud-server.jpg'
  }
]) // 获取已经先择的数据
const pagination = ref<Object | any>({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
}) // 分页
// 带tab的弹窗
const dialogTabVisible = ref(false)
// 动态添加数据
const baseData = ref([
  {
    name: '',
    value: ''
  }
])
const listBoxState = ref(true)
const isTopActive = ref(0)
// ------生命周期------
const inputDataChange = ref([])
onMounted(() => {
  getTranList() // 加载穿梭框列表数据
  getCardSort() // 获取卡片列表(带排序)
  alterationArray() //
  // 监听页面滚动事件
  window.addEventListener('scroll', scrollToTop, true)
})
// 页面滚动
const scrollToTop = (e) => {
  // 获取视窗高度
  const { scrollTop } = e.target // 鼠标滚动的位置
  // const { offsetTop } = document.querySelector('#menuFlag')
  // whether.value = scrollTop > offsetTop
  if (listBoxState.value) {
    // 作用是点击导航栏时，延迟这里执行。
    leftMenu.value.forEach((val, index) => {
      // 获取监听元素距离视窗顶部距离
      const tagOffsetTop = document.querySelector(`#tag${index}`) as any // 获取监听元素本身高度
      const tagscrollHeight = document.querySelector(`#tag${index}`) as any // 如果 dom滚动位置 >= 元素距离视窗距离 && dom滚动位置 <= 元素距离视窗距离+元素本身高度 // 则表示页面已经滚动到可视区了。
      if (tagOffsetTop) {
        if (
          scrollTop >= tagOffsetTop.offsetTop - 100 &&
          scrollTop <=
            tagOffsetTop.offsetTop + tagscrollHeight.scrollHeight - 100
        ) {
          // 导航栏背景色选中
          isActive.value = index
        }
      }
    })
  }
}
// 触发左侧菜单
const scrollTagHandle = (index) => {
  isActive.value = index
  document.querySelector(`#tag${index}`).scrollIntoView()
  listBoxState.value = false
  let timeId
  clearTimeout(timeId)
  timeId = setTimeout(() => {
    listBoxState.value = true
  }, 200)
}
// ------定义方法------
// 获取穿梭框列表数据
const getTranList = async () => {
  try {
    const res: any = await getTransferList() // 获取列表数据,当前为mock接口，后续会替换为真实接口，并接受真实数据传值
    transferItemData.value = res.data.list
  } catch (e) {
    console.log(e)
  }
}

// 获取卡片列表(带排序)
const getCardSort = async () => {
  try {
    const res: any = await getcardSortList()
    cardBaseData.value = res.data.list
  } catch (e) {
    console.log(e)
  }
}
// 带列表的弹窗
// 列表弹层列表数据
const getDialList = async () => {
  try {
    dataLoading.value = true
    const res: any = await getDialogList()
    // dialogData.value = [...dialogData.value, ...res.data.list] // 根据需求变更合并数据
    dialogData.value = res.data.list
    pagination.value.total = dialogData.value.length
    pages.value = Math.ceil(dialogData.value.length / 10)
  } catch (e) {
    console.log(e)
  } finally {
    dataLoading.value = false
  }
}

const getPages = (val) => {
  pagination.value.defaultCurrent = val
}
// 列表弹层列表设置每页条数
const handleSizeChange = (val) => {
  pagination.value.defaultPageSize = val
  if (pagination.value.defaultCurrent === 1) {
    // 刷新列表
    getDialList()
  }
}
// 列表弹层列表当前页
const handleCurrentChange = (val) => {
  pagination.value.defaultCurrent = val
  if (val === pagination.value.defaultCurrent) {
    pagination.value.defaultCurrent = 1
  }

  // 刷新列表
  getDialList()
}
// 打开普通列表弹层
const handleOpenDialog = () => {
  dialogVisible.value = true
  getDialList()
}
// 关闭普通列表弹层
const handleCloseDialog = () => {
  dialogVisible.value = false
}
// 打开弹层列表滚动
const handleOpenScrollDialog = () => {
  dialogScrollVisible.value = true
  getDialList()
}
// 关闭弹层列表滚动
const handleCloseScrollDialog = () => {
  dialogScrollVisible.value = false
}
// 提交普通列表弹层
const handleSubmit = (val) => {
  console.log(val)
}
// 带tab的弹窗
// 打开带tab的弹窗
const handleTabOpenDialog = () => {
  dialogTabVisible.value = true
  getDialList()
}
// 关闭带tab的弹窗
const handleClosetabDialog = () => {
  dialogTabVisible.value = false
}
// 动态增加的数据
// 需要把组件名字转换成内部自定义的参数名字
const alterationArray = () => {
  baseData.value.forEach((ele) => {
    const res = JSON.parse(
      JSON.stringify(ele).replace(/name/g, 'n').replace(/value/g, 'v')
    )
    inputDataChange.value.push(res)
  })
}
// 新增动态input
const handleInputAdd = (val) => {
  // 需要把组件内部自定义的参数名字转换成我们需要的名字
  const baseArr = []
  inputDataChange.value.push(val)
  inputDataChange.value.forEach((ele) => {
    // 名字转换
    const res = JSON.parse(
      JSON.stringify(ele).replace(/n/g, 'name').replace(/v/g, 'value')
    )
    baseArr.push(res)
  })
  // 最终获取的数据
  baseData.value = baseArr
}
// 删除input
const handleInputDelete = (val) => {
  baseData.value = val
}
// 打开带单位的列表弹窗
const handleUnitDialog = () => {
  UnitDialogtitle.value = '选择单位'
  UnitDialogvisible.value = true
}
// 关闭带单位的列表弹窗
const handleUnitClose = () => {
  UnitDialogvisible.value = false
}

// 打开禁用词提示弹窗
const handleOpenByProdDisabled = (params) => {
  type.value = params
  prodDisabledVisible.value = true
}
const handleCloseByProdDisabled = () => {
  prodDisabledVisible.value = false
}
//
const handleNav = (index) => {
  isTopActive.value = index
}
</script>
<style scoped lang="less">
.moduleBox {
  padding-bottom: 60px;
  line-height: 30px;
  position: relative;
  .title {
    font-size: 20px;
    font-weight: 600;
    padding-bottom: 14px;
  }
  .text {
    color: var(--color-bk2);
  }
  .newBox {
    display: inline-block;
    text-align: left;
    button {
      display: inline-block;
      margin-right: 20px;
    }
  }
  .boxPt12 {
    padding-top: 12px;
  }
}
.containerBox {
  min-height: 800px;
  width: 100%;
  box-sizing: border-box;
  padding-left: 220px;
  position: relative;
  margin: 0 auto;
  .navLaftFloat {
    position: fixed;
    padding-left: 20px;
    margin-left: 20px;
    margin-top: 15px;
    z-index: 9;
    top: 80px;
    left: 220px;
    li {
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      padding: 0 20px;
      border-left: 1px solid var(--color-border);
      &.active {
        color: var(--color-main);
        border-left: 1px solid var(--color-main);
      }
    }
  }
}
.compact {
  .containerBox {
    .navLaftFloat {
      left: 80px;
    }
  }
}
.navTop {
  background: #eee;
  height: 50px;
  line-height: 38px;
  padding: 5px;
  border: 1px solid #e7e7e7;
  display: inline-block;
  border-radius: 8px;
  position: relative;
  margin-bottom: 30px;
  span {
    display: inline-block;
    width: 100px;
    text-align: center;
    padding: 0 20px;
    position: relative;
    cursor: pointer;
  }
}
.isFixed {
  position: fixed;
  top: 0px;
  z-index: 999;
}
.topActive {
  background: #fff;
  border-radius: 8px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  transition: all 0.5s;
}
</style>
