import type { DashboardDataProfile, KpiField } from './dataEngine'

export type Project = {
  id: string
  title: string
  subtitle: string
  route: string
  thumbnail: string
}

export type KpiItem = {
  label: string
  value: string
  unit?: string
  tone?: 'normal' | 'warning' | 'danger'
}

export type PanelMetric = {
  label: string
  value: string
  unit?: string
  status?: 'normal' | 'warning' | 'danger'
}

export type ProcessStep = {
  label: string
  active?: boolean
}

export type DashboardPanel = {
  title: string
  metrics: PanelMetric[]
}

export type DashboardConfig = {
  id: string
  route: string
  systemName: string
  processName: string
  status: string
  environment: string
  video: string
  videoWebm?: string
  thumbnail: string
  kpis: KpiItem[]
  leftPanels: DashboardPanel[]
  rightPanels: DashboardPanel[]
  steps: ProcessStep[]
}

export type DashboardKpiMetric = {
  label: string
  value: string
  unit?: string
  field?: KpiField
}

export type DashboardInfoItem = {
  label: string
  value: string
  unit?: string
  field?: KpiField
  column?: 'left' | 'right'
}

export type DashboardInfoPanel = {
  title: string
  items: DashboardInfoItem[]
  nodeId: string
  titleNodeId: string
  bodyNodeId: string
  layout?: 'default' | 'split' | 'gauge' | 'overview'
  chart?: {
    field: KpiField
    yLabels: string[]
    xLabels: string[]
    min: number
    max: number
  }
  gauge?: {
    value: string
    unit?: string
    label: string
  }
}

export type DashboardFlowSpeedItem = {
  label: string
  value: string
  field: KpiField
}

export type DashboardProcessStep = {
  label: string
  icon: string
  left: number
  arrowLeft: number
  cardNode: string
  iconNode: string
  textNode: string
  arrowNode: string
}

export type DashboardTemplateConfig = DashboardConfig & {
  title: string
  sceneAlt: string
  poster: string
  kpiBar: {
    status: DashboardKpiMetric
    speed: DashboardKpiMetric
    castDuration: DashboardKpiMetric
    furnaceOutput: DashboardKpiMetric
    dayOutput: DashboardKpiMetric
    steel: DashboardKpiMetric
    spec: DashboardKpiMetric
    productionHeat?: DashboardKpiMetric
  }
  leftInfoPanels: DashboardInfoPanel[]
  rightInfoPanels: DashboardInfoPanel[]
  flowSpeedTitle: string
  flowSpeedItems: DashboardFlowSpeedItem[]
  processSteps: DashboardProcessStep[]
  dataProfile: DashboardDataProfile
}
