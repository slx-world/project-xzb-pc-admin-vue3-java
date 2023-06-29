import { validateNum } from '@/utils/validate'

export const FORM_RULES = {
  fullAddress: [
    {
      required: true,
      message: '请输入详细地址',
      type: 'error',
      trigger: 'blur'
    }
  ],
  payAccount: [
    {
      required: true,
      message: '请选择付款账户',
      type: 'error',
      trigger: 'blur'
    }
  ],
  amount: [
    {
      required: true,
      message: '请输入付款金额',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validateNum,
      message: '请输入数字',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validateNum,
      message: '请输入数字',
      type: 'error',
      trigger: 'change'
    }
  ],
  account: [
    {
      required: true,
      message: '请输入收款账户',
      type: 'error',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入支付密码',
      type: 'error',
      trigger: 'blur'
    }
  ],
  name: [
    {
      required: true,
      message: '请输入收款人姓名',
      type: 'error',
      trigger: 'blur'
    }
  ]
}

export const NAME_OPTIONS = [
  { label: '微信', value: '1' },
  { label: '支付宝', value: '2' }
]

export const INITIAL_DATA1 = {
  name: '', // 收款人姓名
  type: '', // 收款账户类型，1-微信，2-支付宝
  account: '', // 收款账户
  payAccount: '', // 付款账户
  amount: '' // 付款金额
}

export const INITIAL_DATA2 = {
  password: ''
}
