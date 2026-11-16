import React from 'react';
import { Coins, Compass, Calculator, BookOpen, Newspaper, Moon, Sun, Download, Github } from 'lucide-react';

interface NavbarProps {
  currentTab: 'explore' | 'calculator' | 'guides' | 'news';
  setCurrentTab: (tab: 'explore' | 'calculator' | 'guides' | 'news') => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  darkMode,
  setDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div 
          onClick={() => setCurrentTab('explore')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="h-9 w-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:bg-sky-600 transition-colors">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-gray-900 dark:text-white block leading-tight">
              AI Credit Guide
            </span>
            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
              Free Tiers &amp; Pricing
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-gray-800/80 p-1 rounded-xl">
          <button
            onClick={() => setCurrentTab('explore')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'explore'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Explore Tools</span>
          </button>

          <button
            onClick={() => setCurrentTab('calculator')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'calculator'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Cost Calculator</span>
          </button>

          <button
            onClick={() => setCurrentTab('guides')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'guides'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Credit Guides</span>
          </button>

          <button
            onClick={() => setCurrentTab('news')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'news'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>News &amp; Offers</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* APK Download Button */}
          <a
            href="/ai-credit-guide.apk"
            download="ai-credit-guide.apk"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
            title="Download Android APK package"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download APK</span>
          </a>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/jagadeesh-gopu/Credit-guider"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Subnavigation */}
      <div className="flex md:hidden border-t border-gray-200 dark:border-gray-800 px-2 py-1.5 gap-1 overflow-x-auto bg-gray-50 dark:bg-gray-950">
        <button
          onClick={() => setCurrentTab('explore')}
          className={`flex-1 py-1.5 text-xs font-medium text-center rounded-md ${
            currentTab === 'explore' ? 'bg-sky-500 text-white font-semibold' : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Explore
        </button>
        <button
          onClick={() => setCurrentTab('calculator')}
          className={`flex-1 py-1.5 text-xs font-medium text-center rounded-md ${
            currentTab === 'calculator' ? 'bg-sky-500 text-white font-semibold' : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Calculator
        </button>
        <button
          onClick={() => setCurrentTab('guides')}
          className={`flex-1 py-1.5 text-xs font-medium text-center rounded-md ${
            currentTab === 'guides' ? 'bg-sky-500 text-white font-semibold' : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Guides
        </button>
        <button
          onClick={() => setCurrentTab('news')}
          className={`flex-1 py-1.5 text-xs font-medium text-center rounded-md ${
            currentTab === 'news' ? 'bg-sky-500 text-white font-semibold' : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          News
        </button>
      </div>
    </header>
  );
};
