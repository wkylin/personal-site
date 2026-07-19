export type MediaType = "sphere" | "playbook" | "docs" | "voice-lab";

export interface SyncTopic {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  mediaType: MediaType;
}

export const syncTopics: SyncTopic[] = [
  {
    id: "voice-interaction-lab",
    title: "Voice Interaction Lab",
    description:
      "以流体球与短句反馈模拟语音代理的实时状态，让交互意图、语义流和系统响应形成可感知的同频体验。",
    bullets: [
      "流体球体状态映射交互活跃度",
      "随机短句持续反馈系统思考过程",
      "轻量视觉层与叙事滚动同步切换",
    ],
    mediaType: "voice-lab",
  },
  {
    id: "voice-agents",
    title: "Voice Agents",
    description:
      "将口语化输入实时解析为结构化执行步骤，在对话中完成任务规划、参数澄清与反馈闭环。",
    bullets: [
      "流式语义分段与上下文拼接",
      "多轮意图合并与冲突消解",
      "执行动作与状态回执同轨展示",
    ],
    mediaType: "sphere",
  },
  {
    id: "real-world-workflows",
    title: "Real-world Playbook",
    description:
      "把语音指令映射为可复用工作流模板，支持真实研发场景下的提测、发布、回滚和复盘。",
    bullets: [
      "可组合的任务节点与审计轨迹",
      "上下游责任边界自动标注",
      "高频操作模板一键复用",
    ],
    mediaType: "playbook",
  },
  {
    id: "knowledge-base",
    title: "Knowledge Base",
    description:
      "将文档、规范与历史决策聚合到可检索知识层，在交互过程中给出可解释引用与溯源。",
    bullets: [
      "语义检索 + 规则检索混合召回",
      "版本差异与来源可信度标注",
      "组织级术语库与问答守护",
    ],
    mediaType: "docs",
  },
];

export const techBubblePool: string[] = [
  "SOC 2",
  "Sub-second latency",
  "25+ languages",
  "Streaming ASR",
  "Tool calling",
  "Policy guardrails",
  "99.95% uptime",
  "Vector retrieval",
];
