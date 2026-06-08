<template>
  <section class="design-system">
    <header class="system-intro">
      <span>Design System / UI Kit</span>
      <h3>从真实生鲜小程序页面沉淀出的组件体系</h3>
      <p>
        视觉规范不再按文件逐个陈列，而是围绕零售转化链路组织：商品浏览、活动促销、加购反馈、购物车结算和页面复用。
      </p>
    </header>

    <section class="system-section tokens-section" aria-labelledby="tokens-title">
      <SystemTitle id="tokens-title" index="01" title="Design Tokens" />
      <div class="token-strip">
        <article v-for="token in colorTokens" :key="token.name" class="token-chip">
          <i :style="{ background: token.value }" />
          <div>
            <strong>{{ token.name }}</strong>
            <span>{{ token.value }}</span>
            <small>{{ token.usage }}</small>
          </div>
        </article>
      </div>
      <div class="foundation-strip">
        <article v-for="token in foundationTokens" :key="token.name">
          <strong>{{ token.name }}</strong>
          <span>{{ token.value }}</span>
          <small>{{ token.usage }}</small>
        </article>
      </div>
    </section>

    <section class="system-section retail-section" aria-labelledby="retail-title">
      <SystemTitle id="retail-title" index="02" title="核心零售组件" />
      <div class="retail-board">
        <div class="retail-group buttons">
          <h4>Button / Add Button</h4>
          <div class="control-row">
            <Button text="加入购物车" type="primary" />
            <Button text="查看更多" type="secondary" />
            <Button text="已售罄" type="primary" disabled />
            <Button text="限时抢" type="primary" size="small" />
            <button class="round-add" type="button" aria-label="加购">+</button>
          </div>
        </div>

        <div class="retail-group prices">
          <h4>Price</h4>
          <div class="price-row">
            <PriceTag price="29.90" color="#e92b1d" />
            <PriceTag price="19.9-29.9" old-price="39.9" discount-label="拼团价" color="#e92b1d" />
            <PriceTag price="88" old-price="128" discount-label="秒杀" color="#e92b1d" />
            <PriceTag price="248" old-price="299" discount-label="预售价" color="#e92b1d" />
          </div>
          <p>价格控制在 18-22px，旧价统一灰色删除线，促销标签使用浅红底。</p>
        </div>

        <div class="retail-group tags">
          <h4>Tag</h4>
          <div class="tag-row">
            <span v-for="tag in retailTags" :key="tag.label" :class="['retail-tag', tag.type]">
              {{ tag.label }}
            </span>
          </div>
        </div>

        <div class="retail-group stepper">
          <h4>Stepper</h4>
          <div class="stepper-sample" aria-label="数量加减示例">
            <button type="button">-</button>
            <span>1</span>
            <button type="button">+</button>
          </div>
        </div>

        <div class="retail-group tabs">
          <h4>Tab</h4>
          <div class="tab-row">
            <Tab v-model:active-value="activeActivityTab" :tabs="activityTabs" variant="underline" />
            <Tab v-model:active-value="activeFilterTab" :tabs="filterTabs" variant="pill" />
          </div>
        </div>
      </div>
    </section>

    <section class="system-section product-system" aria-labelledby="product-title">
      <SystemTitle id="product-title" index="03" title="商品卡片系统" />
      <div class="product-system-grid">
        <article class="product-anatomy" aria-label="标准商品卡片结构">
          <div class="anatomy-image">
            <img src="/case-assets/liangxuan-mini-program/demo-activity-assets/images/product-shrimp.png" alt="鲜活基围虾" />
            <span class="badge-top">状态角标</span>
          </div>
          <div class="anatomy-info">
            <h4>标准商品卡片结构</h4>
            <strong>鲜活基围虾 500g</strong>
            <p>冷链配送 · 鲜甜弹牙 · 今日热卖</p>
            <div class="anatomy-tags">
              <span>次日达</span>
              <span>冷藏</span>
            </div>
            <div class="anatomy-bottom">
              <PriceTag price="39.9" old-price="49.9" color="#e92b1d" unit="份" />
              <button class="round-add" type="button" aria-label="加购">+</button>
            </div>
          </div>
          <ol class="anatomy-list">
            <li>图片区：近 1:1 裁切，保证列表整齐。</li>
            <li>状态区：排名、热卖、秒杀等信息只占角标位。</li>
            <li>信息区：标题优先，标签和价格辅助决策。</li>
            <li>转化区：价格与加购按钮固定在底部。</li>
          </ol>
        </article>

        <div class="variant-matrix">
          <article v-for="variant in productVariants" :key="variant.name" class="variant-row">
            <div class="variant-visual" :class="variant.type">
              <img :src="variant.image" :alt="variant.name" />
              <span>{{ variant.badge }}</span>
            </div>
            <div class="variant-copy">
              <h4>{{ variant.name }}</h4>
              <p>{{ variant.description }}</p>
              <div class="variant-state">
                <PriceTag
                  :price="variant.price"
                  :old-price="variant.oldPrice"
                  :discount-label="variant.priceLabel"
                  color="#e92b1d"
                />
                <button type="button" :class="variant.buttonClass">{{ variant.action }}</button>
              </div>
              <div v-if="variant.flow" class="presale-flow">
                <span v-for="step in variant.flow" :key="step">{{ step }}</span>
              </div>
              <div v-if="variant.progress" class="seckill-progress">
                <i :style="{ width: variant.progress }"></i>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="system-section cart-system" aria-labelledby="cart-title">
      <SystemTitle id="cart-title" index="04" title="购物车组件系统" />
      <div class="cart-flow">
        <article class="cart-node group-node">
          <span>CartGroup</span>
          <strong>小时达</strong>
          <small>中海·天府里 · 免配送费</small>
        </article>
        <article class="cart-node item-node">
          <span>CartItem</span>
          <CartItem
            v-model:quantity="cartItem.quantity"
            v-model:is-selected="cartItem.isSelected"
            :name="cartItem.name"
            :price="cartItem.price"
            :unit="cartItem.unit"
            :image="cartItem.image"
            :tag-label="cartItem.tagLabel"
          />
          <del>原价 ¥12.90</del>
        </article>
        <article class="cart-node settlement-node">
          <span>SettlementBar</span>
          <div class="settlement-bar">
            <div>
              <small>合计</small>
              <PriceTag price="9.90" color="#e92b1d" />
            </div>
            <button type="button">去结算</button>
          </div>
        </article>
        <article class="cart-node empty-node">
          <span>EmptyState</span>
          <div class="empty-state">
            <i></i>
            <strong>购物车空空如也</strong>
            <small>心仪的都加进来</small>
          </div>
        </article>
      </div>
    </section>

    <section class="system-section reuse-section" aria-labelledby="reuse-title">
      <SystemTitle id="reuse-title" index="05" title="页面复用关系" />
      <div class="reuse-map">
        <article v-for="page in pageReuse" :key="page.name">
          <strong>{{ page.name }}</strong>
          <p>{{ page.description }}</p>
          <div>
            <span v-for="component in page.components" :key="component">{{ component }}</span>
          </div>
        </article>
      </div>
      <div class="interaction-strip">
        <div class="mini-carousel">
          <span>Carousel</span>
          <img src="/case-assets/liangxuan-mini-program/demo-home-assets/banners/banner-peach.png" alt="首页轮播示例" />
        </div>
        <div class="mini-modal">
          <span>Modal</span>
          <strong>确认清空购物车</strong>
          <p>清空后商品将无法恢复，是否继续？</p>
          <button type="button" @click="showModal = true">打开弹窗</button>
        </div>
      </div>
    </section>

    <section class="system-section rules-section" aria-labelledby="rules-title">
      <SystemTitle id="rules-title" index="06" title="关键设计规则" />
      <ul class="rules-list">
        <li v-for="rule in designRules" :key="rule.title">
          <strong>{{ rule.title }}</strong>
          <span>{{ rule.description }}</span>
        </li>
      </ul>
    </section>

    <Modal
      v-model="showModal"
      title="确认清空购物车"
      content="清空后商品将无法恢复，是否继续？"
      confirm-text="确认"
      cancel-text="取消"
      status="warning"
    />
  </section>
</template>

<script setup lang="ts">
import { defineComponent, h, ref } from 'vue'
import Button from '@/components/Button/Button.vue'
import CartItem from '@/components/CartItem/CartItem.vue'
import Modal from '@/components/Modal/Modal.vue'
import PriceTag from '@/components/PriceTag/PriceTag.vue'
import Tab, { type TabItem, type TabValue } from '@/components/Tab/Tab.vue'

interface ProductVariant {
  name: string
  type: string
  image: string
  badge: string
  description: string
  price: string | number
  oldPrice?: string | number
  priceLabel: string
  action: string
  buttonClass: string
  flow?: string[]
  progress?: string
}

const colorTokens = [
  { name: 'Primary Red', value: '#ff3b30', usage: '主按钮 / 选中态 / 加购入口' },
  { name: 'Price Red', value: '#e92b1d', usage: '价格 / 折扣 / 促销强提醒' },
  { name: 'Orange Gradient', value: '#ff7a1a', usage: '团购和运营活动强化' },
  { name: 'Soft Background', value: '#f6f6f6', usage: '页面浅灰底 / 筛选背景' },
  { name: 'Surface White', value: '#ffffff', usage: '卡片 / 弹窗 / 商品容器' },
  { name: 'Text Dark', value: '#10233f', usage: '标题 / 关键说明文字' },
]

const foundationTokens = [
  { name: 'Radius Card', value: '16-22px', usage: '商品卡、购物车、弹窗容器' },
  { name: 'Radius Pill', value: '999px', usage: '筛选、标签、胶囊按钮' },
  { name: 'Shadow Soft', value: '0 2px 12px rgba(0,0,0,.04)', usage: '白色卡片轻阴影' },
  { name: 'Space', value: '8 / 12 / 16 / 24', usage: '标签、卡片内距、模块间距' },
]

const retailTags = [
  { label: '限时抢', type: 'red' },
  { label: '预售', type: 'purple' },
  { label: '次日达', type: 'blue' },
  { label: '冷藏', type: 'soft' },
  { label: 'TOP 1', type: 'orange' },
  { label: '热卖', type: 'red' },
]

const activityTabs: TabItem[] = [
  { label: '团购商品', value: 'group' },
  { label: '预售商品', value: 'presale' },
  { label: '秒杀商品', value: 'seckill' },
  { label: '热卖商品', value: 'hot' },
]

const filterTabs: TabItem[] = [
  { label: '全部', value: 'all' },
  { label: '时令蔬菜', value: 'vegetable' },
  { label: '肉禽蛋品', value: 'meat' },
  { label: '海鲜水产', value: 'seafood' },
]

const productVariants: ProductVariant[] = [
  {
    name: '团购商品卡片',
    type: 'group',
    image: '/case-assets/liangxuan-mini-program/demo-activity-assets/images/product-cherry.png',
    badge: '3人成团',
    description: '橙色角标 + 拼团价，突出低价和组团机制。',
    price: '19.9-29.9',
    oldPrice: '39.9',
    priceLabel: '拼团价',
    action: '加购',
    buttonClass: 'round-action',
  },
  {
    name: '预售商品卡片',
    type: 'presale',
    image: '/case-assets/liangxuan-mini-program/demo-activity-assets/images/product-durian.png',
    badge: '正品保障',
    description: '蓝紫保障栏 + 预售价 + 付定金路径。',
    price: 248,
    oldPrice: 299,
    priceLabel: '预售价',
    action: '付定金',
    buttonClass: 'pill-action',
    flow: ['付定金', '付尾款', '发货'],
  },
  {
    name: '秒杀商品卡片',
    type: 'seckill',
    image: '/case-assets/liangxuan-mini-program/demo-activity-assets/images/product-steak.png',
    badge: '距结束 02:18:42',
    description: '红色状态角标 + 倒计时 + 进度条，强化紧迫感。',
    price: 88,
    oldPrice: 128,
    priceLabel: '秒杀',
    action: '马上抢',
    buttonClass: 'pill-action',
    progress: '72%',
  },
  {
    name: '热卖商品卡片',
    type: 'hot',
    image: '/case-assets/liangxuan-mini-program/demo-activity-assets/images/product-shrimp.png',
    badge: 'TOP 1',
    description: '排名角标 + 销量标签 + 圆形加购，适合热榜商品。',
    price: 39.9,
    oldPrice: 49.9,
    priceLabel: '热卖',
    action: '+',
    buttonClass: 'round-action',
  },
]

const pageReuse = [
  { name: '活动页', description: '运营活动承载页，强调限时与转化。', components: ['ActivityTab', 'FilterTab', 'ProductCard', 'CartBar'] },
  { name: '购物车页', description: '从商品确认到结算的闭环。', components: ['AddressBar', 'CartGroup', 'CartItem', 'SettlementBar'] },
  { name: '分类页', description: '高频找货和筛选路径。', components: ['SearchBar', 'CategoryNav', 'ProductList', 'TabBar'] },
  { name: '首页', description: '入口、活动曝光和推荐商品流。', components: ['Carousel', 'ProductCard', 'BottomTab'] },
]

const designRules = [
  { title: '价格层级', description: '主价格统一使用红色，字号控制在 18-22px，避免压过商品标题。' },
  { title: '商品图片', description: '列表卡片保持接近 1:1，圆角裁切，确保列表整齐。' },
  { title: '活动状态', description: '团购、预售、秒杀、热卖使用不同状态色，但购买路径保持一致。' },
  { title: '加购反馈', description: '加购按钮统一使用红色圆形或胶囊按钮，强化转化入口。' },
  { title: '底部避让', description: '固定购物车栏和结算栏必须预留底部安全距离。' },
  { title: '卡片圆角', description: '商品卡片 16-22px，弹窗 22px，筛选标签使用胶囊圆角。' },
]

const cartItem = ref({
  name: '农家小青菜 新鲜采摘 约500g',
  quantity: 1,
  price: 9.9,
  unit: '份',
  image: '/case-assets/liangxuan-mini-program/demo-category-assets/images/product-lettuce.jpg',
  tagLabel: '冷藏',
  isSelected: true,
})

const activeActivityTab = ref<TabValue>('group')
const activeFilterTab = ref<TabValue>('all')
const showModal = ref(false)

const SystemTitle = defineComponent({
  props: {
    id: { type: String, required: true },
    index: { type: String, required: true },
    title: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h('header', { class: 'system-title' }, [
        h('span', props.index),
        h('h4', { id: props.id }, props.title),
      ])
  },
})
</script>

<style scoped lang="scss">
@use '@/components/styles/variables' as *;

.design-system {
  @include lx-font-base;

  display: grid;
  gap: 18px;
  min-width: 0;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 24px 64px rgba(43, 112, 198, 0.1);
  color: #10233f;
  backdrop-filter: blur(18px);
}

.system-intro {
  display: grid;
  gap: 8px;
  max-width: 860px;

  span {
    color: #1268d6;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: #0f2a5f;
    font-size: 28px;
    letter-spacing: 0;
  }

  p {
    color: #5d728f;
    font-size: 15px;
    line-height: 1.8;
  }
}

.system-section {
  display: grid;
  gap: 16px;
  min-width: 0;
  padding-top: 18px;
  border-top: 1px solid rgba(203, 218, 238, 0.68);
}

:deep(.system-title) {
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 999px;
    background: #f2f7ff;
    color: #1268d6;
    font-size: 12px;
    font-weight: 900;
  }

  h4 {
    margin: 0;
    color: #0f2a5f;
    font-size: 22px;
    letter-spacing: 0;
  }
}

.token-strip,
.foundation-strip,
.control-row,
.price-row,
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.token-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: min(100%, 206px);
  padding: 10px 12px;
  border-radius: 18px;
  background: rgba(246, 248, 252, 0.78);

  i {
    flex: 0 0 34px;
    width: 34px;
    height: 34px;
    border-radius: 12px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
  }

  div {
    display: grid;
    gap: 2px;
    min-width: 0;
  }

  strong {
    color: #0f2a5f;
    font-size: 12px;
  }

  span,
  small {
    color: #5d728f;
    font-size: 11px;
    line-height: 1.35;
  }

  span {
    font-weight: 900;
  }
}

.foundation-strip article {
  display: grid;
  gap: 3px;
  flex: 1 1 190px;
  min-width: 0;
  padding: 10px 12px;
  border-radius: 16px;
  background: #fbfdff;

  strong {
    color: #0f2a5f;
    font-size: 12px;
  }

  span {
    color: #e92b1d;
    font-size: 13px;
    font-weight: 900;
  }

  small {
    color: #5d728f;
    line-height: 1.45;
  }
}

.retail-board {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 16px 24px;
}

.retail-group {
  display: grid;
  gap: 10px;
  min-width: 0;

  h4,
  p {
    margin: 0;
  }

  h4 {
    color: #0f2a5f;
    font-size: 14px;
  }

  p {
    color: #5d728f;
    font-size: 13px;
    line-height: 1.7;
  }
}

.retail-group.tabs {
  grid-column: 1 / -1;
}

.round-add,
.round-action {
  display: inline-grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 999px;
  background: #ff3b30;
  color: #fff;
  font-size: 21px;
  line-height: 1;
  box-shadow: 0 8px 16px rgba(255, 59, 48, 0.22);
  cursor: pointer;
}

.retail-tag {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;

  &.red {
    background: #fff1ef;
    color: #ff3b30;
  }

  &.purple {
    background: #f3efff;
    color: #6d45d9;
  }

  &.blue {
    background: #edf6ff;
    color: #1268d6;
  }

  &.soft {
    background: #f3f4f6;
    color: #5d728f;
  }

  &.orange {
    background: #fff3e6;
    color: #ff7a1a;
  }
}

.stepper-sample {
  display: grid;
  grid-template-columns: 28px 34px 28px;
  align-items: center;
  width: max-content;
  height: 28px;
  overflow: hidden;
  border: 1px solid #f3f4f6;
  border-radius: 999px;
  background: #fff;

  button {
    height: 28px;
    border: 0;
    background: transparent;
    color: #ff3b30;
    font-size: 17px;
  }

  span {
    color: #101828;
    font-size: 12px;
    font-weight: 900;
    text-align: center;
  }
}

.tab-row {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 14px;
}

.product-system-grid {
  display: grid;
  grid-template-columns: minmax(320px, 0.8fr) minmax(0, 1.2fr);
  gap: 18px;
  align-items: start;
}

.product-anatomy {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 14px;
  padding: 14px;
  border-radius: 22px;
  background: #f8f8f8;
}

.anatomy-image {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  background: #fff;

  img {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 150px;
    object-fit: cover;
  }
}

.badge-top {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 3px 7px;
  border-radius: 999px;
  background: linear-gradient(135deg, #ff7a1a, #ff3b30);
  color: #fff;
  font-size: 10px;
  font-weight: 900;
}

.anatomy-info {
  display: grid;
  align-content: start;
  gap: 8px;
  min-width: 0;

  h4,
  strong,
  p {
    margin: 0;
  }

  h4 {
    color: #0f2a5f;
    font-size: 15px;
  }

  strong {
    color: #101828;
    font-size: 15px;
  }

  p {
    color: #6a7282;
    font-size: 13px;
    line-height: 1.55;
  }
}

.anatomy-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  span {
    padding: 3px 7px;
    border-radius: 999px;
    background: #fff1ef;
    color: #ff3b30;
    font-size: 11px;
    font-weight: 900;
  }
}

.anatomy-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
}

.anatomy-list {
  grid-column: 1 / -1;
  display: grid;
  gap: 7px;
  margin: 0;
  padding-left: 18px;
  color: #5d728f;
  font-size: 13px;
  line-height: 1.6;
}

.variant-matrix {
  display: grid;
  gap: 10px;
}

.variant-row {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  min-width: 0;
  padding: 10px;
  border-radius: 18px;
  background: #fbfdff;
}

.variant-visual {
  position: relative;
  height: 86px;
  overflow: hidden;
  border-radius: 16px;
  background: #fff;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    position: absolute;
    right: 6px;
    bottom: 6px;
    max-width: calc(100% - 12px);
    padding: 3px 6px;
    overflow: hidden;
    border-radius: 999px;
    color: #fff;
    font-size: 10px;
    font-weight: 900;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &.group span {
    background: linear-gradient(135deg, #ffb020, #ff3b30);
  }

  &.presale span {
    background: #6156d9;
  }

  &.seckill span {
    background: #ff3b30;
  }

  &.hot span {
    background: #ff7a1a;
  }
}

.variant-copy {
  display: grid;
  gap: 6px;
  min-width: 0;

  h4,
  p {
    margin: 0;
  }

  h4 {
    color: #0f2a5f;
    font-size: 14px;
  }

  p {
    color: #5d728f;
    font-size: 12px;
    line-height: 1.55;
  }
}

.variant-state {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
}

.pill-action {
  min-height: 30px;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background: #ff3b30;
  color: #fff;
  font-size: 12px;
  font-weight: 900;
}

.presale-flow {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4px;

  span {
    padding: 4px 6px;
    border-radius: 999px;
    background: #f3efff;
    color: #6156d9;
    font-size: 10px;
    font-weight: 900;
    text-align: center;
  }
}

.seckill-progress {
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: #ffe1dd;

  i {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: #ff3b30;
  }
}

.cart-flow {
  display: grid;
  grid-template-columns: 0.72fr 1.35fr 0.92fr 0.92fr;
  gap: 12px;
  align-items: stretch;
}

.cart-node {
  display: grid;
  align-content: start;
  gap: 10px;
  min-width: 0;
  padding: 14px;
  border-radius: 20px;
  background: #f8f8f8;

  > span {
    color: #1268d6;
    font-size: 12px;
    font-weight: 900;
  }
}

.group-node {
  strong {
    color: #101828;
    font-size: 18px;
  }

  small {
    color: #5d728f;
    line-height: 1.6;
  }
}

.item-node {
  del {
    margin-left: 116px;
    color: #98a2b3;
    font-size: 11px;
  }
}

.settlement-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(16, 24, 40, 0.08);

  small {
    color: #6a7282;
    font-size: 11px;
  }

  button {
    min-height: 34px;
    padding: 0 16px;
    border: 0;
    border-radius: 999px;
    background: #ff3b30;
    color: #fff;
    font-size: 13px;
    font-weight: 900;
  }
}

.empty-state {
  display: grid;
  place-items: center;
  gap: 7px;
  min-height: 148px;
  border-radius: 18px;
  background: #fff;
  color: #6a7282;
  text-align: center;

  i {
    width: 48px;
    height: 36px;
    border: 3px solid #ffd8d4;
    border-top: 0;
    border-radius: 8px 8px 14px 14px;
    background: linear-gradient(180deg, #fff7f6, #fff);
  }

  strong {
    color: #101828;
    font-size: 14px;
  }

  small {
    font-size: 12px;
  }
}

.reuse-map {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.reuse-map article {
  display: grid;
  gap: 9px;
  min-width: 0;
  padding: 14px;
  border-radius: 18px;
  background: #fbfdff;

  strong {
    color: #0f2a5f;
    font-size: 15px;
  }

  p {
    margin: 0;
    color: #5d728f;
    font-size: 12px;
    line-height: 1.55;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  span {
    padding: 4px 7px;
    border-radius: 999px;
    background: #f2f7ff;
    color: #46617f;
    font-size: 10px;
    font-weight: 900;
  }
}

.interaction-strip {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 12px;
}

.mini-carousel,
.mini-modal {
  min-width: 0;
  padding: 14px;
  border-radius: 18px;
  background: #f8f8f8;

  > span {
    display: block;
    margin-bottom: 8px;
    color: #1268d6;
    font-size: 12px;
    font-weight: 900;
  }
}

.mini-carousel img {
  display: block;
  width: 100%;
  max-height: 120px;
  border-radius: 16px;
  object-fit: cover;
}

.mini-modal {
  display: grid;
  align-content: center;
  gap: 8px;

  strong,
  p {
    margin: 0;
  }

  strong {
    color: #101828;
    font-size: 16px;
  }

  p {
    color: #6a7282;
    font-size: 13px;
    line-height: 1.6;
  }

  button {
    justify-self: start;
    min-height: 32px;
    padding: 0 14px;
    border: 0;
    border-radius: 999px;
    background: #ff3b30;
    color: #fff;
    font-weight: 900;
  }
}

.rules-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 24px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.rules-list li {
  display: grid;
  gap: 5px;
  min-width: 0;

  strong {
    color: #0f2a5f;
    font-size: 14px;
  }

  span {
    color: #5d728f;
    font-size: 13px;
    line-height: 1.7;
  }
}

@media (max-width: 1180px) {
  .retail-board,
  .product-system-grid,
  .cart-flow,
  .reuse-map {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .design-system {
    padding: 22px;
    border-radius: 26px;
  }

  .retail-board,
  .tab-row,
  .product-system-grid,
  .cart-flow,
  .reuse-map,
  .interaction-strip,
  .rules-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .product-anatomy,
  .variant-row {
    grid-template-columns: 1fr;
  }

  .anatomy-image img {
    max-height: 190px;
  }

  .item-node del {
    margin-left: 0;
  }
}
</style>
