export const COLUMNS = [
  {
    title: '区域编号',
    align: 'left',
    width: 160,
    minWidth: '70px',
    colKey: 'cityCode'
  },
  { title: '区域名称', width: 150, minWidth: '150px', colKey: 'name' },
  { title: '区域负责人', width: 150, minWidth: '150px', colKey: 'managerName' },
  { title: '联系电话', width: 300, colKey: 'managerPhone' },
  {
    title: '更新时间',
    width: 300,
    minWidth: '180px',
    colKey: 'updateTime',
    sorter: true,
    sortType: 'all'
  },
  {
    align: 'left',
    fixed: 'right',
    width: 185,
    minWidth: '185px',
    colKey: 'op',
    title: '操作'
  }
]

