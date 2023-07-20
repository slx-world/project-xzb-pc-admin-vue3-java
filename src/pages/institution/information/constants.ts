// 服务人员信息列表
export const COLUMNS = [
  {
    title: '机构编号',
    align: 'left',
    width: 200,
    minWidth: '200px',
    colKey: 'code'
  },
  {
    title: '手机号',
    minWidth: '170px',
    sortType: 'all',
    colKey: 'phone'
  },
  { title: '用户名', width: 150, minWidth: '150px', colKey: 'name' },
  {
    title: '创建时间',
    minWidth: '180px',
    colKey: 'createTime',
    sorter: true,
    sortType: 'all'
  },  {
    title: '认证状态',
    colKey: 'verifyStatus',
    width: 120,
    minWidth: '120px',
    // 添加筛选
    filter: {
      type: 'single',
      list: [
        {
          label: '未认证',
          value: 0
        },
        {
          label: '认证中',
          value: 1
        },
        {
          label: '认证通过',
          value: 2
        },
        {
          label: '认证失败',
          value: 3
        },
      ],
      showConfirmAndReset: true
    },
    cell: (h, { row }) => {
      const statusList = {
        0: {
          label: '未认证'
        },
        1: {
          label: '认证中'
        },
        2: {
          label: '认证通过'
        },
        3: {
          label: '认证失败'
        },
      }  
      // const status = row.saleStatus === 2 ? '1' : 0
      return h(
        'span',
        {
          class: `status-dot`
        },
        statusList[row.verifyStatus].label
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
          label: '正常',
          value: 0
        },
        {
          label: '冻结',
          value: 1
        },
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
        },
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
// 服务人员信息
export const SERVE_COLUMNS =  [
  {
    title: '人员编号',
    align: 'left',
    width: 200,
    minWidth: '200px',
    colKey: 'code'
  },
  { title: '服务人员姓名', width: 150, minWidth: '150px', colKey: 'name' },
  {
    title: '手机',
    minWidth: '170px',
    sortType: 'all',
    colKey: 'phone'
  },
  {
    title: '评价评分',
    minWidth: '180px',
    colKey: 'score',
  }, 
  {
    title: '创建时间',
    minWidth: '180px',
    colKey: 'createTime',
    sorter: true,
    sortType: 'all'
  },
]
  




