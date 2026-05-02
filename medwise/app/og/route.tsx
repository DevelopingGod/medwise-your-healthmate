import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0F2854 0%, #1C4D8D 50%, #4988C4 100%)',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        {/* Top badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(189, 232, 245, 0.15)',
            border: '1px solid rgba(189, 232, 245, 0.4)',
            borderRadius: '999px',
            padding: '8px 24px',
            marginBottom: '32px',
          }}
        >
          <span style={{
            color: '#BDE8F5',
            fontSize: '16px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            AI-Powered Medical Guidance
          </span>
        </div>

        {/* Main heading */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <span style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: 'white',
            lineHeight: 1.1,
            textAlign: 'center',
          }}>
            MedWise
          </span>
          <span style={{
            fontSize: '40px',
            fontWeight: 'normal',
            color: '#BDE8F5',
            marginTop: '8px',
          }}>
            Your Healthmate
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '22px',
          color: 'rgba(255,255,255,0.8)',
          textAlign: 'center',
          maxWidth: '700px',
          lineHeight: 1.5,
          margin: '0 0 48px 0',
        }}>
          Personalized medicine recommendations across
          allopathic, homeopathic & ayurvedic tracks —
          tailored to your age and weight.
        </p>

        {/* Three track pills */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '48px',
        }}>
          {['💊 Allopathic', '🌿 Homeopathic', '🌱 Ayurvedic'].map((track) => (
            <div
              key={track}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '999px',
                padding: '12px 28px',
                color: 'white',
                fontSize: '18px',
              }}
            >
              {track}
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{
            color: '#BDE8F5',
            fontSize: '18px',
            opacity: 0.8,
          }}>
            medwise-your-healthmate.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
