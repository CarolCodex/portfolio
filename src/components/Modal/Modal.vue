<template>
  <Transition name="lx-modal-fade">
    <section v-if="modelValue" class="lx-modal" role="presentation" @click.self="handleMaskClick">
      <div class="lx-modal__panel" role="dialog" aria-modal="true" :aria-labelledby="title ? titleId : undefined">
        <button class="lx-modal__close" type="button" aria-label="关闭弹窗" @click="close">×</button>

        <div v-if="image || status !== 'normal'" class="lx-modal__visual" :class="`is-${status}`">
          <img v-if="image" :src="image" alt="" aria-hidden="true" />
          <span v-else aria-hidden="true">{{ status === 'success' ? '✓' : '!' }}</span>
        </div>

        <h2 v-if="title" :id="titleId">{{ title }}</h2>
        <p v-if="content">{{ content }}</p>
        <slot />

        <footer>
          <Button
            v-if="showCancel"
            :text="cancelText"
            type="secondary"
            size="medium"
            @click="cancel"
          />
          <Button :text="confirmText" type="primary" size="medium" @click="confirm" />
        </footer>
      </div>
    </section>
  </Transition>
</template>

<script setup lang="ts">
import Button from '../Button/Button.vue'

const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  content?: string
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
  maskClosable?: boolean
  status?: 'normal' | 'success' | 'warning'
  image?: string
}>(), {
  title: '',
  content: '',
  confirmText: '确定',
  cancelText: '取消',
  showCancel: true,
  maskClosable: true,
  status: 'normal',
  image: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
  close: []
}>()

const titleId = `lx-modal-title-${Math.random().toString(36).slice(2, 8)}`

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function confirm() {
  emit('confirm')
  close()
}

function cancel() {
  emit('cancel')
  close()
}

function handleMaskClick() {
  if (props.maskClosable) close()
}

defineExpose({ close })
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.lx-modal {
  @include lx-font-base;

  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: $lx-space-6;
  background: rgba(16, 24, 40, 0.42);
}

.lx-modal__panel {
  position: relative;
  display: grid;
  gap: $lx-space-3;
  width: min(100%, 320px);
  padding: 28px $lx-space-5 $lx-space-5;
  border-radius: $lx-radius-xl;
  background: $lx-color-surface;
  box-shadow: $lx-shadow-modal;
  text-align: center;

  h2,
  p {
    margin: 0;
    letter-spacing: 0;
  }

  h2 {
    color: $lx-color-text;
    font-size: 18px;
    font-weight: 900;
    line-height: 26px;
  }

  p {
    color: $lx-color-text-muted;
    font-size: 14px;
    line-height: 22px;
  }

  footer {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $lx-space-3;
    margin-top: $lx-space-2;
  }
}

.lx-modal__close {
  @include lx-control-reset;
  @include lx-pressable;

  position: absolute;
  top: 10px;
  right: 12px;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: $lx-color-text-light;
  font-size: 24px;
  line-height: 1;

  &:hover {
    background: $lx-color-border;
    color: $lx-color-text;
  }
}

.lx-modal__visual {
  display: grid;
  place-items: center;
  justify-self: center;
  width: 56px;
  height: 56px;
  overflow: hidden;
  border-radius: 50%;
  background: $lx-color-primary-soft;
  color: $lx-color-primary;

  &.is-success {
    background: rgba(22, 163, 74, 0.1);
    color: $lx-color-success;
  }

  &.is-warning {
    background: rgba(245, 158, 11, 0.13);
    color: $lx-color-warning;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    font-size: 26px;
    font-weight: 900;
  }
}

.lx-modal-fade-enter-active,
.lx-modal-fade-leave-active {
  transition: opacity $lx-duration-base $lx-ease-standard;

  .lx-modal__panel {
    transition: transform $lx-duration-base $lx-ease-standard;
  }
}

.lx-modal-fade-enter-from,
.lx-modal-fade-leave-to {
  opacity: 0;

  .lx-modal__panel {
    transform: translateY(12px) scale(0.98);
  }
}
</style>
