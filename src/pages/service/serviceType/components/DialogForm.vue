<!-- 新增编辑弹窗 -->
<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="title"
    :width="628"
    :footer="false"
    :on-close="onClickCloseBtn"
  >
    <template #body>
      <!-- 表单内容 -->
      <t-form
        ref="form"
        :data="formData"
        :rules="rules"
        label-width="110px"
        on-cancel="onClickCloseBtn"
        :reset-type="resetType"
        @submit="onSubmit"
      >
        <t-form-item label="服务类型：" name="name">
          <t-input
            v-model="formData.name"
            class="wt-400"
            placeholder="请输入"
            clearable
            @change="Wordlimit(5)"
          />
        </t-form-item>
        <t-form-item label="排序：" name="sortNum">
          <t-input-number
            theme="column"
            :min="1"
            class="wt-400"
            v-model="formData.sortNum"
          ></t-input-number>
        </t-form-item>
        <t-form-item label="服务类型图标：" name="serveTypeIcon">
          <t-upload
            ref="uploadRef1"
            action="/api/operation/storage/upload"
            :is-batch-upload="true"
            v-model="formData.serveTypeIcon"
            tips="请上传jpg/png文件，在200K以内"
            theme="image"
            accept="image/*"
            class="wt-400"
            :headers="{
              Authorization: token
            }"
            :allow-upload-duplicate-file="true"
            @success="(e) => handleSuccess(e, 1)"
          >
          </t-upload>
        </t-form-item>
        <t-form-item label="服务类型图片：" name="img">
          <t-upload
            ref="uploadRef2"
            action="/api/operation/storage/upload"
            v-model="formData.img"
            :is-batch-upload="true"
            class="wt-400"
            :headers="{
              Authorization: token
            }"
            tips="请上传jpg/png文件，在5M以内"
            theme="image"
            accept="image/*"
            @success="(e) => handleSuccess(e, 2)"
            :allow-upload-duplicate-file="true"
          >
          </t-upload>
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
import { validateNum, validateText5 } from '@/utils/validate'

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
const formData = ref<any>({
  name: '',
  sortNum: '',
  img: [],
  serveTypeIcon: []
})
// 弹窗标题
const title = ref()
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    emit('handleSubmit', formData.value)
  }
}
const handleSuccess = (params, id) => {
  console.log('handleSuccess', params.response.data.url)
  if (id === 1) {
    formData.value.serveTypeIcon[0].url = params.response.data.url
  } else {
    formData.value.img[0].url = params.response.data.url
  }
}
// 点击取消关闭
const onClickCloseBtn = () => {
  // 重置表单
  form.value.reset()
  formVisible.value = false
  emit('handleClose')
}
const token = localStorage.getItem('xzb')
// 监听器，监听父级传递的visible值，控制弹窗显示隐藏
watch(
  () => props.visible,
  () => {
    let data = JSON.parse(JSON.stringify(props.data))
    if (data.img) {
      formData.value.name = data.name
      formData.value.sortNum = data.sortNum
      // formData.value.img中新增对象，url为图片地址，name为图片名称
      formData.value.img = [
        {
          url: data.img
        }
      ]
      formData.value.serveTypeIcon = [
        {
          url: data.serveTypeIcon
        }
      ]
    }
    formVisible.value = props.visible
    title.value = props.title
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
  name: [
    // 名称校验
    {
      required: true,
      message: '请输入名称',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validateText5,
      message: '请输入正确格式的名称',
      type: 'error',
      trigger: 'blur'
    }
  ],
  sortNum: [
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
  img: [
    {
      required: true,
      message: '请上传图片',
      type: 'error',
      trigger: 'blur'
    }
  ],
  serveTypeIcon: [
    {
      required: true,
      message: '请上传图片',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
defineExpose({
  onClickCloseBtn
})
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
.wt-400 {
  width: 400px;
}
</style>
