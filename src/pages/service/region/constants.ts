export const COLUMNS = [
  {
    title: '区域编号',
    align: 'left',
    width: 160,
    minWidth: '70px',
    colKey: 'index'
  },
  { title: '区域名称', width: 150, minWidth: '150px', colKey: 'name' },
  { title: '区域负责人', width: 150, minWidth: '150px', colKey: 'name' },
  { title: '联系电话', width: 300, colKey: 'phoneNumber' },
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
    width: 157,
    minWidth: '157px',
    colKey: 'op',
    title: '操作'
  }
]
