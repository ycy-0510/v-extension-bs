<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  // viewport-relative rect of the selection (from getBoundingClientRect)
  anchor: { type: Object, default: null }
})

const emit = defineEmits(['close'])

const wrap = ref(null)
const top = ref(0)
const left = ref(0)

function place() {
  if (!wrap.value) return
  const margin = 8
  const cardRect = wrap.value.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight

  let vpTop, vpLeft
  if (props.anchor) {
    vpTop = props.anchor.bottom + margin
    vpLeft = props.anchor.left
    if (vpTop + cardRect.height > vh - margin) vpTop = props.anchor.top - cardRect.height - margin
    if (vpLeft + cardRect.width > vw - margin) vpLeft = vw - cardRect.width - margin
    if (vpLeft < margin) vpLeft = margin
    if (vpTop < margin) vpTop = margin
  } else {
    vpTop = margin
    vpLeft = vw - cardRect.width - margin
  }
  // viewport -> document so the card follows page scroll
  top.value = vpTop + window.scrollY
  left.value = vpLeft + window.scrollX
}

function onOutside(e) {
  // e.target is retargeted to the shadow host when clicking inside shadow
  if (wrap.value && !wrap.value.getRootNode().host.contains(e.target)) {
    emit('close')
  }
}

onMounted(() => {
  place()
  document.addEventListener('mousedown', onOutside, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onOutside, true)
})
</script>

<template>
  <div
    ref="wrap"
    class="position-absolute"
    :style="{ top: `${top}px`, left: `${left}px`, zIndex: 2147483647, maxWidth: '320px' }"
  >
    <div class="card shadow-sm border-0">
      <div class="card-header d-flex align-items-center justify-content-between py-2 px-3 bg-light">
        <small class="text-muted">Selected text</small>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="emit('close')"
        />
      </div>
      <div class="card-body p-3" style="word-break: break-word; max-height: 200px; overflow-y: auto;">
        {{ text }}
      </div>
    </div>
  </div>
</template>
