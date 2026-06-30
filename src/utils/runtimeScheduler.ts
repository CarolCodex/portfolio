type FrameTask = {
  callback: FrameRequestCallback
  handle: number
}

type TimerTask = {
  callback: () => void
  delay: number
  repeat: boolean
  handle: number
}

type IdleTask = {
  callback: IdleRequestCallback
  options?: IdleRequestOptions
  handle: number
}

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
  cancelIdleCallback?: (handle: number) => void
}

export type RuntimeScheduler = ReturnType<typeof createRuntimeScheduler>

export function createRuntimeScheduler() {
  let running = true
  let nextId = 1
  const frames = new Map<number, FrameTask>()
  const timers = new Map<number, TimerTask>()
  const idleTasks = new Map<number, IdleTask>()

  const clearFrame = (task: FrameTask) => window.cancelAnimationFrame(task.handle)
  const clearTimer = (task: TimerTask) => {
    if (task.repeat) {
      window.clearInterval(task.handle)
    } else {
      window.clearTimeout(task.handle)
    }
  }

  const clearIdleTask = (task: IdleTask) => {
    const win = window as WindowWithIdleCallback
    if (win.cancelIdleCallback) {
      win.cancelIdleCallback(task.handle)
    } else {
      window.clearTimeout(task.handle)
    }
  }

  const scheduleFrame = (id: number, callback: FrameRequestCallback) => {
    const handle = window.requestAnimationFrame((time) => {
      frames.delete(id)
      if (running) callback(time)
    })
    frames.set(id, { callback, handle })
  }

  const scheduleTimer = (id: number, callback: () => void, delay: number, repeat: boolean) => {
    const runner = () => {
      if (!running) return
      if (!repeat) timers.delete(id)
      callback()
    }
    const handle = repeat ? window.setInterval(runner, delay) : window.setTimeout(runner, delay)
    timers.set(id, { callback, delay, repeat, handle })
  }

  const scheduleIdleTask = (id: number, callback: IdleRequestCallback, options?: IdleRequestOptions) => {
    const win = window as WindowWithIdleCallback
    const runner: IdleRequestCallback = (deadline) => {
      idleTasks.delete(id)
      if (running) callback(deadline)
    }
    const handle = win.requestIdleCallback
      ? win.requestIdleCallback(runner, options)
      : window.setTimeout(() => runner({
        didTimeout: false,
        timeRemaining: () => 0,
      }), Math.min(options?.timeout ?? 600, 600))

    idleTasks.set(id, { callback, options, handle })
  }

  const pause = () => {
    if (!running) return

    running = false
    frames.forEach(clearFrame)
    timers.forEach(clearTimer)
    idleTasks.forEach(clearIdleTask)
    frames.clear()
    timers.clear()
    idleTasks.clear()
  }

  const resume = () => {
    running = true
  }

  const destroy = () => {
    pause()
  }

  return {
    get running() {
      return running
    },
    now: () => performance.now(),
    requestFrame(callback: FrameRequestCallback) {
      if (!running) return 0
      const id = nextId
      nextId += 1
      scheduleFrame(id, callback)
      return id
    },
    cancelFrame(id: number) {
      const task = frames.get(id)
      if (!task) return
      clearFrame(task)
      frames.delete(id)
    },
    setTimeout(callback: () => void, delay: number) {
      if (!running) return 0
      const id = nextId
      nextId += 1
      scheduleTimer(id, callback, delay, false)
      return id
    },
    clearTimeout(id: number) {
      const task = timers.get(id)
      if (!task) return
      clearTimer(task)
      timers.delete(id)
    },
    setInterval(callback: () => void, delay: number) {
      if (!running) return 0
      const id = nextId
      nextId += 1
      scheduleTimer(id, callback, delay, true)
      return id
    },
    clearInterval(id: number) {
      const task = timers.get(id)
      if (!task) return
      clearTimer(task)
      timers.delete(id)
    },
    requestIdleCallback(callback: IdleRequestCallback, options?: IdleRequestOptions) {
      if (!running) return 0
      const id = nextId
      nextId += 1
      scheduleIdleTask(id, callback, options)
      return id
    },
    cancelIdleCallback(id: number) {
      const task = idleTasks.get(id)
      if (!task) return
      clearIdleTask(task)
      idleTasks.delete(id)
    },
    pause,
    resume,
    destroy,
  }
}
