<!-- 个人中心 -->
<template>
  <div class="bg-wt contentBox">
    <div class="bodybox">
      <t-form
        ref="form"
        label-align="top"
        :rules="rules"
        :data="formData"
        @submit="onSubmit"
      >
        <div class="topBox">
          <div class="leftBox">
            <t-form-item label="服务名称" name="name">
              <t-input
                v-model="formData.name"
                class="form-item-content"
                placeholder="请输入"
                :style="{ minWidth: '134px' }"
                clearable
              />
            </t-form-item>
            <t-form-item label="参考服务单价" name="referencePrice">
              <t-input
                v-model="formData.referencePrice"
                class="form-item-content"
                placeholder="请输入"
                :style="{ minWidth: '134px' }"
                clearable
              />
            </t-form-item>
            <t-form-item label="排序" name="sortNum">
              <t-input-number
                theme="column"
                :min="0"
                v-model="formData.sortNum"
              ></t-input-number>
            </t-form-item>
            <t-form-item label="服务图标" name="serveItemIcon">
              <t-upload
                ref="uploadRef1"
                v-model="formData.serveItemIcon"
                :action="actions"
                :is-batch-upload="true"
                tips="请上传png格式图片，尺寸：114px*114px，在200k以内"
                theme="image"
                accept="image/*"
                :headers="{
                  Authorization: token
                }"
                :allow-upload-duplicate-file="true"
                @success="(e) => handleSuccess(e, 1)"
              >
              </t-upload>
            </t-form-item>
          </div>
          <div class="rightBox">
            <t-form-item label="服务类型" name="serveTypeId">
              <t-select
                v-model="formData.serveTypeId"
                class="form-item-content"
                :options="typeSelect"
                placeholder="请选择"
                clearable
              />
            </t-form-item>
            <t-form-item label="服务单位" name="unit" class="unit">
              <t-select
                v-model="formData.unit"
                class="form-item-content"
                :options="UNIT"
                placeholder="请选择"
                clearable
              />
            </t-form-item>
            <t-form-item label="服务图片" name="img">
              <t-upload
                ref="uploadRef1"
                :action="actions"
                v-model="formData.img"
                :is-batch-upload="true"
                tips="请上传png格式图片，尺寸：750px*620px，在5M以内"
                theme="image"
                accept="image/*"
                :headers="{
                  Authorization: token
                }"
                :allow-upload-duplicate-file="true"
                @success="(e) => handleSuccess(e, 2)"
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
          <t-form-item label="服务详情长图" name="detailImg">
            <t-upload
              ref="uploadRef1"
              :action="actions"
              v-model="formData.detailImg"
              :is-batch-upload="true"
              tips="请上传png格式图片，尺寸：宽750px，高度不限，在20M以内"
              theme="image"
              accept="image/*"
              :headers="{
                Authorization: token
              }"
              :allow-upload-duplicate-file="true"
              @success="(e) => handleSuccess(e, 3)"
            >
            </t-upload>
          </t-form-item>
          <div class="footBox">
            <div class="updateInfo" @click="handleBack">
              <span class="bt bt-grey">返回</span>
            </div>
            <div class="updateInfo">
              <span class="bt">预览</span>
            </div>
            <button class="bt updateInfo">提交</button>
          </div>
        </div>
      </t-form>
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
import {
  serviceTypeSimpleList,
  serviceItemAdd,
  serviceItemById,
  serviceItemEdit
} from '@/api/service'
import { useRouter, useRoute } from 'vue-router'
import { UNIT } from '@/constants'
// 引用正则
import { validatePhone } from '@/utils/validate'

const formData = ref({
  serveTypeId: '',
  img: [],
  description: '',
  referencePrice: null,
  unit: '',
  serveItemIcon: [],
  detailImg: [],
  name: '',
  sortNum: ''
})
const router = useRouter()
const route = useRoute()
const { id } = route.params
const form = ref(null) // 表单
const typeSelect = ref([]) // 服务类型下拉框数据
const actions = '/api/operation/storage/upload' // 上传的地址
// 显示的图片
// 默认图片
const token = localStorage.getItem('xzb') // 获取token
const uploadRef1 = ref() // 上传图片
// 生命周期
onMounted(() => {
  getServiceTypeSimpleList() // 获取服务类型下拉框数据
  if (id) {
    getData(id)
  }
})
// 获取接口数据
const getData = async (val) => {
  await serviceItemById(val).then((res) => {
    console.log(res.data.data)
    formData.value.serveTypeId = res.data.data.serveTypeId
    formData.value.img = [
      {
        url: res.data.data.img
      }
    ]
    formData.value.description = res.data.data.description
    formData.value.referencePrice = res.data.data.referencePrice
    formData.value.unit = res.data.data.unit
    formData.value.serveItemIcon = [
      {
        url: res.data.data.serveItemIcon
      }
    ]
    formData.value.detailImg = [
      {
        url: res.data.data.detailImg
      }
    ]
    formData.value.name = res.data.data.name
    formData.value.sortNum = res.data.data.sortNum
  })
}
// 更新信息
const onSubmit = async (result: any) => {
  if (result.validateResult) {
    const data = ref({
      serveTypeId: formData.value.serveTypeId,
      img: formData.value.img[0].url,
      description: formData.value.description,
      referencePrice: formData.value.referencePrice,
      unit: formData.value.unit,
      serveItemIcon: formData.value.serveItemIcon[0].url,
      detailImg: formData.value.detailImg[0].url,
      name: formData.value.name,
      sortNum: formData.value.sortNum
    })
    if (id) {
      await serviceItemEdit(data.value, id).then((res) => {
        handleBack()
      })
    } else {
      await serviceItemAdd(data.value).then((res) => {
        handleBack()
      })
    }
  }
}

// 获取服务类型下拉框数据
const getServiceTypeSimpleList = async () => {
  await serviceTypeSimpleList().then((res) => {
    typeSelect.value = res.data.data.map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })
  })
}
// 返回
const handleBack = () => {
  router.push('/service/ServiceList')
}
// 图片上传成功
const handleSuccess = (params, id) => {
  console.log('handleSuccess', params.response.data.url)
  if (id === 1) {
    formData.value.serveItemIcon[0].url = params.response.data.url
  } else if (id === 2) {
    formData.value.img[0].url = params.response.data.url
  } else {
    formData.value.detailImg[0].url = params.response.data.url
  }
}
// 校验
const rules = ref({
  name: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    }
  ],
  referencePrice: [
    {
      required: true,
      message: '请输入价格',
      trigger: 'blur'
    }
  ],
  description: [
    {
      required: true,
      message: '请输入个人简介',
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
  .footBox {
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
:deep(.t-input-number.t-is-controls-right) {
  width: auto;
  .t-input-number__decrease,
  .t-input-number__increase {
    opacity: 1;
    visibility: inherit;
  }
}
:deep(.t-upload) {
  margin-top: 6.5px;
}
:deep(.t-upload__tips) {
  margin-top: 10.5px;
}
</style>
