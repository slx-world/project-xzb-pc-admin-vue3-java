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
    width: 175,
    minWidth: '175px',
    cell: { col: 'status' }
  },
  {
    title: '服务类型图片',
    colKey: 'img',
    width: 175,
    minWidth: '175px',
    cell: { col: 'status' }
  },
  {
    title: '排序',
    minWidth: '150px',
    width: 150,
    sorter: (a, b) => a.status - b.status,
    sortType: 'all',
    colKey: 'sortNum'
  },
  {
    title: '状态',
    colKey: 'isActive',
    width: 175,
    minWidth: '175px',
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
      return h(
        'span',
        {
          class: `status-dot status-dot-${row.isActive}`
        },
        statusList[row.isActive].label
      )
    }
  },
  {
    title: '更新时间',
    minWidth: '200px',
    width: 200,
    colKey: 'updateTime',
    sorter: true,
    sortType: 'all'
  },
  {
    align: 'left',
    fixed: 'right',
    width: 245,
    minWidth: '245px',
    colKey: 'op',
    title: '操作'
  }
]
