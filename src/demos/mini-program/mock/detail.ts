export interface DetailProduct {
  id?: number | string
  name: string
  description?: string
  price: string
  image: string
  tag?: string
  unit?: string
  soldText?: string
}

export const defaultDetailProduct: DetailProduct = {
  id: 'default-watermelon',
  name: '美都沁糖西瓜 约1.5kg/个',
  description: '玲珑小巧，酥脆爽口',
  price: '19.9',
  image: '/case-assets/liangxuan-mini-program/demo-category-assets/images/cat-fruit.webp',
  tag: '时令',
  unit: '个',
  soldText: '累计已售11.8万',
}

export const detailRecommendProducts: DetailProduct[] = [
  {
    id: 1,
    name: '进口车厘子',
    description: '颗颗饱满，清甜多汁',
    price: '29.9',
    image: '/case-assets/liangxuan-mini-program/demo-activity-assets/images/product-cherry.png',
    unit: '份',
  },
  {
    id: 2,
    name: '【东蔬专享】水黄瓜',
    description: '爽脆清甜',
    price: '9.9',
    image: '/case-assets/liangxuan-mini-program/demo-category-assets/images/product-cucumber.jpg',
    unit: '份',
  },
  {
    id: 3,
    name: '七达岭气调盒',
    description: '整箱装 营养早餐',
    price: '18.8',
    image: '/case-assets/liangxuan-mini-program/demo-home-assets/product-milk.webp',
    unit: '份',
  },
]

export function detailUnitFor(product: DetailProduct) {
  if (product.unit) return product.unit
  if (product.name.includes('个')) return '个'
  if (product.name.includes('盒')) return '盒'
  return '份'
}
