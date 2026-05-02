export default function TeamPage() {
  return (
    <div className="pt-16">

      {/* SECTION 1 — HERO (hardcoded — always dark) */}
      <section
        className="py-20 px-4 text-center text-white"
        style={{ backgroundColor: '#0F2854' }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet the Team</h1>
          <p className="text-lg md:text-xl opacity-90">
            The minds behind MedWise: Your Healthmate
          </p>
        </div>
      </section>

      {/* SECTION 2 — DEVELOPER CARD */}
      <section className="py-16 px-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-3xl shadow-xl p-10"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >

            {/* Top section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar (hardcoded gradient) */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #1C4D8D, #4988C4)' }}
              >
                SI
              </div>

              {/* Name + meta */}
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Sankalp Indish</h2>
                <p className="font-medium mt-0.5" style={{ color: '#1C4D8D' }}>
                  Lead Developer &amp; AI Engineer
                </p>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  IEEE Member · ID: 100397836
                </p>

                {/* Language badges (hardcoded) */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                  {[
                    { flag: '🇬🇧', lang: 'English' },
                    { flag: '🇩🇪', lang: 'German' },
                    { flag: '🇨🇳', lang: 'Chinese' },
                    { flag: '🇮🇳', lang: 'Marathi' },
                    { flag: '🇮🇳', lang: 'Hindi' },
                  ].map(({ flag, lang }) => (
                    <span
                      key={lang}
                      className="rounded-full text-xs px-3 py-1 font-medium"
                      style={{ backgroundColor: '#BDE8F5', color: '#0F2854' }}
                    >
                      {flag} {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <hr className="my-6" style={{ borderColor: 'var(--border-color)' }} />

            {/* Bio */}
            <div className="space-y-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>
                Hallo! 👋 Ich heiße Sankalp Indish. You&apos;ve just stumbled across a computer
                prodigy and the best AI Sorcerer in town. Fair warning: I find it remarkably
                satisfying to watch technology untangle the most cryptic of conundrums until
                they dissolve into beautifully crystalline, data-driven decisions.
              </p>
              <p>
                My odyssey germinated within the rigid geometry of Full Stack Development,
                yet my curiosity soon gravitated toward the ethereal, unpredictable dance of
                intelligent ecosystems. I transmute raw logic into agentic wonders — breathing
                life into autonomous, agentic architectures.
              </p>
              <p>
                Beyond the skeletal algorithms, I operate as a maestro of intelligent
                automation. My enchanted soul recharges and thrives in the kinetic hum of
                hyper-efficient workflows. By synthesizing a potent blend of advanced developer
                tools and AI agents, I streamline labyrinthine engineering pipelines,
                unshackling human brilliance from the heavy weight of the mundane.
              </p>
              <p>
                🍵 Let&apos;s Connect! I&apos;m always open to serendipitous networking.
              </p>
              <p>
                🍹 Summer heat? Sharing a chilled elixir of lemon iced tea would be a
                refreshing escape — or a spirited basketball duel.
              </p>
              <p>
                🌧️ Rainy day? Let&apos;s embark on a treacherous trek across the checkered
                wilderness of a chessboard — a whimsical voyage of stratagem and wit.
              </p>
              <p>
                ❄️ Wintry chill? Golden samosas while we cross-pollinate ideas and spark new
                paradigms.
              </p>
            </div>

            {/* Hashtag badges (hardcoded) */}
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                '#AIEngineer', '#GenerativeAI', '#IntelligentAutomation', '#AgenticAI',
                '#CloudComputing', '#MachineLearning', '#FullStack', '#Python',
                '#Leadership', '#IEEE', '#CoFounder',
              ].map(tag => (
                <span
                  key={tag}
                  className="rounded-full text-xs px-3 py-1"
                  style={{ backgroundColor: '#f1f5f9', color: '#4988C4' }}
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
