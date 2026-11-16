export type ToolCategory = 
  | 'All'
  | 'AI Chatbots'
  | 'Coding'
  | 'Image Generation'
  | 'Video Generation'
  | 'Audio & Music'
  | 'Productivity'
  | 'Research';

export interface PaidPlan {
  name: string;
  price: string;
  creditsOrAllowance: string;
  keyFeatures: string[];
}

export interface AITool {
  id: string;
  name: string;
  monogram: string;
  category: ToolCategory;
  shortDescription: string;
  tagline: string;
  overview: string;
  freeTier: {
    description: string;
    creditAmount: string;
    refreshRate: string;
    rateLimits: string;
    whatYouCanBuild: string[];
  };
  paidPlans: PaidPlan[];
  creditOptimizationTips: string[];
  tokenPricing?: {
    inputPer1M: string;
    outputPer1M: string;
  };
  verifiedStatus: 'Verified' | 'Partly verified' | 'Community Reported';
  lastUpdated: string;
  officialWebsite: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  daysAgo: number;
  category: 'Model Release' | 'Credit Update' | 'Price Drop' | 'Feature';
  summary: string;
  impactOnFreeTier: string;
  link: string;
}

export interface CreditGuideArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  summary: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    content: string;
  }[];
}

export type ProjectType = 
  | 'saas'
  | 'mobile'
  | 'chatbot'
  | 'content'
  | 'extension'
  | 'research';

export type BudgetType = 'free-only' | 'hybrid';

export interface UserSubscription {
  id: string;
  name: string;
  category: string;
  cost: string;
  bestUsedFor: string;
  freeAlternative: string;
}

export interface RoadmapTool {
  name: string;
  role: string;
  planType: '100% Free' | 'Subscription Plan' | 'Freemium';
  quotaOrCost: string;
  link: string;
}

export interface RoadmapPhase {
  phaseNumber: number;
  phaseName: string;
  goal: string;
  recommendedTools: RoadmapTool[];
  actionSteps: string[];
  creditOptimization: string[];
}

export interface ProjectRoadmap {
  id: string;
  title: string;
  projectType: ProjectType;
  budgetType: BudgetType;
  summary: string;
  totalCostEstimate: string;
  phases: RoadmapPhase[];
  goldenRules: string[];
  pitfallsToAvoid: string[];
}

export interface AssistantChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
}
