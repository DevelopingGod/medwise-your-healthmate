# MedWise: Your Healthmate

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3_70B-orange)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

> AI-powered personalized medicine guidance across allopathic, homeopathic, and ayurvedic treatment tracks.

🌐 **Live:** [medwise-your-healthmate.vercel.app](https://medwise-your-healthmate.vercel.app/)

---

## About The Project

MedWise was originally conceived and built in 2023 as a rule-based medical chatbot. The system used a bag-of-words NLP model (Python, NLTK, PyTorch) with a decision-tree intent classifier to match user symptoms to pre-defined medicine recommendations. The original system was peer-reviewed and published at IRJET (International Research Journal of Engineering and Technology, Vol. 10, Issue 2, February 2023).

The rule-based approach had a fundamental limitation — it had no real conversation state. The "guided conversation" was an illusion: the model had no memory, could not handle variations in phrasing, and failed silently when user input didn't match a trained pattern. Medicine recommendations were fully hardcoded with no personalization beyond weight brackets.

In May 2026, the project was completely rebuilt from the ground up. The Python/Flask backend was replaced with Next.js 16 API routes. The decision tree was replaced with Groq's LLaMA 3.3 70B model, given a medically-curated system prompt built from the original knowledge base. The result is a fully conversational, streaming AI assistant that personalizes every recommendation to the user's age, weight, and treatment philosophy preference.

---

## Features

- ✅ Three treatment tracks: Allopathic, Homeopathic, Ayurvedic
- ✅ Personalized recommendations by age, weight, and symptom duration
- ✅ Real-time streaming responses (no waiting for full response)
- ✅ Tiered emergency detection — redirects to 112 for cardiac/stroke symptoms
- ✅ Intelligent GERD vs cardiac chest pain differentiation
- ✅ 15+ medical conditions covered with curated knowledge base
- ✅ Dark mode with system preference detection
- ✅ Fully stateless — zero user data stored or transmitted
- ✅ No account required
- ✅ Mobile responsive with hamburger navigation
- ✅ Custom palette scrollbar and smooth animations
- ✅ Research-backed — originally published at IRJET 2023

---

## Architecture

### Evolution: 2023 → 2026

| Component | 2023 (Original) | 2026 (Rebuilt) |
|---|---|---|
| Language | Python 3.7 | TypeScript 5 |
| Framework | Flask | Next.js 16 (App Router) |
| Frontend | Plain HTML/CSS/JS | React 19 + Tailwind CSS |
| AI Engine | NLTK + PyTorch (bag-of-words) | Groq LLaMA 3.3 70B |
| Conversation | Stateless intent matching | Full context window |
| Personalization | Weight brackets only | Age + weight + preference |
| Deployment | Local only | Vercel Edge Functions |
| Response time | Instant (rule lookup) | ~1-2s (LLM streaming) |
| Knowledge base | 18 hardcoded intents | 15+ conditions, all 3 tracks |

### Current System Flow

```
User fills IntakeForm (age, weight, preference)
↓
Next.js chat page — useChat hook (@ai-sdk/react)
↓
POST /api/chat — Edge Function
↓
buildSystemPrompt() — injects user profile +
full medical knowledge base into system prompt
↓
Groq API — LLaMA 3.3 70B (streaming)
↓
TextStreamChatTransport — streams tokens to UI
↓
ChatMessage — renders markdown with ReactMarkdown
```

---

## Tech Stack

### Frontend
- **Next.js 16** — App Router, server components, Edge runtime
- **React 19** — Client components, hooks
- **TypeScript 5** — Full type safety
- **Tailwind CSS** — Utility-first styling
- **react-markdown** — Markdown rendering in chat

### AI & Streaming
- **Groq API** — LLaMA 3.3 70B Versatile model
- **Vercel AI SDK v6** — Streaming, useChat hook, TextStreamChatTransport
- **@ai-sdk/groq** v3 — Groq provider for AI SDK

### Infrastructure
- **Vercel** — Hosting, Edge Functions, CI/CD
- **GitHub** — Source control, auto-deploy on push

### Legacy Stack (2023, archived)
- Python 3.7, Flask, NLTK, PyTorch 1.13
- Bag-of-words intent classifier
- Linear neural network (3 layers, ReLU)
- Plain HTML/CSS/JavaScript frontend

---

## Project Structure

```
medwise/
├── app/
│   ├── api/chat/route.ts      # Groq streaming endpoint
│   ├── chat/page.tsx          # Chat interface (2 states)
│   ├── about/page.tsx         # Disclaimer & about
│   ├── team/page.tsx          # Developer profile
│   ├── why-medwise/page.tsx   # Comparison & timeline
│   ├── layout.tsx             # Root layout + fonts
│   ├── globals.css            # Design tokens + animations
│   └── page.tsx               # Landing page
├── components/
│   ├── ChatInput.tsx          # Textarea + send button
│   ├── ChatMessage.tsx        # Message bubble + markdown
│   ├── DisclaimerBanner.tsx   # Always-visible warning
│   ├── EmergencyAlert.tsx     # Red alert for emergencies
│   ├── Footer.tsx             # Site footer
│   ├── IntakeForm.tsx         # Age/weight/preference form
│   ├── Navbar.tsx             # Nav + hamburger + theme
│   ├── ThemeProvider.tsx      # Dark mode context
│   ├── ThemeToggle.tsx        # Light/dark toggle button
│   └── TreatmentBadge.tsx    # Track indicator pill
├── lib/
│   └── systemPrompt.ts        # Builds Groq system prompt
├── types/
│   └── index.ts               # UserProfile, Treatment types
└── .env.local                 # GROQ_API_KEY (never commit)
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Groq API key — free at [console.groq.com](https://console.groq.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/DevelopingGod/medwise-your-healthmate.git

# Navigate to the Next.js app
cd medwise-your-healthmate/medwise

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Add your Groq API key to .env.local
```

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | ✅ Yes | Groq API key from console.groq.com |

### Run Locally

```bash
npm run dev
# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## Deployment

Deployed on Vercel with GitHub integration.

**Key Vercel settings:**
- Root Directory: `medwise`
- Framework: Next.js (auto-detected)
- Runtime: Edge (for streaming support)
- Auto-deploy: on every push to `main`

**Environment variable required in Vercel dashboard:**

```
GROQ_API_KEY = your_groq_api_key
```

---

## Medical Disclaimer

> MedWise: Your Healthmate is designed to provide general health information and guidance only.
> It is **not** a substitute for professional medical advice, diagnosis, or treatment.
>
> Always consult a qualified healthcare provider before taking any medication. In emergencies, call **112** immediately.

---

## Research Publication

The original MedWise system was peer-reviewed and published at:

**IRJET — International Research Journal of Engineering and Technology**  
Volume 10, Issue 2 | February 2023

📄 [Read the Published Paper](https://www.irjet.net/archives/V10/i2/IRJET-V10I208.pdf)

---

## Developer

**Sankalp Indish**  
AI Engineer · Full Stack Developer  
IEEE Member · ID: 100397836

*Transmuting raw logic into agentic wonders since 2023.*
