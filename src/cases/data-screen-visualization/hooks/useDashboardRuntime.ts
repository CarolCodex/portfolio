import {
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  type InjectionKey,
  type Ref,
} from 'vue'
import { createRuntimeScheduler, type RuntimeScheduler } from '@/utils/runtimeScheduler'

type RuntimeListener = () => void

export type DashboardRuntime = {
  stageRef: Ref<HTMLElement | null>
  scheduler: RuntimeScheduler
  pause: () => void
  resume: () => void
  destroy: () => void
  onPause: (listener: RuntimeListener) => () => void
  onResume: (listener: RuntimeListener) => () => void
  onDestroy: (listener: RuntimeListener) => () => void
  registerVideo: (video: HTMLVideoElement) => () => void
}

export const DashboardRuntimeKey: InjectionKey<DashboardRuntime> = Symbol('DashboardRuntime')

export function useInjectedDashboardRuntime() {
  return inject(DashboardRuntimeKey, undefined)
}

export function useDashboardRuntime() {
  const stageRef = ref<HTMLElement | null>(null)
  const scheduler = createRuntimeScheduler()
  const pauseListeners = new Set<RuntimeListener>()
  const resumeListeners = new Set<RuntimeListener>()
  const destroyListeners = new Set<RuntimeListener>()
  const videos = new Set<HTMLVideoElement>()
  let stageObserver: IntersectionObserver | undefined
  let documentVisible = true
  let stageVisible = true
  let destroyed = false
  let paused = false

  const emit = (listeners: Set<RuntimeListener>) => {
    listeners.forEach((listener) => listener())
  }

  const pauseVideos = (unload = false) => {
    videos.forEach((video) => {
      video.pause()
      if (!unload) return

      video.removeAttribute('src')
      video.querySelectorAll('source').forEach((source) => source.removeAttribute('src'))
      video.load()
    })
  }

  const pause = () => {
    if (paused || destroyed) return

    paused = true
    scheduler.pause()
    pauseVideos(!documentVisible)
    emit(pauseListeners)
  }

  const resume = () => {
    if (!paused || destroyed || !documentVisible || !stageVisible) return

    paused = false
    scheduler.resume()
    emit(resumeListeners)
  }

  const syncVisibility = () => {
    if (documentVisible && stageVisible) {
      resume()
    } else {
      pause()
    }
  }

  const handleVisibilityChange = () => {
    documentVisible = document.visibilityState !== 'hidden'
    syncVisibility()
  }

  const setupStageObserver = () => {
    stageObserver?.disconnect()
    stageObserver = undefined

    if (!stageRef.value || !('IntersectionObserver' in window)) return

    stageObserver = new IntersectionObserver(
      ([entry]) => {
        stageVisible = entry.isIntersecting
        syncVisibility()
      },
      { threshold: 0.01 },
    )
    stageObserver.observe(stageRef.value)
  }

  const destroy = () => {
    if (destroyed) return

    destroyed = true
    stageObserver?.disconnect()
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    pauseVideos(true)
    scheduler.destroy()
    emit(destroyListeners)
    pauseListeners.clear()
    resumeListeners.clear()
    destroyListeners.clear()
    videos.clear()
  }

  const runtime: DashboardRuntime = {
    stageRef,
    scheduler,
    pause,
    resume,
    destroy,
    onPause(listener) {
      pauseListeners.add(listener)
      return () => pauseListeners.delete(listener)
    },
    onResume(listener) {
      resumeListeners.add(listener)
      return () => resumeListeners.delete(listener)
    },
    onDestroy(listener) {
      destroyListeners.add(listener)
      return () => destroyListeners.delete(listener)
    },
    registerVideo(video) {
      videos.add(video)
      return () => videos.delete(video)
    },
  }

  provide(DashboardRuntimeKey, runtime)

  onMounted(() => {
    documentVisible = document.visibilityState !== 'hidden'
    setupStageObserver()
    document.addEventListener('visibilitychange', handleVisibilityChange)
    syncVisibility()
  })

  onBeforeUnmount(destroy)

  return runtime
}
