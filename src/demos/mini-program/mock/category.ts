const categoryBase = '/case-assets/liangxuan-mini-program/demo-category-assets'

export interface CategoryNavItem {
  id: string
  name: string
  image: string
  badge?: '热' | '新'
}

export interface CategoryProduct {
  id: number
  name: string
  spec: string
  image: string
  price: string
}

export const categoryIcons = {
  search: `${categoryBase}/icons/search.svg`,
  chevronDown: `${categoryBase}/icons/category-chevron-down.svg`,
  chevronUp: `${categoryBase}/icons/category-chevron-up.svg`,
  filterArrow: `${categoryBase}/icons/filter-arrow.svg`,
  plus: `${categoryBase}/icons/plus.svg`,
}

export const categoryNavItems: CategoryNavItem[] = [
  { id: 'fruit', name: '时令鲜果', image: `${categoryBase}/images/cat-fruit.png`, badge: '热' },
  { id: 'vegetable', name: '新鲜蔬菜', image: `${categoryBase}/images/cat-vegetable.png`, badge: '新' },
  { id: 'meat', name: '肉禽蛋品', image: `${categoryBase}/images/cat-meat.png` },
  { id: 'seafood', name: '海鲜水产', image: `${categoryBase}/images/cat-seafood.png` },
  { id: 'bakery', name: '乳品烘焙', image: `${categoryBase}/images/cat-bakery.png` },
  { id: 'cooked', name: '餐饮熟食', image: `${categoryBase}/images/cat-cooked.png` },
  { id: 'snack', name: '休闲零食', image: `${categoryBase}/images/cat-snack.jpg` },
  { id: 'drink', name: '酒水饮料', image: `${categoryBase}/images/cat-drink.jpg` },
  { id: 'oil', name: '粮油调味', image: `${categoryBase}/images/cat-oil.jpg` },
  { id: 'clean', name: '个护清洁', image: `${categoryBase}/images/cat-daily.jpg` },
  { id: 'daily', name: '日用百货', image: `${categoryBase}/images/cat-daily.jpg` },
  { id: 'flower', name: '鲜花绿植', image: `${categoryBase}/images/cat-flower.png` },
  { id: 'pet', name: '宠物用品', image: `${categoryBase}/images/cat-pet.jpg` },
  { id: 'health', name: '医药健康', image: `${categoryBase}/images/cat-health.png` },
  { id: 'imported', name: '进口好物', image: `${categoryBase}/images/cat-imported.jpg` },
]

export const sideCategoryItems = categoryNavItems.slice(0, 13)

export const categoryProducts: CategoryProduct[] = [
  {
    id: 1,
    name: '有机青菜 新鲜采摘',
    spec: '500g',
    image: `${categoryBase}/images/product-carrot.jpg`,
    price: '8.8',
  },
  {
    id: 2,
    name: '精选西红柿 自然成熟',
    spec: '约500g',
    image: `${categoryBase}/images/product-tomato.jpg`,
    price: '6.9',
  },
  {
    id: 3,
    name: '农家土豆 绵软香甜',
    spec: '1kg',
    image: `${categoryBase}/images/product-potato.jpg`,
    price: '5.5',
  },
  {
    id: 4,
    name: '新鲜黄瓜 爽脆多汁',
    spec: '约400g',
    image: `${categoryBase}/images/product-cucumber.jpg`,
    price: '4.9',
  },
  {
    id: 5,
    name: '有机生菜 清脆嫩绿',
    spec: '300g',
    image: `${categoryBase}/images/product-lettuce.jpg`,
    price: '7.8',
  },
  {
    id: 6,
    name: '新鲜西兰花 营养丰富',
    spec: '约350g',
    image: `${categoryBase}/images/product-broccoli.jpg`,
    price: '9.9',
  },
]
