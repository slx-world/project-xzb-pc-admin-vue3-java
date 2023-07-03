<!-- 新增编辑弹窗 -->
<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="title"
    :width="680"
    :footer="false"
    :on-close="onClickCloseBtn"
  >
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
        <t-form-item label="服务类型：" name="phoneNumber">
          <t-input
            v-model="formData.phoneNumber"
            class="wt-400"
            placeholder="请输入"
            clearable
          />
        </t-form-item>
        <t-form-item label="排序：" name="serviceCallNumber">
          <t-input
            v-model="formData.serviceCallNumber"
            class="wt-400"
            placeholder="请输入"
            clearable
          >
          </t-input>
        </t-form-item>
        <t-form-item label="昵称：" name="name">
          <t-input
            v-model="formData.name"
            class="wt-400"
            placeholder="请输入"
            clearable
            @change="Wordlimit(10)"
          >
            <template #suffix>
              <span class="nickname">
                <span>{{ formData.name ? formData.name.length : 0 }}</span
                >/10</span
              >
            </template>
          </t-input>
        </t-form-item>
        <t-form-item label="产品描述：" name="description"
          ><t-textarea
            v-model="formData.description"
            class="wt-400"
            placeholder="请输入至少5个字符"
            :maxlength="50"
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
import {
  validateNum,
  validateText,
  validateText10,
  validatePhone
} from '@/utils/validate'

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
// 重置表单
const resetType = ref('empty')
// 表单
const form = ref()
// 触发父级事件
const emit: Function = defineEmits(['handleClose', 'fetchData'])
// 弹窗
const formVisible = ref(false)
// 表单数据
const formData = ref({
  phoneNumber: '',
  serviceCallNumber: '',
  name: '',
  description: ''
})
// 弹窗标题
const title = ref()
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    // 判断内容时否发生改变
    // if (
    //   formData.value.serviceCallNumber === props.data.serviceCallNumber &&
    //   formData.value.description === props.data.description &&
    //   formData.value.phoneNumber === props.data.phoneNumber &&
    //   formData.value.name === props.data.name
    // ) {
    //   MessagePlugin.warning('内容未发生改变')
    //   console.log(formData.value)
    //   console.log(props.data)
    // } else {
    MessagePlugin.success('提交成功')
    emit('fetchData')
    onClickCloseBtn()
  }
}
// 点击取消关闭
const onClickCloseBtn = () => {
  // 重置表单
  form.value.reset()
  formVisible.value = false
  emit('handleClose')
}
// 点击叉号关闭
// 监听器，监听父级传递的visible值，控制弹窗显示隐藏
watch(
  () => props.visible,
  () => {
    formVisible.value = props.visible
    title.value = props.title
  }
)
// 监听器，监听父级传递的data值，控制表单数据
watch(
  () => props.data,
  (val) => {
    formData.value = JSON.parse(JSON.stringify(val))
  }
)

// 字数限制
const Wordlimit: Function = (num: number) => {
  if (formData.value.name.length > num) {
    formData.value.name = formData.value.name.slice(0, num)
  }
}
// 表单校验
const rules = {
  phoneNumber: [
    // 手机号校验
    {
      required: true,
      message: '请输入手机号',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validatePhone,
      message: '请输入正确格式的手机号',
      type: 'error',
      trigger: 'blur'
    }
  ],
  serviceCallNumber: [
    // 调用次数校验
    {
      required: true,
      message: '请输入调用次数',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validateNum,
      message: '请输入正确格式的调用次数，0-999',
      type: 'error',
      trigger: 'change'
    },
    {
      validator: validateNum,
      message: '请输入正确格式的调用次数，0-999',
      type: 'error',
      trigger: 'blur'
    }
  ],
  name: [
    // 昵称校验
    {
      required: true,
      message: '请输入昵称',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validateText10,
      message: '请输入至少2个字符,至多10个字符',
      type: 'error',
      trigger: 'blur'
    }
  ],
  description: [
    {
      required: true,
      message: '请输入产品描述',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validateText,
      message: '请输入至少5个字符,至多50个字符',
      type: 'error',
      trigger: 'change'
    },
    {
      validator: validateText,
      message: '请输入至少5个字符,至多50个字符',
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
</style>
