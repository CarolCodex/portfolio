import type { ActivityType } from './activity'

const assetBase = '/case-assets/liangxuan-mini-program/demo-home-assets'

export type MiniTabKey = 'home' | 'category' | 'cart' | 'mine'

export interface MiniProduct {
  id: number
  name: string
  description: string
  price: string
  image: string
  tag?: string
  imageHeight?: number
}

export interface ChannelTab {
  id: 'hot' | 'dragon-boat' | 'summer' | 'seasonal' | 'meals'
  title: string
  subtitle: string
}

export interface HomeBanner {
  id: string
  image: string
  alt: string
}

export interface PromoCard {
  id: string
  title: string
  titleImage: string
  titleImageWidth: number
  titleImageHeight: number
  subtitle: string
  badge: string
  badgeTone: string
  gradient: string
  titleTone?: boolean | string
  activityType: ActivityType
  products: Array<{ image: string; priceMain: string; priceDecimal: string }>
}

const categoryAssetBase = '/case-assets/liangxuan-mini-program/demo-category-assets'
const bannerAssetBase = `${assetBase}/banners`

export const miniTabs: Array<{ key: MiniTabKey; label: string; icon: string }> = [
  { key: 'home', label: '首页', icon: `${categoryAssetBase}/icons/tab-home.svg` },
  { key: 'category', label: '分类', icon: `${categoryAssetBase}/icons/tab-category.svg` },
  { key: 'cart', label: '购物车', icon: `${categoryAssetBase}/icons/tab-cart.svg` },
  { key: 'mine', label: '我的', icon: `${categoryAssetBase}/icons/tab-user.svg` },
]

export const newbieProducts: MiniProduct[] = [
  { id: 101, name: '有机青菜', description: '新人价', price: '9.9', image: `${assetBase}/newbie-veg.png`, tag: '新人价' },
  { id: 102, name: '新鲜车厘子', description: '新人价', price: '12.8', image: `${assetBase}/newbie-cherry.png`, tag: '新人价' },
  { id: 103, name: '精选牛肉', description: '新人价', price: '29.9', image: `${assetBase}/newbie-beef.png`, tag: '新人价' },
  { id: 104, name: '农家鸡蛋', description: '新人价', price: '15.8', image: `${assetBase}/newbie-egg.png`, tag: '新人价' },
]

export const miniCategories = [
  { id: 'flower', name: '水果鲜花', image: `${assetBase}/category-icons/fruit-flower.webp` },
  { id: 'veg', name: '新鲜蔬菜', image: `${assetBase}/category-icons/fresh-veg.webp` },
  { id: 'meat', name: '肉禽蛋品', image: `${assetBase}/category-icons/meat-egg.webp` },
  { id: 'seafood', name: '海鲜水产', image: `${assetBase}/category-icons/seafood.webp` },
  { id: 'milk', name: '乳品烘焙', image: `${assetBase}/category-icons/bakery-milk.webp` },
  { id: 'food', name: '餐饮熟食', image: `${assetBase}/category-icons/cooked-food.webp` },
  { id: 'snack', name: '休闲零食', image: `${assetBase}/category-icons/snacks.webp` },
  { id: 'drink', name: '酒水饮料', image: `${assetBase}/category-icons/drinks.webp` },
  { id: 'grain-oil', name: '粮油调味', image: `${assetBase}/category-icons/grain-oil.webp` },
  { id: 'personal-care', name: '个护清洁', image: `${assetBase}/category-icons/personal-care.webp` },
]

export const miniCategoryShortcuts = [
  { id: 'daily', name: '日用百货', image: `${assetBase}/category-icons/daily.webp` },
  { id: 'plant', name: '鲜花绿植', image: `${assetBase}/category-icons/plant.webp` },
  { id: 'pet', name: '宠物用品', image: `${assetBase}/category-icons/pet.jpg` },
  { id: 'health', name: '医药健康', image: `${assetBase}/category-icons/health.webp` },
  { id: 'imported', name: '进口好物', image: `${assetBase}/category-icons/imported.webp` },
  { id: 'imported-more', name: '进口好物', image: `${assetBase}/category-icons/imported-more.jpg` },
]

export const promoCards: PromoCard[] = [
  {
    id: 'hot',
    title: '热卖商品',
    titleImage: `${assetBase}/promo-cards/remai.png`,
    titleImageWidth: 70,
    titleImageHeight: 25,
    subtitle: '从源头把控每一份食材',
    badge: '满29元免运',
    badgeTone: '#1faf49',
    gradient: 'linear-gradient(180deg, #f0f9f3 0%, #ffffff 30%)',
    activityType: 'hot',
    products: [
      { image: `${assetBase}/promo-cards/hot-1.jpg`, priceMain: '6', priceDecimal: '.99' },
      { image: `${assetBase}/promo-cards/hot-2-720.jpg`, priceMain: '13', priceDecimal: '.99' },
    ],
  },
  {
    id: 'season',
    title: '当季专区',
    titleImage: `${assetBase}/promo-cards/dangji.png`,
    titleImageWidth: 72,
    titleImageHeight: 19.3,
    subtitle: '近期上新 品牌精选',
    badge: '',
    badgeTone: '#f4341b',
    titleTone: '#f4341b',
    gradient: 'linear-gradient(180deg, #fff0f2 0%, #ffffff 40%)',
    activityType: 'hot',
    products: [
      { image: `${assetBase}/promo-cards/season-1-720.jpg`, priceMain: '6', priceDecimal: '.99' },
      { image: `${assetBase}/promo-cards/season-2-720.jpg`, priceMain: '13', priceDecimal: '.99' },
    ],
  },
  {
    id: 'buy-now',
    title: '立即抢购',
    titleImage: `${assetBase}/promo-cards/qianggou.png`,
    titleImageWidth: 72,
    titleImageHeight: 17,
    subtitle: '超过100个品牌好物选择',
    badge: '正品保证',
    badgeTone: '#f4341b',
    gradient: 'linear-gradient(180deg, #fff5f0 0%, #ffffff 30%)',
    activityType: 'group',
    products: [
      { image: `${assetBase}/promo-cards/brand-1-720.jpg`, priceMain: '6', priceDecimal: '.99' },
      { image: `${assetBase}/promo-cards/brand-2-720.jpg`, priceMain: '13', priceDecimal: '.99' },
    ],
  },
  {
    id: 'presale',
    title: '限时预售',
    titleImage: `${assetBase}/promo-cards/yushou.png`,
    titleImageWidth: 70,
    titleImageHeight: 20,
    subtitle: '长期特惠',
    badge: '',
    badgeTone: '#f4341b',
    gradient: 'linear-gradient(180deg, #f5eeff 0%, #ffffff 40%)',
    activityType: 'presale',
    products: [
      { image: `${assetBase}/promo-cards/presale-1-720.jpg`, priceMain: '6', priceDecimal: '.99' },
      { image: `${assetBase}/promo-cards/presale-2-720.jpg`, priceMain: '13', priceDecimal: '.99' },
    ],
  },
]

export const channelTabs: ChannelTab[] = [
  { id: 'hot', title: '热卖单品', subtitle: '榜单商品' },
  { id: 'dragon-boat', title: '端午节', subtitle: '提前放价' },
  { id: 'summer', title: '夏日冰室', subtitle: '酷爽一夏' },
  { id: 'seasonal', title: '当季鲜果', subtitle: '新鲜直达' },
  { id: 'meals', title: '一日三餐', subtitle: '美味优选' },
]

export const homeBanners: HomeBanner[] = [
  {
    id: 'peach',
    image: `${bannerAssetBase}/banner-peach.png`,
    alt: '水蜜桃广告',
  },
  {
    id: 'milk',
    image: `${bannerAssetBase}/banner-milk.png`,
    alt: '乳酪面包广告',
  },
]

export const homeGoods: MiniProduct[] = [
  {
    id: 301,
    name: '新鲜基围虾 500g',
    description: '鲜活水产 顺丰冷链',
    price: '49.9',
    image: `${assetBase}/product-shrimp.png`,
    imageHeight: 140,
  },
  {
    id: 302,
    name: '蒙牛 纯牛奶 250ml*16盒',
    description: '整箱装 营养早餐',
    price: '45.9',
    image: `${assetBase}/product-milk.webp`,
    imageHeight: 150,
  },
  {
    id: 303,
    name: '新疆红心火龙果 2个装',
    description: '单果约400g 汁水丰富',
    price: '15.8',
    image: `${assetBase}/product-dragonfruit.webp`,
    imageHeight: 170,
  },
  {
    id: 304,
    name: '散养土鸡蛋 30枚装',
    description: '林间散养 蛋黄橙红',
    price: '29.9',
    image: `${assetBase}/product-eggs.png`,
    imageHeight: 140,
  },
  {
    id: 305,
    name: '澳洲谷饲西冷牛排 200g',
    description: '原肉原切 鲜嫩多汁',
    price: '39.9',
    image: `${assetBase}/product-steak.webp`,
    imageHeight: 160,
  },
]

export const feedProducts: MiniProduct[] = [
  {
    id: 201,
    name: '新鲜基围虾 500g',
    description: '鲜活水产 顺丰冷链',
    price: '49.9',
    image: `${assetBase}/product-shrimp.png`,
    imageHeight: 150,
  },
  {
    id: 202,
    name: '蒙牛 纯牛奶 250ml*16盒',
    description: '营养早餐 整箱装',
    price: '45.9',
    image: `${assetBase}/product-milk.webp`,
    imageHeight: 150,
  },
  {
    id: 203,
    name: '散养土鸡蛋 30枚装',
    description: '林间散养 蛋黄橙红',
    price: '29.9',
    image: `${assetBase}/product-eggs.png`,
    imageHeight: 140,
  },
  {
    id: 204,
    name: '新疆红心火龙果 2个装',
    description: '单果约400g 汁水丰富',
    price: '15.8',
    image: `${assetBase}/product-dragonfruit.webp`,
    imageHeight: 170,
  },
  {
    id: 205,
    name: '澳洲谷饲西冷牛排 200g',
    description: '原肉原切 鲜嫩多汁',
    price: '39.9',
    image: `${assetBase}/product-steak.webp`,
    imageHeight: 160,
  },
]

export const promoMain = `${assetBase}/promo-main.png`
export const promoPomegranate = `${assetBase}/banner-pomegranate.webp`
