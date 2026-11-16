import { NewsItem, CreditGuideArticle } from '../types';

export const NEWS_OFFERS_DATA: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Google Introduces Gemini 2.0 Flash Experimental with Free Developer Quota',
    source: 'Google AI Developers',
    date: 'Nov 14, 2026',
    daysAgo: 2,
    category: 'Model Release',
    summary: 'Google has released Gemini 2.0 Flash into experimental preview on Google AI Studio, maintaining the zero-cost free tier with improved tool use and multimodal streaming latency.',
    impactOnFreeTier: 'Available immediately in Google AI Studio with 10 RPM and 1,000 RPD free developer allowance.',
    link: 'https://aistudio.google.com/'
  },
  {
    id: 'news-2',
    title: 'DeepSeek Launches 5 Million Free Token Welcome Promotion',
    source: 'DeepSeek Official',
    date: 'Nov 12, 2026',
    daysAgo: 4,
    category: 'Credit Update',
    summary: 'New developer accounts on DeepSeek now automatically receive 5,000,000 free tokens valid across both DeepSeek-V3 and DeepSeek-R1 reasoning models.',
    impactOnFreeTier: 'Equivalent to roughly 10,000,000 words of free processing with zero credit card required.',
    link: 'https://platform.deepseek.com/'
  },
  {
    id: 'news-3',
    title: 'Anthropic Expands Prompt Caching Discounts to 90% for Claude 3.5 Sonnet',
    source: 'Anthropic Engineering',
    date: 'Nov 8, 2026',
    daysAgo: 8,
    category: 'Price Drop',
    summary: 'Repeated context prompts in Claude 3.5 Sonnet now qualify for an automated 90% input token discount, substantially lowering the cost of long-context multi-turn coding chats.',
    impactOnFreeTier: 'Reduces cached input token pricing from $3.00/1M down to $0.30/1M.',
    link: 'https://anthropic.com/'
  },
  {
    id: 'news-4',
    title: 'OpenAI Reduces GPT-4o Mini Fine-Tuning Costs by 50%',
    source: 'OpenAI Changelog',
    date: 'Oct 28, 2026',
    daysAgo: 19,
    category: 'Price Drop',
    summary: 'Fine-tuning training costs for GPT-4o mini have dropped by half, making domain-specific model customization accessible to indie developers and university projects.',
    impactOnFreeTier: 'Free tier web users now also get slightly faster generation speeds during peak morning hours.',
    link: 'https://openai.com/'
  },
  {
    id: 'news-5',
    title: 'ElevenLabs Launches Free Character Top-Up for Educational Accounts',
    source: 'ElevenLabs Community',
    date: 'Oct 20, 2026',
    daysAgo: 27,
    category: 'Credit Update',
    summary: 'Students registering with a valid `.edu` or university email domain receive an extra 5,000 character allowance monthly on top of the standard 10,000 character free tier.',
    impactOnFreeTier: 'Bumps monthly free speech synthesis to roughly 15-18 minutes of voiceover.',
    link: 'https://elevenlabs.io/'
  }
];

export const CREDIT_GUIDE_ARTICLES: CreditGuideArticle[] = [
  {
    id: 'guide-1',
    title: 'The Free Tier Engineering Playbook: Building Apps Without Spending $1',
    subtitle: 'How to combine Google AI Studio, Groq, and DeepSeek for completely free production backends.',
    category: 'Architecture Strategy',
    readTime: '5 min read',
    summary: 'Most builders burn through paid credits unnecessarily. By orchestrating generous free tiers across frontier providers, you can run full staging and production prototypes with zero API bills.',
    keyTakeaways: [
      'Use Google AI Studio (15 RPM free) as your primary LLM engine for heavy context processing.',
      'Use Groq Cloud (30 RPM free) for real-time streaming, auto-complete, and latency-sensitive UI updates.',
      'Cache repetitive prompts and sanitize input payloads to avoid hitting TPM rate thresholds.'
    ],
    sections: [
      {
        heading: '1. The Multi-Provider Routing Strategy',
        content: 'Instead of locking your backend to a single paid OpenAI API key, build a simple fallback wrapper. Route high-volume summarization to Gemini 1.5 Flash (1,500 free requests per day), real-time interactive chats to Groq LPU (free), and save reasoning queries for DeepSeek or Claude.'
      },
      {
        heading: '2. Avoiding Token Waste in System Prompts',
        content: 'Long system prompts with extensive examples burn hundreds of tokens on every single user turn. Use concise markdown formatting, strip out redundant conversational greetings, and leverage few-shot examples only when strictly required.'
      },
      {
        heading: '3. When Is It Actually Time to Upgrade?',
        content: 'Only pay for AI when your product generates commercial revenue or when you require strict SLA guarantees and private zero-data-retention compliance agreements.'
      }
    ]
  },
  {
    id: 'guide-2',
    title: 'How to Never Run Out of Free Credits on Claude & ChatGPT',
    subtitle: 'Tactics for pacing rolling reset windows and squeezing maximum value from daily caps.',
    category: 'Workflow Optimization',
    readTime: '4 min read',
    summary: 'Both ChatGPT and Claude use rolling time windows (3 to 5 hours) rather than strict calendar days. Understanding how these windows reset lets you double your effective daily output.',
    keyTakeaways: [
      'Claude resets on a 5-hour rolling timer from your first query in a session.',
      'Batch multiple related coding questions into a single structured prompt with file attachments.',
      'Use Claude Artifacts to test code locally instead of repeatedly asking the model to fix minor typos.'
    ],
    sections: [
      {
        heading: '1. The Batching Technique',
        content: 'Instead of sending 5 separate messages ("How do I fix this CSS?", "Now add a button", "Now make it dark mode"), compose one comprehensive prompt with clear numbered instructions. This burns only 1 message from your quota instead of 5.'
      },
      {
        heading: '2. Use Smaller Models for Boilerplate',
        content: 'Switch your web chat toggle to GPT-4o mini or Claude 3.5 Haiku when generating boilerplate HTML, regex, or test cases. Save your heavy Sonnet or GPT-4o quotas for architecture logic and difficult debugging.'
      }
    ]
  }
];
