import { request } from '@/utils/request'
import type {
  serviceTypeResult,
  serviceTypeStatus,
  serviceTypeAdd,
  serviceTypeItemList,
  serviceItemTypeAdd,
  regionTypeAdd,
  regionTypeEdit,
  serviceListType
} from '@/api/model/serviceModel'

// 获取服务类型列表数据
export function getServiceTypeList(value :serviceTypeResult) {
  return request.get({
    url: '/serve-type/page',
    params: value
  })
}
// 服务类型启用/禁用
export function serviceTypeStatus(value :serviceTypeStatus) {
  return request.put({
    url: `/serve-type/active?flag=${value.flag}&id=${value.id}`,

  })
}
// 服务类型新增
export function serviceTypeAdd(value :serviceTypeAdd) {
  return request.post({
    url: '/serve-type',
    data: value
  })
}
// 服务类型编辑
export function serviceTypeEdit(value :serviceTypeAdd, id :string) {
  return request.put({
    url: '/serve-type/' + id,
    data: value
  })
}
// 服务类型删除
export function serviceTypeDelete(id :string) {
  return request.delete({
    url: '/serve-type/' + id
  })
}
// 服务类型简略列表，用于下拉框
export function serviceTypeSimpleList(val?) {
  return request.get({
    url: '/serve-type/simpleList',
    params: val
  })
}
// 分页查询服务项
export function serviceItemList(value :serviceTypeItemList) {
  return request.get({
    url: '/serve-item/page',
    params: value
  })
}
// 服务项上架/下架
export function serviceItemStatus(value :serviceTypeStatus) {
  return request.put({
    url: `/serve-item/sale?flag=${value.flag}&id=${value.id}`,
  })
}
// 服务项新增
export function serviceItemAdd(value :serviceItemTypeAdd) {
  return request.post({
    url: '/serve-item',
    data: value
  })
}
// 服务项删除
export function serviceItemDelete(id :string) {
  return request.delete({
    url: '/serve-item/' + id
  })
}

// 根据id查询服务项
export function serviceItemById(id :string) {
  return request.get({
    url: '/serve-item/' + id
  })
}
// 服务项编辑
export function serviceItemEdit(value :serviceItemTypeAdd, id) {
  return request.put({
    url: '/serve-item/' + id,
    data: value
  })
}
// 区域分页查询
export function regionList(value :serviceTypeResult) {
  return request.get({
    url: '/region/page',
    params: value
  })
}
// 区域新增
export function regionAdd(value :regionTypeAdd) {
  return request.post({
    url: '/region',
    data: value
  })
}
// 区域编辑
export function regionEdit(value :regionTypeEdit, id :string) {
  return request.put({
    url: '/region/' + id + '?' + 'managerName=' + value.managerName + '&' + 'managerPhone=' + value.managerPhone,
    data: value
  })
}
// 区域删除
export function regionDelete(id :string) {
  return request.delete({
    url: '/region/' + id
  })
}
// 根据id查询区域
export function regionById(id) {
  return request.get({
    url: '/region/' + id
  })
}
// 服务分页查询
export function serviceList(value :serviceListType) {
  return request.get({
    url: '/serve/page',
    params: value
  })
}
// 服务批量新增
export function serviceAdd(value) {
  return request.post({
    url: '/serve/batch',
    data: value
  })
}
// 服务编辑（只有价格）
export function serviceEdit(value) {
  return request.put({
    url: '/serve/' + value.id + '?' + 'price=' + value.price,
  })
}
// 区域服务设置热门/取消
export function serviceHot(value) {
  return request.put({
    url: '/serve/hot?id=' + value.id + '&' + 'flag=' + value.flag,
  })
}
// 服务删除
export function serviceDelete(id) {
  return request.delete({
    url: '/serve/' + id
  })
}