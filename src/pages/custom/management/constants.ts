// 服务人员信息列表
export const COLUMNS = [
  {
    title: '客户编号',
    align: 'left',
    width: 250,
    minWidth: '250px',
    colKey: 'id'
  },
  { title: '客户名称', width: 150, minWidth: '150px', colKey: 'nickname' },
  {
    title: '客户手机号',
    minWidth: '200px',
    sortType: 'all',
    colKey: 'phone'
  },
  {
    title: '服务下单次数（次）',
    minWidth: '180px',
    colKey: 'orderNumber',
  },
  {
    title: '创建时间',
    minWidth: '180px',
    colKey: 'createTime',
    sorter: true,
    sortType: 'all'
  },
  {
    title: '状态',
    colKey: 'status',
    width: 120,
    minWidth: '120px',
    // 添加筛选
    filter: {
      type: 'single',
      list: [
        {
          label: '正常',
          value: 0
        },
        {
          label: '冻结',
          value: 1
        }
      ],
      showConfirmAndReset: true
    },
    cell: (h, { row }) => {
      const statusList = {
        0: {
          label: '正常'
        },
        1: {
          label: '冻结'
        }
      }
      const status = row.status === 0 ? '2' : 1
      return h(
        'span',
        {
          class: `status-dot status-dot-${status}`
        },
        statusList[row.status].label
      )
    }
  },
  {
    align: 'left',
    fixed: 'right',
    width: 70,
    minWidth: '70px',
    colKey: 'op',
    title: '操作'
  }
]
