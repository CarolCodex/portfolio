const caseAsset = (path: string) => `/case-assets/${path.replace(/^\/+/, '')}`
const imageAsset = (path: string) => `/images/${path.replace(/^\/+/, '')}`

export const images = {
  home: {
    heroFolder960: imageAsset('home/hero-folder-960.webp'),
    heroFolder1280: imageAsset('home/hero-folder-1280.webp'),
    heroFolder1600: imageAsset('home/hero-folder-1600.webp'),
    capabilityFrontend: imageAsset('home/capability-frontend-figma.svg'),
    capabilityComponent: imageAsset('home/capability-component-figma.svg'),
    capabilityDashboard: imageAsset('home/capability-dashboard-figma.svg'),
    capabilityInterface: imageAsset('home/capability-interface-figma.svg'),
    capabilityProductUi: imageAsset('home/capability-product-ui-figma.svg'),
  },
  resume: {
    heroCover960: imageAsset('resume/hero-cover-1920-960.jpg'),
    heroCover1280: imageAsset('resume/hero-cover-1920-1280.jpg'),
    heroCover1920: imageAsset('resume/hero-cover-1920.jpg'),
    diplomaPreview: imageAsset('resume/diploma-preview.webp'),
    download: imageAsset('resume/icon-download.svg'),
    analysis: imageAsset('resume/icon-analysis.svg'),
    ui: imageAsset('resume/icon-ui.svg'),
    frontend: imageAsset('resume/icon-frontend.svg'),
    ai: imageAsset('resume/icon-ai.svg'),
  },
} as const

export const heroFolderSrcset = [
  `${images.home.heroFolder960} 960w`,
  `${images.home.heroFolder1280} 1280w`,
  `${images.home.heroFolder1600} 1600w`,
].join(', ')

export const resumeHeroSrcset = [
  `${images.resume.heroCover960} 960w`,
  `${images.resume.heroCover1280} 1280w`,
  `${images.resume.heroCover1920} 1672w`,
].join(', ')

const dataScreen = (path: string) => caseAsset(`data-screen-visualization/${path}`)

export const dataScreenAssets = {
  images: {
    coverDashboard: dataScreen('cover-dashboard.webp'),
    lianzhuDashboard: dataScreen('lianzhu-dashboard.webp'),
    gaoluDashboard: dataScreen('gaolu-dashboard.webp'),
    lfDashboard: dataScreen('lf-dashboard.webp'),
    vdDashboard: dataScreen('vd-dashboard.webp'),
    zhuanluDashboard: dataScreen('zhuanlu-dashboard.webp'),
    lianzhuScene: dataScreen('lianzhu-scene.webp'),
    gaoluScene: dataScreen('gaolu-scene.webp'),
    lfScene: dataScreen('scenes/lf-scene.webp'),
    vdScene: dataScreen('scenes/vd-scene.webp'),
    zhuanluScene: dataScreen('scenes/zhuanlu-scene.webp'),
    coverIconCodex: dataScreen('cover-icon-codex.webp'),
    coverIconFigma: dataScreen('cover-icon-figma.webp'),
    titleBg: dataScreen('lianzhu-title-bg.png'),
    infoTitleBg: dataScreen('info-title-bg.png'),
    infoBoxBottom: dataScreen('info-box-bottom.png'),
    gaoluStatusOverviewBg: dataScreen('gaolu-status-overview-bg.png'),
    coolingWaterTemperature: dataScreen('icons/cooling-water-temperature.svg'),
    processArrow: dataScreen('process/arrow.svg?v=2'),
  },
  videos: {
    lianzhu: dataScreen('videos/lianzhu-720.mp4'),
    gaolu: dataScreen('videos/gaolu-720.mp4'),
    lf: dataScreen('videos/lf.mp4'),
    vd: dataScreen('videos/vd-720.mp4'),
    zhuanlu: dataScreen('videos/zhuanlu-720.mp4'),
  },
  webmVideos: {},
  processIcons: {
    lianzhu: [
      dataScreen('process/step-01.svg?v=2'),
      dataScreen('process/step-02.svg?v=2'),
      dataScreen('process/step-03.svg?v=2'),
      dataScreen('process/step-04.svg?v=2'),
      dataScreen('process/step-05.svg?v=2'),
      dataScreen('process/step-06.svg?v=2'),
      dataScreen('process/step-07.svg?v=2'),
    ],
    gaolu: [
      dataScreen('process/gaolu-step-01.svg?v=2'),
      dataScreen('process/gaolu-step-02.svg?v=2'),
      dataScreen('process/gaolu-step-03.svg?v=2'),
      dataScreen('process/gaolu-step-04.svg?v=2'),
      dataScreen('process/gaolu-step-05.svg?v=2'),
      dataScreen('process/gaolu-step-06.svg?v=2'),
    ],
  },
} as const

export const deviceHealthAsset = (path: string) => caseAsset(`device-health-management-platform/${path}`)
export const liangxuanAsset = (path: string) => caseAsset(`liangxuan-mini-program/${path}`)

export const deviceHealthAssets = {
  cover: deviceHealthAsset('case-cover.png'),
  coverIconStitch: deviceHealthAsset('cover-icon-stitch.png'),
  coverIconGeminiFront: deviceHealthAsset('cover-icon-gemini-front.png'),
  coverIconGeminiBack: deviceHealthAsset('cover-icon-gemini-back.png'),
  loginEye: deviceHealthAsset('login-eye.svg'),
} as const

export const liangxuanAssets = {
  home: liangxuanAsset('liangxuan-home.webp'),
  activity: liangxuanAsset('liangxuan-activity.webp'),
  coverIconRotated: liangxuanAsset('cover-icon-rotated.png'),
  coverIconFront: liangxuanAsset('cover-icon-front.png'),
} as const
