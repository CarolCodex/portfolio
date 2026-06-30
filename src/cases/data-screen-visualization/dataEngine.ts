import {
  createProcessStateMachine,
  type ProcessState,
} from './processEngine'
import type { RuntimeScheduler } from '@/utils/runtimeScheduler'

const KPI_INTERVAL = 2000
const CHART_INTERVAL = 1500
const FLOW_INTERVAL = 1500
const PROCESS_INTERVAL = 5000
const ANIMATION_DURATION = 1200

const numericFields = [
  'speed',
  'furnaceOutput',
  'dayOutput',
  'ladleWeight',
  'tundishWeight',
  'ladleTemperature',
  'tundishTemperature',
  'pressure',
] as const

type NumericField = typeof numericFields[number]
type NumericMode = 'walk' | 'trend'

type NumericRule = {
  initial: number
  min: number
  max: number
  step: number
  digits: number
  mode?: NumericMode
  trendStep?: [number, number]
}

type FlowRule = {
  initial: number[]
  min: number
  max: number
  step: number
}

type RealtimeState = Record<NumericField, number> & {
  castSeconds: number
  flowSpeeds: number[]
}

export type DashboardDataProfile = {
  castSeconds: number
  numeric: Record<NumericField, NumericRule>
  flow: FlowRule
}

export type KpiField =
  | NumericField
  | 'castDuration'
  | `flowSpeed${0 | 1 | 2 | 3 | 4 | 5}`

export type KpiFrame = Record<KpiField, string>
export type KpiObserver = (frame: KpiFrame) => void
export type ChartObserver = (frame: KpiFrame) => void
export type ProcessObserver = (state: ProcessState) => void

export type {
  ProcessState,
  ProcessStepStatus,
} from './processEngine'

export {
  getProcessArrowStatus,
  getProcessStepStatus,
} from './processEngine'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)
const randomWalkTrendClamp = (
  previous: number,
  step: number,
  min: number,
  max: number,
  trend: [number, number] | undefined = undefined,
) => {
  const delta = trend ? randomBetween(trend[0], trend[1]) : randomBetween(-step, step)

  return clamp(previous + delta, min, max)
}
const toFixedNumber = (value: number, digits = 1) => Number(value.toFixed(digits))
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3)
const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress

const formatDuration = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':')
}

export const createDashboardDataProfile = (
  overrides: Partial<{
    castSeconds: number
    speed: Partial<NumericRule>
    furnaceOutput: Partial<NumericRule>
    dayOutput: Partial<NumericRule>
    ladleWeight: Partial<NumericRule>
    tundishWeight: Partial<NumericRule>
    ladleTemperature: Partial<NumericRule>
    tundishTemperature: Partial<NumericRule>
    pressure: Partial<NumericRule>
    flow: Partial<FlowRule>
  }> = {},
): DashboardDataProfile => ({
  castSeconds: overrides.castSeconds ?? 18 * 60 + 32,
  numeric: {
    speed: {
      initial: 1.68,
      min: 1.6,
      max: 1.75,
      step: 0.02,
      digits: 2,
      ...overrides.speed,
    },
    furnaceOutput: {
      initial: 108.6,
      min: 90,
      max: 125,
      step: 0.5,
      digits: 1,
      mode: 'trend',
      trendStep: [0.1, 0.5],
      ...overrides.furnaceOutput,
    },
    dayOutput: {
      initial: 2453.6,
      min: 2400,
      max: 2800,
      step: 0.8,
      digits: 1,
      mode: 'trend',
      trendStep: [0.2, 0.8],
      ...overrides.dayOutput,
    },
    ladleWeight: {
      initial: 108.6,
      min: 90,
      max: 125,
      step: 0.5,
      digits: 1,
      ...overrides.ladleWeight,
    },
    tundishWeight: {
      initial: 45.8,
      min: 43.8,
      max: 47.2,
      step: 0.4,
      digits: 1,
      ...overrides.tundishWeight,
    },
    ladleTemperature: {
      initial: 1535.1,
      min: 1530.1,
      max: 1540.1,
      step: 3,
      digits: 1,
      ...overrides.ladleTemperature,
    },
    tundishTemperature: {
      initial: 1531.7,
      min: 1526.7,
      max: 1536.7,
      step: 2.4,
      digits: 1,
      ...overrides.tundishTemperature,
    },
    pressure: {
      initial: 0.82,
      min: 0.78,
      max: 0.86,
      step: 0.02,
      digits: 2,
      ...overrides.pressure,
    },
  },
  flow: {
    initial: [1.68, 1.66, 1.69, 1.67, 1.7, 1.68],
    min: 1.6,
    max: 1.75,
    step: 0.015,
    ...overrides.flow,
  },
})

const initialRealtimeState = (profile: DashboardDataProfile): RealtimeState => ({
  speed: profile.numeric.speed.initial,
  castSeconds: profile.castSeconds,
  furnaceOutput: profile.numeric.furnaceOutput.initial,
  dayOutput: profile.numeric.dayOutput.initial,
  ladleWeight: profile.numeric.ladleWeight.initial,
  tundishWeight: profile.numeric.tundishWeight.initial,
  ladleTemperature: profile.numeric.ladleTemperature.initial,
  tundishTemperature: profile.numeric.tundishTemperature.initial,
  pressure: profile.numeric.pressure.initial,
  flowSpeeds: profile.flow.initial,
})

const updateNumericField = (value: number, rule: NumericRule) => {
  const next = rule.mode === 'trend'
    ? randomWalkTrendClamp(value, rule.step, rule.min, rule.max, [
      rule.trendStep?.[0] ?? 0.1,
      rule.trendStep?.[1] ?? rule.step,
    ])
    : randomWalkTrendClamp(value, rule.step, rule.min, rule.max)

  return toFixedNumber(next, rule.digits)
}

const updateKpiState = (state: RealtimeState, profile: DashboardDataProfile): RealtimeState => {
  const next = { ...state }

  numericFields.forEach((field) => {
    next[field] = updateNumericField(state[field], profile.numeric[field])
  })

  return {
    ...next,
    castSeconds: state.castSeconds + Math.round(KPI_INTERVAL / 1000),
  }
}

const updateFlowState = (state: RealtimeState, profile: DashboardDataProfile): RealtimeState => ({
  ...state,
  flowSpeeds: state.flowSpeeds.map((speed) => {
    const relativeStep = Math.abs(speed) * 0.02
    const next = randomWalkTrendClamp(
      speed,
      Math.min(profile.flow.step, relativeStep),
      Math.max(profile.flow.min, speed - relativeStep),
      Math.min(profile.flow.max, speed + relativeStep),
    )

    return toFixedNumber(next, 2)
  }),
})

const buildInterpolatedState = (from: RealtimeState, to: RealtimeState, progress: number): RealtimeState => {
  const eased = easeOutCubic(Math.min(Math.max(progress, 0), 1))
  const next = { ...to }

  numericFields.forEach((field) => {
    next[field] = lerp(from[field], to[field], eased)
  })

  next.flowSpeeds = to.flowSpeeds.map((target, index) => lerp(from.flowSpeeds[index] ?? target, target, eased))

  return next
}

const formatFrame = (state: RealtimeState, castSeconds: number, profile: DashboardDataProfile): KpiFrame => ({
  speed: state.speed.toFixed(profile.numeric.speed.digits),
  castDuration: formatDuration(castSeconds),
  furnaceOutput: state.furnaceOutput.toFixed(profile.numeric.furnaceOutput.digits),
  dayOutput: state.dayOutput.toFixed(profile.numeric.dayOutput.digits),
  ladleWeight: state.ladleWeight.toFixed(profile.numeric.ladleWeight.digits),
  tundishWeight: state.tundishWeight.toFixed(profile.numeric.tundishWeight.digits),
  ladleTemperature: state.ladleTemperature.toFixed(profile.numeric.ladleTemperature.digits),
  tundishTemperature: state.tundishTemperature.toFixed(profile.numeric.tundishTemperature.digits),
  pressure: state.pressure.toFixed(profile.numeric.pressure.digits),
  flowSpeed0: (state.flowSpeeds[0] ?? 0).toFixed(2),
  flowSpeed1: (state.flowSpeeds[1] ?? 0).toFixed(2),
  flowSpeed2: (state.flowSpeeds[2] ?? 0).toFixed(2),
  flowSpeed3: (state.flowSpeeds[3] ?? 0).toFixed(2),
  flowSpeed4: (state.flowSpeeds[4] ?? 0).toFixed(2),
  flowSpeed5: (state.flowSpeeds[5] ?? 0).toFixed(2),
})

const defaultFrameScheduler = (): Pick<RuntimeScheduler, 'now' | 'requestFrame' | 'cancelFrame'> => ({
  now: () => performance.now(),
  requestFrame: (callback) => window.requestAnimationFrame(callback),
  cancelFrame: (id) => window.cancelAnimationFrame(id),
})

export const createDashboardDataEngine = (
  totalProcessSteps: number,
  profile = createDashboardDataProfile(),
  scheduler = defaultFrameScheduler(),
) => {
  let fromState = initialRealtimeState(profile)
  let targetState = fromState
  let animationStart = 0
  let clockStart = 0
  let lastKpiUpdate = 0
  let lastChartUpdate = 0
  let lastFlowUpdate = 0
  let lastProcessUpdate = 0
  let rafId = 0
  let running = false
  const processMachine = createProcessStateMachine(totalProcessSteps)
  const castStartSeconds = fromState.castSeconds
  const kpiObservers = new Set<KpiObserver>()
  const chartObservers = new Set<ChartObserver>()
  const processObservers = new Set<ProcessObserver>()

  const currentVisualState = (time: number) => {
    const progress = animationStart === 0 ? 1 : (time - animationStart) / ANIMATION_DURATION
    return buildInterpolatedState(fromState, targetState, progress)
  }

  const startTransition = (nextState: RealtimeState, time: number) => {
    fromState = currentVisualState(time)
    targetState = nextState
    animationStart = time
  }

  const emitKpi = (time: number) => {
    const castSeconds = castStartSeconds + Math.floor((time - clockStart) / 1000)
    const frame = formatFrame(currentVisualState(time), castSeconds, profile)
    kpiObservers.forEach((observer) => observer(frame))
  }

  const emitChart = (time: number) => {
    const castSeconds = castStartSeconds + Math.floor((time - clockStart) / 1000)
    const frame = formatFrame(currentVisualState(time), castSeconds, profile)
    chartObservers.forEach((observer) => observer(frame))
  }

  const emitProcess = () => {
    const processState = processMachine.getState()
    processObservers.forEach((observer) => observer(processState))
  }

  const loop = (time: number) => {
    if (time - lastKpiUpdate >= KPI_INTERVAL) {
      startTransition(updateKpiState(targetState, profile), time)
      lastKpiUpdate = time
      emitKpi(time)
    }

    if (time - lastFlowUpdate >= FLOW_INTERVAL) {
      startTransition(updateFlowState(targetState, profile), time)
      lastFlowUpdate = time
    }

    if (time - lastChartUpdate >= CHART_INTERVAL) {
      lastChartUpdate = time
      emitChart(time)
    }

    if (time - lastProcessUpdate >= PROCESS_INTERVAL) {
      processMachine.advance()
      lastProcessUpdate = time
      emitProcess()
    }

    if (running) {
      rafId = scheduler.requestFrame(loop)
    }
  }

  const start = () => {
    if (running) return

    running = true
    clockStart = scheduler.now()
    lastKpiUpdate = clockStart
    lastChartUpdate = clockStart
    lastFlowUpdate = clockStart
    lastProcessUpdate = clockStart
    processMachine.reset()
    kpiObservers.forEach((observer) => observer(formatFrame(targetState, castStartSeconds, profile)))
    chartObservers.forEach((observer) => observer(formatFrame(targetState, castStartSeconds, profile)))
    emitProcess()
    rafId = scheduler.requestFrame(loop)
  }

  const stop = () => {
    running = false
    scheduler.cancelFrame(rafId)
  }

  const subscribeKpi = (observer: KpiObserver) => {
    kpiObservers.add(observer)
    observer(formatFrame(targetState, castStartSeconds, profile))

    return () => {
      kpiObservers.delete(observer)
    }
  }

  const subscribeChart = (observer: ChartObserver) => {
    chartObservers.add(observer)
    observer(formatFrame(targetState, castStartSeconds, profile))

    return () => {
      chartObservers.delete(observer)
    }
  }

  const subscribeProcess = (observer: ProcessObserver) => {
    processObservers.add(observer)
    observer(processMachine.getState())

    return () => {
      processObservers.delete(observer)
    }
  }

  return {
    start,
    stop,
    subscribeKpi,
    subscribeChart,
    subscribeProcess,
  }
}
