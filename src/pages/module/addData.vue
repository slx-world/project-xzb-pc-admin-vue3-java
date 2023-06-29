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
                <td>baseData</td>
                <td>Array</td>
                <td>-</td>
                <td>需要添加的数据</td>
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
                <td>handleInputAdd</td>
                <td>Function</td>
                <td>-</td>
                <td>添加一个文本框表单</td>
                <td>N</td>
              </tr>
              <tr>
                <td>handleInputDelete</td>
                <td>Function</td>
                <td>-</td>
                <td>删除一个文本框表单</td>
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
// 组件
//
import TopNav from './components/TopNav.vue'
// 左侧菜单
import MenuLeft from './components/MenuLeft.vue'
// 列表弹层
// 动态增加数据 input
import AddInput from '@/czriComponents/AddInput/index.vue'
// ------定义变量------

const navData = ref(['示例', 'API'])
const title = ref('动态增加数据') // 标题
const inputDataChange = ref([])
const leftMenu = ref([]) // 内容左侧菜单
// 动态添加数据
const baseData = ref([
  {
    name: '',
    value: ''
  }
])
const isTopActive = ref(0)
// ------生命周期------
onMounted(() => {
  alterationArray() //
})
// ------定义方法------
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
//
const getTopActive = (index) => {
  isTopActive.value = index
}
</script>
<style lang="less" src="./index.less"></style>
