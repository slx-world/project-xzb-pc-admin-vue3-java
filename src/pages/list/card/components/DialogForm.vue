<!-- 新增编辑弹窗 -->
<template>
  <t-dialog
    v-model:visible="formVisible"
    :width="680"
    :footer="false"
    :on-close="onClickCloseBtn"
  >
    <!-- 对话框头部 -->
    <template #header>
      <div class="dialog-header">
        <span class="dialog-title">{{ title }}</span>
        <span class="information">辅助信息</span>
      </div>
    </template>
    <template #body>
      <!-- 表单内容 -->
      <t-form
        ref="form"
        :data="formData"
        :rules="rules"
        :label-width="80"
        on-cancel="onClickCloseBtn"
        :reset-type="resetType"
        @submit="onSubmit"
      >
        <t-form-item label="模型名称：" name="name">
          <t-input
            v-model="formData.name"
            class="wt-400"
            placeholder="请输入"
            clearable
          >
          </t-input>
        </t-form-item>
        <t-form-item label="模型编号：" name="modelNumber"
          ><t-textarea
            v-model="formData.modelNumber"
            class="wt-400"
            placeholder="请输入"
            :maxlength="50"
            clearable
          >
          </t-textarea>
        </t-form-item>
        <t-form-item style="float: right">
          <div class="bt bt-grey btn-submit" @click="onClickCloseBtn">
            <span>取消</span>
          </div>
          <button theme="primary" type="submit" class="bt btn-submit">
            <span>确定</span>
          </button>
        </t-form-item>
      </t-form>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { MessagePlugin, ValidateResultContext } from 'tdesign-vue-next'
// 接收父组件传递的参数
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
    default: '新建产品'
  }
})
// 重置
const resetType = ref('empty')
const emit: Function = defineEmits(['handleClose', 'fetchData']) // 关闭弹窗，刷新列表
const formVisible = ref(false) // 表单弹窗显示隐藏
const formData = ref({
  name: '',
  modelNumber: ''
}) // 表单数据
const title = ref() // 标题
const form = ref() // 表单
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    // 判断内容时否发生改变
    // if (
    //   formData.value.name === props.data.name &&
    //   formData.value.modelNumber === props.data.modelNumber
    // ) {
    //   MessagePlugin.warning('内容未发生改变')
    // } else {
    MessagePlugin.success('提交成功')
    emit('fetchData')
    onClickCloseBtn()
  }
}
// 关闭弹窗
const onClickCloseBtn = () => {
  // 重置表单
  form.value.reset()
  formVisible.value = false
  emit('handleClose')
}
// 点击叉号关闭

watch(
  () => props.visible,
  () => {
    formVisible.value = props.visible
    title.value = props.title
  }
)

watch(
  () => props.data,
  (val) => {
    formData.value = JSON.parse(JSON.stringify(val))
  }
)

// 表单校验
const rules = {
  name: [
    // 调用次数校验
    {
      required: true,
      message: '请输入调用次数',
      type: 'error',
      trigger: 'blur'
    }
  ],
  modelNumber: [
    {
      required: true,
      message: '请输入产品描述',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
</script>
<style lang="less" scoped>
.btn-submit {
  margin-left: 15.5px;
  width: 60px;
}

.nickname {
  margin-right: 2px;
  z-index: 100;
  color: var(--color-bk4);
}
:deep(.t-textarea__limit) {
  color: var(--color-bk4);
  right: 10px;
}
.information {
  margin-left: 10px;
  font-weight: 400;
  font-size: 14px;
  color: var(--color-bk4);
}
</style>
