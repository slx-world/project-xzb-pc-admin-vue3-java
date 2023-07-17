// 服务人员信息列表
export const COLUMNS = [
  {
    title: '人员编号',
    align: 'left',
    width: 200,
    minWidth: '200px',
    colKey: 'code'
  },
  { title: '账号', width: 150, minWidth: '150px', colKey: 'name' },
  {
    title: '服务人员头像',
    colKey: 'serveTypeIcon',
    width: 125,
    minWidth: '125px',
    cell: { col: 'status' }
  },
  { title: '服务人员姓名', width: 150, minWidth: '150px', colKey: 'name' },
  {
    title: '手机号',
    minWidth: '170px',
    sortType: 'all',
    colKey: 'referencePrice'
  },
  {
    title: '最后活动时间',
    minWidth: '180px',
    colKey: 'updateTime',
    sorter: true,
    sortType: 'all'
  },  {
    title: '认证状态',
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
    title: '账号状态',
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
    width: 120,
    minWidth: '120px',
    colKey: 'op',
    title: '操作'
  }
]
// 服务数据
export const SERVE_DATA =  [
  {
    title: '任务编号',
    align: 'left',
    width: 200,
    minWidth: '200px',
    colKey: 'code'
  },
  { title: '服务名称', width: 150, minWidth: '150px', colKey: 'name' },
  {
    title: '服务地址',
    minWidth: '170px',
    sortType: 'all',
    colKey: 'referencePrice'
  },
  {
    title: '服务开始时间',
    minWidth: '180px',
    colKey: 'updateTime',
    sorter: true,
    sortType: 'all'
  }, 
  {
    title: '服务结束时间',
    minWidth: '180px',
    colKey: 'updateTime',
    sorter: true,
    sortType: 'all'
  },
  {
    align: 'left',
    // fixed: 'right',
    width: 120,
    minWidth: '120px',
    colKey: 'price',
    title: '服务费用'
  }
]
// 提现数据
export const WITHDRAW_DATA =  [
  {
    title: '序号',
    align: 'left',
    width: 200,
    minWidth: '200px',
    colKey: 'code'
  },
  { title: '提现金额', width: 150, minWidth: '150px', colKey: 'name' },
  {
    title: '提现方式',
    minWidth: '170px',
    sortType: 'all',
    colKey: 'referencePrice'
  },
  {
    title: '认证信息',
    minWidth: '180px',
    colKey: 'updateTime',
    sorter: true,
    sortType: 'all'
  }, 
  {
    title: '提现时间',
    minWidth: '180px',
    colKey: 'updateTime',
    sorter: true,
    sortType: 'all'
  },
]
// 违约记录
export const BREAK_DATA = [
  {
    title: '任务编号',
    align: 'left',
    width: 200,
    minWidth: '200px',
    colKey: 'code'
  },
  { title: '服务名称', width: 150, minWidth: '150px', colKey: 'name' },
  {
    title: '服务地址',
    minWidth: '170px',
    sortType: 'all',
    colKey: 'referencePrice'
  },
  {
    title: '服务开始时间',
    minWidth: '180px',
    colKey: 'updateTime',
    sorter: true,
    sortType: 'all'
  }, 
  {
    title: '服务结束时间',
    minWidth: '180px',
    colKey: 'updateTime',
    sorter: true,
    sortType: 'all'
  },
  {
    align: 'left',
    // fixed: 'right',
    width: 120,
    minWidth: '120px',
    colKey: 'price',
    title: '服务费用'
  }
]
  




