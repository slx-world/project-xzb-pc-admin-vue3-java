<!-- 个人中心 -->
<template>
  <div class="bg-wt contentBox">
    <div class="bodybox">
      <t-form
        ref="form"
        label-align="top"
        :rules="rules"
        :data="formData"
        @submit="updatepersonalData"
      >
        <div class="topBox">
          <div class="leftBox">
            <t-form-item label="服务名称" name="account">
              <t-input
                v-model="formData.account"
                class="form-item-content"
                placeholder="请输入"
                :style="{ minWidth: '134px' }"
                clearable
              />
            </t-form-item>
            <t-form-item label="参考服务单价" name="nickname">
              <t-input
                v-model="formData.nickname"
                class="form-item-content"
                placeholder="请输入"
                :style="{ minWidth: '134px' }"
                clearable
              />
            </t-form-item>
            <t-form-item label="排序" name="sort">
              <t-input-number theme="column" :min="0"></t-input-number>
            </t-form-item>
            <t-form-item label="服务图标" name="icon">
              <t-upload
                ref="uploadRef1"
                :action="actions"
                :is-batch-upload="true"
                :auto-upload="false"
                tips="请上传png格式图片，尺寸：114px*114px，在200k以内"
                theme="image"
                accept="image/*"
                :allow-upload-duplicate-file="true"
              >
              </t-upload>
            </t-form-item>
          </div>
          <div class="rightBox">
            <t-form-item label="服务类型" name="phone">
              <t-select></t-select>
            </t-form-item>
            <t-form-item label="服务单位" name="phone" class="unit">
              <t-input
                v-model="formData.phone"
                class="form-item-content"
                placeholder="请输入"
                :style="{ minWidth: '134px' }"
                clearable
              />
            </t-form-item>
            <t-form-item label="服务图片" name="picture">
              <t-upload
                ref="uploadRef1"
                :action="actions"
                :is-batch-upload="true"
                :auto-upload="false"
                tips="请上传png格式图片，尺寸：750px*620px，在5M以内"
                theme="image"
                accept="image/*"
                :allow-upload-duplicate-file="true"
              >
              </t-upload>
            </t-form-item>
          </div>
        </div>
        <div class="bottomBox">
          <t-form-item label="服务描述" name="description">
            <t-textarea
              v-model="formData.description"
              class="form-item-content description"
              placeholder="请输入"
              :maxlength="500"
            />
          </t-form-item>
          <t-form-item label="服务详情长图" name="picture">
            <t-upload
              ref="uploadRef1"
              :action="actions"
              :is-batch-upload="true"
              :auto-upload="false"
              tips="请上传png格式图片，尺寸：宽750px，高度不限，在20M以内"
              theme="image"
              accept="image/*"
              :allow-upload-duplicate-file="true"
            >
            </t-upload>
          </t-form-item>
        </div>
      </t-form>
    </div>
    <div class="footBox">
      <div class="updateInfo" @click="handleBack">
        <span class="bt bt-grey">返回</span>
      </div>
      <div class="updateInfo" @click="updatepersonalData(form)">
        <span class="bt">预览</span>
      </div>
      <div class="updateInfo" @click="updatepersonalData(form)">
        <span class="bt">提交</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'UserIndex'
}
</script>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 城市选择框数// 引入接口
import { getpersonal, updatepersonal } from '@/api/user'
import { useRouter } from 'vue-router'
// 引用正则
import { validatePhone } from '@/utils/validate'

const formData = ref({
  account: '',
  nickname: '',
  description: '',
  region: '',
  address: '',
  phone: '',
  headPortrait: ''
})
const router = useRouter()
const form = ref(null) // 表单
// 显示的图片
const file = ref([
  {
    url: ''
  }
])
// 默认图片
const files = ref([
  {
    url: 'https://yjy-oss-videos.oss-accelerate.aliyuncs.com/grzxhz.jpg'
  }
])

const uploadRef1 = ref() // 上传图片
// 获取接口数据
const getpersonalData = async () => {
  const res = await getpersonal()
  formData.value = res.data
  file.value[0].url = res.data.headPortrait
}
// 更新信息
const updatepersonalData = (result: any) => {
  if (result.validateResult) {
    updatepersonal(formData.value).then((res) => {})
  }
  uploadRef1.value.uploadFiles()
}
// 上传图片按钮
const uploadImg = () => {
  // 执行triggerUpload方法
  uploadRef1.value.triggerUpload()
}
// 生命周期
onMounted(() => {
  // 获取接口代理地址
  console.log(123)
})
const actions = '' // 上传的地址
const imageUrl = ref('') // 上传的图片路径
// 返回
const handleBack = () => {
  router.push('/service/ServiceList')
}
// 校验
const rules = ref({
  account: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    }
  ],
  nickname: [
    {
      required: true,
      message: '请输入昵称',
      trigger: 'blur'
    }
  ],
  description: [
    {
      required: true,
      message: '请输入个人简介',
      trigger: 'blur'
    }
  ],
  region: [
    {
      required: true,
      message: '请输入所在省市',
      trigger: 'change'
    }
  ],
  address: [
    {
      required: true,
      message: '请输入详细地址',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: '请输入联系电话',
      trigger: 'blur'
    },
    {
      validator: validatePhone,
      message: '请输入正确格式的手机号',
      type: 'error',
      trigger: 'blur'
    }
  ]
})
</script>

<style lang="less" scoped>
.contentBox {
  padding: 81px 105px 101px;
  .bodybox {
    display: flex;
    .topBox {
      width: 100%;
      display: flex;
      .leftBox {
        width: 48%;
        height: 100%;
        background-color: #fff;
        margin-right: 100px;
        .upbutton {
          margin-top: 24px;
        }
      }
      .rightBox {
        width: 48%;
        height: 100%;
        background-color: #fff;
        :deep(.t-button .t-button__text) {
          color: var(--color-bk2);
        }
        .unit {
          margin-bottom: 110px;
        }
      }
    }
    .bottomBox {
      margin-top: 24px;
      .description {
        :deep(.t-textarea__inner) {
          height: 147px;
        }
      }
    }
  }
  .footBox{
    margin-top: 30px;
    display: flex;
  }
}
.t-form {
  width: 100%;
}
.updateInfo {
  width: 60px;
  margin-right: 16px;
}
// 提示文字
:deep(.t-upload) {
  .t-upload__tips {
    color: var(--color-bk4);
  }
}
:deep(.t-form-item__description) {
  margin-bottom: 24px;
}
:deep(.t-input-number.t-is-controls-right){
  width: auto;
  .t-input-number__decrease,.t-input-number__increase{
  opacity: 1;
  visibility: inherit;
  }
}
:deep(.t-upload){
  margin-top: 6.5px;
}
:deep(.t-upload__tips){
  margin-top: 10.5px;
}
</style>
