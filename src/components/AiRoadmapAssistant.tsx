import React, { useState, useEffect } from 'react';
import { 
  ProjectType, 
  BudgetType, 
  ProjectRoadmap, 
  AssistantChatMessage 
} from '../types';
import { 
  AVAILABLE_SUBSCRIPTIONS, 
  INITIAL_ASSISTANT_MESSAGES, 
  generateProjectRoadmap, 
  queryAiAssistant 
} from '../data/assistantData';
import { 
  Sparkles, 
  Coins, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Lightbulb, 
  AlertTriangle, 
  Copy, 
  Check, 
  Send, 
  Bot, 
  User, 
  Layers, 
  Zap, 
  Compass,
  Download,
  Key
} from 'lucide-react';

export const AiRoadmapAssistant: React.FC = () => {
  // Setup State
  const [projectTitle, setProjectTitle] = useState('');
  const [projectType, setProjectType] = useState<ProjectType>('saas');
  const [budgetType, setBudgetType] = useState<BudgetType>('free-only');
  const [selectedSubs, setSelectedSubs] = useState<string[]>(['cursor-pro', 'claude-pro']);
  
  // Gemini API Key State (Optional for live LLM inference)
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('gemini_api_key') || '';
  });
  const [showKeyInput, setShowKeyInput] = useState(false);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
    } else {
      localStorage.removeItem('gemini_api_key');
    }
  }, [apiKey]);

  // Roadmap State
  const [roadmap, setRoadmap] = useState<ProjectRoadmap | null>(() => 
    generateProjectRoadmap('Full-Stack AI SaaS Platform', 'saas', 'free-only', [])
  );
  const [copied, setCopied] = useState(false);

  // Chat Assistant State
  const [chatMessages, setChatMessages] = useState<AssistantChatMessage[]>(INITIAL_ASSISTANT_MESSAGES);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleGenerateRoadmap = () => {
    const generated = generateProjectRoadmap(
      projectTitle,
      projectType,
      budgetType,
      budgetType === 'hybrid' ? selectedSubs : []
    );
    setRoadmap(generated);
  };

  const toggleSubscription = (id: string) => {
    setSelectedSubs(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || userInput;
    if (!messageText.trim()) return;

    const userMsg: AssistantChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: 'Just now'
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setUserInput('');
    setIsTyping(true);

    try {
      const answer = await queryAiAssistant(
        messageText,
        {
          title: projectTitle || roadmap?.title || 'AI Project',
          type: projectType,
          budget: budgetType,
          subs: selectedSubs
        },
        apiKey
      );

      const assistantMsg: AssistantChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: answer,
        timestamp: 'Just now',
        suggestedFollowUps: [
          'What are the rate limits for Gemini 1.5 Flash in AI Studio?',
          'How does Groq offer free inference?',
          'Can I deploy on Vercel without credit card?'
        ]
      };
      setChatMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error querying assistant:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const copyRoadmapToClipboard = () => {
    if (!roadmap) return;
    let md = `# Project Roadmap: ${roadmap.title}\n\n`;
    md += `**Budget Strategy**: ${roadmap.budgetType === 'free-only' ? '100% Free Credits Only' : 'Hybrid Subscription Plan'}\n`;
    md += `**Cost Estimate**: ${roadmap.totalCostEstimate}\n\n`;
    md += `## Overview\n${roadmap.summary}\n\n`;

    roadmap.phases.forEach(phase => {
      md += `### Phase ${phase.phaseNumber}: ${phase.phaseName}\n`;
      md += `*Goal: ${phase.goal}*\n\n`;
      md += `**Recommended Tools:**\n`;
      phase.recommendedTools.forEach(t => {
        md += `- **${t.name}** (${t.planType}): ${t.role} - *${t.quotaOrCost}*\n`;
      });
      md += `\n**Action Steps:**\n`;
      phase.actionSteps.forEach(s => md += `1. ${s}\n`);
      md += `\n**Credit Optimization Tips:**\n`;
      phase.creditOptimization.forEach(t => md += `- ${t}\n`);
      md += `\n---\n\n`;
    });

    md += `## 5 Golden Rules for Credit Conservation\n`;
    roadmap.goldenRules.forEach(r => md += `- ${r}\n`);

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadRoadmapFile = () => {
    if (!roadmap) return;
    let md = `# Project Roadmap: ${roadmap.title}\n\n`;
    md += `**Budget Strategy**: ${roadmap.budgetType === 'free-only' ? '100% Free Credits Only' : 'Hybrid Subscription Plan'}\n`;
    md += `**Cost Estimate**: ${roadmap.totalCostEstimate}\n\n`;
    md += `## Overview\n${roadmap.summary}\n\n`;

    roadmap.phases.forEach(phase => {
      md += `### Phase ${phase.phaseNumber}: ${phase.phaseName}\n`;
      md += `*Goal: ${phase.goal}*\n\n`;
      md += `**Recommended Tools:**\n`;
      phase.recommendedTools.forEach(t => {
        md += `- **${t.name}** (${t.planType}): ${t.role} - *${t.quotaOrCost}*\n`;
      });
      md += `\n**Action Steps:**\n`;
      phase.actionSteps.forEach(s => md += `1. ${s}\n`);
      md += `\n**Credit Optimization Tips:**\n`;
      phase.creditOptimization.forEach(t => md += `- ${t}\n`);
      md += `\n---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${roadmap.title.toLowerCase().replace(/\s+/g, '-')}-roadmap.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 text-white p-6 sm:p-10 shadow-lg">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Project &amp; Credit Roadmap Architect</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Build Your Project With Free Credits. Or Scale With Subscriptions.
          </h1>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            Generate an end-to-end phased development roadmap. If you have $0, we map every tier to generous free APIs. If you have active subscriptions, we show you how to leverage them without burning monthly caps.
          </p>
        </div>
      </div>

      {/* Interactive Project Roadmap Configurator */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm space-y-8">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-500" />
            <span>Step 1: Configure Your Project Plan</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Choose your budget strategy and target application archetype.
          </p>
        </div>

        {/* Budget Strategy Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => setBudgetType('free-only')}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
              budgetType === 'free-only'
                ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 shadow-sm'
                : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                  100% Free Credits Only ($0 Budget)
                </h3>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  Zero credit card required
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Every phase is matched with generous developer free tiers (Google AI Studio 1.5K RPD, Groq 14.4K RPD, Supabase, Vercel). Includes fallback routing so your app stays live 24/7.
            </p>
          </div>

          <div
            onClick={() => setBudgetType('hybrid')}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
              budgetType === 'hybrid'
                ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 shadow-sm'
                : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                  Hybrid: I Have Active Subscriptions
                </h3>
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                  Optimize paid plans + free tiers
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Use your paid subscriptions (Claude Pro, Cursor, ChatGPT Plus) for high-value architecture, while offloading high-volume tasks to free tiers to protect your quotas.
            </p>
          </div>
        </div>

        {/* Project Title & Archetype */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1.5">
              Project Name / Concept
            </label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="e.g. AI Customer Support SaaS, Voice Story Generator, Research PDF Summarizer..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
              Select Application Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {[
                { type: 'saas' as ProjectType, label: 'Full-Stack SaaS' },
                { type: 'mobile' as ProjectType, label: 'Mobile App' },
                { type: 'chatbot' as ProjectType, label: 'AI Agent & Chatbot' },
                { type: 'content' as ProjectType, label: 'Video & Audio' },
                { type: 'extension' as ProjectType, label: 'Browser Extension' },
                { type: 'research' as ProjectType, label: 'Research & PDF' }
              ].map(item => (
                <button
                  key={item.type}
                  onClick={() => setProjectType(item.type)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold text-center transition-all ${
                    projectType === item.type
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* If Hybrid Mode, Select Subscriptions */}
        {budgetType === 'hybrid' && (
          <div className="p-5 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-indigo-500" />
                Select Which Subscriptions You Currently Pay For:
              </span>
              <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                {selectedSubs.length} active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {AVAILABLE_SUBSCRIPTIONS.map(sub => {
                const isSelected = selectedSubs.includes(sub.id);
                return (
                  <div
                    key={sub.id}
                    onClick={() => toggleSubscription(sub.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'border-indigo-500 bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white'
                        : 'border-indigo-100/80 dark:border-indigo-900/40 bg-white/50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${
                      isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-400'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 font-bold">
                        <span>{sub.name}</span>
                        <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400">({sub.cost})</span>
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-snug mt-0.5">
                        {sub.bestUsedFor}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerateRoadmap}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white text-sm font-bold shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Custom Credit &amp; Architecture Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Generated Roadmap Presentation */}
      {roadmap && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Summary Banner */}
          <div className="rounded-3xl border border-sky-200 dark:border-sky-900/60 bg-gradient-to-br from-sky-50/70 via-white to-indigo-50/50 dark:from-sky-950/40 dark:via-gray-900 dark:to-indigo-950/30 p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-100 dark:border-sky-900/60 pb-4">
              <div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-semibold uppercase tracking-wider">
                  {roadmap.budgetType === 'free-only' ? 'Zero-Dollar Free Credit Strategy' : 'Hybrid Subscription Optimization'}
                </span>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                  {roadmap.title}
                </h2>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={copyRoadmapToClipboard}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Markdown'}</span>
                </button>

                <button
                  onClick={downloadRoadmapFile}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .md</span>
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {roadmap.summary}
            </p>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-sky-100 dark:border-gray-700 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-500 dark:text-gray-400">Total Infrastructure &amp; API Cost:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                {roadmap.totalCostEstimate}
              </span>
            </div>
          </div>

          {/* 4 Roadmap Phases */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-sky-500" />
              <span>Phased Implementation Timeline</span>
            </h3>

            <div className="grid grid-cols-1 gap-6">
              {roadmap.phases.map((phase) => (
                <div
                  key={phase.phaseNumber}
                  className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm space-y-6"
                >
                  {/* Phase Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-sky-500 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                        {phase.phaseNumber}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-gray-900 dark:text-white">
                          {phase.phaseName}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          Goal: {phase.goal}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Tool Mapping */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                      Recommended Tool Allocation &amp; Quotas:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {phase.recommendedTools.map((tool, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 text-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-900 dark:text-white">{tool.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              tool.planType === '100% Free' 
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : tool.planType === 'Subscription Plan'
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}>
                              {tool.planType}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">{tool.role}</p>
                          <div className="flex items-center justify-between pt-1 font-mono text-[11px]">
                            <span className="text-sky-600 dark:text-sky-400 font-semibold">{tool.quotaOrCost}</span>
                            <a
                              href={tool.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 inline-flex items-center gap-1"
                            >
                              <span>Official Site</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Steps */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                      Milestone Action Steps:
                    </span>
                    <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                      {phase.actionSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Credit Optimization Tips for this Phase */}
                  <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1.5">
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      Credit &amp; Token Conservation Rule:
                    </span>
                    <ul className="space-y-1 text-xs text-amber-900/90 dark:text-amber-200">
                      {phase.creditOptimization.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span>&bull;</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5 Golden Rules & Pitfalls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Golden Rules */}
            <div className="rounded-3xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-6 space-y-3">
              <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>5 Golden Rules for Credit Protection</span>
              </h4>
              <ul className="space-y-2 text-xs text-emerald-950 dark:text-emerald-200">
                {roadmap.goldenRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">&bull;</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pitfalls to Avoid */}
            <div className="rounded-3xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 p-6 space-y-3">
              <h4 className="text-sm font-bold text-rose-900 dark:text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Costly Pitfalls to Avoid</span>
              </h4>
              <ul className="space-y-2 text-xs text-rose-950 dark:text-rose-200">
                {roadmap.pitfallsToAvoid.map((pitfall, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">&bull;</span>
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Chat Assistant: "Ask the Credit Architect" */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-purple-500 text-white flex items-center justify-center font-bold shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-gray-900 dark:text-white">
                  Ask the Credit Architect
                </h3>
                {apiKey ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    <Zap className="w-3 h-3 text-emerald-500" />
                    <span>Live Gemini 1.5 Active</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                    <span>Built-In Smart Engine</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Instant advice on rate limits, model workarounds, and how to never run out of credits.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors self-start sm:self-auto"
          >
            <Key className="w-3.5 h-3.5 text-amber-500" />
            <span>{apiKey ? 'API Key Connected' : 'Connect Free Gemini Key (Optional)'}</span>
          </button>
        </div>

        {/* Optional Gemini API Key Drawer */}
        {showKeyInput && (
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-amber-600" />
                <span>Google Gemini API Key (100% Free - 1,500 requests/day):</span>
              </span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 dark:text-amber-400 font-semibold underline flex items-center gap-1"
              >
                <span>Get Free Key in 30s</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy... (stored locally in browser, never sent to third-party servers)"
                className="flex-1 px-3 py-2 rounded-xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-gray-900 font-mono text-xs outline-none focus:ring-2 focus:ring-amber-500"
              />
              {apiKey && (
                <button
                  onClick={() => setApiKey('')}
                  className="px-3 py-2 rounded-xl bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-semibold text-xs"
                >
                  Clear
                </button>
              )}
            </div>
            <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80">
              Entering a free Google AI Studio key enables real-time live LLM inference with Gemini 1.5 Flash. Leaving it blank uses our fast built-in credit intelligence engine.
            </p>
          </div>
        )}

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {[
            'How can I build a SaaS backend 100% free?',
            'I ran out of Claude Pro messages. What is the best free fallback?',
            'Best free AI image generation tools?',
            'Free AI voiceovers and sound generation?',
            'Free AI code editor alternatives to Cursor?'
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat History Box */}
        <div className="space-y-4 max-h-[450px] overflow-y-auto p-4 rounded-2xl bg-gray-50/60 dark:bg-gray-950/60 border border-gray-100 dark:border-gray-800/80">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 text-xs leading-relaxed ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="h-7 w-7 rounded-lg bg-purple-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl max-w-xl shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none whitespace-pre-line'
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="h-7 w-7 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-gray-400 italic">
              <Bot className="w-4 h-4 text-purple-500 animate-spin" />
              <span>Analyzing credit limits and generating recommendations...</span>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask anything about free quotas, pricing tricks, or project architecture..."
            className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none transition-all placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={!userInput.trim() || isTyping}
            className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiRoadmapAssistant;
