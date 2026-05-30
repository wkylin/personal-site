export type Project = {
  name: string;
  stack: string;
  background: string;
  contributions: string[];
  result: string;
  url: string;
};

export type ProfileData = {
  identity: string[];
  contacts: {
    phone: string;
    email: string;
    github: string;
    juejin: string;
    demo: string;
    domain: string;
    resume?: string;
  };
  metrics: Array<{ label: string; value: string; detail: string }>;
  advantages: Array<{ title: string; body: string }>;
  projects: Project[];
  skills: Array<{ title: string; summary: string; items: string[] }>;
  influence: string[];
};

export const profileData: ProfileData = {
  identity: ["资深前端架构师", "工程化与架构治理专家", "技术团队管理者"],
  contacts: {
    phone: "15026835870",
    email: "wkylin.w@gmail.com",
    github: "https://github.com/wkylin",
    juejin: "https://juejin.cn/user/289926798641176",
    demo: "https://pro-react-admin.vercel.app/",
    domain: "wkylin.cn",
    resume: "https://resume.github.io/?wkylin",
  },
  metrics: [
    { label: "架构经验", value: "长期一线", detail: "持续主导中大型前端与全栈系统架构设计" },
    { label: "系统治理", value: "多业务线", detail: "微前端、模块化与多团队协作体系落地" },
    { label: "工程体系", value: "全链路", detail: "组件体系、构建体系、发布流程与研发规范建设" },
    { label: "稳定性治理", value: "可观测", detail: "监控、质量门禁与性能优化闭环建设" },
  ],
  advantages: [
    {
      title: "复杂前端架构设计",
      body: "具备10年+前端与全栈研发经验，能根据业务规模选择合适的单体、模块化、微前端或平台化架构，明确应用边界、依赖关系、权限模型和演进路径，避免系统在长期迭代中失控。",
    },
    {
      title: "工程化与研发效能",
      body: "熟悉 Vite、Webpack、Monorepo、CI/CD、组件库、脚手架和规范体系建设，能把重复劳动沉淀成工具链和平台能力，让团队在多人协作、快速交付和代码质量之间保持稳定节奏。",
    },
    {
      title: "质量、性能与线上稳定性",
      body: "重视可观测性、错误监控、性能预算、构建体积、首屏体验、灰度发布和回滚机制，能把线上问题从被动救火转为主动治理，让可用性、性能和质量成为研发流程的一部分。",
    },
    {
      title: "技术决策与团队赋能",
      body: "有 10 年+ 团队管理和跨部门协作经验，能做技术选型、架构评审、Code Review、人才培养和复杂项目推进，帮助团队从个人经验驱动升级为标准、流程和工程资产驱动。",
    },
  ],
  projects: [
    {
      name: "lotdb-vue",
      stack: "Vue 3 + Express + TypeScript + MySQL 8 + Apache IoTDB",
      background: "前后端分离的库存管理演示系统，强事务业务数据写入 MySQL，库存变动和销量趋势写入 Apache IoTDB，用于后台分析图表展示。项目不是纯方案骨架，而是可直接运行、可演示的最小闭环实现。",
      contributions: [
        "实现客户与管理员注册、登录、退出、地址管理、商品浏览、下单、模拟支付和订单查看，覆盖客户端完整购买路径。",
        "建设管理端商品增删改查、上下架、图片上传、条形码查看、库存调整、库存预警、订单处理和 IoTDB 趋势分析能力。",
        "后端补齐操作日志、CSV/Excel 导出、备份恢复、登录失败锁定、页面权限与接口权限控制，并在启动时自动补充演示数据、回填库存和销量记录到 IoTDB。",
      ],
      result: "形成一个能跑通前台购买、后台管理、库存分析和数据回填的库存管理最小闭环，集中展示 Vue 全栈工程、关系型数据与时序数据协同建模能力。",
      url: "https://github.com/wkylin/lotdb-vue",
    },
    {
      name: "@w.ui/wui-react",
      stack: "React 19 + Ant Design 6 + TypeScript + Vite",
      background: "基于 React 19 和 Ant Design 6 的高质量组件库，面向中后台、内容展示、动画交互和媒体可视化场景，沉淀 100+ 可复用业务组件，并通过 npm 面向不同 React 项目分发。",
      contributions: [
        "设计主包聚合入口与 core / stateful / stateless 子路径多入口，兼顾向后兼容、按需导入和更细粒度的 tree-shaking。",
        "沉淀 ErrorBoundary、KeepAlive、ResponsiveTable、TreeList、ReMarkdown、SmartVideoPlayer、OneTimePasscode、动画展示等组件，覆盖核心、有状态和无状态三类使用场景。",
        "使用 TypeScript 提供完整类型定义，并支持主题定制、暗黑模式、响应式适配和国际化，提升组件在多项目中的集成稳定性。",
      ],
      result: "形成可通过 npm install @w.ui/wui-react 直接接入的组件资产库，并配套在线演示、Storybook 文档和 GitHub 仓库，支撑 React 项目快速复用。",
      url: "https://www.npmjs.com/package/@w.ui/wui-react",
    },
    {
      name: "wkylin.cn",
      stack: "React 19 + TypeScript + Vite + Tailwind CSS + Node.js + MySQL",
      background: "当前个人主站项目，用于集中呈现 15 年+前端架构经验、工程化能力、代表项目和联系方式。项目同时保留静态数据与 API 数据两种模式，方便在纯静态部署和服务端部署之间切换。",
      contributions: [
        "基于 React + TypeScript 组织页面结构，将个人能力、架构优势、项目经历、技术栈和影响力拆成可维护的数据模型，内容可由静态文件或 MySQL 接口驱动。",
        "设计 Vite 构建、环境变量、Node API、MySQL 初始化脚本、Nginx 反向代理与 Docker 镜像，覆盖本地开发、生产构建和服务器部署链路。",
        "通过响应式布局、暗色科技风视觉、滚动 reveal 动效和移动端适配，强化个人技术品牌，同时保证页面首屏信息密度和访问路径清晰。",
      ],
      result: "形成一个可持续维护的个人技术品牌首页：既能作为静态站点独立部署，也能接入 Node + MySQL 扩展为动态内容服务。",
      url: "https://wkylin.cn",
    },
    {
      name: "games.wkylin.cn",
      stack: "React + Canvas / WebGL",
      background: "面向互动小游戏与轻量体验的独立站点，用于展示浏览器端交互能力。",
      contributions: [
        "封装统一的游戏容器和资源加载流程，降低新玩法接入成本。",
        "沉淀可复用的动效与交互能力，适配不同屏幕尺寸。",
      ],
      result: "作为小游戏展示站持续承载可玩性与互动演示。",
      url: "https://games.wkylin.cn",
    },
    {
      name: "visual.wkylin.cn",
      stack: "React + D3.js + ECharts",
      background: "专注数据可视化和信息图表达的独立站点，用于呈现图表与视觉组件能力。",
      contributions: [
        "组织图表、面板与布局组件，便于快速拼装不同视觉演示。",
        "优化图形渲染与交互反馈，兼顾性能和展示效果。",
      ],
      result: "作为可视化作品站，集中展示图表和视觉表达能力。",
      url: "https://visual.wkylin.cn",
    },
    {
      name: "pro-react-admin",
      stack: "React + TypeScript + Node.js",
      background: "面向企业后台的开源脚手架和管理端模板，兼顾工程化与可扩展性。",
      contributions: [
        "沉淀通用页面框架、权限模型和布局体系，支持快速启动业务后台。",
        "持续维护代码结构和构建链路，保证模板在不同项目中可复用。",
      ],
      result: "作为开源模板和演示工程，支撑多项目复用与落地。",
      url: "https://github.com/wkylin/pro-react-admin",
    },
    {
      name: "pro-pyqt6-web",
      stack: "PyQt6 + Vue3 + Python",
      background: "桌面应用与 Web 技术融合的跨栈项目，聚焦 Python GUI 与前端协同开发。",
      contributions: [
        "基于 PyQt6 与 Vue3 组织桌面端交互框架，兼顾开发效率与体验一致性。",
        "沉淀 Python 与前端通信方案，降低跨技术栈协作成本。",
      ],
      result: "形成可复用的桌面应用开发范式，并用于技术展示与项目验证。",
      url: "https://github.com/wkylin/pro-pyqt6-web",
    },
    {
      name: "hacker.wkylin.cn",
      stack: "React + Markdown + Node.js",
      background: "偏技术内容与思考输出的独立站点，用于承载文章、实验记录和主题内容。",
      contributions: [
        "统一内容组织和展示风格，让技术文章具备更好的阅读体验。",
        "兼顾站点性能和可访问性，适合长期内容沉淀。",
      ],
      result: "作为技术内容站持续输出架构、实践和实验成果。",
      url: "https://hacker.wkylin.cn",
    },
    {
      name: "ng-funs",
      stack: "AngularJS + GitHub Pages",
      background: "早期 Angular 方向的前端实验项目，用于沉淀单页应用、组件组织和页面交互练习。",
      contributions: [
        "围绕 AngularJS 组织页面路由、视图结构和基础交互，验证早期 SPA 开发模式。",
        "通过 GitHub Pages 承载在线演示，保留前端技术演进过程中的实践痕迹。",
      ],
      result: "作为老项目归档展示，补充个人前端技术路线和早期工程实践经历。",
      url: "https://wkylin.github.io/ng-funs/home",
    },
  ],
  skills: [
    {
      title: "前端架构治理",
      summary: "从业务复杂度出发设计应用形态，拆清边界、依赖和演进路径，让系统能支撑长期迭代。",
      items: ["大型 SPA 架构", "微前端治理", "模块边界建模", "权限与路由体系", "技术选型评审"],
    },
    {
      title: "工程化体系建设",
      summary: "把研发流程标准化、工具化和自动化，提升多人协作下的交付效率与代码一致性。",
      items: ["Vite/Webpack 构建优化", "Monorepo 工程管理", "组件库与设计系统", "脚手架与代码规范", "CI/CD 发布流水线"],
    },
    {
      title: "质量与稳定性闭环",
      summary: "围绕性能、异常、发布和回滚建立治理机制，把线上稳定性纳入日常研发过程。",
      items: ["性能预算", "前端监控", "错误追踪", "自动化测试", "质量门禁与灰度发布"],
    },
    {
      title: "平台化与 AI 工程化",
      summary: "将通用能力沉淀为平台、服务和工具链，并探索 AI 在研发提效和业务体验中的落地方式。",
      items: ["组件资产平台", "AIGC 辅助研发", "Node.js BFF 服务层", "数据可视化工程", "桌面端与 Web 融合"],
    },
  ],
  influence: [
    "持续维护 pro-react-admin 等开源项目，沉淀企业后台架构、权限模型、工程规范与可复用模板，服务真实业务项目快速启动。",
    "运营公众号“前端市界”及掘金专栏，长期输出前端架构、工程治理、AI 工程化与团队技术管理实践。",
  ],
};
