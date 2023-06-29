# 传智研究院-脚手架
#### 项目简介
> 平时项目开发中，遇到已有组件库中没有涉及的组件但又经常用到，每次都得重新开发很浪费时间，针对这个问题我们进行了二次组件封装或者是重新开发，用的时候直接引入

项目迭代日志：
23年3月30 - 合并更新 处理无法合并问题
#### 研发规范遵循：

- 主体使用驼峰命名
- 公共样式使用 - 连接命名
- 内部样式 驼峰命名
- 页面命名 使用小写开头的驼峰命名
- 组件使用大写开头命名

#### 产品原型及设计
- 设计稿： https://codesign.qq.com/s/NlO1ZnlKxR9LMV2

#### 运行环境 - 初始开发环境及工具

- 项目开发环境: Mac + node: v17.8.0 + npm: 8.12.1 || pnpm: 6.32.8 

#### 访问地址
https://czri-admin.itheima.net/

#### 技术栈应用
Vue 3 + TypeScript +Tdesign + Vite + pinia
#### 项目结构
```html
├── commitlint.config.js              - commintlint 规范
├── docker                            - docker 部署配置文件
│     └── nginx.conf                  - 若开启 browerhistroy 可参考配置
├── docs                              - 项目展示图 - 首页截图      
├── globals.d.ts                      - 通用声明文件        
├── index.html                        - 主 html 文件
├── mock                              - mock 目录
│     └── index.ts
├── node_modules                      - 项目依赖
├── package-lock.json
├── package.json
├── public                            - 公用资源文件  
│     └── favicon.ico
├── shims-vue.d.ts
├── src                               - 页面代码
│   ├── api 请求相关
│   ├── assets 公共资源
│   │   ├── images 图片资源
│   ├── api                           - 接口
│   ├── conponents                    - 公用组件
│   │   ├── Delete                    - 删除弹层：只需从父组件传删除的内容提示
│   │   ├── ImageMagnify              - 查看图片弹层
│   │   ├── Message                   - 提示弹层
│   │   │   ├──Success                - 成功通知弹窗
│   │   │   ├──ProdDisabled           - 禁用提示弹窗
│   │   ├── switchBar                 - tab切换
│   │   │   ├──switchBar              - tab切换
│   │   │   ├──switchBarindex         - 首页tab切换
│   │   │   ├──switchBartop           - 线条tab
│   ├── czriComponents                - 组件包：常用，但是原有组件库实现不了，因此进行了二次开发
│   │   ├──AddInput                   - 动态添加input组件
│   │   ├──CardListCollapse           - 折叠列表
│   │   ├──CardListSort               - 带排序的列表
│   │   ├──dropList                   - 可下拉展开的列表
│   │   ├──ListDialog                 - 常用弹窗5（带列表的弹窗）
│   │   ├──ListScrollDialog           - 常用弹窗5（带列表的弹窗、滚动分页）
│   │   ├──TabDialog                  - 常用弹窗6（带tab的弹窗）
│   │   ├──tabList                    - 带tab的列表
│   │   ├──Transfer                   - 穿梭框(标题有hover状态)
│   │   ├──treeList                   - 树形列表
│   │   ├──UnitDialog                 - 常用弹窗2（带单位和数显）
│   │   ├──index.less                 - 组件包样式
│   ├── layouts                       - 页面架构
│   │   ├──components				  - 页面架构公共组件
│   │   │   ├──Breadcrumb			  - 面包屑
│   │   │   ├──Content				  - 内置组件，避免重复渲染DOM
│   │   │   ├──Footer				  - 底部公司名称
│   │   │   ├──LayoutContentSide	  - 侧边栏
│   │   │   ├──LayoutHeader	  		  - 侧边栏头部
│   │   │   ├──Loginfo	  		  	  - 侧边栏退出区域
│   │   │   ├──Notice	  		  	  - 通知中心，弃用
│   │   │   ├──Search	  		  	  - 搜索功能
│   │   ├──frame					  - 页面架构框架
│   │   ├──simple2Components		  - 框架二公用内容
│   │   │   ├──Header				  - 框架顶部
│   │   ├──simpleComponents		  	  - 框架公用内容
│   │   │   ├──MenuContent	  		  - 简版布局
│   │   │   ├──SideNav	  		  	  - 列表菜单
│   │──index.vue					  - 框架布局
│   │──setting.vue					  = 设置框架风格
│   ├── pages                         - 页面展示目录
│   │   ├──dashboard                  - 首页
│   │   ├──detail                     - 详情页
│   │   │   ├──advanced               - 多卡片详情页
│   │   │   ├──base                   - 基础详情页
│   │   │   ├──deploy                 - 数据详情页
│   │   │   ├──secondary              - 二级详情页
│   │   ├──form                       - 表单页
│   │   │   ├──base                   - 基础表单页
│   │   │   ├──step                   - 分步表单页
│   │   ├──login                      - 普通tab登录页
│   │   ├──login2                     - 左右布局登录页
│   │   ├──module                     - 组件包调用入口页，调用的组件都在(czriComponents文件加中)
│   │   ├──user                       - 个人中心
│   │   ├──list                       - 列表页
│   │   │   ├──base                   - 基础列表页
│   │   │   ├──upBase                - 基础列表页（带图）
│   │   │   ├──noSearch           - 基础列表页（不带搜索）
│   │   │   ├──card                   - 卡片列表页
│   │   │   ├──noData                 - 列表无数据页
│   │   │   ├──statistics             - 统计数据列表页
│   │   │   ├──tab                    - tab切换
│   │   │   ├──topTab                 - 标签列表页（顶部）
│   │   │   ├──tree                   - 树状筛选列表页
│   ├── router                        - 定义路由页面
│   ├── style                         - 样式
│   │   ├──componentsReast            - 组件重置、全局样式
│   │   ├──theme                      - 全局颜色值、公用样式
│   │   index.less                    - 样式总入口
│   │   normal.less                   - 普通框架样式
│   │   noSecondMenu.less             - 普通框架简化版样式
│   │   top.less                      - 上左右布局
│   ├── utils       封装工具目录
│   ├── main.ts						  - 项目入口文件
│   ├── permission.ts				  - 路有权限控制
├── tsconfig.json                     - ts配置文件
├── README.md                         - 说明文档  
└── vite.config.js                    - vite 配置文件
```
#### 安装运行

``` bash
## 安装依赖
npm install || yarn 

## 启动项目 

# 启动链接mock
npm run dev
# 启动链接测试环境
npm run start

## 构建正式环境 - 打包
npm run build

```
#### 插件
nprogress 进度条 

viteMockServe vite 的数据模拟插件

vueJsx 
> 使用jsx 语法 jsx语法可以更好地跟Typescript结合 在阅读UI框架源码时，发现在知名UI组件库Ant Design Vue跟Naive UI皆使用tsx语法开发
vite-svg-loader



#### 参考

vite
vue3
pinia 中文文档 :类vuex 
vue-router
Tdesign
Tdesign-cli

tsconfig.json配置 
#### 文档
tsconfig.json 配置整理
vite.config.js vite配置文件

