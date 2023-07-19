import Layout from '@/layouts/index.vue'
import orderIcon from '@/assets/test-img/icon_ddgl_nor.svg'
import customIcon from '@/assets/test-img/icon_khgl_nor.svg'
import personnelIcon from '@/assets/test-img/icon_fwry_nor.svg'
import institutionIcon from '@/assets/test-img/icon_jggl_nor.svg'
import serviceIcon from '@/assets/test-img/icon_menu_service.svg'

const normalRouter = [
  {
    path: '/service',
    name: 'service',
    component: Layout,
    redirect: '/service/serviceType',
    meta: {
      title: '服务管理',
      icon: serviceIcon
    },
    children: [
      {
        path: 'serviceType',
        name: 'serviceType',
        component: () => import('@/pages/service/serviceType/index.vue'),
        meta: {
          title: '服务类型管理',
          // 用来修改当出现子菜单在active状态不会激活父元素的active状态
          singles: true
        },
      },
      {
        path: 'ServiceList',
        name: 'ServiceList',
        component: () => import('@/pages/service/service/index.vue'),
        meta: {
          title: '服务项管理',
          singles: true
        },
        children: [
          {
            path: 'addService',
            name: 'addService',
            component: () => import('@/pages/service/service/addService.vue'),
            meta: {
              title: '新增服务'
            }
          },
          {
            path: 'editService/:id',
            name: 'editService',
            component: () => import('@/pages/service/service/addService.vue'),
            meta: {
              title: '编辑服务'
            }
          },
        ]
      },
      {
        path: 'region',
        name: 'region',
        component: () => import('@/pages/service/region/index.vue'),
        meta: {
          title: '区域管理',
          singles: true
        },
        children: [
          {
            path: 'editRegion/:id',
            name: 'editRegion',
            component: () => import('@/pages/service/region/editRegion.vue'),
            meta: {
              title: '设置服务'
            }
          },
          {
            path:'setBusiness/:id',
            name:'setBusiness',
            component: () => import('@/pages/service/region/setBusiness.vue'),
            meta: {
              title: '业务配置'
              }
          }
        ]
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    component: Layout,
    redirect: '/order/orderList',
    meta: {
      title: '订单管理',
      icon: orderIcon
    },
    children: [
      {
        path: 'orderList',
        name: 'orderList',
        component: () => import('@/pages/order/orderList/index.vue'),
        meta: {
          title: '订单列表',
          // 用来修改当出现子菜单在active状态不会激活父元素的active状态
          singles: true
        },
        children: [
          {
            path: 'orderDetail/:id',
            name: 'orderDetail',
            component: () => import('@/pages/order/orderList/orderDetail.vue'),
            meta: {
              title: '订单详情'
            }
          },
        ]
      },
      {
        path: 'task',
        name: 'task',
        component: () => import('@/pages/order/task/index.vue'),
        meta: {
          title: '任务列表',
          singles: true
        },
      },
    ]
  },
  {
    path: '/institution',
    name: 'institution',
    component: Layout,
    redirect: '/institution/information',
    meta: {
      title: '服务机构管理',
      icon: institutionIcon
    },
    children: [
      {
        path: 'information',
        name: 'institutionInformation',
        component: () => import('@/pages/institution/information/index.vue'),
        meta: {
          title: '服务机构信息管理',
          // 用来修改当出现子菜单在active状态不会激活父元素的active状态
          singles: true
        },
        children: [
          {
            path: 'informationDetail/:id',
            name: 'institutionInformationDetail',
            component: () => import('@/pages/institution/information/informationDetail.vue'),
            meta: {
              title: '服务机构详情'
            }
          },
        ]
      },
    ]
  },
  {
    path: '/personnel',
    name: 'personnel',
    component: Layout,
    redirect: '/personnel/information',
    meta: {
      title: '服务人员管理',
      icon: personnelIcon
    },
    children: [
      {
        path: 'information',
        name: 'personnelInformation',
        component: () => import('@/pages/personnel/information/index.vue'),
        meta: {
          title: '服务人员信息管理',
          // 用来修改当出现子菜单在active状态不会激活父元素的active状态
          singles: true
        },
        children: [
          {
            path: 'informationDetail/:id',
            name: 'informationDetail',
            component: () => import('@/pages/personnel/information/informationDetail.vue'),
            meta: {
              title: '服务人员详情详情'
            }
          },
        ]
      },
    ]
  },
  {
    path: '/custom',
    name: 'custom',
    component: Layout,
    redirect: '/custom/management',
    meta: {
      title: '客户管理',
      icon: customIcon
    },
    children: [
      {
        path: 'management',
        name: 'customManagement',
        component: () => import('@/pages/custom/management/index.vue'),
        meta: {
          title: '客户列表',
          // 用来修改当出现子菜单在active状态不会激活父元素的active状态
          singles: true
        }
      },
    ]
  },
]

export default normalRouter
