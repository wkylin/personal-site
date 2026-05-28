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
  };
  metrics: Array<{ label: string; value: string; detail: string }>;
  advantages: Array<{ title: string; body: string }>;
  projects: Project[];
  skills: Array<{ title: string; items: string[] }>;
  influence: string[];
};

export const profileData: ProfileData = {
  identity: ["资深前端架构师", "工程化专家", "技术团队管理者"],
  contacts: {
    phone: "15026835870",
    email: "wkylin.w@qq.com",
    github: "https://github.com/wkylin",
    juejin: "https://juejin.cn/user/289926798641176",
    demo: "https://pro-react-admin.vercel.app/",
    domain: "wkylin.cn",
  },
  metrics: [
    { label: "全栈经验", value: "10年+", detail: "主导 20+ 中大型项目架构设计" },
    { label: "开源项目", value: "148+", detail: "GitHub 长期维护与输出" },
    { label: "提效实践", value: "300%", detail: "低代码平台驱动运营效率增长" },
    { label: "线上治理", value: "99.88%", detail: "可用性治理与质量体系落地" },
  ],
  advantages: [
    {
      title: "架构与工程化专家",
      body: "15 年全栈研发经验，主导过 20+ 中大型项目架构设计。擅长微前端、模块化架构及前端工程化体系建设，解决 30+ 子应用的整合难题。",
    },
    {
      title: "AIGC 技术先行者",
      body: "深度探索 AI 辅助研发落地，主导 AIGC 平台从 0 到 1 建设，通过 Copilot 模式将研发效能提升 100%+。",
    },
    {
      title: "降本增效实践者",
      body: "通过低代码平台与组件库建设，让运营效率提升 300%，构建效率提升 70%，线上事故率降低 90%。",
    },
    {
      title: "团队技术领袖",
      body: "10 年+ 团队管理经验，带领 10+ 人前端团队，搭建敏捷开发 3.0 与四维质量守护体系，擅长跨部门协同。",
    },
  ],
  projects: [
    {
      name: "wkylin.cn",
      stack: "React + TypeScript + Vite",
      background: "个人主页与作品集入口，集中展示个人能力、项目经验与联系方式。",
      contributions: [
        "负责首页信息架构与视觉表达，让项目、能力和联系路径一屏可达。",
        "通过响应式布局和暗色科技风设计，提升个人品牌的辨识度。",
      ],
      result: "作为个人主站承载履历、项目和跳转入口，形成统一展示面。",
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
  ],
  skills: [
    {
      title: "前端架构",
      items: ["React/Vue 全家桶生态", "Micro-App/Qiankun 微前端", "大型前端应用架构设计", "性能调优"],
    },
    {
      title: "全栈与 AI",
      items: ["Node.js", "GraphQL", "Prisma", "SSE", "Markdown 渲染", "Prompt Engineering"],
    },
    {
      title: "工程化与效能",
      items: ["Webpack/Vite 构建优化", "CI/CD", "DevOps", "Sentry 私有化部署", "前端监控体系"],
    },
    {
      title: "数据可视化",
      items: ["ECharts", "D3.js", "Three.js", "GIS/SuperMap 系统集成"],
    },
  ],
  influence: [
    "维护 pro-react-admin 等项目，累计 Star 900+，被多家企业用作脚手架模板。",
    "运营公众号“前端市界”及掘金专栏，持续输出架构思考与前沿技术实践，文章阅读量累计超 20 万+",
  ],
};
