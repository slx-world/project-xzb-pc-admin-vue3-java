<template>
  <div class="bg-wt moduleMain ht">
    <div
      id="scrollTag"
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
        <div class="moduleBox">
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
                <td>transferItemData</td>
                <td>Array</td>
                <td>-</td>
                <td>穿梭框数据</td>
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
import { getTransferList } from '@/api/list'
// 组件
//
import TopNav from './components/TopNav.vue'
// 左侧菜单
import MenuLeft from './components/MenuLeft.vue'
// 列表弹层
// 穿梭框
import Transfer from '@/czriComponents/Transfer/index.vue'
// ------定义变量------

const navData = ref(['示例', 'API'])
const title = ref('穿梭框') // 标题
const leftMenu = ref([]) // 内容左侧菜单
// 穿梭框
const transferItemData = ref([]) // 穿梭框数据
const isTopActive = ref(0)
// ------生命周期------
onMounted(() => {
  getTranList() //
})
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
//
const getTopActive = (index) => {
  isTopActive.value = index
}
</script>
<style lang="less" src="./index.less"></style>
