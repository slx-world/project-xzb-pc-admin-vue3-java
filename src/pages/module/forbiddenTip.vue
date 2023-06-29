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
                <td>confirmVisible</td>
                <td>Boolean</td>
                <td>-</td>
                <td>弹层的显示与隐藏</td>
                <td>N</td>
              </tr>
              <tr>
                <td>type</td>
                <td>String</td>
                <td>-</td>
                <td>类型</td>
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
                <td>handleClose</td>
                <td>Function</td>
                <td>-</td>
                <td>弹层关闭方法</td>
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
// 组件
//
import TopNav from './components/TopNav.vue'
// 左侧菜单
import MenuLeft from './components/MenuLeft.vue'
// 列表弹层
// 禁用提示弹窗
import ProdDisabled from '@/components/Message/ProdDisabled.vue' // 删除弹窗
// ------定义变量------

const navData = ref(['示例', 'API'])
const title = ref('禁用提示') // 标题
const leftMenu = ref([]) // 内容左侧菜单
const prodDisabledVisible = ref(false) // 禁用提示弹窗显隐
const type = ref('incomplete') // incomplete功能未完成 forbidden功能禁止

const isTopActive = ref(0)
// ------定义方法------

// 打开禁用词提示弹窗
const handleOpenByProdDisabled = (params) => {
  type.value = params
  prodDisabledVisible.value = true
}
const handleCloseByProdDisabled = () => {
  prodDisabledVisible.value = false
}
//
const getTopActive = (index) => {
  isTopActive.value = index
}
</script>
<style lang="less" src="./index.less"></style>
