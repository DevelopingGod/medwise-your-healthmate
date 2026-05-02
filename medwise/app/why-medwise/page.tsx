import Link from 'next/link'

const comparisonRows = [
  {
    feature: 'Purpose',
    medwise: 'Built exclusively for medical guidance',
    general: 'General purpose — medical is one of thousands of use cases',
  },
  {
    feature: 'Treatment tracks',
    medwise: 'Allopathic · Homeopathic · Ayurvedic',
    general: 'Rarely distinguishes between treatment philosophies',
  },
  {
    feature: 'Personalization',
    medwise: 'Uses your age, weight, and preference for every answer',
    general: 'Gives generic answers unless heavily prompted',
  },
  {
    feature: 'Dosage logic',
    medwise: 'Weight-based dosage brackets built into knowledge base',
    general: 'May hallucinate dosages or give generic ranges',
  },
  {
    feature: 'Knowledge base',
    medwise: 'Curated Indian medicine knowledge base (verified 2023–2026)',
    general: 'Broad internet training data — unverified for India-specific medicines',
  },
  {
    feature: 'Emergency handling',
    medwise: 'Hard-coded refusal + 112 emergency redirect',
    general: 'Varies — may attempt to answer emergency queries',
  },
  {
    feature: 'Data privacy',
    medwise: 'Fully stateless — zero data stored',
    general: 'Data may be used for model training',
  },
  {
    feature: 'Cost',
    medwise: 'Free',
    general: 'Free tier limited — paid plans for full access',
  },
  {
    feature: 'Availability',
    medwise: '24/7, no account needed',
    general: 'Account required for full features',
  },
  {
    feature: 'Offline context',
    medwise: 'Works within Indian healthcare context',
    general: 'Western medicine bias in training data',
  },
]

const differentiators = [
  {
    icon: '🎯',
    title: 'Laser Focused',
    desc: 'MedWise does one thing and does it well — medicine recommendations. No distractions, no off-topic responses, no hallucinated history lessons.',
  },
  {
    icon: '🇮🇳',
    title: 'India-First',
    desc: 'Built with Indian medicines, Indian emergency numbers, and Indian treatment philosophies — ayurvedic and homeopathic included from day one.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    desc: 'Zero data retention. Your symptoms, age, and weight never leave your session. No account. No tracking. No selling your health data.',
  },
]

const timeline = [
  {
    year: '2023',
    title: 'The Beginning',
    desc: 'Built as a rule-based Python chatbot with a curated medical knowledge base covering cold, cough, fever, and more across three treatment tracks.',
  },
  {
    year: '2024–2025',
    title: 'Research & Planning',
    desc: 'Identified limitations of rule-based approach. Planned LLM integration to make conversations natural and recommendations truly personalized.',
  },
  {
    year: 'May 2026',
    title: 'LLM-Powered Relaunch',
    desc: 'Rebuilt entirely on Next.js 16 with Groq AI. Natural conversation, streaming responses, weight and age-based personalization — MedWise: Your Healthmate.',
  },
]

export default function WhyMedWisePage() {
  return (
    <div className="pt-16">

      {/* SECTION 1 — HERO (hardcoded gradient — always dark) */}
      <section
        className="py-24 px-4 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #0F2854, #1C4D8D)' }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Why MedWise: Your Healthmate?
          </h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">
            Built specifically for medical guidance — not a general chatbot with a medical
            disclaimer slapped on.
          </p>
        </div>
      </section>

      {/* SECTION 2 — ORIGIN STORY BANNER */}
      <div className="px-4 py-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div
          className="max-w-4xl mx-auto rounded-xl py-6 px-6 text-center"
          style={{ backgroundColor: '#BDE8F5', color: '#0F2854' }}
        >
          <p className="text-sm font-medium">
            🏥 Originally built in 2023 as a rule-based medical chatbot · Enhanced in May 2026
            with LLM-powered intelligence
          </p>
        </div>
      </div>

      {/* SECTION 2.5 — RESEARCH PUBLICATION */}
      <section className="py-8 px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-5xl mx-auto">
          <div
            className="border-l-4 p-6 rounded-r-xl"
            style={{ borderLeftColor: '#0F2854', backgroundColor: 'var(--bg-secondary)' }}
          >
            <div className="flex items-start gap-4">
              <span className="text-base flex-shrink-0">📄</span>
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Peer-Reviewed Research
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  MedWise was first presented as a research paper at IRJET
                  (International Research Journal of Engineering and Technology)
                  in February 2023. The original rule-based system was documented,
                  reviewed, and published.
                </p>
                <a
                  href="https://www.irjet.net/archives/V10/i2/IRJET-V10I208.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:underline"
                  style={{ color: '#1C4D8D' }}
                >
                  Read the Published Paper →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — COMPARISON TABLE */}
      <section className="py-20 px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: 'var(--text-primary)' }}>
            MedWise vs General AI Assistants
          </h2>
          <div className="overflow-x-auto rounded-xl shadow-md">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                {/* Table header hardcoded — always dark */}
                <tr style={{ backgroundColor: '#0F2854' }}>
                  <th className="py-4 px-5 text-left text-sm font-semibold text-white w-1/4">
                    Feature
                  </th>
                  <th className="py-4 px-5 text-left text-sm font-semibold text-white w-[37.5%]">
                    MedWise: Your Healthmate
                  </th>
                  <th className="py-4 px-5 text-left text-sm font-semibold text-white w-[37.5%]">
                    General LLMs (ChatGPT, Gemini etc.)
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    style={{ backgroundColor: i % 2 !== 0 ? 'var(--bg-secondary)' : 'var(--bg-card)' }}
                  >
                    <td
                      className="py-3 px-5 text-sm font-medium border-b"
                      style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
                    >
                      {row.feature}
                    </td>
                    {/* MedWise cells — hardcoded brand accent */}
                    <td
                      className="py-3 px-5 text-sm font-medium border-b"
                      style={{ backgroundColor: '#BDE8F5', color: '#0F2854', borderColor: 'var(--border-color)' }}
                    >
                      {row.medwise}
                    </td>
                    <td
                      className="py-3 px-5 text-sm border-b"
                      style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
                    >
                      {row.general}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 4 — THREE KEY DIFFERENTIATORS */}
      <section className="py-20 px-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentiators.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl shadow-md p-8 text-center border"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: '#4988C4' }}
              >
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                <p className="leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — TIMELINE */}
      <section className="py-20 px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" style={{ color: 'var(--text-primary)' }}>
            Our Journey
          </h2>

          <div className="flex flex-col md:flex-row items-start md:items-stretch gap-0 md:gap-0 relative">
            {/* Horizontal connector line (desktop only) */}
            <div
              className="hidden md:block absolute left-0 right-0 h-0.5"
              style={{ top: '20px', backgroundColor: '#BDE8F5' }}
            />

            {timeline.map(({ year, title, desc }, i) => (
              <div key={year} className="flex-1 flex flex-col items-center text-center px-4 relative">
                {/* Vertical connector (mobile only) */}
                {i < timeline.length - 1 && (
                  <div
                    className="md:hidden w-0.5 h-8 my-2"
                    style={{ backgroundColor: '#BDE8F5' }}
                  />
                )}

                {/* Node circle (hardcoded) */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 z-10 relative"
                  style={{ backgroundColor: '#1C4D8D' }}
                >
                  {i + 1}
                </div>

                <p className="text-sm font-bold mt-3 mb-1" style={{ color: '#1C4D8D' }}>
                  {year}
                </p>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — BOTTOM CTA (hardcoded — always dark) */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#0F2854' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to experience the difference?
          </h2>
          <Link
            href="/chat"
            className="inline-block px-10 py-4 rounded-full font-semibold text-lg shadow-md transition-colors hover:opacity-90"
            style={{ backgroundColor: '#BDE8F5', color: '#0F2854' }}
          >
            Start Your Free Consultation →
          </Link>
        </div>
      </section>

    </div>
  )
}
