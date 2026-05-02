# MedWise: Your Healthmate

An AI-powered medical guidance assistant providing personalized medicine 
recommendations across allopathic, homeopathic, and ayurvedic treatment tracks.

## About

MedWise: Your Healthmate was originally developed in 2023 as a rule-based 
medical chatbot with a curated knowledge base covering common conditions 
across three treatment philosophies. The system was documented and published 
as a peer-reviewed research paper at IRJET (Vol. 10, Issue 2, February 2023).

In May 2026, the project was fully rebuilt using Next.js 16, TypeScript, 
Tailwind CSS, and Groq AI — transforming it from a static decision tree 
into a fully conversational, LLM-powered health companion.

## Research Publication

Published at IRJET — International Research Journal of Engineering and Technology  
Vol. 10, Issue 2, February 2023  
https://www.irjet.net/archives/V10/i2/IRJET-V10I208.pdf

## Features

- Personalized recommendations based on age, weight, and symptom duration
- Three treatment tracks: Allopathic, Homeopathic, Ayurvedic
- Streaming AI responses powered by Groq (llama-3.3-70b-versatile)
- Emergency detection with 112 redirect
- Dark mode support
- Fully stateless — no user data stored
- Deployed on Vercel

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Groq API via Vercel AI SDK v6
- Vercel (hosting)

## Local Development

1. Clone the repository
2. Navigate to the medwise folder:
   cd medwise
3. Install dependencies:
   npm install
4. Create .env.local and add your Groq API key:
   GROQ_API_KEY=your_groq_api_key_here
5. Run the development server:
   npm run dev
6. Open http://localhost:3000

## Environment Variables

| Variable | Description |
|---|---|
| GROQ_API_KEY | Your Groq API key from console.groq.com |

## Developer

Sankalp Indish  
AI Engineer · Full Stack Developer  
IEEE Member · ID: 100397836

## License

This project and its contents are the original work of Sankalp Indish.
