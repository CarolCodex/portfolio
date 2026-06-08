export type SkillGroup = {
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Design',
    items: ['UI Design', 'UED', 'Design System', 'Interaction Flow', 'Dashboard', 'Mini Program'],
  },
  {
    title: 'Frontend',
    items: ['Vue 3', 'TypeScript', 'HTML/CSS', 'Responsive Layout', 'WeChat Mini Program', '.NET MAUI'],
  },
  {
    title: 'AI Workflow',
    items: ['Prompt Design', 'AI Research', 'Wireframe Ideation', 'Image Generation', 'Code Assistant'],
  },
]

export const coreSkills = [
  'UI/UED',
  'Web & Mobile',
  'Vue Frontend',
  'Mini Program',
  'Data Visualization',
  'AI Workflow',
  'Design System',
  'MAUI UI',
]
