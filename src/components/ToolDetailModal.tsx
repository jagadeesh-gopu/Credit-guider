import React from 'react';
import { AITool } from '../types';
import { 
  X, 
  ExternalLink, 
  Coins, 
  Sparkles, 
  CheckCircle2, 
  Lightbulb, 
  Clock, 
  ShieldCheck, 
  Zap, 
  ArrowRight 
} from 'lucide-react';

interface ToolDetailModalProps {
  tool: AITool | null;
  onClose: () => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose }) => {
  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl p-6 sm:p-8 space-y-6 text-gray-900 dark:text-gray-100"
      >
        {/* Modal Top Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-md">
              {tool.monogram}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{tool.name}</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-semibold">
                  {tool.category}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tool.tagline}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview */}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {tool.overview}
        </p>

        {/* Free Tier Breakdown Card */}
        <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50/40 dark:from-sky-950/30 dark:to-indigo-950/20 border border-sky-200 dark:border-sky-900/60 p-5 space-y-4">
          <div className="flex items-center gap-2 text-sky-900 dark:text-sky-300 font-semibold text-sm">
            <Coins className="w-4 h-4 text-amber-500" />
            <span>Free Tier &amp; Credit Allocation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-sky-100 dark:border-gray-700">
              <span className="text-gray-400 block text-[10px] uppercase">Allowance</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{tool.freeTier.creditAmount}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-sky-100 dark:border-gray-700">
              <span className="text-gray-400 block text-[10px] uppercase">Reset Policy</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{tool.freeTier.refreshRate}</span>
            </div>
          </div>

          {/* What You Can Build */}
          <div className="pt-2">
            <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>What You Can Accomplish For Free:</span>
            </h4>
            <ul className="space-y-1.5">
              {tool.freeTier.whatYouCanBuild.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Paid Plans Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Paid Tiers &amp; Commercial Pricing</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tool.paidPlans.map((plan, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40 text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 dark:text-gray-100">{plan.name}</span>
                  <span className="font-mono font-semibold text-sky-600 dark:text-sky-400">{plan.price}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400">{plan.creditsOrAllowance}</p>
                <ul className="space-y-1 pt-1 text-[11px] text-gray-600 dark:text-gray-300">
                  {plan.keyFeatures.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tips to Avoid Wasting Credits */}
        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-2">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-semibold text-xs">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>Tips to Conserve Credits &amp; Avoid Runaway Invoices:</span>
          </div>
          <ul className="space-y-1.5 text-xs text-amber-900/90 dark:text-amber-200/90">
            {tool.creditOptimizationTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">&bull;</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Verified from Official Docs as of {tool.lastUpdated}</span>
          </div>

          <a
            href={tool.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <span>Visit Official Pricing Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
