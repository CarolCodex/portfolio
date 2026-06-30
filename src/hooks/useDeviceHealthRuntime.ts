import { onBeforeUnmount, onMounted } from 'vue'
import { createRuntimeScheduler } from '@/utils/runtimeScheduler'

export function useDeviceHealthRuntime() {
  const scheduler = createRuntimeScheduler()

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      scheduler.pause()
    } else {
      scheduler.resume()
    }
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
    handleVisibilityChange()
  })

  onBeforeUnmount(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    scheduler.destroy()
  })

  return {
    scheduler,
    pause: scheduler.pause,
    resume: scheduler.resume,
    destroy: scheduler.destroy,
  }
}
