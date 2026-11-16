# Credit-guider 🪙

> **Comprehensive guide, calculator, and comparator for AI tool free tiers, developer usage quotas, and pricing models.**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🚀 Features

- **🔍 Explore 20+ Leading AI Tools**: Deep-dive breakdowns for ChatGPT, Claude, Google Gemini, Midjourney, Cursor, DeepSeek, ElevenLabs, Runway, Suno, GitHub Copilot, and more.
- **🪙 Verified Free Tiers & Credit Quotas**: Uncover exact rate limits (RPM/TPM/RPD), rolling reset windows (3-5 hr resets vs daily UTC), and what you can build without spending \$1.
- **🧮 Interactive Token & Cost Calculator**: Simulate monthly token volume, estimate API costs across models (Gemini Flash, GPT-4o Mini, Claude Sonnet, DeepSeek-V3, Groq), and see if your app is 100% covered under free tiers.
- **📖 Credit Optimization Playbooks**: Architectural strategies for multi-provider routing, context caching, prompt compression, and avoiding runaway invoices.
- **📰 Real-Time News & Credit Promos**: Track recent model releases, promotional token grants, and pricing drops across the AI ecosystem.
- **📱 Android APK Package**: Comes with a pre-packaged Android APK in `public/ai-credit-guide.apk`.
- **🌓 Dark & Light Mode**: Built-in sleek dark and light themes with system preference detection and localStorage persistence.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with PostCSS & Autoprefixer
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```text
Credit-guider/
├── public/
│   └── ai-credit-guide.apk     # Pre-packaged Android APK
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation header, tabs, theme toggle, APK link
│   │   ├── ToolCard.tsx        # Individual AI tool summary card
│   │   └── ToolDetailModal.tsx # Detailed view with quotas, plans, and tips
│   ├── data/
│   │   ├── newsData.ts         # News updates and credit guide articles
│   │   └── toolsData.ts        # Comprehensive database of 20+ AI tools
│   ├── App.tsx                 # Core application with Explore, Calculator, Guides, News
│   ├── index.css               # Tailwind CSS directives and custom styling
│   ├── main.tsx                # React root mount
│   └── types.ts                # TypeScript interfaces & types
├── .gitignore
├── index.html
├── LICENSE
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/jagadeesh-gopu/Credit-guider.git
cd Credit-guider
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
