export const COLUMNS = [
  {
    title: '任务编号',
    align: 'left',
    width: 200,
    minWidth: '200px',
    colKey: 'code'
  },
  { title: '服务名称', width: 150, minWidth: '150px', colKey: 'name' },
  {
    title: '客户电话',
    minWidth: '170px',
    sortType: 'all',
    colKey: 'referencePrice'
  },
  {
    title: '服务地址',
    colKey: 'description',
    width: 200,
    minWidth: '275px',
    cell: { col: 'status' }
  },
  {
    title: '预约上门时间',
    minWidth: '180px',
    colKey: 'updateTime',
    sorter: true,
    sortType: 'all'
  },
  { title: '服务费用（元）', width: 150, minWidth: '150px', colKey: 'serveTypeName' },
  { title: '服务人员', width: 150, minWidth: '150px', colKey: 'name' },
  {
    title: '任务创建时间',
    minWidth: '180px',
    colKey: 'updateTime',
    sorter: true,
    sortType: 'all'
  },  {
    title: '任务状态',
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
    align: 'left',
    fixed: 'right',
    width: 113,
    minWidth: '113px',
    colKey: 'op',
    title: '操作'
  }
]
