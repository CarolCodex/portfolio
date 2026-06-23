export function rafThrottle<T extends (...args: unknown[]) => void>(callback: T) {
  let frame = 0

  const throttled = (...args: Parameters<T>) => {
    if (frame || typeof window === 'undefined') return

    frame = window.requestAnimationFrame(() => {
      frame = 0
      callback(...args)
    })
  }

  throttled.cancel = () => {
    if (!frame || typeof window === 'undefined') return

    window.cancelAnimationFrame(frame)
    frame = 0
  }

  return throttled
}
