<template>
  <div class="bg-wt moduleMain ht">
    <div
      id="scrollTag"
      ref="scrollTag"
      :class="leftMenu.length > 1 ? 'containerBoxMenu' : 'containerBox'"
    >
      <!-- 内容左侧菜单 -->
      <MenuLeft v-if="leftMenu.length > 1" :left-menu="leftMenu"></MenuLeft>
      <!-- end -->
      <!-- 固定top -->
      <TopNav
        :nav-data="navData"
        :title="title"
        @get-top-active="getTopActive"
      ></TopNav>
      <!-- end -->
      <div v-if="isTopActive === 0" class="pd-24">
        <div id="tag0" class="moduleBox">
          <div class="title">列弹窗(带列表)</div>
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
            :pagination="pagination"
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
            :pagination="pagination"
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
        <!-- 弹窗(带tab) -->
        <div id="tag1" class="moduleBox">
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
            :pagination="pagination"
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
        <!-- 可下拉展开的列表 -->
        <div id="tag2" class="moduleBox">
          <div class="title">列弹窗(带列表)</div>
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
      </div>
      <div v-if="isTopActive === 1" class="pd-24">
        <div class="moduleBox">
          <h2 class="tit">Props</h2>
          <div class="moduleTable">
            <table>
              <tr>
                <th>名称</th>
                <th>类型</th>
                <th>默认值</th>
                <th>说明</th>
                <th>必传</th>
              </tr>
              <tr>
                <td>dialogVisible</td>
                <td>Boolean</td>
                <td>false</td>
                <td>列表弹层的显示与隐藏</td>
                <td>N</td>
              </tr>
              <tr>
                <td>dialogTabVisible</td>
                <td>Boolean</td>
                <td>false</td>
                <td>tab弹层的显示与隐藏</td>
                <td>N</td>
              </tr>
              <tr>
                <td>visible</td>
                <td>Boolean</td>
                <td>false</td>
                <td>带表单弹层的显示与隐藏</td>
                <td>N</td>
              </tr>
              <tr>
                <td>dialogData</td>
                <td>Array</td>
                <td>-</td>
                <td>弹层的列表数据</td>
                <td>N</td>
              </tr>
              <tr>
                <td>title</td>
                <td>String</td>
                <td>-</td>
                <td>带表单弹层标题</td>
                <td>N</td>
              </tr>
              <tr>
                <td>data</td>
                <td>Object</td>
                <td>-</td>
                <td>表单数据</td>
                <td>N</td>
              </tr>
              <tr>
                <td>cardBaseData</td>
                <td>Array</td>
                <td>-</td>
                <td>要传给子组件的数据</td>
                <td>N</td>
              </tr>
              <tr>
                <td>pagination</td>
                <td>Object</td>
                <td>-</td>
                <td>分页信息</td>
                <td>N</td>
              </tr>
              <tr>
                <td>maxiNum</td>
                <td>Number</td>
                <td>-</td>
                <td>最多选择的数量</td>
                <td>N</td>
              </tr>
              <tr>
                <td>selectData</td>
                <td>Array</td>
                <td>-</td>
                <td>详情获取已经选择的选项</td>
                <td>N</td>
              </tr>
              <tr>
                <td>pages</td>
                <td>Number</td>
                <td>-</td>
                <td>总页数</td>
                <td>N</td>
              </tr>
            </table>
          </div>
          <h2 class="tit">Event</h2>
          <div class="moduleTable">
            <table>
              <tr>
                <th>名称</th>
                <th>类型</th>
                <th>默认值</th>
                <th>说明</th>
                <th>必传</th>
              </tr>
              <tr>
                <td>handleCloseDialog</td>
                <td>Function</td>
                <td>-</td>
                <td>关闭弹层方法</td>
                <td>N</td>
              </tr>
              <tr>
                <td>handleClose</td>
                <td>Function</td>
                <td>-</td>
                <td>带表单弹层关闭方法</td>
                <td>N</td>
              </tr>
              <tr>
                <td>handleSizeChange</td>
                <td>Function</td>
                <td>-</td>
                <td>设置弹层列表的每页数据的数量</td>
                <td>N</td>
              </tr>
              <tr>
                <td>handleCurrentChange</td>
                <td>Function</td>
                <td>-</td>
                <td>设置弹层列表的当前页</td>
                <td>N</td>
              </tr>
              <tr>
                <td>handleSubmit</td>
                <td>Function</td>
                <td>-</td>
                <td>提交弹层的内容方法</td>
                <td>N</td>
              </tr>
              <tr>
                <td>getPages</td>
                <td>Function</td>
                <td>-</td>
                <td>获取当前页</td>
                <td>N</td>
              </tr>
              <tr>
                <td>getList</td>
                <td>Function</td>
                <td>-</td>
                <td>列表进行操作的时候用此方法，方便操作时刷新列表数据</td>
                <td>N</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 接口
import { getDialogList } from '@/api/list'
// 组件
import TopNav from './components/TopNav.vue'
// 左侧菜单
import MenuLeft from './components/MenuLeft.vue'
// 列表弹层
import ListDialog from '@/czriComponents/ListDialog/index.vue'
// 列表滚动分页弹层
import ListScrollDialog from '@/czriComponents/ListScrollDialog/index.vue'
// 带tab的弹窗组件
import TabDialog from '@/czriComponents/TabDialog/index.vue'
// 带单位的弹窗
import UnitDialog from '@/czriComponents/UnitDialog/index.vue'
// ------定义变量------
// ------定义变量------

const navData = ref(['示例', 'API'])
const title = ref('弹窗') // 标题
const leftMenu = ref(['弹窗(带列表)', '弹窗(带tab)', '弹窗(带表单)']) // 内容左侧菜单
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
// 带tab的弹窗
const dialogTabVisible = ref(false)
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
const isTopActive = ref(0)
// ------定义方法------
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
//
const getTopActive = (index) => {
  isTopActive.value = index
}
// 打开带tab的弹窗
const handleTabOpenDialog = () => {
  dialogTabVisible.value = true
  getDialList()
}
// 关闭带tab的弹窗
const handleClosetabDialog = () => {
  dialogTabVisible.value = false
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
</script>
<style lang="less" src="./index.less"></style>
