import { ProjectType, BudgetType, UserSubscription, ProjectRoadmap, AssistantChatMessage } from '../types';

export const AVAILABLE_SUBSCRIPTIONS: UserSubscription[] = [
  {
    id: 'cursor-pro',
    name: 'Cursor Pro',
    category: 'Coding & IDE',
    cost: '$20/month',
    bestUsedFor: 'Full-codebase generation, multi-file refactoring, fast agentic debugging.',
    freeAlternative: 'VS Code + GitHub Copilot Free / Continue.dev with Ollama or Google AI Studio API.'
  },
  {
    id: 'claude-pro',
    name: 'Claude Pro',
    category: 'Reasoning & Coding',
    cost: '$20/month',
    bestUsedFor: 'Complex system architecture, tricky algorithms, and long-context code reviews using Sonnet 3.5.',
    freeAlternative: 'Google AI Studio (Gemini 1.5 Pro - 2 RPM free) or DeepSeek-V3 web.'
  },
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    category: 'General Assistant',
    cost: '$20/month',
    bestUsedFor: 'Broad technical ideation, o1 reasoning on difficult logic, Canvas interactive editing.',
    freeAlternative: 'ChatGPT Free tier (GPT-4o mini unlimited) + DeepSeek-R1 free reasoning.'
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'Coding Autocomplete',
    cost: '$10/month',
    bestUsedFor: 'Inline tab autocomplete and quick workspace chat in VS Code.',
    freeAlternative: 'Supermaven Free Tier (300,000 token context) or Codeium Free.'
  },
  {
    id: 'midjourney-standard',
    name: 'Midjourney Standard',
    category: 'Image Generation',
    cost: '$30/month',
    bestUsedFor: 'High-end photorealistic branding, mascot design, and marketing hero visuals with unlimited Relax mode.',
    freeAlternative: 'Ideogram 10 free daily credits or Leonardo.Ai 150 daily free fast tokens.'
  },
  {
    id: 'elevenlabs-starter',
    name: 'ElevenLabs Starter',
    category: 'Voice & Audio',
    cost: '$5/month',
    bestUsedFor: 'Commercial ultra-realistic voice narration (30,000 characters/mo).',
    freeAlternative: 'ElevenLabs Free (10,000 characters/mo non-commercial) or Hugging Face Edge-TTS.'
  },
  {
    id: 'openai-api',
    name: 'OpenAI API (Pay-as-you-go)',
    category: 'Developer API',
    cost: 'Usage-based ($5-$50+)',
    bestUsedFor: 'Backend embedding generation (text-embedding-3-small) and production GPT-4o mini pipelines.',
    freeAlternative: 'Google AI Studio Gemini 1.5 Flash (1,500 free requests/day).'
  }
];

export const INITIAL_ASSISTANT_MESSAGES: AssistantChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'assistant',
    text: `👋 **Welcome to your AI Credit & Project Roadmap Architect!**

Whether you want to build a project with **100% Free Credits ($0 total cost)** or you have **active subscriptions** that you want to optimize without burning allowances, I will build your custom roadmap.

**What I can do for you:**
1. 🗺️ **Generate a Complete Project Roadmap**: Tailored specifically for web apps, SaaS, mobile apps, or chatbots.
2. 🪙 **Free-Tier Orchestration**: Map each development step to generous free tiers (Google AI Studio, Groq, Supabase, Vercel, DeepSeek).
3. 💳 **Subscription Optimization**: If you pay for Claude Pro, Cursor, or ChatGPT Plus, I'll show you what to build with your subscription vs. what to offload to free tiers.
4. 💡 **Credit-Saving Tactics**: Teach you prompt caching, batching, and fallback routing to never hit quota walls.

Select your project type above or ask me any question below!`,
    timestamp: 'Just now',
    suggestedFollowUps: [
      'How can I build a SaaS backend 100% free?',
      'I ran out of Claude Pro messages. What is the best free fallback?',
      'How do I build an AI chatbot without paying OpenAI API bills?'
    ]
  }
];

export function generateProjectRoadmap(
  title: string,
  projectType: ProjectType,
  budgetType: BudgetType,
  activeSubscriptions: string[]
): ProjectRoadmap {
  const isFreeOnly = budgetType === 'free-only';
  const hasCursor = activeSubscriptions.includes('cursor-pro');
  const hasClaude = activeSubscriptions.includes('claude-pro');
  const hasMidjourney = activeSubscriptions.includes('midjourney-standard');
  const hasElevenLabs = activeSubscriptions.includes('elevenlabs-starter');

  // Customize based on project type
  const typeTitles: Record<ProjectType, string> = {
    saas: 'Full-Stack AI SaaS Platform',
    mobile: 'Cross-Platform Mobile App (iOS / Android)',
    chatbot: 'Autonomous AI Agent & Support Chatbot',
    content: 'Automated Content & Media Generation Studio',
    extension: 'Browser Extension & Smart Data Assistant',
    research: 'Academic & Document Research Copilot'
  };

  const projectTitle = title.trim() || typeTitles[projectType];

  const phases = [
    {
      phaseNumber: 1,
      phaseName: 'Architecture, Wireframing & Tech Stack Strategy',
      goal: 'Define data models, API contracts, and user flows with zero initial spend.',
      recommendedTools: [
        hasClaude ? {
          name: 'Claude 3.5 Sonnet (Claude Pro)',
          role: 'System design, database schema modeling & API contract spec.',
          planType: 'Subscription Plan' as const,
          quotaOrCost: 'Included in your $20/mo plan',
          link: 'https://claude.ai/'
        } : {
          name: 'Google Gemini 1.5 Pro (Google AI Studio)',
          role: 'Comprehensive technical specification & architecture diagram design.',
          planType: '100% Free' as const,
          quotaOrCost: '2 Requests/min, 50 Requests/day (Completely free)',
          link: 'https://aistudio.google.com/'
        },
        hasMidjourney ? {
          name: 'Midjourney Standard',
          role: 'High-fidelity app mockup illustrations & mascot branding.',
          planType: 'Subscription Plan' as const,
          quotaOrCost: 'Use Relax mode to save fast GPU hours',
          link: 'https://midjourney.com/'
        } : {
          name: 'Ideogram & Leonardo.Ai',
          role: 'App logos, landing page icons, and UI aesthetic generation.',
          planType: 'Freemium' as const,
          quotaOrCost: '10 daily free credits on Ideogram + 150 daily on Leonardo',
          link: 'https://ideogram.ai/'
        }
      ],
      actionSteps: [
        'Write a detailed single-prompt System Architecture Document describing every table and endpoint.',
        'Batch all database schema questions into one prompt instead of back-and-forth micro-chats.',
        'Export frontend UI mockups and color palette tokens directly into Tailwind CSS classes.'
      ],
      creditOptimization: [
        isFreeOnly 
          ? 'Use Gemini 1.5 Flash in AI Studio for prompt drafting (15 RPM free) instead of burning limited Claude web sessions.'
          : 'Save your Claude Pro or ChatGPT Plus messages for tough architectural decisions. Use free tiers for boilerplate drafting.'
      ]
    },
    {
      phaseNumber: 2,
      phaseName: 'Core Frontend & Backend Implementation',
      goal: 'Rapidly construct the UI and server logic without burning daily quotas.',
      recommendedTools: [
        hasCursor ? {
          name: 'Cursor Pro (Composer / Agent)',
          role: 'Scaffold full multi-file components, state management, and API routes.',
          planType: 'Subscription Plan' as const,
          quotaOrCost: '500 fast requests/mo included',
          link: 'https://cursor.com/'
        } : {
          name: 'VS Code + Google Gemini Code Assist / Continue.dev',
          role: 'Full-stack development with free code assistance and terminal autocomplete.',
          planType: '100% Free' as const,
          quotaOrCost: 'Free developer tier (No credit card)',
          link: 'https://cloud.google.com/gemini'
        },
        {
          name: 'Supabase Free Tier',
          role: 'PostgreSQL database, Row Level Security, and user authentication.',
          planType: '100% Free' as const,
          quotaOrCost: '500 MB database, 50,000 monthly active users free',
          link: 'https://supabase.com/'
        }
      ],
      actionSteps: [
        'Initialize Vite React TypeScript template with Tailwind CSS for rapid component re-use.',
        'Configure Supabase client for zero-cost authentication and relational data storage.',
        'Write modular API wrapper functions that abstract LLM calls behind a unified interface.'
      ],
      creditOptimization: [
        'When using AI code assistants, provide specific files rather than entire workspace context to conserve tokens.',
        'Keep system prompts concise: eliminate conversational filler and declare strict TypeScript return types.'
      ]
    },
    {
      phaseNumber: 3,
      phaseName: 'AI Model Integration & Multi-Provider Fallback',
      goal: 'Implement intelligent AI routing so your app never crashes from rate limits or paid invoices.',
      recommendedTools: [
        {
          name: 'Google Gemini 1.5 Flash (Primary Engine)',
          role: 'Heavy text summarization, multi-turn chat, multimodal document processing.',
          planType: '100% Free' as const,
          quotaOrCost: '15 RPM, 1M TPM, 1,500 Requests/Day free forever',
          link: 'https://aistudio.google.com/'
        },
        {
          name: 'Groq Cloud (Llama 3.3 70B & 8B)',
          role: 'Ultra-fast sub-second streaming, UI autocomplete, classification tasks.',
          planType: '100% Free' as const,
          quotaOrCost: '30 RPM, 14,400 Requests/Day free quota',
          link: 'https://groq.com/'
        },
        {
          name: 'DeepSeek Platform (DeepSeek-V3 / R1)',
          role: 'Deep reasoning, math, and code synthesis fallback.',
          planType: 'Freemium' as const,
          quotaOrCost: '5 Million free tokens on signup, then $0.14/1M input',
          link: 'https://platform.deepseek.com/'
        }
      ],
      actionSteps: [
        'Build a simple cascading fallback handler: Try Gemini 1.5 Flash -> If 429 Rate Limit -> Fallback to Groq Llama 3.3 -> Fallback to DeepSeek.',
        'Enable Google AI Studio Context Caching: Save 75% on repeated prompts exceeding 32k tokens.',
        'Implement client-side caching (React Query or SWR) to prevent duplicate API queries for identical inputs.'
      ],
      creditOptimization: [
        'Never expose personal API keys to browser clients; route through a lightweight serverless proxy.',
        'Compress JSON schemas in tool calling to reduce prompt token footprint by up to 40%.'
      ]
    },
    {
      phaseNumber: 4,
      phaseName: 'Voice, Assets, Hosting & Zero-Cost Launch',
      goal: 'Deploy production infrastructure and rich assets with $0 operational bills.',
      recommendedTools: [
        hasElevenLabs ? {
          name: 'ElevenLabs Starter',
          role: 'High-definition voice narration and sound effects.',
          planType: 'Subscription Plan' as const,
          quotaOrCost: '30,000 characters/mo included',
          link: 'https://elevenlabs.io/'
        } : {
          name: 'ElevenLabs Free / Web Speech API',
          role: 'Introductory voiceovers and browser-native speech synthesis.',
          planType: '100% Free' as const,
          quotaOrCost: '10,000 free chars/mo on ElevenLabs or unlimited client Web Speech',
          link: 'https://elevenlabs.io/'
        },
        {
          name: 'Vercel / GitHub Pages',
          role: 'Edge-hosted static frontend with global CDN distribution.',
          planType: '100% Free' as const,
          quotaOrCost: '100 GB bandwidth, unlimited deployments',
          link: 'https://vercel.com/'
        },
        {
          name: 'Cloudflare Workers & D1',
          role: 'Serverless backend API routes and rate-limiting proxy.',
          planType: '100% Free' as const,
          quotaOrCost: '100,000 requests/day free',
          link: 'https://workers.cloudflare.com/'
        }
      ],
      actionSteps: [
        'Deploy the frontend to GitHub Pages or Vercel with automated CI/CD workflows.',
        'Set up Cloudflare free DDOS protection and edge response caching.',
        'Publish the downloadable Android APK (`ai-credit-guide.apk`) to GitHub Releases for direct mobile installation.'
      ],
      creditOptimization: [
        'Set up automated usage alerts in Google AI Studio to notify you before any unexpected paid threshold.',
        'Use pre-rendered static assets rather than real-time generative calls for generic marketing graphics.'
      ]
    }
  ];

  const goldenRules = isFreeOnly ? [
    'Rule 1: Always pair Google AI Studio (1,500 RPD free) with Groq Cloud (14,400 RPD free) for bulletproof redundancy.',
    'Rule 2: Batch user requests into single prompts instead of sequential micro-queries.',
    'Rule 3: Store generated responses in PostgreSQL or localStorage so you never pay twice for the same computation.',
    'Rule 4: Avoid high-temperature creative outputs when doing classification or formatting; lower temperatures reduce token looping.',
    'Rule 5: Leverage free student/education top-ups (GitHub Student Developer Pack, ElevenLabs edu grant).'
  ] : [
    'Rule 1: Use your paid subscriptions (Claude Pro / Cursor) strictly for core authoring and heavy debugging.',
    'Rule 2: Do NOT route end-user production traffic through your personal subscription accounts (avoids account suspension).',
    'Rule 3: Use free developer APIs (Google AI Studio / Groq) for your product backend while coding with Cursor.',
    'Rule 4: In Midjourney, run prompts in `/relax` mode during prototyping to preserve your Fast GPU hours for final exports.',
    'Rule 5: Take advantage of 90% prompt caching on Claude 3.5 Sonnet to cut token consumption by nine-tenths.'
  ];

  const pitfalls = [
    'Sending raw 50-page PDFs on every message without extracting relevant paragraphs first (burns 100k+ tokens instantly).',
    'Leaving API keys in public frontend code repositories.',
    'Hardcoding a single AI provider with no fallback, causing total app outage when rate limits trigger.',
    'Paying for premium monthly subscriptions before verifying whether free tiers satisfy your initial user volume.'
  ];

  return {
    id: `roadmap-${Date.now()}`,
    title: projectTitle,
    projectType,
    budgetType,
    summary: isFreeOnly 
      ? `A complete 4-phase zero-cost engineering roadmap designed to take "${projectTitle}" from concept to production without entering a single credit card.`
      : `An optimized hybrid roadmap leveraging your active subscriptions for high-impact architecture while offloading repetitive pipelines to generous free tiers.`,
    totalCostEstimate: isFreeOnly ? '$0.00 / month (100% Free Tier Supported)' : 'Covered by existing subscriptions + $0.00 extra infrastructure',
    phases,
    goldenRules,
    pitfallsToAvoid: pitfalls
  };
}

export function answerAssistantQuestion(question: string, activeSubs: string[] = []): string {
  const q = question.toLowerCase();

  if (q.includes('saas') || q.includes('backend') || q.includes('free tier') || q.includes('database')) {
    return `### 🚀 Building a Full-Stack SaaS for $0.00

You can easily run a complete production SaaS on generous developer free tiers:

1. **Frontend**: Vite + React deployed to **Vercel** or **GitHub Pages** (Free, 100 GB bandwidth).
2. **Database & Auth**: **Supabase Free Tier** (500 MB Postgres database + 50,000 monthly active users).
3. **Primary LLM Engine**: **Google AI Studio (Gemini 1.5 Flash)**
   - Quota: **15 RPM, 1,500 Requests/Day, 1M Tokens/Min** — 100% free with zero credit card required!
4. **Fast UI Streaming & Fallback**: **Groq Cloud (Llama 3.3 70B)**
   - Quota: **30 RPM, 14,400 Requests/Day** with sub-300ms latency.
5. **Serverless API**: **Cloudflare Workers** (100,000 free requests per day).

💡 **Pro Tip**: Use a simple client-side cache so repeat user queries don't consume your daily 1,500 requests!`;
  }

  if (q.includes('claude') || q.includes('ran out') || q.includes('limit') || q.includes('message cap')) {
    return `### ⏱️ How to Handle Claude Pro Message Caps & Rolling Resets

Claude uses a **5-hour rolling reset window** from the time you send your first message in a block. When you hit the limit:

1. **Best Immediate Zero-Cost Fallback**: Switch to **Google AI Studio with Gemini 1.5 Pro or Flash**.
   - Gemini 1.5 Pro has a 2M token context window and high coding reasoning, completely free for up to 50 queries/day.
2. **Second Fallback**: **DeepSeek-V3 / R1** on web (free) or API (5M tokens free).
3. **How to Double Your Claude Output**:
   - **Batch your requests**: Instead of asking 5 separate small questions, write one numbered prompt with all your requirements. That counts as only 1 message from your quota!
   - Turn off Claude web Artifacts auto-runs if you just need raw text.`;
  }

  if (q.includes('image') || q.includes('midjourney') || q.includes('dall-e') || q.includes('logo')) {
    return `### 🎨 Best Free AI Image Generation Strategies

If you don't have Midjourney or DALL-E 3:

1. **Ideogram**: Gives **10 free credits daily**. Superb at rendering legible text in logos, posters, and UI graphics.
2. **Leonardo.Ai**: Gives **150 free fast tokens every single day**. Great for game assets, app icons, and photorealistic portraits.
3. **Recraft.ai**: Generates clean vector SVG icons, 3D illustrations, and brand palettes with a daily free quota.
4. **Hugging Face Spaces**: Run open-weights models like FLUX.1 Schnell for zero cost.`;
  }

  if (q.includes('audio') || q.includes('voice') || q.includes('music') || q.includes('elevenlabs')) {
    return `### 🎙️ Free AI Voiceover & Music Generation

1. **ElevenLabs Free Tier**:
   - Gives **10,000 characters per month** (~10-12 minutes of studio-grade narration).
   - If you have an academic \`.edu\` email, you can get an extra 5,000 characters free.
2. **Browser Native Speech Synthesis (Web Speech API)**:
   - Built into all modern browsers: 100% free, unlimited, zero latency.
3. **Suno AI**:
   - 50 free credits daily (~10 songs or background jingles).
4. **Hugging Face Edge-TTS**:
   - Generates Microsoft Edge natural neural voices with zero billing.`;
  }

  if (q.includes('cursor') || q.includes('copilot') || q.includes('code') || q.includes('editor')) {
    return `### 💻 Free AI Code Editor Setup

If you don't want to pay $20/month for Cursor:

1. **Continue.dev (VS Code Extension)**:
   - Connect it to your free **Google AI Studio Gemini 1.5 Flash API key**.
   - Result: You get an in-editor AI coding assistant with 1M context window and 1,500 daily requests for **$0.00**!
2. **Supermaven Free**:
   - Lightning-fast inline autocomplete with 300,000 token context window.
3. **Codeium Free**:
   - Unlimited individual tab autocomplete across 70+ programming languages.`;
  }

  return `### 💡 AI Credit Optimization Strategy for Your Project

For your query regarding **"${question}"**:

1. **Zero-Cost Foundation**:
   - Start development using **Google AI Studio (Gemini 1.5 Flash)** which provides **1,500 requests/day completely free** with no credit card required.
   - For real-time streaming and fast responses, use **Groq Cloud (Llama 3.3 70B)** which gives you **14,400 free requests/day**.

2. **Smart Token Conservation**:
   - Strip redundant markdown greetings from your prompts.
   - Always declare explicit JSON schemas or TypeScript interfaces so the model doesn't generate lengthy unnecessary prose.
   - Cache static documents (context caching saves up to 75% on large prompts).

3. **When to Upgrade to Paid**:
   - Only pay for AI subscriptions or API credits once your project has live daily active users or generates commercial income.

Would you like me to generate a complete phased roadmap for your specific application?`;
}
