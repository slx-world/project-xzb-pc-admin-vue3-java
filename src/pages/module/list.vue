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
                <td>cardBaseData</td>
                <td>Array</td>
                <td>-</td>
                <td>要传给子组件的数据</td>
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
                <td>getCardSort</td>
                <td>Function</td>
                <td>-</td>
                <td>
                  列表进行操作的时候用此方法，方便刷新列表数据。比如：排序、删除
                </td>
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
import { ref, onMounted } from 'vue'
// 接口
import { getcardSortList } from '@/api/list'
// 组件
import TopNav from './components/TopNav.vue'
// 左侧菜单
import MenuLeft from './components/MenuLeft.vue'
// 卡片列表页(带排序)
import CardListSort from '@/czriComponents/CardListSort/index.vue'
// 折叠数据组件
import CollapseList from '@/czriComponents/CardListCollapse/index.vue'
// 可下拉展开的列表
import DropList from '@/czriComponents/dropList/index.vue'
// 带tab的列表
import TabList from '@/czriComponents/tabList/index.vue'
// 树形列表
import TreeList from '@/czriComponents/treeList/index.vue'
// ------定义变量------
// 卡片列表(带排序)
const cardBaseData = ref([]) // 卡片列表数据
const title = ref('列表') // 标题
const navData = ref(['示例', 'API'])
const leftMenu = ref([
  '列表(可排序)',
  '列表(可展开1)',
  '列表(可展开2)',
  '列表(带Tab)',
  '列表(树状)'
]) // 内容左侧菜单

const isTopActive = ref(0)
// ------生命周期------
onMounted(() => {
  getCardSort() // 获取卡片列表(带排序)
})

// ------定义方法------

// 获取卡片列表(带排序)
const getCardSort = async () => {
  try {
    const res: any = await getcardSortList()
    cardBaseData.value = res.data.list
  } catch (e) {
    console.log(e)
  }
}
//
const getTopActive = (i) => {
  isTopActive.value = i
}
</script>
<style lang="less" src="./index.less"></style>
