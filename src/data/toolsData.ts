import { AITool } from '../types';

export const AI_TOOLS_DATA: AITool[] = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    monogram: 'GM',
    category: 'AI Chatbots',
    shortDescription: 'Generous free tier with large 1M context window in Google AI Studio.',
    tagline: 'Leading multimodal model with unprecedented free API quota',
    overview: 'Google Gemini 1.5 & 2.0 offer massive multimodal capabilities (audio, video, PDF, code) with an exceptionally generous developer free tier through Google AI Studio.',
    freeTier: {
      description: 'Free access to Gemini 1.5 Flash and Pro via Google AI Studio and consumer web interface.',
      creditAmount: '15 Requests/Min (RPM), 1M Tokens/Min (TPM), 1,500 Requests/Day (RPD)',
      refreshRate: 'Daily renewal (RPD resets at midnight UTC)',
      rateLimits: '15 RPM on Flash, 2 RPM on Pro in free tier',
      whatYouCanBuild: [
        'Analyze full codebases and 1,000+ page PDF documents for free',
        'Process up to 1 hour of video footage or audio recordings',
        'Build and test production-scale apps before spending any money'
      ]
    },
    paidPlans: [
      {
        name: 'Pay-As-You-Go (AI Studio)',
        price: 'From $0.075 / 1M input tokens',
        creditsOrAllowance: 'Higher rate limits (up to 1,000 RPM)',
        keyFeatures: ['No daily cap', 'Private data processing', 'Fine-tuning access']
      },
      {
        name: 'Gemini Advanced',
        price: '$19.99 / month',
        creditsOrAllowance: 'Unlimited access to Gemini 1.5 Pro web chat',
        keyFeatures: ['2TB Google One cloud storage', 'Integration into Google Docs/Gmail']
      }
    ],
    creditOptimizationTips: [
      'Use Gemini 1.5 Flash for high-frequency tasks ($0.075/1M vs $1.25/1M on Pro)',
      'Leverage Google AI Studio free keys instead of Vertex AI for early development',
      'Use Context Caching when prompting against large repeated documents to save 75% on tokens'
    ],
    tokenPricing: {
      inputPer1M: '$0.075',
      outputPer1M: '$0.30'
    },
    verifiedStatus: 'Verified',
    lastUpdated: 'Nov 12, 2026',
    officialWebsite: 'https://aistudio.google.com/'
  },
  {
    id: 'chatgpt',
    name: 'OpenAI ChatGPT / API',
    monogram: 'OA',
    category: 'AI Chatbots',
    shortDescription: 'Default standard for LLMs with GPT-4o mini and custom GPTs.',
    tagline: 'Flagship reasoning and multimodal conversational platform',
    overview: 'ChatGPT powers hundreds of millions of daily conversations. The developer platform provides access to GPT-4o, GPT-4o mini, and o1 reasoning models with flexible usage tiers.',
    freeTier: {
      description: 'Free web chat with GPT-4o mini (unlimited) and limited GPT-4o messages.',
      creditAmount: 'Unlimited GPT-4o mini; GPT-4o resets every few hours; $0 free API credits for new accounts (must add $5 minimum)',
      refreshRate: 'Rolling 3-hour window for consumer web model tier',
      rateLimits: 'Dynamic rate limit based on server load for free tier web users',
      whatYouCanBuild: [
        'Perform daily writing, research, and coding tasks with GPT-4o mini',
        'Generate images with DALL-E 3 on web chat (limited to 2 free generations/day)',
        'Browse the web and analyze uploaded files within free limits'
      ]
    },
    paidPlans: [
      {
        name: 'ChatGPT Plus',
        price: '$20 / month',
        creditsOrAllowance: 'Extended GPT-4o & o1 preview limits',
        keyFeatures: ['DALL-E 3 image generation', 'Advanced Voice Mode', 'Custom GPT builder']
      },
      {
        name: 'API Tier 1',
        price: '$5 prepayment',
        creditsOrAllowance: '500 RPM for GPT-4o mini',
        keyFeatures: ['Access to all current OpenAI API endpoints', 'Structured outputs']
      }
    ],
    creditOptimizationTips: [
      'Default to GPT-4o-mini for 90% of tasks — it is 15x cheaper than GPT-4o with near-identical accuracy for general tasks',
      'Set hard monthly spend limits in the OpenAI billing dashboard to prevent runaway API bills',
      'Shorten system prompts and eliminate boilerplate to reduce input token consumption'
    ],
    tokenPricing: {
      inputPer1M: '$0.15',
      outputPer1M: '$0.60'
    },
    verifiedStatus: 'Verified',
    lastUpdated: 'Nov 10, 2026',
    officialWebsite: 'https://openai.com/'
  },
  {
    id: 'claude',
    name: 'Anthropic Claude',
    monogram: 'AC',
    category: 'AI Chatbots',
    shortDescription: 'Top-tier code generation and complex reasoning with Claude 3.5 Sonnet.',
    tagline: 'Precision intelligence with industry-leading code synthesis',
    overview: 'Anthropic Claude 3.5 Sonnet is recognized as one of the most accurate coding and analysis models available, featuring Artifacts for live code previews.',
    freeTier: {
      description: 'Free consumer web chat on claude.ai with daily message caps; $5 starter console credit on developer sign-up.',
      creditAmount: 'Dynamic daily message cap (approx. 20-30 messages per 5-hour window on web); $5 free console credit',
      refreshRate: '5-hour rolling reset window',
      rateLimits: 'Varies based on platform load and message length',
      whatYouCanBuild: [
        'Build interactive React components and web games in Claude Artifacts',
        'Debug complex multi-file programming problems',
        'Extract insights from long technical documents and papers'
      ]
    },
    paidPlans: [
      {
        name: 'Claude Pro',
        price: '$20 / month',
        creditsOrAllowance: '5x more usage than free tier',
        keyFeatures: ['Priority server access', 'Claude 3.5 Sonnet & Haiku access', 'Early feature access']
      },
      {
        name: 'Claude Team',
        price: '$30 / user / month (min 5 seats)',
        creditsOrAllowance: 'Higher rate limits and shared team projects',
        keyFeatures: ['Centralized billing', 'Team project sharing']
      }
    ],
    creditOptimizationTips: [
      'Use Claude 3.5 Haiku for simple extraction and classification ($0.80/1M vs $3.00/1M on Sonnet)',
      'Consolidate multiple questions into a single structured prompt to avoid burning your 5-hour message cap',
      'Enable prompt caching on the API to reduce recurring input costs by up to 90%'
    ],
    tokenPricing: {
      inputPer1M: '$3.00',
      outputPer1M: '$15.00'
    },
    verifiedStatus: 'Verified',
    lastUpdated: 'Nov 14, 2026',
    officialWebsite: 'https://claude.ai/'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek AI',
    monogram: 'DS',
    category: 'AI Chatbots',
    shortDescription: 'Ultra-low cost high intelligence with V3 & R1 reasoning models.',
    tagline: 'Disruptive price-to-performance ratio for open reasoning',
    overview: 'DeepSeek has revolutionized AI economics with DeepSeek-V3 and DeepSeek-R1, offering GPT-4 level intelligence at a fraction of competitors’ API pricing.',
    freeTier: {
      description: 'Free web chat on deepseek.com and 5 Million free tokens for new API accounts.',
      creditAmount: '5,000,000 Free API tokens valid for 30 days; free web chat',
      refreshRate: 'One-time initial grant for API; unlimited web usage during beta',
      rateLimits: 'Generous rate limits, subjected to occasional server busy periods',
      whatYouCanBuild: [
        'Complete end-to-end coding solutions and mathematical proofs',
        'Run massive batch text analysis workloads for under $1',
        'Integrate deep reasoning chains into backend services'
      ]
    },
    paidPlans: [
      {
        name: 'DeepSeek API Pay-As-You-Go',
        price: '$0.14 / 1M input tokens (cached: $0.014)',
        creditsOrAllowance: 'Uncapped API usage',
        keyFeatures: ['Cache hit rate savings up to 90%', 'DeepSeek R1 reasoning', 'V3 high-speed completion']
      }
    ],
    creditOptimizationTips: [
      'Take advantage of DeepSeek context caching: repeat calls cost only $0.014 per 1M tokens',
      'Use DeepSeek-V3 for fast general tasks and switch to DeepSeek-R1 only for rigorous math/logic proofs',
      'The web interface is 100% free with no restrictive message counters'
    ],
    tokenPricing: {
      inputPer1M: '$0.14',
      outputPer1M: '$0.28'
    },
    verifiedStatus: 'Verified',
    lastUpdated: 'Nov 15, 2026',
    officialWebsite: 'https://chat.deepseek.com/'
  },
  {
    id: 'cursor',
    name: 'Cursor Editor',
    monogram: 'CR',
    category: 'Coding',
    shortDescription: 'AI-first code editor based on VS Code with background indexing.',
    tagline: 'The leading AI development environment',
    overview: 'Cursor integrates Claude 3.5 Sonnet and GPT-4o deeply into a VS Code fork, allowing multi-file code editing, codebase chat, and speculative autocomplete.',
    freeTier: {
      description: 'Hobby plan with 2,000 free completions and 50 slow premium requests/month.',
      creditAmount: '2,000 Copilot completions + 50 slow requests on Claude 3.5 Sonnet / GPT-4o',
      refreshRate: 'Monthly renewal on the 1st of each billing cycle',
      rateLimits: 'Slow requests are queued during peak hours',
      whatYouCanBuild: [
        'Complete personal side projects and homework assignments for free',
        'Experience full codebase indexing and semantic search without paying',
        'Use Cursor Tab inline autocomplete for routine code patterns'
      ]
    },
    paidPlans: [
      {
        name: 'Cursor Pro',
        price: '$20 / month',
        creditsOrAllowance: '500 fast premium requests + unlimited slow requests',
        keyFeatures: ['Full codebase index', 'Unlimited tab completions', 'Access to Claude 3.5 Sonnet']
      },
      {
        name: 'Cursor Business',
        price: '$40 / user / month',
        creditsOrAllowance: 'Enforced privacy mode and admin dashboard',
        keyFeatures: ['Zero data retention guarantee', 'Centralized seat control']
      }
    ],
    creditOptimizationTips: [
      'Add your own Google Gemini or Anthropic API key in Cursor settings to bypass the 50-request limit completely at cost',
      'Use Cursor Tab autocomplete heavily — it does NOT consume your 50 premium request credits',
      'Keep `.cursorignore` updated to avoid wasting context tokens on `node_modules` or build artifacts'
    ],
    verifiedStatus: 'Verified',
    lastUpdated: 'Nov 11, 2026',
    officialWebsite: 'https://cursor.com/'
  },
  {
    id: 'v0',
    name: 'v0 by Vercel',
    monogram: 'V0',
    category: 'Coding',
    shortDescription: 'Generative UI system creating React & Tailwind components from prompts.',
    tagline: 'Transform natural language into production frontend interfaces',
    overview: 'v0 by Vercel allows developers to generate, iterate on, and copy copy-pasteable React, Tailwind CSS, and shadcn/ui components instantly.',
    freeTier: {
      description: 'Free tier with 200 credits monthly and 10 daily bonus credits.',
      creditAmount: '200 credits/month + up to 10 daily refresh credits',
      refreshRate: 'Monthly reset with small daily top-up',
      rateLimits: 'Standard queue execution',
      whatYouCanBuild: [
        'Generate 10-15 full UI dashboards, landing pages, or components per month',
        'Instantly export to Next.js or React code with Tailwind CSS',
        'Figma to React layout generation'
      ]
    },
    paidPlans: [
      {
        name: 'v0 Premium',
        price: '$20 / month',
        creditsOrAllowance: '5,000 credits/month',
        keyFeatures: ['Faster generations', 'Private generations', 'Figma design upload']
      }
    ],
    creditOptimizationTips: [
      'Write detailed, specific prompts initially instead of running 10 micro-refinements that burn 10 credits each',
      'Download and edit the generated code in your local editor instead of asking v0 to make trivial CSS color changes',
      'Leverage the daily bonus credits before burning into your monthly credit bucket'
    ],
    verifiedStatus: 'Verified',
    lastUpdated: 'Nov 9, 2026',
    officialWebsite: 'https://v0.dev/'
  },
  {
    id: 'groq',
    name: 'Groq Cloud',
    monogram: 'GQ',
    category: 'Coding',
    shortDescription: 'Ultra-fast LPU inference (500+ tokens/sec) with a free developer tier.',
    tagline: 'Sub-second real-time AI inference at zero initial cost',
    overview: 'Groq uses custom Language Processing Units (LPUs) to deliver blisteringly fast token generation (500-800 tok/sec) for LLaMA 3.3, Mixtral, and DeepSeek.',
    freeTier: {
      description: 'Free developer tier on Groq Cloud with generous requests/minute limits.',
      creditAmount: '30 Requests/Min (RPM) and 14,400 Requests/Day (RPD) on LLaMA 3.3 70B',
      refreshRate: 'Minute-by-minute rate limit + daily reset',
      rateLimits: '6,000 Tokens/Min on LLaMA 3.3 70B',
      whatYouCanBuild: [
        'Real-time voice and conversational bots that respond instantly',
        'High-speed document summarizers and code syntax checkers',
        'Live streaming UI assistants with zero perceived latency'
      ]
    },
    paidPlans: [
      {
        name: 'Groq On-Demand Pay-As-You-Go',
        price: '$0.59 / 1M input tokens (LLaMA 3.3 70B)',
        creditsOrAllowance: 'High-throughput commercial tier',
        keyFeatures: ['Dedicated LPU clusters', 'Higher RPM/TPM allowances']
      }
    ],
    creditOptimizationTips: [
      'Use Groq LLaMA 3.1 8B for simple summarization — it is completely free with a massive 30,000 TPM limit',
      'Groq free tier is fast enough for production prototypes with zero credit card required',
      'Pair Groq with Whisper Large V3 on Groq Cloud for instant real-time audio transcription'
    ],
    verifiedStatus: 'Verified',
    lastUpdated: 'Nov 13, 2026',
    officialWebsite: 'https://groq.com/'
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    monogram: 'EL',
    category: 'Audio & Music',
    shortDescription: 'Industry-standard AI voice synthesis and voice cloning.',
    tagline: 'Hyper-realistic synthetic voices and voice generation',
    overview: 'ElevenLabs provides lifelike text-to-speech, emotional voice cloning, and multilingual voice generation with realistic intonations.',
    freeTier: {
      description: 'Free tier with 10,000 characters per month with standard voices.',
      creditAmount: '10,000 characters/month (approx. 10-12 minutes of audio)',
      refreshRate: 'Monthly renewal on sign-up anniversary',
      rateLimits: '3 concurrent generation requests',
      whatYouCanBuild: [
        'Generate voiceovers for 3-5 YouTube shorts or Instagram reels each month',
        'Create audio samples for educational presentations or demos',
        'Test out realistic multilingual speech in 29+ languages'
      ]
    },
    paidPlans: [
      {
        name: 'Starter Plan',
        price: '$5 / month ($1 first month)',
        creditsOrAllowance: '30,000 characters/month',
        keyFeatures: ['Instant Voice Cloning', 'Commercial license rights']
      },
      {
        name: 'Creator Plan',
        price: '$22 / month ($11 first month)',
        creditsOrAllowance: '100,000 characters/month',
        keyFeatures: ['Professional Voice Cloning', 'High-quality 192kbps audio']
      }
    ],
    creditOptimizationTips: [
      'Proofread and spell-check your script completely before generating — fixing typos burns duplicate credits',
      'Use standard Eleven Multilingual v2 models instead of custom cloned voices to save quota',
      'Remove unnecessary filler words and long pauses from your text scripts'
    ],
    verifiedStatus: 'Verified',
    lastUpdated: 'Nov 8, 2026',
    officialWebsite: 'https://elevenlabs.io/'
  },
  {
    id: 'notebooklm',
    name: 'Google NotebookLM',
    monogram: 'NL',
    category: 'Research',
    shortDescription: 'Grounded research assistant with Audio Overview podcast generator.',
    tagline: 'Research notebooks with zero consumption-based credits',
    overview: 'NotebookLM by Google uses Gemini 1.5 Pro to ground all responses in your uploaded sources (PDFs, Google Docs, YouTube URLs), featuring the viral Audio Overview deep-dive podcast generator.',
    freeTier: {
      description: '100% Free with structural limits (not token/credit based).',
      creditAmount: 'Up to 50 notebooks; 50 sources per notebook (each up to 500,000 words)',
      refreshRate: 'Unlimited usage; limits are structural notebook/source capacities',
      rateLimits: 'Standard Google account quotas',
      whatYouCanBuild: [
        'Turn complex textbooks and lecture notes into a 15-minute two-host podcast',
        'Synthesize 50 research papers simultaneously with zero hallucination',
        'Create study guides, briefing docs, and FAQs from source materials'
      ]
    },
    paidPlans: [
      {
        name: 'Google Workspace Enterprise',
        price: 'Contact Sales',
        creditsOrAllowance: 'Enterprise data compliance and privacy controls',
        keyFeatures: ['Organization-level source sharing', 'HIPAA/SOC2 compliance']
      }
    ],
    creditOptimizationTips: [
      'There are NO consumption credits to worry about — you can query your sources hundreds of times without penalty',
      'Upload high-density summaries rather than raw raw scanned PDFs to keep search latency fast',
      'Generate Audio Overviews for lecture notes to study via audio on your daily commute'
    ],
    verifiedStatus: 'Verified',
    lastUpdated: 'Nov 7, 2026',
    officialWebsite: 'https://notebooklm.google.com/'
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    monogram: 'PX',
    category: 'Research',
    shortDescription: 'AI search engine providing cited, real-time answers with source links.',
    tagline: 'Where knowledge begins — cited conversational search',
    overview: 'Perplexity combines search indexing with LLMs to deliver synthesized answers with inline source citations, replacing traditional search engine keyword hunting.',
    freeTier: {
      description: 'Unlimited standard searches and 5 Pro Searches every 4 hours.',
      creditAmount: 'Unlimited Quick Search + 5 Pro (deep research) searches every 4 hours',
      refreshRate: 'Rolling 4-hour window for Pro searches',
      rateLimits: 'Standard search is unrestricted',
      whatYouCanBuild: [
        'Conduct everyday academic and market research with cited sources',
        'Fact-check technical documentation and news articles',
        'Execute up to 30 deep Pro searches per day by pacing requests across 4-hour windows'
      ]
    },
    paidPlans: [
      {
        name: 'Perplexity Pro',
        price: '$20 / month',
        creditsOrAllowance: '300+ Pro Searches per day',
        keyFeatures: ['Choose underlying model (Claude 3.5 Sonnet, GPT-4o)', 'Unlimited file uploads', '$5/month API credits']
      }
    ],
    creditOptimizationTips: [
      'Reserve your 5 Pro Searches for multi-step research questions that require code execution or web synthesis',
      'Use Quick Search for basic facts and definitions — it is completely unlimited and will never exhaust your quota',
      'If you have a student email, look out for Perplexity campus referral programs that grant free Pro months'
    ],
    verifiedStatus: 'Verified',
    lastUpdated: 'Nov 12, 2026',
    officialWebsite: 'https://perplexity.ai/'
  }
];
