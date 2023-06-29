export const TREE_DATA = [
  {
    label: '总裁办',
    value: '1',
    children: [
      {
        value: '1.1',
        label: '北京分公司',
        children: [
          {
            value: '1.1.1',
            label: '顺义',
            children: [
              {
                value: '1.1.1.1',
                label: '南法信',
                children: [
                  {
                    label: '南法信网点1',
                    value: '1.1.1.1.1'
                  },
                  {
                    label: '南法信网点2',
                    value: '1.1.1.1.2'
                  }
                ]
              },
              {
                value: '1.1.1.2',
                label: '顺义网点'
              }
            ]
          },
          {
            value: '1.1.2',
            label: '朝阳',
            children: [
              {
                value: '1.1.2.1',
                label: '朝阳网点'
              },
              {
                value: '1.1.2.2',
                label: '朝阳网点2'
              }
            ]
          }
        ]
      },
      {
        value: '1.2',
        label: '上海分公司',
        children: [
          {
            value: '1.2.1',
            label: '徐汇区',
            children: [
              {
                value: '1.2.1.1',
                label: '徐汇区网点'
              },
              {
                value: '1.2.1.2',
                label: '徐汇区网点2'
              }
            ]
          },
          {
            value: '1.2.2',
            label: '浦东新区',
            children: [
              {
                value: '1.2.2.1',
                label: '陆家嘴'
              },
              {
                value: '1.2.2.2',
                label: '浦东新区总网点'
              }
            ]
          }
        ]
      },
      {
        value: '1.3',
        label: '广州分公司'
      }
    ]
  },
  {
    value: '2',
    label: '总经办',
    checkable: false,
    children: [
      {
        value: '2.1',
        label: '人事部',
        checkable: false
      },
      {
        value: '2.2',
        label: '财务部',
        checkable: false
      }
    ]
  }
]
export const COLUMNS = [
  {
    title: '规则编号',
    align: 'left',
    width: 160,
    minWidth: '100px',
    colKey: 'index'
  },
  {
    title: '描述',
    colKey: 'description',
    width: 200,
    cell: { col: 'status' }
  },
  {
    title: '服务调用次数',
    minWidth: 150,
    ellipsis: true,
    sorter: true,
    sortType: 'all',
    colKey: 'serviceCallNumber'
  },
  {
    title: '状态',
    minWidth: 150,
    ellipsis: true, // 文字超出宽度时显示省略号
    colKey: 'status',
    // 添加筛选
    filter: {
      type: 'single',
      list: [
        {
          label: '关闭',
          value: 0
        },
        {
          label: '运行中',
          value: 1
        },
        {
          label: '已上线',
          value: 2
        },
        {
          label: '异常',
          value: 3
        }
      ],
      showConfirmAndReset: true
    },
    cell: (h, { row }) => {
      const statusList = {
        0: {
          label: '关闭'
        },
        1: {
          label: '运行中'
        },
        2: {
          label: '已上线'
        },
        3: {
          label: '异常'
        }
      }
      return h(
        'span',
        {
          class: `status-dot status-dot-${row.status}`
        },
        statusList[row.status].label
      )
    }
  },
  {
    title: '更新时间',
    ellipsis: true,
    minWidth: 150,
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
