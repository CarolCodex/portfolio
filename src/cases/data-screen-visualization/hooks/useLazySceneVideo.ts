import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import type { DashboardTemplateConfig } from '../types'
import type { DashboardRuntime } from './useDashboardRuntime'

const SCENE_VIDEO_LOAD_DELAY = 1400
const SCENE_VIDEO_STALL_FALLBACK_DELAY = 8000

export const useLazySceneVideo = (
  config: Ref<DashboardTemplateConfig | undefined>,
  runtime: DashboardRuntime,
) => {
  const sceneVideoRef = ref<HTMLVideoElement | null>(null)
  const shouldUseSceneVideo = ref(true)
  const sceneVideoSrc = ref<string | undefined>(undefined)
  const sceneVideoWebmSrc = computed(() => (sceneVideoSrc.value ? config.value?.videoWebm : undefined))
  let sceneVisibilityObserver: IntersectionObserver | undefined
  let sceneLoadTimer = 0
  let sceneStallTimer = 0
  let sceneIdleCallbackId: number | undefined
  let sceneIsVisible = true
  let documentIsVisible = true
  let unregisterVideo: (() => void) | undefined
  let disposeRuntimePause: (() => void) | undefined
  let disposeRuntimeResume: (() => void) | undefined
  let disposeRuntimeDestroy: (() => void) | undefined

  const canPlaySceneVideo = () =>
    shouldUseSceneVideo.value &&
    Boolean(sceneVideoSrc.value) &&
    documentIsVisible &&
    sceneIsVisible

  const cleanupSceneVideoElement = () => {
    const video = sceneVideoRef.value
    if (!video) return

    video.pause()
    video.removeAttribute('src')
    video.querySelectorAll('source').forEach((source) => source.removeAttribute('src'))
    video.load()
  }

  const clearSceneVideoTimers = () => {
    if (sceneLoadTimer) {
      runtime.scheduler.clearTimeout(sceneLoadTimer)
      sceneLoadTimer = 0
    }

    if (sceneStallTimer) {
      runtime.scheduler.clearTimeout(sceneStallTimer)
      sceneStallTimer = 0
    }

    if (sceneIdleCallbackId) {
      runtime.scheduler.cancelIdleCallback(sceneIdleCallbackId)
      sceneIdleCallbackId = undefined
    }
  }

  const fallbackToScenePoster = () => {
    shouldUseSceneVideo.value = false
    sceneVideoSrc.value = undefined
    clearSceneVideoTimers()
    cleanupSceneVideoElement()
  }

  const syncSceneVideoPlayback = () => {
    const video = sceneVideoRef.value
    if (!video) return

    if (!canPlaySceneVideo()) {
      video.pause()
      return
    }

    void video.play().catch(() => {
      video.pause()
    })
  }

  const loadSceneVideo = () => {
    if (!config.value || !shouldUseSceneVideo.value || sceneVideoSrc.value || !documentIsVisible || !sceneIsVisible || !runtime.scheduler.running) return

    sceneVideoSrc.value = config.value.video

    void nextTick(() => {
      const video = sceneVideoRef.value
      if (!video) return

      video.muted = true
      video.loop = true
      video.playsInline = true
      video.load()
      syncSceneVideoPlayback()
    })
  }

  const scheduleSceneVideoLoad = () => {
    if (!shouldUseSceneVideo.value || sceneVideoSrc.value || !documentIsVisible || !sceneIsVisible) return

    if (sceneLoadTimer) window.clearTimeout(sceneLoadTimer)
    sceneLoadTimer = runtime.scheduler.setTimeout(() => {
      sceneLoadTimer = 0
      sceneIdleCallbackId = runtime.scheduler.requestIdleCallback(() => {
        sceneIdleCallbackId = undefined
        loadSceneVideo()
      }, { timeout: 1000 })
    }, SCENE_VIDEO_LOAD_DELAY)
  }

  const setupSceneVisibilityObserver = () => {
    sceneVisibilityObserver?.disconnect()
    sceneVisibilityObserver = undefined

    if (!runtime.stageRef.value || !('IntersectionObserver' in window)) return

    sceneVisibilityObserver = new IntersectionObserver(
      ([entry]) => {
        sceneIsVisible = entry.isIntersecting
        if (sceneIsVisible) {
          scheduleSceneVideoLoad()
        } else {
          syncSceneVideoPlayback()
        }
      },
      { threshold: 0.01 },
    )
    sceneVisibilityObserver.observe(runtime.stageRef.value)
  }

  const handleDocumentVisibilityChange = () => {
    documentIsVisible = document.visibilityState !== 'hidden'
    if (documentIsVisible) {
      scheduleSceneVideoLoad()
      syncSceneVideoPlayback()
    } else {
      syncSceneVideoPlayback()
    }
  }

  const handleSceneVideoReady = () => {
    if (sceneStallTimer) {
      runtime.scheduler.clearTimeout(sceneStallTimer)
      sceneStallTimer = 0
    }
    syncSceneVideoPlayback()
  }

  const handleSceneVideoStall = () => {
    if (!sceneVideoSrc.value || sceneStallTimer) return

    sceneStallTimer = runtime.scheduler.setTimeout(() => {
      fallbackToScenePoster()
    }, SCENE_VIDEO_STALL_FALLBACK_DELAY)
  }

  const handleSceneVideoError = () => {
    fallbackToScenePoster()
  }

  watch(config, () => {
    clearSceneVideoTimers()
    cleanupSceneVideoElement()
    sceneVideoSrc.value = undefined
    shouldUseSceneVideo.value = true
    void nextTick(() => {
      setupSceneVisibilityObserver()
      scheduleSceneVideoLoad()
    })
  })

  onMounted(() => {
    documentIsVisible = document.visibilityState !== 'hidden'
    shouldUseSceneVideo.value = true
    unregisterVideo = sceneVideoRef.value ? runtime.registerVideo(sceneVideoRef.value) : undefined
    disposeRuntimePause = runtime.onPause(() => {
      clearSceneVideoTimers()
      cleanupSceneVideoElement()
      sceneVideoSrc.value = undefined
    })
    disposeRuntimeResume = runtime.onResume(() => {
      scheduleSceneVideoLoad()
    })
    disposeRuntimeDestroy = runtime.onDestroy(() => {
      fallbackToScenePoster()
    })
    document.addEventListener('visibilitychange', handleDocumentVisibilityChange)
    setupSceneVisibilityObserver()
    scheduleSceneVideoLoad()
  })

  onBeforeUnmount(() => {
    document.removeEventListener('visibilitychange', handleDocumentVisibilityChange)
    sceneVisibilityObserver?.disconnect()
    disposeRuntimePause?.()
    disposeRuntimeResume?.()
    disposeRuntimeDestroy?.()
    unregisterVideo?.()
    clearSceneVideoTimers()
    cleanupSceneVideoElement()
  })

  return {
    sceneVideoRef,
    shouldUseSceneVideo,
    sceneVideoSrc,
    sceneVideoWebmSrc,
    handleSceneVideoReady,
    handleSceneVideoStall,
    handleSceneVideoError,
  }
}
