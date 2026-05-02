import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="pt-16">

      {/* SECTION 1 — HERO (hardcoded gradient — looks good in both modes) */}
      <section
        className="min-h-screen flex items-center justify-center px-4 py-20"
        style={{
          background: 'linear-gradient(135deg, #0F2854 0%, #1C4D8D 40%, #4988C4 75%, #BDE8F5 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up">
            MedWise: Your Healthmate
            <br />
            <span className="text-white">Personalized Health Guidance</span>
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed opacity-90 animate-fade-in-up animate-delay-200">
            MedWise gives you personalized medicine recommendations based on your symptoms,
            age, weight, and treatment preference — allopathic, homeopathic, or ayurvedic.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-fade-in-up animate-delay-300">
            <Link
              href="/chat"
              className="px-8 py-4 rounded-full font-semibold text-base shadow-md transition-colors hover:bg-[#BDE8F5]"
              style={{ backgroundColor: 'white', color: '#0F2854' }}
            >
              Start Free Consultation →
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-4 rounded-full font-semibold text-base border-2 border-white text-white transition-colors hover:bg-white/10"
            >
              Learn How It Works
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-white animate-fade-in animate-delay-500">
            <span className="flex items-center gap-1">
              <span className="font-bold" style={{ color: '#BDE8F5' }}>✓</span> Free to use
            </span>
            <span className="flex items-center gap-1">
              <span className="font-bold" style={{ color: '#BDE8F5' }}>✓</span> No sign-up required
            </span>
            <span className="flex items-center gap-1">
              <span className="font-bold" style={{ color: '#BDE8F5' }}>✓</span> Allopathic · Homeopathic · Ayurvedic
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THREE TREATMENT TRACKS */}
      <section className="py-20 px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Three Paths to Healing
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Choose the treatment philosophy that aligns with you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Allopathic */}
            <div
              className="rounded-2xl shadow-md p-8 border-t-4 animate-fade-in-up animate-delay-200"
              style={{ borderTopColor: '#1C4D8D', backgroundColor: 'var(--bg-card)' }}
            >
              {/* Cross icon */}
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center relative shadow-md"
                style={{ backgroundColor: 'white' }}
              >
                <div
                  className="absolute"
                  style={{ width: '28px', height: '5px', backgroundColor: '#1C4D8D', borderRadius: '2px' }}
                />
                <div
                  className="absolute"
                  style={{ width: '5px', height: '28px', backgroundColor: '#1C4D8D', borderRadius: '2px' }}
                />
              </div>
              <h3 className="text-xl font-bold text-center mb-3" style={{ color: 'var(--text-primary)' }}>Allopathic</h3>
              <p className="text-center leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Evidence-based conventional medicine with precise dosages tailored to your
                weight and symptom duration.
              </p>
            </div>

            {/* Homeopathic */}
            <div
              className="rounded-2xl shadow-md p-8 border-t-4 animate-fade-in-up animate-delay-300"
              style={{ borderTopColor: '#4988C4', backgroundColor: 'var(--bg-card)' }}
            >
              {/* Leaf icon */}
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-md"
                style={{ backgroundColor: 'white' }}
              >
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    backgroundColor: '#4988C4',
                    borderRadius: '0 70% 0 70%',
                    transform: 'rotate(45deg)',
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-center mb-3" style={{ color: 'var(--text-primary)' }}>Homeopathic</h3>
              <p className="text-center leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Natural remedies matched to your unique symptom profile and constitution.
              </p>
            </div>

            {/* Ayurvedic */}
            <div
              className="rounded-2xl shadow-md p-8 border-t-4 animate-fade-in-up animate-delay-400"
              style={{ borderTopColor: '#BDE8F5', backgroundColor: 'var(--bg-card)' }}
            >
              {/* Circle inside icon */}
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-md"
                style={{ backgroundColor: 'white' }}
              >
                <div
                  className="rounded-full"
                  style={{ width: '30px', height: '30px', backgroundColor: '#BDE8F5', border: '3px solid #0F2854' }}
                />
              </div>
              <h3 className="text-xl font-bold text-center mb-3" style={{ color: 'var(--text-primary)' }}>Ayurvedic</h3>
              <p className="text-center leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Ancient Indian healing wisdom with herbs and natural formulations for
                holistic recovery.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              How MedWise Works
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { step: 1, icon: '📋', title: 'Share Your Profile', desc: 'Enter your age, weight, and treatment preference', delay: 'animate-delay-100' },
              { step: 2, icon: '🩺', title: 'Describe Symptoms', desc: "Tell MedWise what you're experiencing", delay: 'animate-delay-200' },
              { step: 3, icon: '🤖', title: 'AI Analysis', desc: 'Our AI matches your profile to the right medicine', delay: 'animate-delay-300' },
              { step: 4, icon: '💊', title: 'Get Recommendation', desc: 'Receive personalized medicine with dosage guidance', delay: 'animate-delay-400' },
            ].map(({ step, icon, title, desc, delay }) => (
              <div key={step} className={`flex flex-col items-center text-center animate-fade-in-up ${delay}`}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold mb-3"
                  style={{ backgroundColor: '#0F2854' }}
                >
                  {step}
                </div>
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — DISCLAIMER BANNER (amber — warning color, exempt from palette) */}
      <div
        className="w-full py-4 px-4 flex items-center justify-center gap-2"
        style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
      >
        <span>⚠️</span>
        <p className="text-sm text-center">
          MedWise is for informational purposes only. Always consult a qualified healthcare
          provider before taking any medication. Not for emergencies — call{' '}
          <strong>112</strong>.
        </p>
      </div>

      {/* BOTTOM CTA (hardcoded — always dark) */}
      <section className="py-20 px-4 text-center" style={{ backgroundColor: '#0F2854' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <Link
            href="/chat"
            className="inline-block px-10 py-4 rounded-full font-semibold text-lg shadow-md transition-colors hover:opacity-90"
            style={{ backgroundColor: '#BDE8F5', color: '#0F2854' }}
          >
            Start Your Free Consultation
          </Link>
        </div>
      </section>

    </div>
  )
}
