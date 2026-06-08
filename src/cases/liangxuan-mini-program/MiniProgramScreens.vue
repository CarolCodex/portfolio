<template>
  <div class="screens-strip" :class="{ 'cover-mode': coverMode }" aria-label="小程序核心页面展示">
    <article v-for="screen in visibleScreens" :key="screen.title" class="screen-block">
      <div class="phone-frame">
        <div class="phone-speaker" />
        <div class="phone-screen">
          <div class="status-bar">
            <span>9:41</span>
            <span>●●● 5G 🔋</span>
          </div>
          <component :is="screen.component" />
          <div class="home-indicator" />
        </div>
      </div>
      <h3>{{ screen.title }}</h3>
      <p>{{ screen.description }}</p>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h } from 'vue'

const props = defineProps<{
  coverMode?: boolean
}>()

const products = [
  { name: '靓轩精选牛乳', price: '19.90', tag: '热销', color: '#fff0ec' },
  { name: '有机鸡蛋 12枚', price: '16.80', tag: '满减', color: '#fff7e8' },
  { name: '新鲜草莓盒装', price: '29.90', tag: '秒杀', color: '#fff1f5' },
  { name: '每日坚果礼盒', price: '39.90', tag: '团购', color: '#f0f7ff' },
]

const categories = ['水果鲜食', '乳品烘焙', '粮油调味', '休闲零食', '个人护理', '家庭清洁']

const Search = defineComponent({
  setup() {
    return () => h('div', { class: 'mp-search' }, [h('span', '搜索商品 / 活动 / 优惠券')])
  },
})

const ProductCard = defineComponent({
  props: { name: String, price: String, tag: String, color: String },
  setup(props) {
    return () =>
      h('div', { class: 'mp-product' }, [
        h('div', { class: 'mp-product-img', style: { background: props.color } }, props.tag),
        h('div', { class: 'mp-product-info' }, [
          h('strong', props.name),
          h('small', '规格清晰 · 库存充足'),
          h('div', { class: 'mp-price-row' }, [
            h('span', ['¥', h('b', props.price)]),
            h('button', '+'),
          ]),
        ]),
      ])
  },
})

const CartBar = defineComponent({
  setup() {
    return () =>
      h('div', { class: 'mp-cart' }, [
        h('div', [h('strong', '¥66.60'), h('span', '已选 3 件')]),
        h('button', '去结算'),
      ])
  },
})

const TabBar = defineComponent({
  props: { active: String },
  setup(props) {
    const tabs = ['首页', '分类', '购物车', '我的']
    return () =>
      h(
        'div',
        { class: 'mp-tabbar' },
        tabs.map((tab) => h('span', { class: { active: props.active === tab } }, [h('i'), tab])),
      )
  },
})

const ActivityPage = defineComponent({
  props: { active: String },
  setup(props) {
    return () =>
      h('div', { class: 'mp-page' }, [
        h(Search),
        h('div', { class: 'mp-banner' }, [h('span', '靓轩超值活动'), h('strong', '限时低价 · 好物精选')]),
        h('div', { class: 'mp-tabs' }, ['活动', '团购', '预售', '秒杀'].map((tab) => h('span', { class: { active: props.active === tab } }, tab))),
        h('div', { class: 'mp-products' }, products.map((item) => h(ProductCard, item))),
        h(CartBar),
      ])
  },
})

const HomeFlowPage = defineComponent({
  setup() {
    return () =>
      h('div', { class: 'mp-page' }, [
        h(Search),
        h('div', { class: 'mp-banner home-flow-banner' }, [h('span', '今日精选'), h('strong', '爆款商品流')]),
        h('div', { class: 'mp-products' }, products.map((item) => h(ProductCard, item))),
        h(TabBar, { active: '首页' }),
      ])
  },
})

const CategoryPage = defineComponent({
  props: { popup: Boolean },
  setup(props) {
    return () =>
      h('div', { class: 'mp-page category-page' }, [
        h(Search),
        h('button', { class: 'all-category' }, '全部分类'),
        h('div', { class: 'category-layout' }, [
          h('div', { class: 'category-side' }, categories.slice(0, 5).map((item, index) => h('span', { class: { active: index === 0 } }, item))),
          h('div', { class: 'category-products' }, products.slice(0, 3).map((item) => h(ProductCard, item))),
        ]),
        h(TabBar, { active: '分类' }),
        props.popup
          ? h('div', { class: 'category-mask' }, [
              h('div', { class: 'category-popup' }, [
                h('strong', '全部分类'),
                h('div', { class: 'category-grid' }, categories.map((item, index) => h('span', { class: { active: index === 0 } }, item))),
              ]),
            ])
          : null,
      ])
  },
})

const screens = [
  { title: '活动商品', description: '首页活动 Tab 与商品列表联动，底部购物车常驻。', component: defineComponent({ setup: () => () => h(ActivityPage, { active: '活动' }) }) },
  { title: '首页商品流', description: '首页商品卡片统一图片、价格、标签和加购层级。', component: HomeFlowPage },
  { title: '团购商品', description: '团购标签强化价格优势和拼团氛围。', component: defineComponent({ setup: () => () => h(ActivityPage, { active: '团购' }) }) },
  { title: '预售商品', description: '预售商品保留时间和规则提示空间。', component: defineComponent({ setup: () => () => h(ActivityPage, { active: '预售' }) }) },
  { title: '秒杀商品', description: '秒杀场景突出价格、库存和快速加购。', component: defineComponent({ setup: () => () => h(ActivityPage, { active: '秒杀' }) }) },
  { title: '分类页', description: '左侧分类和右侧商品列表形成高效筛选路径。', component: defineComponent({ setup: () => () => h(CategoryPage) }) },
  { title: '分类弹层', description: '顶部浮层展示全部分类，遮罩保证焦点集中。', component: defineComponent({ setup: () => () => h(CategoryPage, { popup: true }) }) },
]

const coverTitles = ['活动商品', '首页商品流', '分类页', '分类弹层']

const visibleScreens = computed(() => (props.coverMode ? screens.filter((screen) => coverTitles.includes(screen.title)) : screens))
</script>

<style scoped>
.screens-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.screen-block {
  min-width: 0;
}

.screen-block h3 {
  margin: 18px 0 8px;
  color: #0f2a5f;
  font-size: 20px;
}

.screen-block p {
  margin: 0;
  color: #5d728f;
  line-height: 1.7;
}

.phone-frame {
  width: min(100%, 393px);
  margin-inline: auto;
  padding: 12px;
  border-radius: 48px;
  background: linear-gradient(145deg, #12213a, #31435e);
  box-shadow: 0 34px 86px rgba(15, 42, 95, 0.24);
}

.phone-speaker {
  width: 82px;
  height: 6px;
  margin: 2px auto 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.28);
}

.phone-screen {
  position: relative;
  height: min(852px, 72vh);
  min-height: 680px;
  overflow: hidden;
  border-radius: 38px;
  background: #f6f6f6;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  padding: 12px 20px 8px;
  color: #1d1d1f;
  font-size: 12px;
  font-weight: 800;
}

.home-indicator {
  position: absolute;
  left: 50%;
  bottom: 8px;
  width: 120px;
  height: 5px;
  border-radius: 999px;
  background: #111;
  transform: translateX(-50%);
}

:deep(.mp-page) {
  position: relative;
  height: calc(100% - 32px);
  padding: 10px 12px 78px;
  overflow: hidden;
  background: #f6f6f6;
}

:deep(.mp-search) {
  height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  background: #fff;
  color: #9a9a9a;
  font-size: 13px;
  line-height: 38px;
  box-shadow: 0 6px 18px rgba(31, 35, 41, 0.05);
}

:deep(.mp-banner) {
  display: grid;
  gap: 8px;
  margin: 12px 0;
  padding: 18px;
  border-radius: 20px;
  background: linear-gradient(135deg, #ff4d2e, #ff8a2a);
  color: #fff;
}

:deep(.mp-banner span) {
  font-size: 13px;
}

:deep(.mp-banner strong) {
  font-size: 20px;
}

:deep(.home-flow-banner) {
  background: linear-gradient(135deg, #111827, #ff4d2e 58%, #ff8a2a);
}

:deep(.mp-tabs) {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  overflow: hidden;
}

:deep(.mp-tabs span),
:deep(.all-category),
:deep(.category-grid span) {
  border: 0;
  border-radius: 999px;
  background: #fff;
  color: #666;
  font-size: 13px;
  font-weight: 800;
}

:deep(.mp-tabs span) {
  padding: 8px 13px;
}

:deep(.mp-tabs span.active),
:deep(.category-grid span.active),
:deep(.category-side span.active) {
  background: #fff1ec;
  color: #ff3b30;
}

:deep(.mp-products),
:deep(.category-products) {
  display: grid;
  gap: 10px;
}

:deep(.mp-product) {
  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 10px;
  padding: 10px;
  border-radius: 18px;
  background: #fff;
}

:deep(.mp-product-img) {
  display: grid;
  aspect-ratio: 1;
  place-items: center;
  border-radius: 14px;
  color: #ff3b30;
  font-size: 12px;
  font-weight: 900;
}

:deep(.mp-product-info strong) {
  display: block;
  color: #222;
  font-size: 14px;
  line-height: 1.35;
}

:deep(.mp-product-info small) {
  display: block;
  margin: 6px 0 10px;
  color: #999;
  font-size: 11px;
}

:deep(.mp-price-row) {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.mp-price-row span) {
  color: #ff3b30;
  font-weight: 900;
}

:deep(.mp-price-row b) {
  font-size: 18px;
}

:deep(.mp-price-row button) {
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #ff3b30, #ff7a1a);
  color: #fff;
  font-size: 20px;
  line-height: 1;
}

:deep(.mp-cart) {
  position: absolute;
  right: 12px;
  bottom: 18px;
  left: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 999px;
  background: #242424;
  color: #fff;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
}

:deep(.mp-cart strong) {
  display: block;
  color: #ffdfd7;
}

:deep(.mp-cart span) {
  color: #ddd;
  font-size: 11px;
}

:deep(.mp-cart button) {
  border: 0;
  border-radius: 999px;
  padding: 9px 16px;
  background: linear-gradient(135deg, #ff3b30, #ff7a1a);
  color: #fff;
  font-weight: 900;
}

:deep(.all-category) {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
}

:deep(.category-layout) {
  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 10px;
  height: calc(100% - 112px);
}

:deep(.category-side) {
  display: grid;
  align-content: start;
  gap: 8px;
}

:deep(.category-side span) {
  padding: 12px 8px;
  border-radius: 14px;
  background: #fff;
  color: #666;
  font-size: 12px;
  font-weight: 800;
  text-align: center;
}

:deep(.category-products .mp-product) {
  grid-template-columns: 78px 1fr;
}

:deep(.mp-tabbar) {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 8px 8px 18px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 -8px 24px rgba(31, 35, 41, 0.08);
}

:deep(.mp-tabbar span) {
  display: grid;
  gap: 3px;
  justify-items: center;
  color: #999;
  font-size: 11px;
}

:deep(.mp-tabbar i) {
  width: 22px;
  height: 22px;
  border-radius: 9px;
  background: #ddd;
}

:deep(.mp-tabbar span.active) {
  color: #ff3b30;
  font-weight: 900;
}

:deep(.mp-tabbar span.active i) {
  background: linear-gradient(135deg, #ff3b30, #ff7a1a);
}

:deep(.category-mask) {
  position: absolute;
  inset: 58px 0 0;
  background: rgba(0, 0, 0, 0.32);
}

:deep(.category-popup) {
  margin: 0 12px;
  padding: 18px;
  border-radius: 0 0 24px 24px;
  background: #fff;
}

:deep(.category-popup strong) {
  display: block;
  margin-bottom: 14px;
  color: #222;
}

:deep(.category-grid) {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

:deep(.category-grid span) {
  padding: 10px 8px;
  text-align: center;
}

@media (max-width: 1180px) {
  .screens-strip:not(.cover-mode) {
    display: flex;
    overflow-x: auto;
    padding-bottom: 12px;
    scroll-snap-type: x mandatory;
  }

  .screen-block {
    flex: 0 0 min(393px, 86vw);
    scroll-snap-align: start;
  }
}

@media (max-width: 520px) {
  .phone-screen {
    min-height: 620px;
  }
}
</style>
