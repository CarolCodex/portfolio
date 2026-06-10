const activityBase = '/case-assets/liangxuan-mini-program/demo-activity-assets'
const imageBase = `${activityBase}/images`
const iconBase = `${activityBase}/icons`

export type ActivityType = 'hot' | 'group' | 'presale' | 'seckill'

export interface ActivityTab {
  type: ActivityType
  label: string
}

export interface ActivityHero {
  title: string
  subtitle: string
  tag: string
  banner: string
}

export interface ActivityFeatureProduct {
  id: number
  name: string
  tag: string
  price: string
  image: string
}

export interface ActivityHeroSlide {
  id: ActivityType
  type: ActivityType
  title: string
  subtitle: string
  tag: string
  bannerImage: string
  cards: ActivityFeatureProduct[]
}

export interface ActivityProduct {
  id: number
  name: string
  description: string
  price: string
  originalPrice?: string
  image: string
  tag?: string
  rank?: string
  soldText?: string
  badge?: string
  groupSize?: string
  service?: string
  actionText?: string
  deposit?: string
  discount?: string
  steps?: Array<{ label: string; note: string }>
  progress?: number
  stockText?: string
  countdown?: [string, string, string]
  waiting?: boolean
}

export const activityIcons = {
  arrowLeft: `${iconBase}/arrow-left.svg`,
  cart: `${iconBase}/cart.svg`,
  plus: `${iconBase}/plus.svg`,
  bolt: `${iconBase}/bolt.svg`,
  clock: `${iconBase}/clock.svg`,
  users: `${iconBase}/users.svg`,
  shield: `${iconBase}/shield.svg`,
}

export const activityTabs: ActivityTab[] = [
  { type: 'group', label: '团购商品' },
  { type: 'presale', label: '预售商品' },
  { type: 'seckill', label: '秒杀商品' },
  { type: 'hot', label: '热卖商品' },
]

export const filterTabs = ['全部', '时令蔬菜', '肉禽蛋品', '海鲜水产', '乳品烘焙', '酒水饮料']

export const activityHeroSlides: ActivityHeroSlide[] = [
  {
    id: 'hot',
    type: 'hot',
    title: '热卖商品',
    subtitle: '精选好物 · 超值特惠',
    tag: '限时',
    bannerImage: `${imageBase}/banner-hot.webp`,
    cards: [
      { id: 1, name: '泰国进口 金枕榴莲肉', tag: '热卖商品', price: '298', image: `${imageBase}/product-durian-slice.png` },
      { id: 2, name: '新鲜红肉蜜柚 2只约2.5kg', tag: '热卖商品', price: '99', image: `${imageBase}/product-pomelo.png` },
      { id: 3, name: '散养土鸡蛋 30枚装', tag: '热卖商品', price: '25.8', image: '/case-assets/liangxuan-mini-program/demo-home-assets/product-eggs.png' },
      { id: 4, name: '精选澳洲原切西冷牛排 200g', tag: '热卖商品', price: '39.9', image: `${imageBase}/product-steak.png` },
      { id: 5, name: '有机水培生菜 300g/袋', tag: '热卖商品', price: '8.9', image: '/case-assets/liangxuan-mini-program/demo-category-assets/images/product-lettuce.jpg' },
      { id: 6, name: '智利车厘子JJ级 500g', tag: '热卖商品', price: '39.9', image: `${imageBase}/product-cherry.png` },
      { id: 7, name: '新鲜山东红富士苹果 5kg', tag: '热卖商品', price: '19.9', image: `${imageBase}/product-apple.png` },
      { id: 8, name: '阳澄湖大闸蟹 4对装', tag: '热卖商品', price: '248', image: `${imageBase}/product-crab.png` },
    ],
  },
  {
    id: 'group',
    type: 'group',
    title: '团购商品',
    subtitle: '精选好物 · 超值特惠',
    tag: '限时',
    bannerImage: `${imageBase}/banner-group.webp`,
    cards: [
      { id: 9, name: '新鲜山东红富士苹果 5kg一箱', tag: '团购商品', price: '19.9-29.9', image: `${imageBase}/product-apple-box.png` },
      { id: 10, name: '泰国金枕头榴莲 3-4kg', tag: '团购商品', price: '139', image: `${imageBase}/product-durian.png` },
      { id: 11, name: '锦香粽子礼盒（12粽）', tag: '团购商品', price: '99', image: `${imageBase}/product-mooncake.png` },
      { id: 12, name: '智利车厘子JJ级 1kg', tag: '团购商品', price: '89', image: `${imageBase}/product-cherry.png` },
      { id: 13, name: '精选澳洲西冷牛排 200g', tag: '团购商品', price: '39.9', image: `${imageBase}/product-steak.png` },
      { id: 14, name: '南美白对虾 1.5kg', tag: '团购商品', price: '88', image: `${imageBase}/product-shrimp.png` },
      { id: 15, name: '海南海口火山岩荔枝王', tag: '团购商品', price: '99', image: `${imageBase}/product-lychee.png` },
      { id: 16, name: '阳澄湖大闸蟹 礼券', tag: '团购商品', price: '248', image: `${imageBase}/product-crab.png` },
    ],
  },
  {
    id: 'presale',
    type: 'presale',
    title: '预售商品',
    subtitle: '精选好物 · 超值特惠',
    tag: '限时',
    bannerImage: `${imageBase}/banner-presale.webp`,
    cards: [
      { id: 17, name: '阳澄湖大闸蟹 礼券 4对装', tag: '预售特惠', price: '298', image: `${imageBase}/product-crab.png` },
      { id: 18, name: '中秋限定 广式月饼 8枚礼盒', tag: '预售特惠', price: '99', image: `${imageBase}/product-mooncake.png` },
      { id: 19, name: '海南海口火山岩荔枝王', tag: '预售特惠', price: '298', image: `${imageBase}/product-lychee.png` },
      { id: 20, name: '智利车厘子JJ级 1kg', tag: '预售特惠', price: '99', image: `${imageBase}/product-cherry.png` },
      { id: 21, name: '泰国金枕头榴莲 3-4kg', tag: '预售特惠', price: '139', image: `${imageBase}/product-durian.png` },
      { id: 22, name: '新鲜山东红富士苹果 5kg', tag: '预售特惠', price: '19.9', image: `${imageBase}/product-apple.png` },
      { id: 23, name: '南美白对虾 1.5kg', tag: '预售特惠', price: '88', image: `${imageBase}/product-shrimp.png` },
      { id: 24, name: '精选澳洲西冷牛排 200g', tag: '预售特惠', price: '39.9', image: `${imageBase}/product-steak.png` },
    ],
  },
  {
    id: 'seckill',
    type: 'seckill',
    title: '秒杀商品',
    subtitle: '手慢无 · 限时疯狂抢',
    tag: '限时',
    bannerImage: `${imageBase}/banner-seckill.webp`,
    cards: [
      { id: 25, name: '南美白对虾 净重1.5kg/盒', tag: '秒杀商品', price: '298', image: `${imageBase}/product-shrimp.png` },
      { id: 26, name: '精选澳洲原切谷饲西冷牛排', tag: '秒杀商品', price: '29.9', image: `${imageBase}/product-steak.png` },
      { id: 27, name: '单冻小龙虾尾700g', tag: '秒杀商品', price: '29.9', image: `${imageBase}/product-shrimp.png` },
      { id: 28, name: '智利进口车厘子 JJ级 1kg', tag: '秒杀商品', price: '99', image: `${imageBase}/product-cherry.png` },
      { id: 29, name: '泰国金枕头榴莲 2.5kg', tag: '秒杀商品', price: '139', image: `${imageBase}/product-durian.png` },
      { id: 30, name: '新鲜红肉蜜柚 2只约2.5kg', tag: '秒杀商品', price: '19.9', image: `${imageBase}/product-pomelo.png` },
      { id: 31, name: '散养土鸡蛋 30枚装', tag: '秒杀商品', price: '25.8', image: '/case-assets/liangxuan-mini-program/demo-home-assets/product-eggs.png' },
      { id: 32, name: '阳澄湖大闸蟹 4对装', tag: '秒杀商品', price: '248', image: `${imageBase}/product-crab.png` },
    ],
  },
]

export const activityProducts: Record<ActivityType, ActivityProduct[]> = {
  hot: [
    {
      id: 101,
      rank: 'TOP 1',
      name: '泰国进口 金枕榴莲肉 500g',
      description: '果肉脆甜，核小肉厚，产地直采',
      tag: '近7天爆卖 2.5万件',
      price: '39.9',
      image: `${imageBase}/product-durian-slice.png`,
    },
    {
      id: 102,
      rank: 'TOP 2',
      name: '新鲜红肉蜜柚 2只约2.5kg',
      description: '皮薄多汁，酸甜可口，富含维C',
      tag: '月销 3000+',
      price: '19.9',
      image: `${imageBase}/product-pomelo.png`,
    },
    {
      id: 103,
      rank: 'TOP 3',
      name: '散养土鸡蛋 30枚装',
      description: '农家散养，蛋黄晶莹，营养丰富',
      tag: '月销 1万+',
      price: '25.8',
      image: '/case-assets/liangxuan-mini-program/demo-home-assets/product-eggs.png',
    },
    {
      id: 104,
      rank: 'TOP 4',
      name: '精选澳洲原切谷饲西冷牛排 200g',
      description: '原肉原切，拒绝拼接，鲜嫩多汁',
      tag: '本周热卖 5000+件',
      price: '39.9',
      image: `${imageBase}/product-steak.png`,
    },
    {
      id: 105,
      rank: 'TOP 5',
      name: '有机水培生菜 300g/袋',
      description: '无土栽培，鲜嫩爽脆',
      tag: '人气飙升中',
      price: '8.9',
      image: '/case-assets/liangxuan-mini-program/demo-category-assets/images/product-lettuce.jpg',
    },
  ],
  group: [
    {
      id: 201,
      groupSize: '2人团',
      name: '新鲜山东红富士苹果 5kg一箱',
      description: '脆甜多汁 现采现发',
      service: '次日达',
      soldText: '已拼 1250 件',
      originalPrice: '39.9',
      price: '19.9-29.9',
      image: `${imageBase}/product-apple-box.png`,
      actionText: '加入购物车',
    },
    {
      id: 202,
      groupSize: '3人团',
      name: '泰国金枕头榴莲 A级果 3-4kg',
      description: '产地直达 肉质软糯',
      service: '京东冷链',
      soldText: '已拼 840 件',
      originalPrice: '199',
      price: '139',
      image: `${imageBase}/product-durian.png`,
      actionText: '加入购物车',
    },
  ],
  presale: [
    {
      id: 301,
      name: '阳澄湖大闸蟹 礼券 4对装',
      description: '正宗鲜活，秋日尝鲜',
      badge: '预售',
      soldText: '预售中',
      deposit: '定金 ¥50',
      discount: '抵扣 ¥100',
      originalPrice: '298',
      price: '248',
      image: `${imageBase}/product-crab.png`,
      actionText: '付定金',
      steps: [
        { label: '付定金', note: '立省¥50' },
        { label: '付尾款', note: '09-18 20:00' },
        { label: '发货', note: '预计09-20' },
      ],
    },
    {
      id: 302,
      name: '中秋限定 广式月饼 8枚礼盒',
      description: '团圆礼赠，限时预订',
      badge: '预售',
      soldText: '即将结束',
      deposit: '定金 ¥20',
      discount: '抵扣 ¥40',
      originalPrice: '119',
      price: '99',
      image: `${imageBase}/product-mooncake.png`,
      actionText: '付定金',
      steps: [
        { label: '付定金', note: '立省¥20' },
        { label: '付尾款', note: '09-10 00:00' },
        { label: '发货', note: '预计09-15' },
      ],
    },
  ],
  seckill: [
    {
      id: 401,
      name: '南美白对虾 净重1.5kg/盒（约60-80只）产地直达海鲜水产',
      description: '产地直达 海鲜水产',
      badge: '限时抢',
      soldText: '正在秒杀',
      stockText: '仅剩 28 件',
      progress: 72,
      countdown: ['00', '18', '42'],
      originalPrice: '128',
      price: '88',
      image: `${imageBase}/product-shrimp.png`,
      actionText: '马上抢',
    },
    {
      id: 402,
      name: '精选澳洲原切谷饲西冷牛排 200g/袋 鲜嫩多汁顺滑',
      description: '鲜嫩多汁，原切牛排',
      badge: '限时抢',
      soldText: '正在秒杀',
      stockText: '仅剩 156 件',
      progress: 42,
      countdown: ['00', '05', '12'],
      originalPrice: '69.9',
      price: '39.9',
      image: `${imageBase}/product-steak.png`,
      actionText: '马上抢',
    },
    {
      id: 403,
      name: '智利进口车厘子 JJ级 1kg原箱礼盒 现货特惠',
      description: '原箱直采，现货特惠',
      badge: '即将开抢',
      soldText: '即将开始',
      stockText: '限量 300 件',
      progress: 0,
      countdown: ['01', '26', '35'],
      originalPrice: '159',
      price: '99',
      image: `${imageBase}/product-cherry.png`,
      actionText: '等待开始',
      waiting: true,
    },
    {
      id: 404,
      name: '泰国金枕头榴莲 2.5kg-3kg/个 产地直发保熟',
      description: '产地直发 保熟包甜',
      badge: '即将开抢',
      soldText: '即将开始',
      stockText: '限量 180 件',
      progress: 0,
      countdown: ['03', '45', '10'],
      originalPrice: '189',
      price: '168',
      image: `${imageBase}/product-durian.png`,
      actionText: '等待开始',
      waiting: true,
    },
  ],
}
