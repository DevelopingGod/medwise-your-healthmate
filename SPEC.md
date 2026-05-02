# SPEC.md — MedWise Next.js Rebuild

## 1. PROJECT PURPOSE

MedWise is a symptom-based medicine recommendation chatbot for common, non-emergency ailments. It is aimed at individuals seeking quick first-aid guidance or OTC medicine suggestions before or instead of visiting a doctor.

**What it does:**
- Accepts user age, weight (kg), and treatment preference (Allopathic / Homeopathic / Ayurvedic) upfront via an intake form
- Conducts a natural conversational intake to understand symptoms, duration, and severity
- Recommends specific medicines and dosages from the curated legacy knowledge base (legacy-logic.md)
- Applies weight-based and age-based dosage rules for applicable conditions (Allopathic Cold)
- Refuses to recommend for emergencies and conditions outside its knowledge base
- Appends a medical disclaimer to every recommendation

**What it does not do:**
- Diagnose diseases
- Replace a doctor
- Store user data of any kind
- Handle emergencies (routes to emergency services instead)

**Target users:** General public in India/South Asia seeking accessible first-aid and OTC medicine guidance for mild, common ailments — colds, coughs, headaches, fever, diarrhea, abrasions, stings, insect bites, sore throat, eye injuries, fainting.

---

## 2. TARGET TECH STACK

All versions are exact — use these when installing.

```
next@16.2.4
react@latest
react-dom@latest
typescript@latest
tailwindcss@latest
postcss@latest
autoprefixer@latest
ai@6.0.174
@ai-sdk/groq@3.0.38
react-markdown@latest
```

Dev dependencies:
```
@types/node@latest
@types/react@latest
@types/react-dom@latest
eslint@latest
eslint-config-next@latest
```

Install command:
```bash
npx create-next-app@16.2.4 medwise --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
cd medwise
npm install ai@6.0.174 @ai-sdk/groq@3.0.38 react-markdown@latest
```

---

## 3. PROJECT STRUCTURE

```
medwise/
├── app/
│   ├── layout.tsx               # Root layout — font, metadata, global nav
│   ├── page.tsx                 # Landing page (/)
│   ├── globals.css              # Tailwind base imports
│   ├── chat/
│   │   └── page.tsx             # Chat interface (/chat)
│   └── about/
│       └── page.tsx             # About / disclaimer page (/about)
├── app/api/
│   └── chat/
│       └── route.ts             # POST /api/chat — Groq streaming endpoint
├── components/
│   ├── Navbar.tsx               # Top navigation bar
│   ├── IntakeForm.tsx           # Age / weight / treatment preference form
│   ├── ChatWindow.tsx           # Scrollable message history container
│   ├── ChatMessage.tsx          # Single message bubble (user or bot)
│   ├── ChatInput.tsx            # Text input + send button
│   ├── DisclaimerBanner.tsx     # Sticky disclaimer shown at all times in /chat
│   ├── TreatmentBadge.tsx       # Pill badge showing active treatment track
│   └── EmergencyAlert.tsx       # Full-width red alert shown for emergency triggers
├── lib/
│   ├── systemPrompt.ts          # Builds the full Groq system prompt from intake data
│   └── types.ts                 # Shared TypeScript types
├── public/
│   └── favicon.ico
├── .env.local                   # GROQ_API_KEY (never committed)
├── .env.example                 # Template for .env.local
├── next.config.js               # Next.js config
├── tailwind.config.ts           # Tailwind config
└── tsconfig.json
```

---

## 4. CORE USER FLOW

**Step 1 — Landing page (`/`)**
User arrives at the landing page. They see MedWise branding, a brief description of what the bot does, and a prominent CTA button: "Start Consultation". Below the fold: three treatment track cards (Allopathic, Homeopathic, Ayurvedic) with short descriptions.

**Step 2 — Intake form (rendered inside `/chat` before conversation starts)**
Before the chat interface appears, the user must complete a short form:
- Age (number input, required, 1–120)
- Weight in kg (number input, required, 1–200)
- Treatment preference (radio buttons: Allopathic / Homeopathic / Ayurvedic)

Submitting the form hides the form, reveals the chat interface, and pre-populates the system prompt with age, weight, and treatment preference.

**Step 3 — Symptom conversation**
The bot greets the user and asks what symptom they are experiencing today. The user describes their symptom in natural language. The LLM asks follow-up questions (duration, severity) as needed to narrow down the recommendation. The conversation is multi-turn.

**Step 4 — Recommendation**
The bot returns a specific recommendation from the legacy knowledge base, formatted clearly with:
- Medicine name
- Dosage and frequency
- Duration
- Any age/weight-specific warnings (no aspirin under 18, no ibuprofen for kidney/heart failure, no honey for infants)

**Step 5 — Disclaimer**
Every message containing a medicine recommendation must end with the standard disclaimer (see Section 12). The DisclaimerBanner is also always visible at the top of the chat window as a persistent reminder.

**Step 6 — Follow-up or end**
User can ask about a different symptom, ask for clarification, or close the chat. No session data is saved — refreshing the page resets everything.

---

## 5. PAGES

### `/` — Landing Page

**Sections (top to bottom):**

1. **Hero section**
   - Headline: "MedWise — Your Healthmate"
   - Subheadline: "Get instant first-aid guidance and OTC medicine suggestions for common ailments."
   - CTA button: "Start Consultation" → navigates to `/chat`
   - Secondary link: "Learn more" → scrolls to features section

2. **Features / treatment tracks section**
   - Three cards side by side (or stacked on mobile):
     - Allopathic — "Evidence-based OTC medicines for fast relief"
     - Homeopathic — "Natural remedies aligned with homeopathic principles"
     - Ayurvedic — "Traditional Indian herbal and natural remedies"
   - Each card has an icon and 2-sentence description

3. **Conditions covered section**
   - Grid of condition tags: Cold, Cough, Fever, Headache, Sore Throat, Diarrhea, Abrasions, Stings, Insect Bites, Eye Injury, Fainting, Heat Stroke

4. **Disclaimer footer callout**
   - Short box: "MedWise is for informational purposes only. Always consult a qualified healthcare provider."
   - Link to `/about` for full disclaimer

5. **Navbar** (persistent)
   - Logo/name: MedWise
   - Links: Home, About
   - CTA button: "Start Consultation"

### `/chat` — Chat Interface

**Layout:** Two-column on desktop (sidebar + chat), single column on mobile.

**Elements:**

- `DisclaimerBanner` — fixed at top of chat area, always visible, not dismissible
- `TreatmentBadge` — shows the active treatment track selected in intake form (e.g., "Allopathic")
- `IntakeForm` — shown before conversation starts; hidden once submitted
- `ChatWindow` — scrollable message history, auto-scrolls to latest message
- `ChatMessage` — each message rendered as a bubble; user messages right-aligned (blue), bot messages left-aligned (white/gray with MedWise avatar); bot responses rendered via `react-markdown` (bold medicine names, numbered lists, line breaks)
- `ChatInput` — fixed at bottom; text input + send button; disabled while streaming
- Loading indicator — animated dots shown while bot is generating
- `EmergencyAlert` — rendered as a full-width red banner above the chat when the LLM response contains an emergency keyword (defined below)
- `Navbar` on `/chat` includes a mobile hamburger menu — collapses nav links into a dropdown on screens below `md` breakpoint

**Emergency trigger keywords** (checked client-side in the response stream):
`"call emergency"`, `"go to hospital"`, `"call 911"`, `"call 112"`, `"emergency services"`

When triggered, `EmergencyAlert` renders: "⚠️ This may be a medical emergency. Please call emergency services (112) or go to your nearest hospital immediately."

### `/about` — Disclaimer Page

**Content requirements:**

1. Full disclaimer text:
   > "These recommendations are for informational purposes only and are not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider before taking any medicine. MedWise does not diagnose diseases, prescribe medicine, or replace a licensed medical professional."

2. What MedWise covers — list of conditions from legacy-logic.md

3. What MedWise does NOT cover — complex diagnoses, chronic conditions, prescription medications, emergencies

4. Data privacy statement: "MedWise does not collect, store, or transmit any personal data. All conversations are stateless and are not saved."

5. Credits: original knowledge base sourced from legacy first-aid guidelines

---

## 6. API ROUTES

### `POST /api/chat`

**File:** `app/api/chat/route.ts`

**Runtime:** Edge (`export const runtime = 'edge'`)

**Request body:**
```typescript
{
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
  intakeData: {
    age: number;
    weight: number;           // in kg
    treatmentPreference: "allopathic" | "homeopathic" | "ayurvedic";
  };
}
```

**Response:** Server-sent event stream (text/event-stream) using Vercel AI SDK `streamText`. The response streams tokens as they are generated by Groq.

**Implementation pattern:**
```typescript
import { createGroq } from '@ai-sdk/groq'
import { streamText } from 'ai'

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY })

export const runtime = 'edge'
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, userProfile } = await req.json()

  const result = await streamText({
    model: groq('llama-3.3-70b-versatile'),
    system: SYSTEM_PROMPT,
    messages,
  })

  return result.toDataStreamResponse()
}
```

Note: `toDataStreamResponse()` is correct in AI SDK v6. The `groq` client is instantiated at module level (outside the handler). Request body uses `userProfile` — not `intakeData`. `SYSTEM_PROMPT` is a module-level constant built from `userProfile` before being passed to `streamText`.

**Error handling:**
- Missing `GROQ_API_KEY` → return 500 with `{ error: "Configuration error" }`
- Groq API failure → return 502 with `{ error: "Upstream API error" }`
- Invalid request body → return 400 with `{ error: "Invalid request" }`

**Rate limiting:** None in v1. Vercel's default edge function limits apply.

---

## 7. GROQ SYSTEM PROMPT SPECIFICATION

**File:** `lib/systemPrompt.ts`

**Function signature:**
```typescript
export function buildSystemPrompt(intake: {
  age: number;
  weight: number;
  treatmentPreference: "allopathic" | "homeopathic" | "ayurvedic";
}): string
```

The function returns a complete system prompt string interpolated with the user's intake data. The prompt must contain all sections below verbatim or as close as practical.

---

**Full system prompt template:**

```
You are MedWise, a helpful medical first-aid assistant. You recommend OTC medicines and home remedies for common, mild ailments only.

USER PROFILE (collected before this conversation started):
- Age: {age} years
- Weight: {weight} kg
- Treatment preference: {treatmentPreference}

CONVERSATION RULES:
1. Greet the user warmly and ask what symptom they are experiencing today.
2. Ask follow-up questions naturally — one question at a time — to clarify symptom duration and severity before recommending.
3. For Allopathic Cold: always ask duration (recently/today, since few days, since last month) and then apply weight-based dosage from the knowledge base below.
4. Always use the user's weight ({weight} kg) to select the correct dosage tier — do not ask for weight again.
5. Always use the user's treatment preference ({treatmentPreference}) — do not offer alternatives unless the user asks.
6. Every response that includes a medicine recommendation MUST end with this exact disclaimer:
   "⚠️ Disclaimer: These recommendations are for informational purposes only and are not a substitute for professional medical advice. Always consult a qualified healthcare provider before taking any medicine."
7. Keep responses concise and clear. Use numbered lists for multi-step instructions.
8. Do not recommend medicines for conditions lasting beyond the durations listed in the knowledge base.
9. If a condition is not in your knowledge base, say: "This is beyond what I can safely recommend. Please consult a doctor."
10. Refuse all off-topic requests (coding help, general knowledge, creative writing, etc.) with: "I'm MedWise, a medical first-aid assistant. I can only help with medicine and symptom questions."

EMERGENCY RULES — HIGHEST PRIORITY:
If the user describes any of the following, immediately tell them to call emergency services (112 in India) or go to the nearest hospital. Do NOT recommend medicine:
- Heat stroke with seizure, unconsciousness, or severe breathing difficulty
- Chest pain or tightness
- Severe difficulty breathing
- Stroke symptoms (facial drooping, arm weakness, speech difficulty)
- Any condition with rapidly worsening symptoms
- Allergic reaction with throat swelling or difficulty breathing (anaphylaxis)

For Heat Stroke (non-emergency / mild): you may provide first-aid steps (cooling, fanning, ORSL rehydrate once conscious) but always add "If condition worsens or unconsciousness occurs, call emergency services immediately."

AGE SAFETY RULES — ALWAYS ENFORCE:
- NEVER recommend Aspirin for users under 18 years old. ({age} years — check before recommending Aspirin)
- NEVER recommend Ibuprofen/NSAIDs if the user mentions heart failure or kidney failure.
- NEVER recommend Honey for users under 12 months old.
- For Allopathic Cold with duration "since last month": do NOT recommend any medicine. Tell the user to visit a doctor immediately.
- For Diarrhea lasting more than 2 days: tell user to seek medical advice immediately.
- For Fever lasting more than 5 days: tell user to seek medical help immediately.
- For Cough persisting beyond 5 days: refer user to doctor.

---
KNOWLEDGE BASE — RECOMMEND ONLY FROM THIS LIST

ALLOPATHIC — COLD:
Recent onset (today / within 24 hours):
  - Under 30 kg: Cetzine Cold Tablet, twice daily after meal, 2-3 days
  - Under 60 kg: Coldant Tablet, twice daily after meal, 4-6 days
  - Under 100 kg: Dolo Cold Tablet, twice daily after meal, 4-10 days
Since few days (1-6 days):
  - Till 40 kg: Safexim Tablet, twice daily after meal, 5 days
  - Till 70 kg: Addelo Cold Tablet, twice daily after meal, 7 days
  - Till 100 kg: Ciplenza Tablet, twice daily after meal, 7 days
Since last month: DO NOT recommend. Tell user to visit doctor immediately.

ALLOPATHIC — COUGH:
  Home remedies: Honey (2 tsp in warm water, once or twice daily — not for infants), Ginger tea (20-40g fresh ginger in hot water), stay hydrated.
  Medicine: Koflet Cough Syrup
  If cough persists beyond 5 days: refer to doctor.

ALLOPATHIC — DIARRHEA:
  Hydrate with electrolytes (sodium, chloride). Avoid dairy.
  Medicine: Loperamide (Imodium) or Bismuth subsalicylate (Pepto-Bismol / Kaopectate)
  If lasting more than 2 days: seek medical advice immediately.

ALLOPATHIC — HEADACHE (mild only):
  Ibuprofen (Advil, Motrin), Acetaminophen (Tylenol), or Aspirin.
  WARNING: No ibuprofen/NSAIDs for heart failure or kidney failure patients.
  WARNING: No Aspirin for under 18.

ALLOPATHIC — FEVER (mild only):
  Drink fluids, lightweight clothing.
  Acetaminophen (Tylenol) or Ibuprofen (Advil, Motrin IB)
  If fever lasts more than 5 days: seek medical help.

ALLOPATHIC — SORE THROAT:
  Rest and fluids. Steam inhalation 5-10 mins, several times daily.
  Warm tea with honey (not for under 12 months). Chicken broth.

ALLOPATHIC — HEAT STROKE:
  EMERGENCY if seizure/unconscious/severe breathing difficulty — call 112.
  First aid: Cool body with cold water sponging, fan person.
  ORSL Rehydrate once person is conscious.

ALLOPATHIC — ABRASIONS:
  Wash hands. Clean wound with cool water and mild soap. Remove particles with sterilized tweezers.
  Apply Bacitracin or Aquaphor ointment. Cover with bandage, change daily.
  See doctor if infection signs appear.

ALLOPATHIC — STINGS:
  Remove stinger (credit card scrape). Ice pack 20 mins per hour.
  Antihistamine: Diphenhydramine (Benadryl) or Loratadine (Claritin)
  Pain relief: Acetaminophen (Tylenol) or Ibuprofen (Motrin)
  Hydrocortisone cream for redness/itch.

ALLOPATHIC — EYE INJURY:
  DO NOT rub the eye. Blink to flush tears. Lift upper eyelid over lower lashes.
  Flush with eyewash, saline, or running tap water.
  See doctor if pain persists.

ALLOPATHIC — INSECT BITES:
  Wash with soap and water. Ice pack 10+ minutes. Elevate affected area.

ALLOPATHIC — FAINTING:
  Lie down or sit down. Head between knees if sitting.
  Lay on back, raise legs 12 inches above heart level. Loosen tight clothing.
  Do not get up too quickly.

HOMEOPATHIC — COLD (started today/recent):
  Boiron Pulsatilla Pellets (weight-independent)
  Dosage: 1 pellet after 30 mins of meal, minimum 4 days, continue until relief.

HOMEOPATHIC — COLD (since long time):
  Dr. Reckeweg Pulsatilla Dilution
  Dosage: 6ml after 30-40 mins of meal, twice daily.

HOMEOPATHIC — COLD (general options):
  Allium cepa, Arsenicum album, Belladonna, Euphrasia, Natrum muriaticum.
  Recommend consulting a homeopathic practitioner for precise selection.

HOMEOPATHIC — COUGH:
  Bryonia, Phosphorus, Pulsatilla, Rumex crispus.
  Recommend consulting a homeopathic practitioner.

AYURVEDIC — COLD:
  Astragalus: activates immune cells, follow bottle dosage.
  Ginger and Tulsi tea: relieves blocked nose.
  Also: Tulsi, Honey, Mulethi, Pippali, Cinnamon.

AYURVEDIC — COUGH:
  Honey: 2 tsp in warm water or herbal tea, once or twice daily until recovery.
  Ginger tea: 20-40g fresh ginger, steep in hot water, add honey or lemon.
  Koflet Cough Syrup (also effective under Ayurvedic track).
  Also: Tulsi, Mulethi, Giloy, Sonth.
---

CONDITIONS NOT IN KNOWLEDGE BASE:
For any condition not listed above, respond: "This is beyond what I can safely recommend. Please consult a doctor."
```

---

## 8. COMPONENT LIST

### `Navbar`
**File:** `components/Navbar.tsx`
**Props:** none
**Purpose:** Top navigation bar present on all pages. Renders logo, nav links (Home, About), and "Start Consultation" CTA button that links to `/chat`.

---

### `IntakeForm`
**File:** `components/IntakeForm.tsx`
**Props:**
```typescript
{
  onSubmit: (data: IntakeData) => void;
}
```
**Purpose:** Shown at the start of `/chat` before any conversation begins. Collects age, weight, and treatment preference. Calls `onSubmit` when the user submits; parent hides this component and reveals the chat.

---

### `ChatWindow`
**File:** `components/ChatWindow.tsx`
**Props:**
```typescript
{
  messages: Message[];
  isLoading: boolean;
}
```
**Purpose:** Scrollable container that renders all chat messages. Auto-scrolls to the latest message when `messages` changes. Shows a typing indicator (animated dots) when `isLoading` is true.

---

### `ChatMessage`
**File:** `components/ChatMessage.tsx`
**Props:**
```typescript
{
  role: "user" | "assistant";
  content: string;
}
```
**Purpose:** Renders a single chat bubble. User messages are right-aligned with a blue background. Assistant messages are left-aligned with a light gray background and a small MedWise icon. Renders `content` as markdown-lite (bold, line breaks, numbered lists).

---

### `ChatInput`
**File:** `components/ChatInput.tsx`
**Props:**
```typescript
{
  onSend: (message: string) => void;
  disabled: boolean;
}
```
**Purpose:** Fixed-bottom input area with a text field and a "Send" button. Submits on Enter key or button click. Clears after send. Disabled while `disabled` is true (i.e., while streaming).

---

### `DisclaimerBanner`
**File:** `components/DisclaimerBanner.tsx`
**Props:** none
**Purpose:** A non-dismissible amber/yellow banner fixed at the top of the `/chat` page. Text: "MedWise is for informational purposes only. Not a substitute for professional medical advice." Links to `/about`.

---

### `TreatmentBadge`
**File:** `components/TreatmentBadge.tsx`
**Props:**
```typescript
{
  preference: "allopathic" | "homeopathic" | "ayurvedic";
}
```
**Purpose:** Small colored pill badge shown in the chat header indicating the active treatment track. Colors: Allopathic = blue, Homeopathic = green, Ayurvedic = orange.

---

### `EmergencyAlert`
**File:** `components/EmergencyAlert.tsx`
**Props:**
```typescript
{
  visible: boolean;
}
```
**Purpose:** Full-width red alert banner that appears above the chat messages when the bot's response contains an emergency-trigger keyword. Text: "⚠️ This may be a medical emergency. Please call emergency services (112) or go to your nearest hospital immediately." Hidden when `visible` is false.

---

## 9. ENVIRONMENT VARIABLES

**File:** `.env.local` (never commit this file)

```
GROQ_API_KEY=your_groq_api_key_here
```

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | Yes | API key from console.groq.com. Used server-side only in `app/api/chat/route.ts`. Never exposed to the client. |

**File:** `.env.example` (commit this file)
```
# Get your key from https://console.groq.com
GROQ_API_KEY=
```

The variable is accessed only in the edge route (`process.env.GROQ_API_KEY`). It is never passed to or referenced in client components.

---

## 10. VERCEL DEPLOYMENT REQUIREMENTS

**`next.config.js`:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = nextConfig;
```
No special config needed — App Router + edge runtime handles everything.

**Runtime:** Edge (Hobby plan)

**Edge runtime** (`app/api/chat/route.ts`):
```typescript
export const runtime = 'edge'
export const maxDuration = 30
```
Required on Vercel Hobby plan. The default Node.js runtime has a 10-second timeout; Edge runtime allows streaming responses without timeout issues on the free tier.

**`vercel.json`:** Not required. Vercel auto-detects Next.js.

**Build command:** `next build` (Vercel default — no override needed)

**Environment variable setup on Vercel:**
- Go to Project → Settings → Environment Variables
- Add `GROQ_API_KEY` with value from console.groq.com
- Set to: Production, Preview, Development

**Deployment method: GitHub integration**
- Push repo to GitHub
- In Vercel dashboard: Add New Project → Import Git Repository → select the repo
- Vercel auto-deploys on every push to the `main` branch
- Preview deployments are created automatically for every other branch/PR
- Do not use Vercel CLI direct deploy (`vercel --prod`) — all deployments go through GitHub

**Deployment steps:**
1. Push repo to GitHub (`main` branch)
2. Connect repo in Vercel dashboard (Add New Project → Import Git Repository)
3. Add `GROQ_API_KEY` environment variable in Vercel project settings
4. Vercel builds and deploys automatically — subsequent pushes to `main` trigger auto-redeploy

**Node.js version:** 20.x (Vercel default for new projects — no `.nvmrc` needed)

---

## 11. WHAT TO PRESERVE FROM LEGACY

**Bot name:** MedWise (used in all UI copy, system prompt, and bot message header)

**Three treatment tracks** (must all be selectable in IntakeForm):
- Allopathic
- Homeopathic
- Ayurvedic

**All medicine data from legacy-logic.md** — every medicine name, dosage, frequency, and duration is locked into the system prompt verbatim. The LLM must recommend only from this list and must not generate alternative medicines outside it.

**Weight-based dosage logic for Allopathic Cold** — this is the most complex legacy rule and must be preserved exactly:
- Duration "recent" → Under 30kg / Under 60kg / Under 100kg brackets
- Duration "few days" → Till 40kg / Till 70kg / Till 100kg brackets
- Duration "last month" → No medicine, refer to doctor

The LLM receives the user's exact weight from the intake form and must apply the correct bracket without asking for weight again.

**Conversation tone:** Friendly, supportive, concise. The legacy bot used "I will suggest you to use..." — the new bot should maintain approachable, plain-language phrasing.

---

## 12. KNOWN CONSTRAINTS AND MEDICAL SAFETY RULES

These are hard rules. The system prompt enforces them, and they must never be relaxed.

| Rule | Detail |
|---|---|
| No Aspirin for under 18 | Age is known from intake form. Check before every Aspirin mention. |
| No ibuprofen/NSAIDs for heart/kidney failure | Ask user if they have these conditions before recommending ibuprofen. |
| No honey for infants under 12 months | Age known from intake. Block honey recommendation if age < 1. |
| Cold "since last month" → doctor only | Zero medicine recommendations for this duration. Hard redirect. |
| Diarrhea > 2 days → medical advice | Cannot continue recommending after 2-day threshold. |
| Fever > 5 days → medical help | Hard stop on home treatment recommendations. |
| Cough > 5 days → doctor | Refer, do not continue recommending. |
| Heat stroke with emergency signs → 112 | Must precede any first-aid steps with emergency call instruction. |
| No off-topic responses | Refuse anything not related to medical symptoms, medicines, or first aid. |
| Disclaimer on every recommendation | The standard disclaimer text must appear at the end of every message that contains a medicine name. |
| Recommend only from knowledge base | The LLM must not hallucinate or invent medicines not in legacy-logic.md. Enforced by explicit listing in the system prompt. |
| Stateless only | No session persistence, no cookies, no database writes. Each page load is a clean slate. |
| GROQ_API_KEY server-side only | Never reference this variable in any client component or pass it through props. |
