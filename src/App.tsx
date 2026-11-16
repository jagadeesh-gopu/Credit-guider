import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ToolCard } from './components/ToolCard';
import { ToolDetailModal } from './components/ToolDetailModal';
import { AI_TOOLS_DATA } from './data/toolsData';
import { NEWS_OFFERS_DATA, CREDIT_GUIDE_ARTICLES } from './data/newsData';
import { AITool, ToolCategory } from './types';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Coins, 
  Calculator, 
  ExternalLink, 
  BookOpen, 
  Newspaper, 
  CheckCircle2, 
  TrendingDown, 
  Sliders, 
  ArrowRight,
  Download,
  Github
} from 'lucide-react';

const CATEGORIES: ToolCategory[] = [
  'All',
  'AI Chatbots',
  'Coding',
  'Image Generation',
  'Video Generation',
  'Audio & Music',
  'Productivity',
  'Research'
];

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'explore' | 'calculator' | 'guides' | 'news'>('explore');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('All');
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);

  // Calculator State
  const [calcModel, setCalcModel] = useState('gemini-flash');
  const [dailyPrompts, setDailyPrompts] = useState(100);
  const [avgTokensPerPrompt, setAvgTokensPerPrompt] = useState(1200);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Filter tools
  const filteredTools = AI_TOOLS_DATA.filter((tool) => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      tool.name.toLowerCase().includes(q) ||
      tool.shortDescription.toLowerCase().includes(q) ||
      tool.tagline.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.freeTier.creditAmount.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // Calculator calculations
  const monthlyPrompts = dailyPrompts * 30;
  const monthlyTokens = monthlyPrompts * avgTokensPerPrompt;
  const monthlyTokensInM = monthlyTokens / 1_000_000;

  const modelRates: Record<string, { name: string; freeTierCap: number; pricePer1M: number; provider: string; note: string }> = {
    'gemini-flash': {
      name: 'Google Gemini 1.5 Flash',
      freeTierCap: 45_000_000, // 1.5K RPD * avg tokens
      pricePer1M: 0.075,
      provider: 'Google AI Studio',
      note: 'Generous 1,500 free requests per day, 15 RPM.'
    },
    'gpt-4o-mini': {
      name: 'OpenAI GPT-4o Mini',
      freeTierCap: 0,
      pricePer1M: 0.15,
      provider: 'OpenAI API',
      note: 'Web tier is free, API is pay-as-you-go.'
    },
    'claude-3-5-sonnet': {
      name: 'Anthropic Claude 3.5 Sonnet',
      freeTierCap: 0,
      pricePer1M: 3.00,
      provider: 'Anthropic API',
      note: 'Frontier reasoning model with 90% prompt caching discount.'
    },
    'deepseek-v3': {
      name: 'DeepSeek-V3',
      freeTierCap: 5_000_000,
      pricePer1M: 0.14,
      provider: 'DeepSeek Platform',
      note: 'New signups receive 5M tokens free.'
    },
    'groq-llama': {
      name: 'Groq Cloud (Llama 3.3 70B)',
      freeTierCap: 30_000_000,
      pricePer1M: 0.59,
      provider: 'Groq Cloud',
      note: 'High-speed free tier up to 30 RPM and 14,400 RPD.'
    }
  };

  const selectedModelInfo = modelRates[calcModel];
  const calculatedMonthlyCost = (monthlyTokensInM * selectedModelInfo.pricePer1M).toFixed(2);
  const fitsInFreeTier = monthlyTokens <= selectedModelInfo.freeTierCap;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* TAB 1: EXPLORE TOOLS */}
        {currentTab === 'explore' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500/10 via-indigo-500/5 to-purple-500/10 border border-sky-100 dark:border-sky-900/40 p-6 sm:p-10">
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-900">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Free Tier Limits &amp; Pricing 2026</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                  Know Before You Spend.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400">
                    Which AI Tools Are Truly Free.
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  Verified free-tier quotas, reset schedules, paid plan rates, and smart token-saving tactics. Every number links directly to official provider documentation.
                </p>

                {/* Quick Stats Bar */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-amber-500" />
                    <span><strong>{AI_TOOLS_DATA.length}</strong> Tools Reviewed</span>
                  </div>
                  <span className="text-gray-300 dark:text-gray-700">&bull;</span>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Official Pricing Verified</span>
                  </div>
                  <span className="text-gray-300 dark:text-gray-700">&bull;</span>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-sky-500" />
                    <span>Zero Ad Bias</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Category Filter */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools (e.g. Gemini, ChatGPT, Claude, Cursor, free credits)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tool Cards Grid */}
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onSelect={(t) => setSelectedTool(t)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8">
                <Coins className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">No tools found</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Try adjusting your search query or switching categories.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: COST CALCULATOR */}
        {currentTab === 'calculator' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Cost &amp; Free Quota Simulator</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                AI Token &amp; Credit Cost Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Estimate your monthly token consumption and check whether your workload is covered 100% free.
              </p>
            </div>

            {/* Calculator Card */}
            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm space-y-6">
              {/* Model Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Select AI Model
                </label>
                <select
                  value={calcModel}
                  onChange={(e) => setCalcModel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-sm font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                >
                  <option value="gemini-flash">Google Gemini 1.5 Flash ($0.075 / 1M)</option>
                  <option value="gpt-4o-mini">OpenAI GPT-4o Mini ($0.15 / 1M)</option>
                  <option value="deepseek-v3">DeepSeek-V3 ($0.14 / 1M)</option>
                  <option value="groq-llama">Groq Cloud Llama 3.3 70B ($0.59 / 1M)</option>
                  <option value="claude-3-5-sonnet">Claude 3.5 Sonnet ($3.00 / 1M)</option>
                </select>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 italic">
                  {selectedModelInfo.provider}: {selectedModelInfo.note}
                </p>
              </div>

              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-2">
                    <span>Daily Prompts / API Calls:</span>
                    <span className="font-mono text-sky-600 dark:text-sky-400">{dailyPrompts.toLocaleString()} calls/day</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="2000"
                    step="10"
                    value={dailyPrompts}
                    onChange={(e) => setDailyPrompts(Number(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-2">
                    <span>Average Tokens Per Call (Prompt + Output):</span>
                    <span className="font-mono text-sky-600 dark:text-sky-400">{avgTokensPerPrompt.toLocaleString()} tokens</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="8000"
                    step="100"
                    value={avgTokensPerPrompt}
                    onChange={(e) => setAvgTokensPerPrompt(Number(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>Quick chat (~500 tokens)</span>
                    <span>Document review (~2.5K tokens)</span>
                    <span>Full code analysis (~8K tokens)</span>
                  </div>
                </div>
              </div>

              {/* Output Result Box */}
              <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-sky-50/50 dark:from-gray-800/80 dark:to-sky-950/30 border border-sky-100 dark:border-sky-900/60 p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-xs border border-gray-100 dark:border-gray-700">
                    <span className="text-[10px] uppercase font-mono text-gray-400 block">Monthly Prompts</span>
                    <span className="text-base font-bold text-gray-900 dark:text-white font-mono">{monthlyPrompts.toLocaleString()}</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-xs border border-gray-100 dark:border-gray-700">
                    <span className="text-[10px] uppercase font-mono text-gray-400 block">Monthly Tokens</span>
                    <span className="text-base font-bold text-gray-900 dark:text-white font-mono">{(monthlyTokensInM).toFixed(2)}M</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-xs border border-gray-100 dark:border-gray-700">
                    <span className="text-[10px] uppercase font-mono text-gray-400 block">Estimated Paid Cost</span>
                    <span className="text-base font-bold text-sky-600 dark:text-sky-400 font-mono">${calculatedMonthlyCost}</span>
                  </div>
                </div>

                {/* Free Tier Feasibility Banner */}
                {selectedModelInfo.freeTierCap > 0 ? (
                  fitsInFreeTier ? (
                    <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <strong className="block">100% Covered by Free Tier!</strong>
                        <span>Your monthly workload of {(monthlyTokensInM).toFixed(2)}M tokens is within the provider's free quota (up to {(selectedModelInfo.freeTierCap / 1_000_000).toFixed(0)}M tokens/mo). You pay $0.00!</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-amber-100/70 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-xs">
                      <TrendingDown className="w-5 h-5 text-amber-600 shrink-0" />
                      <div>
                        <strong className="block">Exceeds Free Tier Limits</strong>
                        <span>Workload exceeds the {(selectedModelInfo.freeTierCap / 1_000_000).toFixed(0)}M token free cap. Paid usage will cost approximately <strong>${calculatedMonthlyCost}/month</strong>.</span>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-sky-100/70 dark:bg-sky-950/50 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800 text-xs">
                    <Coins className="w-5 h-5 text-sky-600 shrink-0" />
                    <div>
                      <strong className="block">Pure Pay-As-You-Go API</strong>
                      <span>Estimated monthly cost: <strong>${calculatedMonthlyCost}</strong> on standard pay-as-you-go billing.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GUIDES */}
        {currentTab === 'guides' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Credit Optimization Engineering</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                AI Credit &amp; Free Tier Guides
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Actionable engineering playbooks to stretch credits and build production apps for zero dollars.
              </p>
            </div>

            <div className="space-y-6">
              {CREDIT_GUIDE_ARTICLES.map((article) => (
                <article
                  key={article.id}
                  className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm space-y-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-semibold">
                        {article.category}
                      </span>
                      <span className="text-gray-400">{article.readTime}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                      {article.subtitle}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {article.summary}
                  </p>

                  {/* Key Takeaways */}
                  <div className="rounded-2xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/50 p-4 space-y-2">
                    <span className="text-xs font-bold text-sky-900 dark:text-sky-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                      Key Principles:
                    </span>
                    <ul className="space-y-1.5 text-xs text-sky-950 dark:text-sky-200">
                      {article.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sections */}
                  <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                    {article.sections.map((section, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {section.heading}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: NEWS & OFFERS */}
        {currentTab === 'news' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-900">
                <Newspaper className="w-3.5 h-3.5" />
                <span>Real-Time Model Updates</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Latest Free Tiers, Promos &amp; Price Cuts
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Curated tracking of AI model announcements, token promotions, and free credit policy changes.
              </p>
            </div>

            <div className="space-y-4">
              {NEWS_OFFERS_DATA.map((news) => (
                <div
                  key={news.id}
                  className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 sm:p-6 shadow-sm hover:border-sky-500/40 transition-colors space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        news.category === 'Model Release' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300' :
                        news.category === 'Credit Update' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                        news.category === 'Price Drop' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                      }`}>
                        {news.category}
                      </span>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{news.source}</span>
                    </div>
                    <span className="text-xs font-mono text-gray-400">{news.date} ({news.daysAgo}d ago)</span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {news.title}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {news.summary}
                  </p>

                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 text-xs flex items-start gap-2">
                    <Coins className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 dark:text-gray-100 block mb-0.5">Impact on Free Tier:</strong>
                      <span className="text-gray-600 dark:text-gray-400">{news.impactOnFreeTier}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <a
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      <span>Read Official Announcement</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-8 text-xs text-gray-500 dark:text-gray-400 transition-colors mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="font-bold text-gray-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
              <Coins className="w-4 h-4 text-sky-500" />
              <span>Credit Guider</span>
            </div>
            <p className="text-[11px] mt-0.5">
              Independent guide to AI model quotas, free tiers, and pricing models.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href="https://github.com/jagadeesh-gopu/Credit-guider" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a 
              href="/ai-credit-guide.apk" 
              download="ai-credit-guide.apk"
              className="hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Android APK</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      <ToolDetailModal
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
      />
    </div>
  );
};

export default App;
