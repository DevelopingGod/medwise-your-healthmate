export default function AboutPage() {
  return (
    <div className="pt-16">

      {/* SECTION 1 — HERO (hardcoded — always dark) */}
      <section
        className="py-20 px-4 text-center text-white"
        style={{ backgroundColor: '#0F2854' }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About MedWise</h1>
          <p className="text-lg md:text-xl opacity-90">
            Bringing personalized health guidance to every household
          </p>
        </div>
      </section>

      {/* SECTION 2 — WHAT IS MEDWISE */}
      <section className="py-20 px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>What is MedWise?</h2>
              <p className="leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                MedWise is an AI-powered medical guidance tool designed to help everyday
                people find reliable first-aid and over-the-counter medicine information
                quickly and conveniently.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                MedWise covers all three major medicine traditions — allopathic (conventional
                medicine), homeopathic, and ayurvedic — so you can get guidance that respects
                your personal health philosophy.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                Every recommendation is personalized to you: your age, weight, and the
                duration of your symptoms all factor into the guidance MedWise provides,
                ensuring you get dosages and durations appropriate for your profile.
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                The original system was published as a research paper in{' '}
                <a
                  href="https://www.irjet.net/archives/V10/i2/IRJET-V10I208.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline"
                  style={{ color: '#1C4D8D' }}
                >
                  IRJET Vol. 10 Issue 2
                </a>
                , February 2023.
              </p>
            </div>

            {/* Right: stats card */}
            <div
              className="rounded-2xl shadow-lg p-8 border"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            >
              <h3 className="text-lg font-semibold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
                MedWise at a Glance
              </h3>
              <div className="space-y-5">
                {[
                  { label: 'Conditions Covered', value: '15+' },
                  { label: 'Treatment Tracks', value: '3' },
                  { label: 'Available', value: '24/7' },
                  { label: 'Cost', value: 'Free' },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-3 last:border-0"
                    style={{ borderBottom: '1px solid var(--border-color)' }}
                  >
                    <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                    <span
                      className="font-bold text-lg px-3 py-1 rounded-md"
                      style={{ backgroundColor: '#BDE8F5', color: '#0F2854' }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — HOW RECOMMENDATIONS WORK */}
      <section className="py-20 px-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>
            How Our Recommendations Work
          </h2>
          <div className="space-y-4">
            {[
              { n: '01', text: 'We collect your age, weight, and preferred treatment track through a quick intake form before the conversation starts.' },
              { n: '02', text: 'You describe your symptoms naturally in conversation — no forms, no checkboxes, just talking.' },
              { n: '03', text: 'Our AI matches your symptom description against a curated medical knowledge base built from trusted first-aid guidelines.' },
              { n: '04', text: 'For allopathic medicine, dosages are selected from weight-based brackets — ensuring the right amount for your body.' },
              { n: '05', text: 'Duration of symptoms also matters: the same condition gets a different recommendation depending on whether it started today, a few days ago, or last month.' },
            ].map(({ n, text }) => (
              <div
                key={n}
                className="flex gap-5 items-start rounded-xl p-5 shadow-sm"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: '#0F2854' }}
                >
                  {n}
                </span>
                <p className="leading-relaxed pt-1" style={{ color: 'var(--text-secondary)' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — MEDICAL DISCLAIMER */}
      <section id="disclaimer" className="py-20 px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="border-2 rounded-2xl p-8"
            style={{ borderColor: '#1C4D8D', backgroundColor: '#f0f7ff' }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>⚕️ Medical Disclaimer</h2>
            <div className="space-y-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>
                MedWise is designed to provide general health information and guidance only.
                It is not a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              <p>
                Always seek the advice of your physician or other qualified health provider
                with any questions you may have regarding a medical condition.
              </p>
              <p>
                Never disregard professional medical advice or delay in seeking it because of
                something you have read or been told by MedWise.
              </p>
              <p>
                If you think you may have a medical emergency, call <strong>112</strong> or
                go to your nearest emergency room immediately.
              </p>
              <p>
                The medicine recommendations provided are based on general guidelines and may
                not be appropriate for your specific situation. Individual responses to
                medicines vary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHAT MEDWISE DOES NOT DO */}
      <section className="py-20 px-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>
            What MedWise Does Not Do
          </h2>
          <div
            className="rounded-2xl shadow-sm p-8 border"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <ul className="space-y-4">
              {[
                'Does not diagnose diseases',
                "Does not replace a doctor's consultation",
                'Does not handle medical emergencies',
                'Does not store your personal health data',
                'Does not prescribe controlled substances',
              ].map(item => (
                <li key={item} className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
                  <span className="text-red-500 font-bold text-lg flex-shrink-0">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </div>
  )
}
