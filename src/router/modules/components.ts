import Layout from '@/layouts/index.vue'
import ListIcon from '@/assets/test-img/icon_menu_shuju.svg'
import FormIcon from '@/assets/test-img/icon_menu_cheliang.svg'
import GrzxIcon from '@/assets/test-img/icon_menu_grzx.svg'
import DetailIcon from '@/assets/test-img/icon_xq.svg'
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
  
        ]
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    redirect: '/list/base',
    meta: {
      title: '列表页',
      icon: ListIcon
    },
    children: [
      {
        path: 'base',
        name: 'ListBase',
        component: () => import('@/pages/list/base/index.vue'),
        meta: {
          title: '列表(基础)',
          // 用来修改当出现子菜单在active状态不会激活父元素的active状态
          singles: true
        },
        children: [
          {
            path: 'detail',
            name: 'ListBaseDetails',
            component: () => import('@/pages/detail/base/index.vue'),
            meta: {
              title: '详情页'
            }
          }
        ]
      },
      {
        path: 'upBase',
        name: 'ListBase1',
        component: () => import('@/pages/list/upBase/index.vue'),
        meta: {
          title: '列表(带图)'
        }
      },
      {
        path: 'noBase',
        name: 'NoBase',
        component: () => import('@/pages/list/noSearch/index.vue'),
        meta: {
          title: '列表(无搜索)'
        }
      },
      {
        path: 'tab',
        name: 'ListTab',
        component: () => import('@/pages/list/tab/index.vue'),
        meta: {
          title: '列表(Tab切换列表)'
        }
      },
      {
        path: 'topTab',
        name: 'ListTabTop',
        component: () => import('@/pages/list/topTab/index.vue'),
        meta: {
          title: '列表(Tab切换页面)'
        }
      },
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('@/pages/list/statistics/index.vue'),
        meta: {
          title: '列表(关键数据)'
        }
      },
      {
        path: 'card',
        name: 'ListCard',
        component: () => import('@/pages/list/card/index.vue'),
        meta: {
          title: '列表(卡片式)'
        }
      },
      {
        path: 'tree',
        name: 'ListTree',
        component: () => import('@/pages/list/tree/index.vue'),
        meta: {
          title: '列表(树状筛选)'
        }
      },
      {
        path: 'noData',
        name: 'noData',
        component: () => import('@/pages/list/noData/index.vue'),
        meta: {
          title: '列表(无数据)'
        }
      }
    ]
  },
  {
    path: '/form',
    name: 'form',
    component: Layout,
    redirect: '/form/step',
    meta: {
      title: '表单页',
      icon: FormIcon,
      // 点击后直接进入路由和对应页面不展开子菜单
      single: true
    },
    children: [
      // {
      //   path: 'base',
      //   name: 'FormBase',
      //   component: () => import('@/pages/form/base/index.vue'),
      //   meta: {
      //     title: '基础表单页'
      //   }
      // },
      {
        path: 'step',
        name: 'FormStep',
        component: () => import('@/pages/form/step/index.vue'),
        meta: {
          title: '分步表单页'
        }
      }
    ]
  },

  {
    path: '/detail',
    name: 'detail',
    component: Layout,
    redirect: '/detail/base',
    meta: {
      title: '详情页',
      icon: DetailIcon
    },
    children: [
      {
        path: 'base',
        name: 'DetailBase',
        component: () => import('@/pages/detail/base/index.vue'),
        meta: {
          title: '基础详情页'
        }
      },
      {
        path: 'advanced',
        name: 'DetailAdvanced',
        component: () => import('@/pages/detail/advanced/index.vue'),
        meta: {
          title: '多卡片详情页'
        }
      },
      {
        path: 'deploy',
        name: 'DetailDeploy',
        component: () => import('@/pages/detail/deploy/index.vue'),
        meta: {
          title: '数据详情页'
        }
      },
      {
        path: 'secondary',
        name: 'DetailSecondary',
        component: () => import('@/pages/detail/secondary/index.vue'),
        meta: {
          title: '二级详情页'
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/index',
    meta: { title: '个人页', icon: GrzxIcon, single: true },
    children: [
      {
        path: 'index',
        name: 'UserIndex',
        component: () => import('@/pages/user/index.vue'),
        meta: { title: '个人中心' }
      }
    ]
  }
]

export default normalRouter
