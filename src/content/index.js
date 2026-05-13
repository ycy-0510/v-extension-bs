/* eslint-disable no-console */
import { onMessage } from 'webext-bridge'
import { mountShadowApp } from './shadow-host'
import SelectionCard from './components/SelectionCard.vue'

console.info('[v-extension] Hello world from content script')

// Example: receive previous tab title from background
onMessage('tab-prev', ({ data }) => {
  console.log(`[v-extension] Navigate from page "${data.title}"`)
})

// Example: show a card near the current text selection
const SELECTION_CARD_ID = 'v-extension-selection-card'
let currentCard = null

function getSelectionRect() {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null
  const rect = sel.getRangeAt(0).getBoundingClientRect()
  return rect.width === 0 && rect.height === 0 ? null : rect
}

onMessage('show-selection', ({ data }) => {
  const text = data?.text ?? ''
  if (!text) return

  currentCard?.unmount()
  currentCard = mountShadowApp({
    id: SELECTION_CARD_ID,
    component: SelectionCard,
    props: {
      text,
      anchor: getSelectionRect(),
      onClose: () => {
        currentCard?.unmount()
        currentCard = null
      }
    }
  })
})
