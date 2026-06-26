import type { Project } from './types'

const lianzhuThumbnail = '/case-assets/data-screen-visualization/lianzhu-dashboard.png'
const gaoluThumbnail = '/case-assets/data-screen-visualization/gaolu-dashboard.png'
const lfThumbnail = '/case-assets/data-screen-visualization/lf-dashboard.png'
const vdThumbnail = '/case-assets/data-screen-visualization/vd-dashboard.png'
const zhuanluThumbnail = '/case-assets/data-screen-visualization/zhuanlu-dashboard.png'

export const industrialTwinProjects: Project[] = [
  {
    id: 'continuous-casting',
    route: '/cases/lianzhu',
    title: '连铸工艺',
    subtitle: '工业可视化大屏',
    thumbnail: lianzhuThumbnail,
  },
  {
    id: 'blast-furnace',
    route: '/cases/gaolu',
    title: '高炉工艺',
    subtitle: '工业可视化大屏',
    thumbnail: gaoluThumbnail,
  },
  {
    id: 'lf-refining',
    route: '/cases/lf',
    title: '精炼LF炉工艺',
    subtitle: '工业可视化大屏',
    thumbnail: lfThumbnail,
  },
  {
    id: 'vd-refining',
    route: '/cases/vd',
    title: '精炼VD炉工艺',
    subtitle: '工业可视化大屏',
    thumbnail: vdThumbnail,
  },
  {
    id: 'converter',
    route: '/cases/zhuanlu',
    title: '转炉工艺',
    subtitle: '工业可视化大屏',
    thumbnail: zhuanluThumbnail,
  },
]
