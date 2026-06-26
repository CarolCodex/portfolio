import { nextTick, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import {
  createDashboardDataEngine,
  getProcessArrowStatus,
  getProcessStepStatus,
  type KpiField,
  type KpiFrame,
  type ProcessState,
} from '../dataEngine'
import type { DashboardTemplateConfig } from '../types'

export const useRealtimeKPI = (config: Ref<DashboardTemplateConfig | undefined>) => {
  const stageRef = ref<HTMLElement | null>(null)
  const kpiElements = new Map<KpiField, HTMLElement[]>()
  const gaugeElements = new Map<KpiField, HTMLElement[]>()
  const chartElements = new Set<HTMLElement>()
  const stepElements = new Map<number, HTMLElement>()
  const arrowElements = new Map<number, HTMLElement>()
  let dashboardEngine: ReturnType<typeof createDashboardDataEngine> | undefined
  let unsubscribeKpi: (() => void) | undefined
  let unsubscribeChart: (() => void) | undefined
  let unsubscribeProcess: (() => void) | undefined
  let stageVisibilityObserver: IntersectionObserver | undefined
  let mounted = false
  let isDocumentVisible = true
  let isStageVisible = true
  let runToken = 0

  const flowFields: KpiField[] = [
    'flowSpeed0',
    'flowSpeed1',
    'flowSpeed2',
    'flowSpeed3',
    'flowSpeed4',
    'flowSpeed5',
  ]

  const cacheStageElements = () => {
    kpiElements.clear()
    gaugeElements.clear()
    chartElements.clear()
    stepElements.clear()
    arrowElements.clear()

    stageRef.value?.querySelectorAll<HTMLElement>('[data-kpi-field]').forEach((element) => {
      const field = element.dataset.kpiField as KpiField | undefined
      if (!field) return

      const elements = kpiElements.get(field) ?? []
      elements.push(element)
      kpiElements.set(field, elements)
    })

    stageRef.value?.querySelectorAll<HTMLElement>('[data-gauge-field]').forEach((element) => {
      const field = element.dataset.gaugeField as KpiField | undefined
      if (!field) return

      const elements = gaugeElements.get(field) ?? []
      elements.push(element)
      gaugeElements.set(field, elements)
    })

    stageRef.value?.querySelectorAll<HTMLElement>('[data-realtime-chart]').forEach((element) => {
      chartElements.add(element)
    })

    stageRef.value?.querySelectorAll<HTMLElement>('[data-process-step-index]').forEach((element) => {
      const index = Number(element.dataset.processStepIndex)
      if (Number.isFinite(index)) {
        stepElements.set(index, element)
      }
    })

    stageRef.value?.querySelectorAll<HTMLElement>('[data-process-arrow-index]').forEach((element) => {
      const index = Number(element.dataset.processArrowIndex)
      if (Number.isFinite(index)) {
        arrowElements.set(index, element)
      }
    })
  }

  const writeFieldElements = (field: KpiField, value: string) => {
    kpiElements.get(field)?.forEach((element) => {
      if (element.textContent !== value) {
        element.textContent = value
      }
    })
  }

  const writeKpiFrame = (frame: KpiFrame) => {
    kpiElements.forEach((_, field) => {
      if (!field.startsWith('flowSpeed')) {
        writeFieldElements(field, frame[field])
      }
    })
  }

  const setStatusClass = (element: HTMLElement, status: string) => {
    element.classList.remove('is-pending', 'is-active', 'is-complete')
    element.classList.add(`is-${status}`)
  }

  const writeChartFrame = (frame: KpiFrame) => {
    flowFields.forEach((field) => {
      writeFieldElements(field, frame[field])
    })

    gaugeElements.forEach((elements, field) => {
      const value = Number(frame[field])
      if (!Number.isFinite(value)) return

      elements.forEach((element) => {
        element.dispatchEvent(new CustomEvent('dashboard:gauge-value', { detail: { value } }))
      })
    })

    chartElements.forEach((element) => {
      element.dispatchEvent(new CustomEvent('dashboard:chart-frame', { detail: { frame } }))
    })
  }

  const writeProcessFrame = (state: ProcessState) => {
    stepElements.forEach((element, index) => {
      setStatusClass(element, getProcessStepStatus(index + 1, state))
    })

    arrowElements.forEach((element, index) => {
      setStatusClass(element, getProcessArrowStatus(index + 1, state))
    })
  }

  const disposeEngine = () => {
    unsubscribeKpi?.()
    unsubscribeChart?.()
    unsubscribeProcess?.()
    dashboardEngine?.stop()
    unsubscribeKpi = undefined
    unsubscribeChart = undefined
    unsubscribeProcess = undefined
    dashboardEngine = undefined
    kpiElements.clear()
    gaugeElements.clear()
    chartElements.clear()
    stepElements.clear()
    arrowElements.clear()
  }

  const stopEngine = () => {
    runToken += 1
    disposeEngine()
  }

  const canRunEngine = () => mounted && isDocumentVisible && isStageVisible && Boolean(config.value)

  const startEngine = async () => {
    if (!canRunEngine()) return

    const token = runToken + 1
    runToken = token
    disposeEngine()
    await nextTick()
    if (token !== runToken || !canRunEngine()) return

    const activeConfig = config.value
    if (!activeConfig) return

    cacheStageElements()
    dashboardEngine = createDashboardDataEngine(activeConfig.processSteps.length, activeConfig.dataProfile)
    unsubscribeKpi = dashboardEngine.subscribeKpi(writeKpiFrame)
    unsubscribeChart = dashboardEngine.subscribeChart(writeChartFrame)
    unsubscribeProcess = dashboardEngine.subscribeProcess(writeProcessFrame)
    dashboardEngine.start()
  }

  const syncEngineVisibility = () => {
    if (canRunEngine()) {
      if (!dashboardEngine) {
        void startEngine()
      }
      return
    }

    stopEngine()
  }

  const handleDocumentVisibilityChange = () => {
    isDocumentVisible = document.visibilityState !== 'hidden'
    syncEngineVisibility()
  }

  const setupStageVisibilityObserver = () => {
    if (!stageRef.value || !('IntersectionObserver' in window)) return

    stageVisibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isStageVisible = entry.isIntersecting
        syncEngineVisibility()
      },
      { threshold: 0.01 },
    )
    stageVisibilityObserver.observe(stageRef.value)
  }

  const getStepStatus = (index: number) => getProcessStepStatus(index + 1, { currentStep: 1 })
  const getArrowStatus = (index: number) => getProcessArrowStatus(index + 1, { currentStep: 1 })

  watch(config, () => {
    void startEngine()
  })

  onMounted(() => {
    mounted = true
    isDocumentVisible = document.visibilityState !== 'hidden'
    setupStageVisibilityObserver()
    document.addEventListener('visibilitychange', handleDocumentVisibilityChange)
    void startEngine()
  })

  onBeforeUnmount(() => {
    mounted = false
    document.removeEventListener('visibilitychange', handleDocumentVisibilityChange)
    stageVisibilityObserver?.disconnect()
    stageVisibilityObserver = undefined
    stopEngine()
  })

  return {
    stageRef,
    getStepStatus,
    getArrowStatus,
  }
}
