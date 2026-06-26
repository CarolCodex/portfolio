import { createDashboardDataProfile } from './dataEngine'
import type {
  DashboardConfig,
  DashboardInfoPanel,
  DashboardProcessStep,
  DashboardTemplateConfig,
} from './types'

const thumbnail = '/case-assets/data-screen-visualization/cover-dashboard.png'
const videoBase = '/case-assets/data-screen-visualization/videos'
const processIconBase = '/case-assets/data-screen-visualization/process'

const nodeSets = {
  leftA: { nodeId: '1:4191', titleNodeId: '1:4183', bodyNodeId: '1:4127' },
  leftB: { nodeId: '1:4192', titleNodeId: '1:4207', bodyNodeId: '1:4193' },
  rightA: { nodeId: '1:4193', titleNodeId: '1:4208', bodyNodeId: '1:4194' },
  rightB: { nodeId: '1:4194', titleNodeId: '1:4209', bodyNodeId: '1:4195' },
} as const

const createPanel = (
  title: string,
  items: DashboardInfoPanel['items'],
  nodeSet: typeof nodeSets[keyof typeof nodeSets],
  options: Pick<DashboardInfoPanel, 'layout' | 'gauge' | 'chart'> = {},
): DashboardInfoPanel => ({
  title,
  items,
  ...nodeSet,
  ...options,
})

const createProcessSteps = (labels: string[]): DashboardProcessStep[] => {
  const geometry = [
    { left: 1.79, arrowLeft: 15.9, cardNode: '1:3753', iconNode: '1:4060', textNode: '1:3761', arrowNode: '1:3885' },
    { left: 18.53, arrowLeft: 32.63, cardNode: '1:3769', iconNode: '1:4019', textNode: '1:3777', arrowNode: '1:3886' },
    { left: 35.26, arrowLeft: 49.36, cardNode: '1:3785', iconNode: '1:4067', textNode: '1:3793', arrowNode: '1:3890' },
    { left: 51.99, arrowLeft: 66.09, cardNode: '1:3801', iconNode: '1:4070', textNode: '1:3809', arrowNode: '1:3894' },
    { left: 68.72, arrowLeft: 82.82, cardNode: '1:3833', iconNode: '1:4073', textNode: '1:3841', arrowNode: '1:3898' },
    { left: 85.45, arrowLeft: 0, cardNode: '1:3849', iconNode: '1:4076', textNode: '1:3857', arrowNode: '' },
  ]

  if (labels.length === 7) {
    return labels.map((label, index) => ({
      label,
      icon: `${processIconBase}/step-${String(index + 1).padStart(2, '0')}.svg?v=2`,
      left: 1.2 + index * 14.3,
      arrowLeft: index < labels.length - 1 ? 13.62 + index * 14.3 : 0,
      cardNode: `process-7-card-${index + 1}`,
      iconNode: `process-7-icon-${index + 1}`,
      textNode: `process-7-text-${index + 1}`,
      arrowNode: index < labels.length - 1 ? `process-7-arrow-${index + 1}` : '',
    }))
  }

  return geometry.map((step, index) => ({
    ...step,
    label: labels[index],
    icon: `${processIconBase}/step-${String(index + 1).padStart(2, '0')}.svg?v=2`,
  }))
}

const createGaoluProcessSteps = (labels: string[]): DashboardProcessStep[] => {
  const cardWidth = 13.65
  const edgeGap = 1.35
  const stepGap = (100 - edgeGap * 2 - cardWidth * labels.length) / (labels.length - 1)
  const arrowWidth = 1.47

  return labels.map((label, index) => {
    const left = edgeGap + index * (cardWidth + stepGap)
    const arrowLeft = index < labels.length - 1
      ? left + cardWidth + stepGap / 2 - arrowWidth / 2
      : 0

    return {
      label,
      left,
      arrowLeft,
      cardNode: `gaolu-process-card-${index + 1}`,
      iconNode: `gaolu-process-icon-${index + 1}`,
      textNode: `gaolu-process-text-${index + 1}`,
      arrowNode: index < labels.length - 1 ? `gaolu-process-arrow-${index + 1}` : '',
      icon: `${processIconBase}/gaolu-step-${String(index + 1).padStart(2, '0')}.svg?v=1`,
    }
  })
}

const createDashboardConfig = (
  base: Pick<DashboardTemplateConfig, 'id' | 'route' | 'processName' | 'title' | 'poster' | 'kpiBar' | 'leftInfoPanels' | 'rightInfoPanels' | 'flowSpeedTitle' | 'processSteps' | 'dataProfile'>,
): DashboardTemplateConfig => ({
  ...base,
  sceneAlt: `${base.processName}数字孪生主视觉`,
  systemName: `${base.processName}数字孪生系统`,
  status: '系统运行正常',
  environment: '28.6°C / 62%RH / 2.1m/s',
  video: `${videoBase}/${base.id}.mp4`,
  thumbnail,
  kpis: [],
  leftPanels: [],
  rightPanels: [],
  steps: [],
  flowSpeedItems: [
    { label: '1流', value: '1.68', field: 'flowSpeed0' },
    { label: '2流', value: '1.66', field: 'flowSpeed1' },
    { label: '3流', value: '1.69', field: 'flowSpeed2' },
    { label: '4流', value: '1.67', field: 'flowSpeed3' },
    { label: '5流', value: '1.70', field: 'flowSpeed4' },
    { label: '6流', value: '1.68', field: 'flowSpeed5' },
  ],
})

export const dashboardConfigs: DashboardTemplateConfig[] = [
  createDashboardConfig({
    id: 'lianzhu',
    route: '/cases/lianzhu',
    processName: '连铸工艺',
    title: '5G+全连接智慧工厂-连铸系统',
    poster: '/case-assets/data-screen-visualization/lianzhu-scene.png',
    kpiBar: {
      status: { label: '生成状态', value: '运行中' },
      speed: { label: '铸机拉速', value: '1.68', unit: 'm/min', field: 'speed' },
      castDuration: { label: '本炉浇铸时间', value: '00:18:32', field: 'castDuration' },
      furnaceOutput: { label: '本炉次产量', value: '108.6', unit: 't', field: 'furnaceOutput' },
      dayOutput: { label: '日累计产量', value: '2453.6', unit: 't', field: 'dayOutput' },
      steel: { label: '钢种', value: 'CrMoV4' },
      spec: { label: '断面规格', value: '150*150', unit: 'mm' },
    },
    leftInfoPanels: [
      createPanel('重量信息', [
        { label: '大包重量', value: '108.6', unit: 't', field: 'ladleWeight' },
        { label: '中间包重量', value: '45.8', unit: 't', field: 'tundishWeight' },
        { label: '钢种', value: 'CrMoV4' },
      ], nodeSets.leftA),
      createPanel('温度信息', [
        { label: '大包温度', value: '1535.1', unit: '°C', field: 'ladleTemperature' },
        { label: '中间包温度', value: '1531.7', unit: '°C', field: 'tundishTemperature' },
        { label: '压力', value: '0.82', unit: 'MPa', field: 'pressure' },
      ], nodeSets.leftB),
    ],
    rightInfoPanels: [
      createPanel('设备状态', [
        { label: '结晶器液位', value: '72.4', unit: '%' },
        { label: '冷却水状态', value: '正常' },
        { label: '拉矫机状态', value: '联动' },
      ], nodeSets.rightA),
      createPanel('质量监控', [
        { label: '表面温差', value: '3.2', unit: '°C' },
        { label: '节拍达成', value: '96.2', unit: '%' },
        { label: '异常告警', value: '0', unit: '项' },
      ], nodeSets.rightB),
    ],
    flowSpeedTitle: '各流拉速（m/min)',
    processSteps: createProcessSteps(['01 钢水接收', '02 结晶凝固', '03 二次冷却', '04 拉矫矫直', '05 切割定尺', '06 成品输送']),
    dataProfile: createDashboardDataProfile(),
  }),
  createDashboardConfig({
    id: 'gaolu',
    route: '/cases/gaolu',
    processName: '高炉工艺',
    title: '5G+全连接智慧工厂-高炉系统',
    poster: '/case-assets/data-screen-visualization/gaolu-scene.png',
    kpiBar: {
      status: { label: '炉况状态', value: '稳定' },
      speed: { label: '风量', value: '4312', unit: 'm³/min', field: 'speed' },
      castDuration: { label: '本炉运行时间', value: '08:42:37', field: 'castDuration' },
      furnaceOutput: { label: '当前铁水量', value: '331.2', unit: 't', field: 'furnaceOutput' },
      dayOutput: { label: '日累计铁量', value: '7277.0', unit: 't', field: 'dayOutput' },
      steel: { label: '炉料结构', value: '焦矿比4.8' },
      spec: { label: '顶压', value: '230.6', unit: 'kPa' },
    },
    leftInfoPanels: [
      createPanel('炉顶压力', [
        { label: '冷风压力', value: '445', unit: 'Kpa' },
        { label: '热风压力', value: '430', unit: 'Kpa' },
        { label: '压差', value: '190', unit: 'Kpa' },
      ], nodeSets.leftA),
      createPanel('温度监测', [
        { label: '炉顶温度', value: '242', unit: '°C' },
        { label: '热风温度', value: '1250', unit: '°C' },
        { label: '煤气温度', value: '335', unit: '°C' },
      ], nodeSets.leftB, {
        chart: {
          field: 'ladleTemperature',
          yLabels: ['1400', '700', '0'],
          xLabels: ['00:00', '06:00', '12:00', '18:00', '24:00'],
          min: 0,
          max: 1400,
        },
      }),
      createPanel('炉况总览', [
        { label: '连续稳定运行', value: '15天12小时' },
        { label: '综合炉况指数', value: '92.6' },
        { label: '异常报警', value: '0' },
        { label: '设备完好率', value: '98.6%' },
      ], nodeSets.rightA, {
        layout: 'overview',
        gauge: { label: '炉况健康', value: '优良', unit: '运行稳定' },
      }),
    ],
    rightInfoPanels: [
      createPanel('设备状态', [
        { label: '送风系统', value: '正常' },
        { label: '炉顶系统', value: '稳定' },
        { label: '出铁沟', value: '待命' },
      ], nodeSets.rightA),
      createPanel('质量监控', [
        { label: '铁水硅含量', value: '0.42', unit: '%' },
        { label: '节拍达成', value: '95.6', unit: '%' },
        { label: '异常告警', value: '1', unit: '项' },
      ], nodeSets.rightB),
    ],
    flowSpeedTitle: '风口风速（m/s)',
    processSteps: createGaoluProcessSteps(['01 炉况总览', '02 原料与冶炼', '03 鼓风与煤气', '04 冷却与水系统', '05 能耗与效率', '06 报警与事件']),
    dataProfile: createDashboardDataProfile({
      castSeconds: 8 * 3600 + 42 * 60 + 37,
      speed: { initial: 4312, min: 4200, max: 4360, step: 24, digits: 0 },
      furnaceOutput: { initial: 331.2, min: 300, max: 380, step: 0.8, digits: 1, mode: 'trend', trendStep: [0.2, 0.8] },
      dayOutput: { initial: 7277, min: 7200, max: 7800, step: 2.4, digits: 1, mode: 'trend', trendStep: [1.2, 2.4] },
      ladleWeight: { initial: 69.4, min: 64, max: 72, step: 0.6, digits: 1 },
      tundishWeight: { initial: 22.4, min: 21, max: 25, step: 0.3, digits: 1 },
      ladleTemperature: { initial: 1250, min: 1238, max: 1264, step: 4, digits: 0 },
      tundishTemperature: { initial: 242, min: 232, max: 252, step: 2.8, digits: 0 },
      pressure: { initial: 230.6, min: 226, max: 238, step: 1.4, digits: 1 },
      flow: { initial: [24.56, 25.09, 24.5, 25.33, 24.72, 25.01], min: 23.8, max: 26.1, step: 0.18 },
    }),
  }),
  createDashboardConfig({
    id: 'lf',
    route: '/cases/lf',
    processName: '精炼LF炉工艺',
    title: '5G+全连接智慧工厂-精炼LF炉系统',
    poster: '/case-assets/data-screen-visualization/scenes/lf-scene.png',
    kpiBar: {
      status: { label: '精炼状态', value: '升温中' },
      speed: { label: '电极功率', value: '32.6', unit: 'MW', field: 'speed' },
      castDuration: { label: '本炉精炼时间', value: '00:28:44', field: 'castDuration' },
      furnaceOutput: { label: '钢水重量', value: '106.8', unit: 't', field: 'furnaceOutput' },
      dayOutput: { label: '日累计处理量', value: '1840.5', unit: 't', field: 'dayOutput' },
      steel: { label: '钢种', value: 'Q355B' },
      spec: { label: '目标温度', value: '1605', unit: '°C' },
    },
    leftInfoPanels: [
      createPanel('电气参数', [
        { label: 'A相相电压', value: '4.40', unit: 'kV', column: 'left' },
        { label: 'B相相电压', value: '4.40', unit: 'kV', column: 'left' },
        { label: 'C相相电压', value: '4.40', unit: 'kV', column: 'left' },
        { label: 'A相弧电压', value: '-4.05', unit: 'kV', column: 'left' },
        { label: 'B相弧电压', value: '-3.75', unit: 'kV', column: 'left' },
        { label: 'C相弧电压', value: '-3.50', unit: 'kV', column: 'left' },
        { label: 'A相控制输出', value: '-9539.00', unit: 'A', column: 'right' },
        { label: 'B相控制输出', value: '-8847.00', unit: 'A', column: 'right' },
        { label: 'C相控制输出', value: '-8018.00', unit: 'A', column: 'right' },
        { label: '1#工位有功电度', value: '0.00', unit: 'KVA', column: 'right' },
        { label: '2#工位有功电度', value: '0.00', unit: 'KVA', column: 'right' },
      ], nodeSets.leftA, { layout: 'split' }),
      createPanel('电流监测', [
        { label: '一次A相电流', value: '1.27', unit: 'A', column: 'left' },
        { label: '一次B相电流', value: '0.00', unit: 'A', column: 'left' },
        { label: '一次C相电流', value: '0.00', unit: 'A', column: 'left' },
        { label: '一次N相电流', value: '0.00', unit: 'A', column: 'left' },
      ], nodeSets.leftB, { layout: 'gauge', gauge: { value: '1.27', unit: 'A', label: '总电流' } }),
    ],
    rightInfoPanels: [
      createPanel('设备状态', [
        { label: '电极系统', value: '自动' },
        { label: '氩吹系统', value: '正常' },
        { label: '喂线系统', value: '待命' },
      ], nodeSets.rightA),
      createPanel('质量监控', [
        { label: '硫含量', value: '0.012', unit: '%' },
        { label: '温度命中率', value: '97.4', unit: '%' },
        { label: '异常告警', value: '0', unit: '项' },
      ], nodeSets.rightB),
    ],
    flowSpeedTitle: '氩气流量（Nm³/h)',
    processSteps: createProcessSteps(['01 钢包就位', '02 通电升温', '03 氩吹搅拌', '04 合金微调', '05 温度测量', '06 出站转运']),
    dataProfile: createDashboardDataProfile({
      castSeconds: 28 * 60 + 44,
      speed: { initial: 32.6, min: 29.8, max: 35.4, step: 0.7, digits: 1 },
      furnaceOutput: { initial: 106.8, min: 96, max: 118, step: 0.3, digits: 1 },
      dayOutput: { initial: 1840.5, min: 1800, max: 2100, step: 0.9, digits: 1, mode: 'trend', trendStep: [0.3, 0.9] },
      ladleWeight: { initial: 106.8, min: 96, max: 118, step: 0.4, digits: 1 },
      tundishWeight: { initial: 3.6, min: 2.8, max: 4.6, step: 0.12, digits: 1 },
      ladleTemperature: { initial: 1588.4, min: 1578, max: 1608, step: 3.6, digits: 1 },
      tundishTemperature: { initial: 1562.8, min: 1554, max: 1576, step: 2.8, digits: 1 },
      pressure: { initial: 0.46, min: 0.4, max: 0.52, step: 0.015, digits: 2 },
      flow: { initial: [18.6, 19.1, 18.8, 18.4, 19.3, 18.9], min: 17.8, max: 19.8, step: 0.14 },
    }),
  }),
  createDashboardConfig({
    id: 'vd',
    route: '/cases/vd',
    processName: '精炼VD炉工艺',
    title: '5G+全连接智慧工厂-精炼VD炉系统',
    poster: '/case-assets/data-screen-visualization/scenes/vd-scene.png',
    kpiBar: {
      status: { label: '生产状态', value: '运行中' },
      speed: { label: '抽真空计时', value: '00:17:49' },
      castDuration: { label: '保真空计时(<67Pa)', value: '17:49' },
      furnaceOutput: { label: '当前真空度', value: '0.0', unit: 'kPa', field: 'furnaceOutput' },
      dayOutput: { label: '高真空度', value: '1000.0', unit: 'Pa', field: 'dayOutput' },
      steel: { label: '泵侧全程真空度', value: '100.0', unit: 'kPa' },
      spec: { label: '氩气累计(本炉)', value: '10.9', unit: 'm³/h' },
      productionHeat: { label: '生产炉次', value: 'VD2025051308' },
    },
    leftInfoPanels: [
      createPanel('真空系统状态', [
        { label: '高真空度', value: '1000.0', unit: 'Pa' },
        { label: '泵侧全程真空度', value: '100.0', unit: 'kPa' },
        { label: '保真空计时(<67Pa)', value: '17:49' },
        { label: '抽真空计时', value: '00:17:49' },
      ], nodeSets.leftA),
    ],
    rightInfoPanels: [
      createPanel('氩气用量记录', [
        { label: '1#累计', value: '0.2', unit: 'm³/h' },
        { label: '1#本炉', value: '10.9', unit: 'm³/h' },
        { label: '2#累计', value: '15.9', unit: 'm³/h' },
        { label: '2#本炉', value: '22.9', unit: 'm³/h' },
      ], nodeSets.rightA),
    ],
    flowSpeedTitle: '底吹流量（Nm³/h)',
    processSteps: createProcessSteps(['01 装料合盖', '02 抽真空', '03 保真空', '04 加热精炼', '05 扩散脱气', '06 真空破除', '07 出炉']),
    dataProfile: createDashboardDataProfile({
      castSeconds: 17 * 60 + 49,
      speed: { initial: 68.4, min: 58, max: 76, step: 1.8, digits: 1 },
      furnaceOutput: { initial: 0, min: 0, max: 0.3, step: 0.02, digits: 1 },
      dayOutput: { initial: 1000, min: 998, max: 1002, step: 0.2, digits: 1 },
      ladleWeight: { initial: 106.2, min: 96, max: 116, step: 0.32, digits: 1 },
      tundishWeight: { initial: 4.8, min: 3.8, max: 5.6, step: 0.12, digits: 1 },
      ladleTemperature: { initial: 1542, min: 1532, max: 1554, step: 2.8, digits: 1 },
      tundishTemperature: { initial: 1536.4, min: 1528, max: 1548, step: 2.4, digits: 1 },
      pressure: { initial: 0.18, min: 0.14, max: 0.22, step: 0.01, digits: 2 },
      flow: { initial: [12.8, 13.1, 12.6, 12.9, 13.3, 12.7], min: 11.8, max: 13.8, step: 0.12 },
    }),
  }),
  createDashboardConfig({
    id: 'zhuanlu',
    route: '/cases/zhuanlu',
    processName: '转炉工艺',
    title: '5G+全连接智慧工厂-转炉系统',
    poster: '/case-assets/data-screen-visualization/scenes/zhuanlu-scene.png',
    kpiBar: {
      status: { label: '吹炼状态', value: '进行中' },
      speed: { label: '供氧流量', value: '28400', unit: 'Nm³/h', field: 'speed' },
      castDuration: { label: '本炉吹炼时间', value: '00:15:46', field: 'castDuration' },
      furnaceOutput: { label: '钢水重量', value: '112.8', unit: 't', field: 'furnaceOutput' },
      dayOutput: { label: '日累计钢量', value: '2588.2', unit: 't', field: 'dayOutput' },
      steel: { label: '钢种', value: 'HRB400E' },
      spec: { label: '氧枪高度', value: '1.24', unit: 'm' },
    },
    leftInfoPanels: [
      createPanel('吹炼参数', [
        { label: '枪位高度', value: '1.24', unit: 'm', field: 'pressure' },
        { label: '炉口温度', value: '1684.0', unit: '°C', field: 'ladleTemperature' },
        { label: '烟气温度', value: '1438.0', unit: '°C', field: 'tundishTemperature' },
      ], nodeSets.leftA),
      createPanel('重量信息', [
        { label: '钢水重量', value: '112.8', unit: 't', field: 'ladleWeight' },
        { label: '废钢加入量', value: '31.6', unit: 't', field: 'tundishWeight' },
        { label: '钢种', value: 'HRB400E' },
      ], nodeSets.leftB),
    ],
    rightInfoPanels: [
      createPanel('设备状态', [
        { label: '氧枪系统', value: '自动' },
        { label: '副枪系统', value: '待命' },
        { label: '除尘系统', value: '运行' },
      ], nodeSets.rightA),
      createPanel('质量监控', [
        { label: '终点碳预测', value: '0.052', unit: '%' },
        { label: '命中率', value: '96.8', unit: '%' },
        { label: '异常告警', value: '0', unit: '项' },
      ], nodeSets.rightB),
    ],
    flowSpeedTitle: '氧枪支路流量（Nm³/h)',
    processSteps: createProcessSteps(['01 铁水兑入', '02 废钢装入', '03 氧枪吹炼', '04 副枪检测', '05 出钢合金化', '06 炉后转运']),
    dataProfile: createDashboardDataProfile({
      castSeconds: 15 * 60 + 46,
      speed: { initial: 28400, min: 27600, max: 29200, step: 180, digits: 0 },
      furnaceOutput: { initial: 112.8, min: 104, max: 122, step: 0.32, digits: 1 },
      dayOutput: { initial: 2588.2, min: 2500, max: 2860, step: 1.1, digits: 1, mode: 'trend', trendStep: [0.4, 1.1] },
      ladleWeight: { initial: 112.8, min: 104, max: 122, step: 0.36, digits: 1 },
      tundishWeight: { initial: 31.6, min: 28, max: 36, step: 0.4, digits: 1 },
      ladleTemperature: { initial: 1684, min: 1668, max: 1704, step: 4.5, digits: 1 },
      tundishTemperature: { initial: 1438, min: 1418, max: 1462, step: 4.2, digits: 1 },
      pressure: { initial: 1.24, min: 1.08, max: 1.42, step: 0.04, digits: 2 },
      flow: { initial: [4720, 4680, 4750, 4660, 4790, 4710], min: 4560, max: 4860, step: 28 },
    }),
  }),
]

export const getDashboardConfig = (id: string) => dashboardConfigs.find((config) => config.id === id)

export type { DashboardConfig }
