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
