import { createGroq } from '@ai-sdk/groq'
import { streamText } from 'ai'
import type { ModelMessage } from 'ai'
import { buildSystemPrompt } from '@/lib/systemPrompt'
import { rateLimit } from '@/lib/rateLimit'

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export const runtime = 'edge'
export const maxDuration = 30

function toCoreMessages(messages: unknown[]): ModelMessage[] {
  return (messages as any[])
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => {
      let content = ''
      if (typeof m.content === 'string') {
        content = m.content
      } else if (Array.isArray(m.content)) {
        content = m.content
          .filter((p: any) => p.type === 'text')
          .map((p: any) => p.text ?? '')
          .join('')
      } else if (Array.isArray(m.parts)) {
        content = m.parts
          .filter((p: any) => p.type === 'text')
          .map((p: any) => p.text ?? '')
          .join('')
      }
      return { role: m.role, content } as ModelMessage
    })
    .filter((m) => typeof m.content === 'string' && (m.content as string).trim() !== '')
}

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'anonymous'

  const { allowed, remaining, resetIn } = rateLimit(ip)

  if (!allowed) {
    return new Response(
      JSON.stringify({
        error: `Too many requests. Please wait ${Math.ceil(resetIn / 1000)} seconds before trying again.`,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(resetIn / 1000)),
          'Retry-After': String(Math.ceil(resetIn / 1000)),
        },
      }
    )
  }

  let userProfile: import('@/types').UserProfile | null = null

  try {
    const body = await req.json()
    userProfile = body.userProfile
    const messages: unknown[] = body.messages ?? []

    if (!userProfile || !userProfile.age || !userProfile.weight || !userProfile.preference) {
      return new Response(
        JSON.stringify({ error: 'Missing required user profile fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const coreMessages = toCoreMessages(messages)

    if (coreMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No valid messages received.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const systemPrompt = buildSystemPrompt(userProfile)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 25000)

    try {
      const result = await streamText({
        model: groq('llama-3.3-70b-versatile'),
        system: systemPrompt,
        messages: coreMessages,
        temperature: 0.3,
        maxOutputTokens: 1024,
        abortSignal: controller.signal,
      })
      clearTimeout(timeoutId)
      const response = result.toTextStreamResponse()
      const newHeaders = new Headers(response.headers)
      newHeaders.set('X-RateLimit-Limit', '10')
      newHeaders.set('X-RateLimit-Remaining', String(remaining))
      newHeaders.set('X-RateLimit-Reset', String(Math.ceil(resetIn / 1000)))
      return new Response(response.body, {
        status: response.status,
        headers: newHeaders,
      })
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    const name    = error instanceof Error ? error.name    : 'Error'

    console.error('MedWise API error:', {
      name,
      message,
      userProfile: userProfile
        ? {
            age: userProfile.age,
            weight: userProfile.weight,
            preference: userProfile.preference,
          }
        : null,
    })

    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
