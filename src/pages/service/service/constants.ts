export const COLUMNS = [
  {
    title: '服务编号',
    align: 'left',
    width: 200,
    minWidth: '200px',
    colKey: 'code'
  },
  { title: '服务名称', width: 150, minWidth: '150px', colKey: 'name' },
  {
    title: '服务图标',
    colKey: 'serveTypeIcon',
    width: 125,
    minWidth: '125px',
    cell: { col: 'status' }
  },
  {
    title: '服务图片',
    colKey: 'img',
    width: 125,
    minWidth: '125px',
    cell: { col: 'status' }
  },
  {
    title: '服务单价（元）',
    minWidth: '170px',
    sortType: 'all',
    colKey: 'referencePrice'
  },
  { title: '服务类型', width: 150, minWidth: '150px', colKey: 'serveTypeName' },
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
    colKey: 'sortNum'
  },
  {
    title: '状态',
    colKey: 'saleStatus',
    width: 120,
    minWidth: '120px',
    // 添加筛选
    filter: {
      type: 'single',
      list: [
        {
          label: '草稿',
          value: 0
        },
        {
          label: '下架',
          value: 1
        },
        {
          label: '上架',
          value: 2
        },
      ],
      showConfirmAndReset: true
    },
    cell: (h, { row }) => {
      const statusList = {
        0: {
          label: '草稿'
        },
        2: {
          label: '上架'
        },
        1: {
          label: '下架'
        },
      }  
      // const status = row.saleStatus === 2 ? '1' : 0
      return h(
        'span',
        {
          class: `status-dot status-dot-${row.saleStatus}`
        },
        statusList[row.saleStatus].label
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
