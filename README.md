# 🎬 AI Movie Insight
### *A High-Performance, AI-Powered Cinematic Discovery Engine.*

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://moviee-insight.vercel.app/)
[![Repo](https://img.shields.io/badge/github-repo-blue.svg)](https://github.com/kavya-thakur/ai-movie-insight.git)

**AI Movie Insight** is a minimalist web application designed for instant movie archival and sentiment analysis. It prioritizes a **"Motion-First"** philosophy, ensuring every transition, theme switch, and search result feels as fluid as a high-end desktop OS.

---

## ⚡ Technical Performance Suite
Built specifically to solve the "heavy UI" problem. While most animated sites lag on mobile, this project maintains a steady 60FPS.

* **Shutter-Logic UI**: The interface dynamically locks the scroll during the "Search" state and "opens" the viewport only when data arrives.
* **GPU-Accelerated Backgrounds**: The technical grid and radial auras are offloaded to the GPU using `will-change` properties, ensuring typing remains lag-free.
* **Memoized Architecture**: Core UI components (Backgrounds, SearchHeaders) are memoized to eliminate redundant React re-renders.
* **Adaptive Grid System**: A high-visibility technical blueprint grid that automatically scales its stroke-weight for Light and Dark modes.
* **Touch-Optimized**: Implements zero-latency tap targets (`touch-manipulation`) to remove the 300ms mobile click delay.

---

## 🛠️ Tech Stack

| Tool | Usage |
| :--- | :--- |
| **Next.js** | App Router & React Server Components |
| **Framer Motion** | 60fps Physics-based Animations |
| **Tailwind CSS** | Utility-first Modern Styling |
| **Lucide React** | Minimalist Icon Set |
| **Vercel** | Edge Deployment & Hosting |

---

## 🎨 UI Features

### 🌌 Adaptive Aura
A mouse-following radial glow that shifts from soft blue (Light Mode) to crisp white (Dark Mode) based on the active theme.

### 📐 The Blueprint Grid
A persistent technical overlay providing structure and depth. The mask follows a radial gradient to keep focus on the content and maintain readability.

### 🎞️ Film Grain Overlay
A subtle SVG noise filter that gives the digital interface a physical, non-digital texture, reminiscent of traditional film.

### 🧠 AI Sentiment Synthesis
Real-time analysis of cinematic data to provide instant emotional context and an AI-generated summary of the film's registry.

---

## 🚀 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/kavya-thakur/ai-movie-insight.git](https://github.com/kavya-thakur/ai-movie-insight.git)
    cd ai-movie-insight
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root and add your API keys:
    ```env
    NEXT_PUBLIC_OMDB_API_KEY=your_omdb_key_here
    ```

4.  **Production Build**
    ```bash
    npm run build
    npm start
    ```

---

## 📱 Mobile Experience
The application is designed as a **"Single Screen App"** on mobile devices:

* **Search State**: Locked `100dvh` (Dynamic Viewport Height) to prevent the mobile address bar from jittering or cutting off the UI.
* **Archive State**: Smoothly unlocks the vertical axis once data is fetched to reveal long-form movie cards and AI summaries.

---

## 🔗 Links
* **Live Site:** [moviee-insight.vercel.app](https://moviee-insight.vercel.app/)
* **Source Code:** [github.com/kavya-thakur/ai-movie-insight](https://github.com/kavya-thakur/ai-movie-insight.git)

---
Developed by [Kavya Thakur](https://github.com/kavya-thakur)
