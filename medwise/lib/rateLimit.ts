interface RateLimitEntry {
  count: number
  windowStart: number
}

const store = new Map<string, RateLimitEntry>()

const WINDOW_MS = 60 * 1000
const MAX_REQUESTS = 10
const CLEANUP_INTERVAL = 100

let requestsSinceCleanup = 0

export function rateLimit(ip: string): {
  allowed: boolean
  remaining: number
  resetIn: number
} {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now })
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetIn: WINDOW_MS }
  }

  if (entry.count >= MAX_REQUESTS) {
    const resetIn = WINDOW_MS - (now - entry.windowStart)
    return { allowed: false, remaining: 0, resetIn }
  }

  entry.count++
  store.set(ip, entry)

  requestsSinceCleanup++
  if (requestsSinceCleanup >= CLEANUP_INTERVAL) {
    requestsSinceCleanup = 0
    for (const [key, val] of store.entries()) {
      if (now - val.windowStart > WINDOW_MS) {
        store.delete(key)
      }
    }
  }

  return {
    allowed: true,
    remaining: MAX_REQUESTS - entry.count,
    resetIn: WINDOW_MS - (now - entry.windowStart),
  }
}
