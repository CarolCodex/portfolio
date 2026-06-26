export type ProcessState = {
  currentStep: number
}

export type ProcessStepStatus = 'completed' | 'active' | 'disabled'

export type ProcessStateMachine = {
  getState: () => ProcessState
  reset: () => ProcessState
  advance: () => ProcessState
}

export const getProcessStepStatus = (stepNumber: number, state: ProcessState): ProcessStepStatus => {
  if (stepNumber < state.currentStep) return 'completed'
  if (stepNumber === state.currentStep) return 'active'
  return 'disabled'
}

export const getProcessArrowStatus = (stepBeforeArrow: number, state: ProcessState): ProcessStepStatus =>
  stepBeforeArrow < state.currentStep ? 'completed' : 'disabled'

export const createProcessStateMachine = (totalSteps: number, initialStep = 1): ProcessStateMachine => {
  const safeTotal = Math.max(1, totalSteps)
  const safeInitial = Math.min(Math.max(initialStep, 1), safeTotal)
  let state: ProcessState = { currentStep: safeInitial }

  return {
    getState: () => state,
    reset: () => {
      state = { currentStep: safeInitial }
      return state
    },
    advance: () => {
      state = {
        currentStep: state.currentStep >= safeTotal ? 1 : state.currentStep + 1,
      }
      return state
    },
  }
}
