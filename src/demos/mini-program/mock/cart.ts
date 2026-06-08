const categoryBase = '/case-assets/liangxuan-mini-program/demo-category-assets'
const activityBase = '/case-assets/liangxuan-mini-program/demo-activity-assets'

export interface CartItem {
  id: number
  groupId: 'hourly' | 'nextday'
  name: string
  tag: string
  price: number
  originPrice?: number
  quantity: number
  image: string
}

export interface CartGroupMeta {
  id: CartItem['groupId']
  title: string
  subtitle: string
  freight: string
}

export interface CartRecommendItem {
  id: number
  name: string
  spec: string
  price: string
  image: string
  cartItem: Omit<CartItem, 'quantity'>
}

export const cartGroupMeta: CartGroupMeta[] = [
  { id: 'hourly', title: '小时达', subtitle: '最快1小时送达', freight: '满99免首重运费' },
  { id: 'nextday', title: '次日达', subtitle: '预约配送', freight: '满299免15元首重运费' },
]

export const initialCartItems: CartItem[] = [
  {
    id: 1001,
    groupId: 'hourly',
    name: '农家小青菜 新鲜采摘 约500g',
    tag: '冷藏',
    price: 9.9,
    originPrice: 12.9,
    quantity: 1,
    image: `${categoryBase}/images/product-lettuce.jpg`,
  },
  {
    id: 1002,
    groupId: 'hourly',
    name: '谷饲原切眼肉牛排 约250g/盒',
    tag: '鲜肉',
    price: 35.9,
    quantity: 2,
    image: '/case-assets/liangxuan-mini-program/demo-home-assets/newbie-beef.png',
  },
  {
    id: 1003,
    groupId: 'nextday',
    name: '红颜草莓 新鲜当季水果 约300g',
    tag: '鲜果',
    price: 29.9,
    quantity: 1,
    image: '/case-assets/liangxuan-mini-program/demo-home-assets/newbie-cherry.png',
  },
]

export const cartRecommendItems: CartRecommendItem[] = [
  {
    id: 1,
    name: '有机青菜 新鲜采摘 绿色健康',
    spec: '500g',
    price: '8.8',
    image: '/case-assets/liangxuan-mini-program/demo-home-assets/newbie-veg.png',
    cartItem: {
      id: 2001,
      groupId: 'hourly',
      name: '有机青菜 新鲜采摘 绿色健康',
      tag: '冷藏',
      price: 8.8,
      image: '/case-assets/liangxuan-mini-program/demo-home-assets/newbie-veg.png',
    },
  },
  {
    id: 2,
    name: '精选西红柿 自然成熟',
    spec: '约500g',
    price: '6.9',
    image: `${categoryBase}/images/product-tomato.jpg`,
    cartItem: {
      id: 2002,
      groupId: 'hourly',
      name: '精选西红柿 自然成熟',
      tag: '鲜蔬',
      price: 6.9,
      image: `${categoryBase}/images/product-tomato.jpg`,
    },
  },
  {
    id: 3,
    name: '农家土豆 绵软香甜',
    spec: '1kg',
    price: '5.5',
    image: `${categoryBase}/images/product-potato.jpg`,
    cartItem: {
      id: 2003,
      groupId: 'nextday',
      name: '农家土豆 绵软香甜',
      tag: '鲜蔬',
      price: 5.5,
      image: `${categoryBase}/images/product-potato.jpg`,
    },
  },
  {
    id: 4,
    name: '新鲜黄瓜 爽脆多汁',
    spec: '约400g',
    price: '4.9',
    image: `${categoryBase}/images/product-cucumber.jpg`,
    cartItem: {
      id: 2004,
      groupId: 'hourly',
      name: '新鲜黄瓜 爽脆多汁',
      tag: '鲜蔬',
      price: 4.9,
      image: `${categoryBase}/images/product-cucumber.jpg`,
    },
  },
  {
    id: 5,
    name: '有机生菜 清脆嫩绿',
    spec: '300g',
    price: '7.8',
    image: `${categoryBase}/images/product-lettuce.jpg`,
    cartItem: {
      id: 2005,
      groupId: 'hourly',
      name: '有机生菜 清脆嫩绿',
      tag: '冷藏',
      price: 7.8,
      image: `${categoryBase}/images/product-lettuce.jpg`,
    },
  },
  {
    id: 6,
    name: '新鲜西兰花 营养丰富',
    spec: '约350g',
    price: '9.9',
    image: `${categoryBase}/images/product-broccoli.jpg`,
    cartItem: {
      id: 2006,
      groupId: 'nextday',
      name: '新鲜西兰花 营养丰富',
      tag: '鲜蔬',
      price: 9.9,
      image: `${categoryBase}/images/product-broccoli.jpg`,
    },
  },
]
