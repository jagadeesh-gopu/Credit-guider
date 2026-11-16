import React from 'react';
import { AITool } from '../types';
import { Coins, ShieldCheck, ShieldAlert, ArrowRight, Clock } from 'lucide-react';

interface ToolCardProps {
  tool: AITool;
  onSelect: (tool: AITool) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(tool)}
      className="group cursor-pointer rounded-2xl border border-gray-200/90 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm hover:shadow-md hover:border-sky-500/50 dark:hover:border-sky-500/40 transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
              {tool.monogram}
            </div>
            <div>
              <h3 className="font-semibold text-base text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors flex items-center gap-1.5">
                <span>{tool.name}</span>
              </h3>
              <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {tool.category}
              </span>
            </div>
          </div>

          <div className="text-gray-300 dark:text-gray-700 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {tool.shortDescription}
        </p>

        {/* Free Tier Highlight Box */}
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 p-3 border border-gray-100 dark:border-gray-800 mb-4">
          <div className="flex items-start gap-2">
            <Coins className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-snug">
              <span className="font-semibold text-gray-900 dark:text-gray-200 block mb-0.5">
                Free Quota &amp; Limits:
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {tool.freeTier.creditAmount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[11px]">
        {tool.verifiedStatus === 'Verified' ? (
          <span className="inline-flex items-center gap-1 font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900/50">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/50">
            <ShieldAlert className="w-3 h-3" />
            <span>Partly verified</span>
          </span>
        )}

        <div className="flex items-center gap-1 text-gray-400 font-mono">
          <Clock className="w-3 h-3" />
          <span>{tool.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};
