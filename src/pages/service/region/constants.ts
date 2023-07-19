export const COLUMNS = [
  {
    title: '区域编号',
    align: 'left',
    width: 200,
    minWidth: '70px',
    colKey: 'cityCode'
  },
  { title: '区域名称', width: 250, minWidth: '250px', colKey: 'name' },
  { title: '区域负责人', width: 250, minWidth: '250px', colKey: 'managerName' },
  { title: '联系电话', width: 300, minWidth:'300px' ,colKey: 'managerPhone' },
  {
    title: '更新时间',
    minWidth: '300px',
    width: 300,
    colKey: 'updateTime',
    sorter: true,
    sortType: 'all'
  },
  {
    align: 'left',
    fixed: 'right',
    width: 252,
    minWidth: '252px',
    colKey: 'op',
    title: '操作'
  }
]


