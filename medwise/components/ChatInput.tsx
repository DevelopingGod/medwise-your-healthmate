import React, { useRef, useEffect } from 'react'

interface ChatInputProps {
  input: string
  isLoading: boolean
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent) => void
}

export default function ChatInput({ input, isLoading, onInputChange, onSubmit }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading && input.trim()) {
        onSubmit(e as unknown as React.FormEvent)
      }
    }
  }

  const canSubmit = !isLoading && input.trim().length > 0

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3">
      <form onSubmit={onSubmit} className="flex items-end gap-3 max-w-4xl mx-auto">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Describe your symptoms or ask a question..."
          disabled={isLoading}
          className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent overflow-hidden disabled:bg-gray-50"
          style={{ maxHeight: '120px', focusRingColor: '#1a56db' } as React.CSSProperties}
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: canSubmit ? '#1a56db' : '#93c5fd' }}
          aria-label="Send message"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span className="text-base leading-none">➤</span>
          )}
        </button>
      </form>
    </div>
  )
}
