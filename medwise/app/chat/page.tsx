'use client'

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useChat } from '@ai-sdk/react'
import { TextStreamChatTransport } from 'ai'
import type { UIMessage } from 'ai'
import IntakeForm from '@/components/IntakeForm'
import ChatMessage from '@/components/ChatMessage'
import ChatInput from '@/components/ChatInput'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import EmergencyAlert from '@/components/EmergencyAlert'
import TreatmentBadge from '@/components/TreatmentBadge'
import type { UserProfile } from '@/types'

const THINKING_MESSAGES = [
  'Analyzing your symptoms...',
  'Checking medicine knowledge base...',
  'Considering your age and weight...',
  'Preparing your recommendation...',
  'Reviewing treatment options...',
  'Consulting medical guidelines...',
  'Personalizing your response...',
  'Almost ready...',
]

const EMERGENCY_KEYWORDS = [
  'call emergency',
  'go to hospital',
  'call 911',
  'call 112',
  'emergency services',
]

function extractText(message: UIMessage): string {
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map(p => p.text)
    .join('')
}

function buildGreeting(profile: UserProfile): string {
  const name = profile.name ? `, ${profile.name}` : ''
  const track = profile.preference.charAt(0).toUpperCase() + profile.preference.slice(1)
  return (
    `Hello${name}! 👋 I'm MedWise, your personal health assistant.\n\n` +
    `I'll be providing **${track}** recommendations tailored to your profile — ` +
    `**Age ${profile.age}** · **${profile.weight} kg**.\n\n` +
    `What symptom are you experiencing today?`
  )
}

export default function ChatPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [input, setInput] = useState('')
  const [showEmergency, setShowEmergency] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const userProfileRef = useRef<UserProfile | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const shouldAutoScrollRef = useRef(true)
  const lastMessageIdRef = useRef<string>('')
  const [thinkingIndex, setThinkingIndex] = useState(0)
  const thinkingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const transport = useMemo(
    () =>
      new TextStreamChatTransport({
        api: '/api/chat',
        body: () => ({ userProfile: userProfileRef.current }),
      }),
    []
  )

  const { messages, sendMessage, status, setMessages } = useChat({
    transport,
    onError: (error) => {
      console.error('Chat error:', error)
      const message = error.message ?? ''
      if (message.includes('Too many requests') || message.includes('429')) {
        setApiError(
          '⏱️ You\'re sending messages too fast. ' +
          'Please wait a moment before trying again.'
        )
      } else {
        setApiError(
          'MedWise encountered an issue. ' +
          'Please try again. If this persists, refresh the page.'
        )
      }
    },
    onFinish: () => {
      setApiError(null)
    },
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  // Check for emergency keywords whenever messages update
  useEffect(() => {
    if (messages.length === 0) return
    const lastMsg = messages[messages.length - 1]
    if (lastMsg.role !== 'assistant') return
    const text = extractText(lastMsg).toLowerCase()
    if (EMERGENCY_KEYWORDS.some(kw => text.includes(kw))) {
      setShowEmergency(true)
    }
  }, [messages])

  // Keep userProfileRef in sync with state so transport always sends latest profile
  useEffect(() => {
    userProfileRef.current = userProfile
  }, [userProfile])

  // Track whether user is near the bottom — gates auto-scroll
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight
      shouldAutoScrollRef.current = distanceFromBottom < 150
    }
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll only when a genuinely NEW message appears (different ID) — never during streaming
  useEffect(() => {
    if (messages.length === 0) return
    const lastMessage = messages[messages.length - 1]
    if (lastMessage.id !== lastMessageIdRef.current) {
      lastMessageIdRef.current = lastMessage.id
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }
    // Same ID = streaming update to existing message — do nothing
  }, [messages])

  // Lock body scroll only while the chat UI is active (not during intake)
  useEffect(() => {
    if (!userProfile) return
    document.body.classList.add('chat-page-active')
    return () => {
      document.body.classList.remove('chat-page-active')
    }
  }, [userProfile])

  // Rotate thinking messages every 1.8 seconds while loading
  useEffect(() => {
    if (isLoading) {
      setThinkingIndex(0)
      thinkingIntervalRef.current = setInterval(() => {
        setThinkingIndex((prev) =>
          prev < THINKING_MESSAGES.length - 1 ? prev + 1 : prev
        )
      }, 1800)
    } else {
      if (thinkingIntervalRef.current) {
        clearInterval(thinkingIntervalRef.current)
        thinkingIntervalRef.current = null
      }
    }
    return () => {
      if (thinkingIntervalRef.current) {
        clearInterval(thinkingIntervalRef.current)
      }
    }
  }, [isLoading])

  const handleProfileSubmit = useCallback(
    (profile: UserProfile) => {
      userProfileRef.current = profile
      setUserProfile(profile)
      const greeting = buildGreeting(profile)
      setMessages([
        {
          id: 'greeting',
          role: 'assistant',
          parts: [{ type: 'text', text: greeting }],
        } as UIMessage,
      ])
    },
    [setMessages]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value),
    []
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const text = input.trim()
      if (!text || isLoading) return
      setInput('')
      sendMessage({ text })
    },
    [input, isLoading, sendMessage]
  )

  // ── STATE 1: INTAKE ─────────────────────────────────────────────────────────
  if (!userProfile) {
    return (
      <div
        style={{
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: 'var(--bg-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 16px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <IntakeForm onSubmit={handleProfileSubmit} />
          <p
            style={{
              fontSize: '12px',
              textAlign: 'center',
              marginTop: '16px',
              color: 'var(--text-muted)',
            }}
          >
            🔒 Your information is used only for this session and is never stored.
          </p>
        </div>
      </div>
    )
  }

  // ── STATE 2: CHAT ────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        position: 'fixed',
        top: '64px',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-secondary)',
      }}
    >
      {/* Disclaimer — amber bar at top of chat section */}
      <DisclaimerBanner />

      {/* Emergency alert — only visible when triggered */}
      <EmergencyAlert visible={showEmergency} />

      {/* Chat header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderBottomColor: 'var(--border-color)',
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl leading-none">⚕️</span>
          <div>
            <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
              MedWise: Your Healthmate
            </p>
            {userProfile.name && (
              <p className="text-xs leading-tight" style={{ color: 'var(--text-secondary)' }}>
                Hello, {userProfile.name}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TreatmentBadge preference={userProfile.preference} />
          <span className="text-xs hidden sm:block" style={{ color: 'var(--text-muted)' }}>
            Age {userProfile.age} · {userProfile.weight} kg
          </span>
        </div>
      </div>

      {/* API error banner */}
      {apiError && (
        <div
          className="px-4 py-3 text-sm flex items-center justify-between gap-3 flex-shrink-0"
          style={{
            backgroundColor: '#fef2f2',
            borderBottom: '1px solid #fecaca',
            color: '#991b1b',
          }}
        >
          <span>⚠️ {apiError}</span>
          <button
            onClick={() => setApiError(null)}
            className="text-xs underline flex-shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Scrollable messages area — only scrollable element in the layout */}
      <div
        ref={scrollContainerRef}
        className="chat-scroll"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 16px',
        }}
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map(msg => (
            <ChatMessage
              key={msg.id}
              role={msg.role as 'user' | 'assistant'}
              content={extractText(msg)}
            />
          ))}

          {/* Thinking indicator — shown while loading, with rotating status messages */}
          {isLoading && (
            <div className="flex items-start gap-3 mb-4 animate-fade-in">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
                style={{ backgroundColor: '#0F2854', color: '#BDE8F5' }}
              >
                ⚕
              </div>
              <div
                className="px-4 py-3 rounded-2xl rounded-tl-none border max-w-[75%]"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 items-center">
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ backgroundColor: '#4988C4', animationDelay: '0ms' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ backgroundColor: '#4988C4', animationDelay: '150ms' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ backgroundColor: '#4988C4', animationDelay: '300ms' }}
                    />
                  </div>
                  <p
                    className="text-xs animate-fade-in"
                    style={{ color: 'var(--text-muted)' }}
                    key={thinkingIndex}
                  >
                    {THINKING_MESSAGES[thinkingIndex]}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input — sticks to bottom */}
      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
