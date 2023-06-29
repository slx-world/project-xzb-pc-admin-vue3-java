export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 160,
    minWidth: '70px',
    colKey: 'index'
  },
  { title: '名称', width: 150, minWidth: '150px', colKey: 'name' },
  {
    title: '描述',
    colKey: 'description',
    width: 200,
    minWidth: '275px',
    cell: { col: 'status' }
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
  { title: '手机号', width: 150, colKey: 'phoneNumber' },
  {
    title: '服务调用次数',
    minWidth: '150px',
    sorter: true,
    sortType: 'all',
    colKey: 'serviceCallNumber'
  },
  {
    title: '服务重启次数',
    minWidth: '150px',
    sorter: true,
    sortType: 'all',
    colKey: 'serviceErrorNumber'
  },
  {
    title: '更新时间',
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
