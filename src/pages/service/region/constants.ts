import { Input, Select, DatePicker, MessagePlugin, Row } from 'tdesign-vue-next';
export const COLUMNS = [
  {
    title: '区域编号',
    align: 'left',
    width: 160,
    minWidth: '70px',
    colKey: 'index'
  },
  { title: '区域名称', width: 150, minWidth: '150px', colKey: 'name' },
  { title: '区域负责人', width: 150, minWidth: '150px', colKey: 'name' },
  { title: '联系电话', width: 300, colKey: 'phoneNumber' },
  {
    title: '更新时间',
    width: 300,
    minWidth: '180px',
    colKey: 'updateTime',
    sorter: true,
    sortType: 'all'
  },
  {
    align: 'left',
    fixed: 'right',
    width: 157,
    minWidth: '157px',
    colKey: 'op',
    title: '操作'
  }
]
export const regionCOLUMN = [
  {
    title: '服务名称',
    align: 'left',
    width: 160,
    minWidth: '70px',
    colKey: 'index'
  },
  { title: '类型', width: 150, minWidth: '150px', colKey: 'name' },
  { title: '参考价格', width: 150, minWidth: '150px', colKey: 'name' },
  { title: '区域价格', width: 300, colKey: 'phoneNumber',
  edit: {
    // 1. 支持任意组件。需保证组件包含 `value` 和 `onChange` 两个属性，且 onChange 的第一个参数值为 new value。
    // 2. 如果希望支持校验，组件还需包含 `status` 和 `tips` 属性。具体 API 含义参考 Input 组件
    component: Input,
    // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
    props: {
      clearable: true,
      autofocus: true,
    },
    // 触发校验的时机（when to validate)
    validateTrigger: 'change',
    // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
    on: (editContext) => ({
      onBlur: () => {
        console.log('失去焦点', editContext);
      },
      onEnter: (ctx) => {
        ctx?.e?.preventDefault();
        console.log('onEnter', ctx);
      },
    }),
    // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
    abortEditOnEvent: ['onEnter'],
    // 编辑完成，退出编辑态后触发
    onEdited: (context) => {
      console.log(context);
      Row.splice(context.rowIndex, 1, context.newRowData);
      console.log('Edit firstName:', context);
      MessagePlugin.success('Success');
    },
    // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form
    rules: [
      { required: true, message: '不能为空' },
      { max: 11, message: '字符数量不能超过 11', type: 'warning' },
    ],
    // 默认是否为编辑状态
    defaultEditable: false,
  },
},
  {
    title: '是否热门',
    width: 300,
    minWidth: '180px',
    colKey: 'updateTime',
    sorter: true,
    sortType: 'all'
  },
  {
    align: 'left',
    fixed: 'right',
    width: 157,
    minWidth: '157px',
    colKey: 'op',
    title: '操作'
  }
]

