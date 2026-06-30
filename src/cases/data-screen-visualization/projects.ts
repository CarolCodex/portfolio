import type { Project } from './types'
import { dataScreenAssets } from '@/shared/assets'

const dashboards = dataScreenAssets.images

export const industrialTwinProjects: Project[] = [
  {
    id: 'blast-furnace',
    route: '/cases/gaolu',
    title: '高炉工艺',
    subtitle: '工业可视化大屏',
    thumbnail: dashboards.gaoluDashboard,
  },
  {
    id: 'lf-refining',
    route: '/cases/lf',
    title: '精炼LF炉工艺',
    subtitle: '工业可视化大屏',
    thumbnail: dashboards.lfDashboard,
  },
  {
    id: 'vd-refining',
    route: '/cases/vd',
    title: '精炼VD炉工艺',
    subtitle: '工业可视化大屏',
    thumbnail: dashboards.vdDashboard,
  },
  {
    id: 'converter',
    route: '/cases/zhuanlu',
    title: '转炉工艺',
    subtitle: '工业可视化大屏',
    thumbnail: dashboards.zhuanluDashboard,
  },
  {
    id: 'continuous-casting',
    route: '/cases/lianzhu',
    title: '连铸工艺',
    subtitle: '工业可视化大屏',
    thumbnail: dashboards.lianzhuDashboard,
  },
]
