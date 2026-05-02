import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
}

const markdownComponents: Components = {
  strong: ({ children }) => (
    <strong style={{ color: '#1a56db' }}>{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 my-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 my-1">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="mb-1">{children}</li>
  ),
  p: ({ children }) => (
    <p className="mb-2 last:mb-0">{children}</p>
  ),
  hr: () => (
    <hr className="my-3 border-gray-200" />
  ),
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium"
        style={{ backgroundColor: '#1a56db' }}
      >
        {isUser ? 'You' : '⚕'}
      </div>

      {/* Bubble */}
      <div
        className={`
          max-w-[90%] md:max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${isUser
            ? 'rounded-br-sm text-white'
            : 'rounded-bl-sm text-gray-800 bg-white border border-gray-200'
          }
        `}
        style={isUser ? { backgroundColor: '#1a56db' } : undefined}
      >
        {isUser ? (
          <span className="whitespace-pre-wrap">{content}</span>
        ) : (
          <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
        )}
      </div>
    </div>
  )
}
