export type WorkflowStepIcon = 'brief' | 'draft' | 'refine' | 'code' | 'inspect' | 'connect' | 'fix' | 'commit'

export type WorkflowStep = {
  title: string
  description: string
  icon: WorkflowStepIcon
}
