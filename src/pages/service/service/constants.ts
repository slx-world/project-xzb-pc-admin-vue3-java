export const COLUMNS = [
  {
    title: '服务编号',
    align: 'left',
    width: 160,
    minWidth: '70px',
    colKey: 'index'
  },
  { title: '服务名称', width: 150, minWidth: '150px', colKey: 'name' },
  {
    title: '服务图标',
    colKey: 'headPortrait',
    width: 125,
    minWidth: '125px',
    cell: { col: 'status' }
  },
  {
    title: '服务图片',
    colKey: 'pictureArray',
    width: 125,
    minWidth: '125px',
    cell: { col: 'status' }
  },
  {
    title: '服务单价',
    minWidth: '150px',
    sorter: true,
    sortType: 'all',
    colKey: 'serviceCallNumber'
  },
  { title: '服务类型', width: 150, minWidth: '150px', colKey: 'name' },
  {
    title: '服务描述',
    colKey: 'description',
    width: 200,
    minWidth: '275px',
    cell: { col: 'status' }
  },
  {
    title: '排序',
    minWidth: '150px',
    sorter: true,
    sortType: 'all',
    colKey: 'serviceErrorNumber'
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
          label: '上架',
          value: 0
        },
        {
          label: '下架',
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
          label: '上架'
        },
        1: {
          label: '下架'
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