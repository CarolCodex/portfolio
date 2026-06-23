<template>
  <div ref="dropdownRef" class="device-select-dropdown" :class="{ 'is-open': isOpen, 'has-value': modelValue }">
    <label class="device-select-trigger">
      <input
        :id="id"
        :name="name"
        :value="displayValue"
        type="text"
        role="combobox"
        readonly
        autocomplete="off"
        :placeholder="placeholder"
        :aria-expanded="isOpen"
        :aria-controls="listboxId"
        aria-haspopup="listbox"
        @click="openDropdown"
        @focus="openDropdown"
        @keydown.down.prevent="moveActive(1)"
        @keydown.up.prevent="moveActive(-1)"
        @keydown.enter.prevent="selectActiveOption"
        @keydown.esc.prevent="closeDropdown"
      />
      <img src="/case-assets/device-health-management-platform/login-select-arrow.svg" alt="" aria-hidden="true" />
    </label>

    <div v-if="isOpen" :id="listboxId" class="device-select-menu" role="listbox">
      <button
        v-for="(option, index) in normalizedOptions"
        :key="option.value || 'placeholder'"
        class="device-select-option"
        :class="{
          active: activeIndex === index,
          selected: option.value === modelValue,
          placeholder: option.value === '',
        }"
        type="button"
        role="option"
        :aria-selected="option.value === modelValue"
        @mouseenter="activeIndex = index"
        @click="selectOption(option.value)"
      >
        <span class="device-select-check" aria-hidden="true">✓</span>
        <span>{{ option.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type SelectOption = {
  label: string
  value: string
}

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    modelValue: string
    placeholder?: string
    options: SelectOption[]
  }>(),
  {
    id: undefined,
    name: undefined,
    placeholder: '请选择',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const dropdownRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const activeIndex = ref(0)
const listboxId = `device-select-${Math.random().toString(36).slice(2, 9)}`

const normalizedOptions = computed<SelectOption[]>(() => [{ label: props.placeholder, value: '' }, ...props.options])
const displayValue = computed(() => props.options.find((option) => option.value === props.modelValue)?.label ?? '')

function setActiveIndexByValue(value: string) {
  activeIndex.value = Math.max(
    0,
    normalizedOptions.value.findIndex((option) => option.value === value),
  )
}

function openDropdown() {
  setActiveIndexByValue(props.modelValue)
  isOpen.value = true
}

function closeDropdown() {
  isOpen.value = false
}

function moveActive(step: number) {
  if (!isOpen.value) {
    openDropdown()
    return
  }

  const optionCount = normalizedOptions.value.length
  activeIndex.value = (activeIndex.value + step + optionCount) % optionCount
}

function selectOption(value: string) {
  emit('update:modelValue', value)
  setActiveIndexByValue(value)
  closeDropdown()
}

function selectActiveOption() {
  selectOption(normalizedOptions.value[activeIndex.value]?.value ?? '')
}

function handleOutsidePointerDown(event: PointerEvent) {
  if (!dropdownRef.value?.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', handleOutsidePointerDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleOutsidePointerDown)
})
</script>

<style scoped>
.device-select-dropdown {
  position: relative;
}

.device-select-dropdown.is-open {
  z-index: 20;
}

.device-select-trigger {
  position: relative;
  display: flex;
  align-items: center;
  height: 48px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.device-select-dropdown.is-open .device-select-trigger {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

.device-select-trigger input {
  width: 100%;
  min-width: 0;
  height: 100%;
  border: 0;
  background: transparent;
  color: #111827;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  outline: 0;
  padding: 0 41px 0 13px;
  cursor: pointer;
}

.device-select-trigger input::placeholder {
  color: #9ca3af;
  opacity: 1;
}

.device-select-trigger > img {
  position: absolute;
  right: 12px;
  width: 20px;
  height: 20px;
  pointer-events: none;
  transition: transform 0.18s ease;
}

.device-select-dropdown.is-open .device-select-trigger > img {
  transform: rotate(180deg);
}

.device-select-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  left: 0;
  overflow: hidden;
  padding: 6px;
  border: 1px solid rgba(209, 213, 219, 0.92);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.16), 0 4px 10px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(12px);
}

.device-select-option {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  align-items: center;
  width: 100%;
  min-height: 40px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #111827;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  cursor: pointer;
}

.device-select-option + .device-select-option {
  margin-top: 2px;
}

.device-select-option.active,
.device-select-option:hover {
  background: #f3f7ff;
}

.device-select-option.selected {
  color: #1d4ed8;
}

.device-select-option.placeholder {
  color: #9ca3af;
}

.device-select-check {
  display: block;
  color: transparent;
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
}

.device-select-option.selected .device-select-check,
.device-select-option.placeholder.selected .device-select-check {
  color: #9ca3af;
}

.device-select-option.selected:not(.placeholder) .device-select-check {
  color: #2563eb;
}
</style>
