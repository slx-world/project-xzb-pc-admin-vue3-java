// export const COLUMNS = [
//   {
//     title: '服务类型编号',
//     align: 'left',
//     width: 200,
//     minWidth: '200px',
//     colKey: 'code'
//   },
//   { title: '服务类型', width: 150, minWidth: '150px', colKey: 'name' },
//   {
//     title: '服务类型图标',
//     colKey: 'serveTypeIcon',
//     width: 225,
//     minWidth: '225px',
//     cell: { col: 'status' }
//   },
//   {
//     title: '服务类型图片',
//     colKey: 'img',
//     width: 200,
//     minWidth: '200px',
//     cell: { col: 'status' }
//   },
//   {
//     title: '排序',
//     minWidth: '150px',
//     width: 150,
//     sorter: (a, b) => a.status - b.status,
//     sortType: 'all',
//     colKey: 'sortNum'
//   },
//   {
//     title: '状态',
//     colKey: 'isActive',
//     width: 200,
//     minWidth: '200px',
//     // 添加筛选
//     filter: {
//       type: 'single',
//       list: [
//         {
//           label: '禁用',
//           value: 0
//         },
//         {
//           label: '启用',
//           value: 1
//         },
//       ],
//     },
//     cell: (h, { row }) => {
//       const statusList = {
//         0: {
//           label: '禁用'
//         },
//         1: {
//           label: '启用'
//         },
//       }
//       const status = row.isActive + 1
//       return h(
//         'span',
//         {
//           class: `status-dot status-dot-${status}`
//         },
//         statusList[row.isActive].label
//       )
//     }
//   },
//   {
//     title: '更新时间',
//     minWidth: '235px',
//     width: 225,
//     colKey: 'updateTime',
//     sorter: true,
//     sortType: 'all'
//   },
//   {
//     align: 'left',
//     fixed: 'right',
//     width: 247,
//     minWidth: '247px',
//     colKey: 'op',
//     title: '操作'
//   }
// ]
export const COLUMNS = [
  {
    title: '服务类型编号',
    align: 'left',
    width: 200,
    minWidth: '200px',
    colKey: 'code'
  },
  { title: '服务类型', width: 150, minWidth: '150px', colKey: 'name' },
  {
    title: '服务类型图标',
    colKey: 'serveTypeIcon',
    width: 125,
    minWidth: '125px',
    cell: { col: 'status' }
  },
  {
    title: '服务类型图片',
    colKey: 'img',
    width: 125,
    minWidth: '125px',
    cell: { col: 'status' }
  },
  // {
  //   title: '服务单价（元）',
  //   minWidth: '170px',
  //   sortType: 'all',
  //   colKey: 'referencePrice'
  // },
  // { title: '服务类型', width: 150, minWidth: '150px', colKey: 'serveTypeName' },
  // {
  //   title: '服务描述',
  //   colKey: 'description',
  //   width: 200,
  //   minWidth: '275px',
  //   cell: { col: 'status' }
  // },
  {
    title: '排序',
    minWidth: '150px',
    width: 150,
    sorter: true,
    sortType: 'all',
    colKey: 'sortNum'
  },
  {
    title: '状态',
    colKey: 'saleStatus',
    width: 200,
    minWidth: '120px',
    // 添加筛选
    filter: {
      type: 'single',
      list: [
        {
          label: '禁用',
          value: 0
        },
        {
          label: '启用',
          value: 1
        },
      ],
      showConfirmAndReset: true
    },
    cell: (h, { row }) => {
      const statusList = {
        0: {
          label: '禁用'
        },
        1: {
          label: '启用'
        },
      }  
      const status = row.isActive + 1
      return h(
        'span',
        {
          class: `status-dot status-dot-${status}`
        },
        statusList[row.isActive].label
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
    width: 247,
    minWidth: '247px',
    colKey: 'op',
    title: '操作'
  }
]
