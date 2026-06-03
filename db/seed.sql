USE wkylin_site;

INSERT INTO site_profile (slug, payload)
VALUES (
  'wkylin',
  JSON_OBJECT(
    'identity', JSON_ARRAY('资深前端架构师', '工程化专家', '技术团队管理者'),
    'contacts', JSON_OBJECT(
      'phone', '15026835870',
      'email', 'wkylin.w@qq.com',
      'github', 'https://github.com/wkylin',
      'juejin', 'https://juejin.cn/user/289926798641176',
      'demo', 'https://pro-react-admin.vercel.app/',
      'domain', 'wkylin.cn',
      'resume', 'https://resume.github.io/?wkylin'
    ),
    'metrics', JSON_ARRAY(
      JSON_OBJECT('label', '全栈经验', 'value', '10年+', 'detail', '主导 20+ 中大型项目架构设计'),
      JSON_OBJECT('label', '开源项目', 'value', '148+', 'detail', 'GitHub 长期维护与输出'),
      JSON_OBJECT('label', '提效实践', 'value', '300%', 'detail', '低代码平台驱动运营效率增长'),
      JSON_OBJECT('label', '线上治理', 'value', '99.88%', 'detail', '可用性治理与质量体系落地')
    ),
    'advantages', JSON_ARRAY(
      JSON_OBJECT('title', '架构与工程化专家', 'body', '15 年全栈研发经验，主导过 20+ 中大型项目架构设计。擅长微前端、模块化架构及前端工程化体系建设，解决 30+ 子应用的整合难题。'),
      JSON_OBJECT('title', 'AIGC 技术先行者', 'body', '深度探索 AI 辅助研发落地，主导 AIGC 平台从 0 到 1 建设，通过 Copilot 模式将研发效能提升 100%+。'),
      JSON_OBJECT('title', '降本增效实践者', 'body', '通过低代码平台与组件库建设，让运营效率提升 300%，构建效率提升 70%，线上事故率降低 90%。'),
      JSON_OBJECT('title', '团队技术领袖', 'body', '10 年+ 团队管理经验，带领 10+ 人前端团队，搭建敏捷开发 3.0 与四维质量守护体系，擅长跨部门协同。')
    ),
    'projects', JSON_ARRAY(
      JSON_OBJECT(
        'name', 'lotdb-vue',
        'stack', 'Vue 3 + Express + TypeScript + MySQL 8 + Apache IoTDB',
        'background', '前后端分离的库存管理演示系统，强事务业务数据写入 MySQL，库存变动和销量趋势写入 Apache IoTDB，用于后台分析图表展示。项目不是纯方案骨架，而是可直接运行、可演示的最小闭环实现。',
        'contributions', JSON_ARRAY(
          '实现客户与管理员注册、登录、退出、地址管理、商品浏览、下单、模拟支付和订单查看，覆盖客户端完整购买路径。',
          '建设管理端商品增删改查、上下架、图片上传、条形码查看、库存调整、库存预警、订单处理和 IoTDB 趋势分析能力。',
          '后端补齐操作日志、CSV/Excel 导出、备份恢复、登录失败锁定、页面权限与接口权限控制，并在启动时自动补充演示数据、回填库存和销量记录到 IoTDB。'
        ),
        'result', '形成一个能跑通前台购买、后台管理、库存分析和数据回填的库存管理最小闭环，集中展示 Vue 全栈工程、关系型数据与时序数据协同建模能力。',
        'url', 'https://github.com/wkylin/lotdb-vue'
      ),
      JSON_OBJECT(
        'name', '@w.ui/wui-react',
        'stack', 'React 19 + Ant Design 6 + TypeScript + Vite',
        'background', '基于 React 19 和 Ant Design 6 的高质量组件库，面向中后台、内容展示、动画交互和媒体可视化场景，沉淀 100+ 可复用业务组件，并通过 npm 面向不同 React 项目分发。',
        'contributions', JSON_ARRAY(
          '设计主包聚合入口与 core / stateful / stateless 子路径多入口，兼顾向后兼容、按需导入和更细粒度的 tree-shaking。',
          '沉淀 ErrorBoundary、KeepAlive、ResponsiveTable、TreeList、ReMarkdown、SmartVideoPlayer、OneTimePasscode、动画展示等组件，覆盖核心、有状态和无状态三类使用场景。',
          '使用 TypeScript 提供完整类型定义，并支持主题定制、暗黑模式、响应式适配和国际化，提升组件在多项目中的集成稳定性。'
        ),
        'result', '形成可通过 npm install @w.ui/wui-react 直接接入的组件资产库，并配套在线演示、Storybook 文档和 GitHub 仓库，支撑 React 项目快速复用。',
        'url', 'https://www.npmjs.com/package/@w.ui/wui-react'
      ),
      JSON_OBJECT(
        'name', 'wkylin.cn',
        'stack', 'React + TypeScript + Vite',
        'background', '个人主页与作品集入口，集中展示个人能力、项目经验与联系方式。',
        'contributions', JSON_ARRAY(
          '负责首页信息架构与视觉表达，让项目、能力和联系路径一屏可达。',
          '通过响应式布局和暗色科技风设计，提升个人品牌的辨识度。'
        ),
        'result', '作为个人主站承载履历、项目和跳转入口，形成统一展示面。',
        'url', 'https://wkylin.cn'
      ),
      JSON_OBJECT(
        'name', 'games.wkylin.cn',
        'stack', 'React + Canvas / WebGL',
        'background', '面向互动小游戏与轻量体验的独立站点，用于展示浏览器端交互能力。',
        'contributions', JSON_ARRAY(
          '封装统一的游戏容器和资源加载流程，降低新玩法接入成本。',
          '沉淀可复用的动效与交互能力，适配不同屏幕尺寸。'
        ),
        'result', '作为小游戏展示站持续承载可玩性与互动演示。',
        'url', 'https://games.wkylin.cn'
      ),
      JSON_OBJECT(
        'name', 'visual.wkylin.cn',
        'stack', 'React + D3.js + ECharts',
        'background', '专注数据可视化和信息图表达的独立站点，用于呈现图表与视觉组件能力。',
        'contributions', JSON_ARRAY(
          '组织图表、面板与布局组件，便于快速拼装不同视觉演示。',
          '优化图形渲染与交互反馈，兼顾性能和展示效果。'
        ),
        'result', '作为可视化作品站，集中展示图表和视觉表达能力。',
        'url', 'https://visual.wkylin.cn'
      ),
      JSON_OBJECT(
        'name', 'pro-react-admin',
        'stack', 'React + TypeScript + Node.js',
        'background', '面向企业后台的开源脚手架和管理端模板，兼顾工程化与可扩展性。',
        'contributions', JSON_ARRAY(
          '沉淀通用页面框架、权限模型和布局体系，支持快速启动业务后台。',
          '持续维护代码结构和构建链路，保证模板在不同项目中可复用。'
        ),
        'result', '作为开源模板和演示工程，支撑多项目复用与落地。',
        'url', 'https://github.com/wkylin/pro-react-admin'
      ),
      JSON_OBJECT(
        'name', 'pro-pyqt6-web',
        'stack', 'PyQt6 + Vue3 + Python',
        'background', '桌面应用与 Web 技术融合的跨栈项目，聚焦 Python GUI 与前端协同开发。',
        'contributions', JSON_ARRAY(
          '基于 PyQt6 与 Vue3 组织桌面端交互框架，兼顾开发效率与体验一致性。',
          '沉淀 Python 与前端通信方案，降低跨技术栈协作成本。'
        ),
        'result', '形成可复用的桌面应用开发范式，并用于技术展示与项目验证。',
        'url', 'https://github.com/wkylin/pro-pyqt6-web'
      ),
      JSON_OBJECT(
        'name', 'hacker.wkylin.cn',
        'stack', 'React + Markdown + Node.js',
        'background', '偏技术内容与思考输出的独立站点，用于承载文章、实验记录和主题内容。',
        'contributions', JSON_ARRAY(
          '统一内容组织和展示风格，让技术文章具备更好的阅读体验。',
          '兼顾站点性能和可访问性，适合长期内容沉淀。'
        ),
        'result', '作为技术内容站持续输出架构、实践和实验成果。',
        'url', 'https://hacker.wkylin.cn'
      ),
      JSON_OBJECT(
        'name', 'tier-carousel-vue',
        'stack', 'Vue 3 + TypeScript + Vite + GitHub Pages',
        'background', '从大型会员权益页面中抽离的 Vue 3 分层轮播演示项目，聚焦卡片层级切换、移动端触摸手势和可访问交互，方便独立验证复杂轮播组件的交互细节。',
        'contributions', JSON_ARRAY(
          '实现 click-to-select 层级选择、鼠标 pointer drag 和移动端 touch drag，让轮播在桌面端与触屏设备上都保持自然操作反馈。',
          '处理横向轮播手势与页面纵向滚动的协同，避免移动端滑动时误锁页面滚动或打断轮播状态。',
          '补齐 transition fallback 清理和原生 button 键盘支持，覆盖 Tab、Enter、Space 等基础可访问性场景。'
        ),
        'result', '形成一个可在线访问的 Vue 3 交互组件 demo，用于展示复杂 UI 动效、手势识别和可访问性处理能力。',
        'url', 'https://wkylin.github.io/tier-carousel-vue/'
      ),
      JSON_OBJECT(
        'name', 'ng-funs',
        'stack', 'AngularJS + GitHub Pages',
        'background', '早期 Angular 方向的前端实验项目，用于沉淀单页应用、组件组织和页面交互练习。',
        'contributions', JSON_ARRAY(
          '围绕 AngularJS 组织页面路由、视图结构和基础交互，验证早期 SPA 开发模式。',
          '通过 GitHub Pages 承载在线演示，保留前端技术演进过程中的实践痕迹。'
        ),
        'result', '作为老项目归档展示，补充个人前端技术路线和早期工程实践经历。',
        'url', 'https://wkylin.github.io/ng-funs/home'
      )
    ),
    'skills', JSON_ARRAY(
      JSON_OBJECT(
        'title', '前端架构',
        'items', JSON_ARRAY('React/Vue 全家桶生态', 'Micro-App/Qiankun 微前端', '大型前端应用架构设计', '性能调优')
      ),
      JSON_OBJECT(
        'title', '全栈与 AI',
        'items', JSON_ARRAY('Node.js', 'GraphQL', 'Prisma', 'SSE', 'Markdown 渲染', 'Prompt Engineering')
      ),
      JSON_OBJECT(
        'title', '工程化与效能',
        'items', JSON_ARRAY('Webpack/Vite 构建优化', 'CI/CD', 'DevOps', 'Sentry 私有化部署', '前端监控体系')
      ),
      JSON_OBJECT(
        'title', '数据可视化',
        'items', JSON_ARRAY('ECharts', 'D3.js', 'Three.js', 'GIS/SuperMap 系统集成')
      )
    ),
    'influence', JSON_ARRAY(
      '维护 pro-react-admin 等项目，累计 Star 900+，被多家企业用作脚手架模板。',
      '运营公众号“前端市界”及掘金专栏，持续输出架构思考与前沿技术实践，文章阅读量累计超 20 万+'
    )
  )
)
ON DUPLICATE KEY UPDATE payload = VALUES(payload);
