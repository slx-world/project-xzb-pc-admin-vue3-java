<!--  项目说明浮窗 -->
<template>
  <div>
    <div
      ref="exp"
      class="exp"
      :style="{ top: `${expTop}px`, left: `${expLeft}px` }"
      @mousedown="downExp"
    ></div>
    <t-dialog
      v-model:visible="visible"
      placement="top"
      :footer="false"
      top="1%"
      width="90%"
    >
      <div class="expCont">
        <img
          src="https://yjy-oss-videos.oss-cn-zhangjiakou.aliyuncs.com/ObjectExplain/formDs.gif"
          alt=""
        />
      </div>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 小球拖走 - start
const t = ref(0)
const l = ref(0)
const expTop = ref(100)
const expLeft = ref(document.documentElement.clientWidth - 60)
const visible = ref(false)
const exp = ref()
const stTime = ref()

const downExp = (e) => {
  stTime.value = new Date() // 按下的时间
  t.value = e.offsetY
  l.value = e.offsetX
  document.body.onmousemove = moveExp
  document.body.onmouseup = upExp
}
const upExp = () => {
  document.body.onmousemove = null
  const endTime = new Date()
  const dateDiff = endTime.getTime() - stTime.value.getTime()
  if (dateDiff < 200) {
    visible.value = true
  }
}
const moveExp = (e) => {
  expTop.value = e.clientY - t.value
  expLeft.value = e.clientX - l.value
}
// 小球拖走 - end
</script>
<style lang="less" scoped>
.exp {
  position: fixed;
  cursor: pointer;
  z-index: 999;
  top: 15%;
  right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  color: #fff;
  background: -webkit-radial-gradient(
    50% 120%,
    circle cover,
    #81e8f6,
    #76deef 10%,
    #0f03f2 80%,
    #062745 100%
  );
  &:before {
    content: '';
    position: absolute;
    top: 1%;
    left: 5%;
    width: 90%;
    height: 90%;
    border-radius: 50%;
    background: -webkit-radial-gradient(
      50% 0px,
      circle,
      #ffffff,
      rgba(255, 255, 255, 0) 58%
    );
    filter: blur(5px);
    z-index: 2;
  }
}
:deep(.t-dialog__body) {
  width: 100%;
  height: 800px;
  .expCont {
    display: flex;
    justify-content: center;
    img {
      width: 100%;
    }
  }
}
</style>
