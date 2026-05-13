/* eslint-disable no-console */
import { onMessage } from 'webext-bridge'

console.info('[v-extension] Hello world from content script')

// communication example: send previous tab title from background page
onMessage('tab-prev', ({ data }) => {
  console.log(`[v-extension] Navigate from page "${data.title}"`)
})

const HOST_ID = 'v-extension-selection-card'
const Z = 2147483647

const cardCss = `
  :host { all: initial; display: block; }
  .wrap {
    position: absolute;
    z-index: ${Z};
    max-width: 320px;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  }
  .card {
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,.15);
    overflow: hidden;
  }
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
    background: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
    font-size: 0.75rem;
    color: #6c757d;
  }
  .btn-close {
    cursor: pointer;
    background: transparent;
    border: 0;
    padding: 0 0.25rem;
    color: #6c757d;
    font-size: 1rem;
    line-height: 1;
  }
  .btn-close:hover { color: #212529; }
  .card-body {
    padding: 0.75rem;
    font-size: 0.875rem;
    color: #212529;
    word-break: break-word;
    max-height: 200px;
    overflow-y: auto;
  }
`

function destroyCard() {
  const existing = document.getElementById(HOST_ID)
  if (existing) existing.remove()
}

function getSelectionRect() {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null
  const rect = sel.getRangeAt(0).getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) return null
  return rect
}

function showSelectionCard(text) {
  console.log('[v-extension] showSelectionCard called with:', JSON.stringify(text))
  destroyCard()
  if (!text) {
    console.warn('[v-extension] empty text, not showing card')
    return
  }

  const host = document.createElement('div')
  host.id = HOST_ID
  const shadow = host.attachShadow({ mode: 'open' })

  // 用 adoptedStyleSheets 避開嚴格 CSP 對 <style> 注入的封鎖
  let usedAdopted = false
  try {
    if ('adoptedStyleSheets' in Document.prototype && typeof CSSStyleSheet === 'function') {
      const sheet = new CSSStyleSheet()
      sheet.replaceSync(cardCss)
      shadow.adoptedStyleSheets = [sheet]
      usedAdopted = true
    }
  } catch (e) {
    console.warn('[v-extension] adoptedStyleSheets failed, fallback to <style>', e)
  }
  if (!usedAdopted) {
    const style = document.createElement('style')
    style.textContent = cardCss
    shadow.appendChild(style)
  }

  const wrap = document.createElement('div')
  wrap.className = 'wrap'
  wrap.innerHTML = `
    <div class="card">
      <div class="card-header">
        <span>已選取文字</span>
        <button class="btn-close" aria-label="關閉">&times;</button>
      </div>
      <div class="card-body"></div>
    </div>
  `
  shadow.appendChild(wrap)
  wrap.querySelector('.card-body').textContent = text
  wrap.querySelector('.btn-close').addEventListener('click', destroyCard)

  document.body.appendChild(host)

  const rect = getSelectionRect()
  const cardRect = wrap.getBoundingClientRect()
  const margin = 8
  const vw = window.innerWidth
  const vh = window.innerHeight
  const scrollX = window.scrollX
  const scrollY = window.scrollY

  let top
  let left
  if (rect) {
    // rect 是 viewport 座標，加上 scroll 轉成文件座標讓卡片跟著頁面捲動
    let vpTop = rect.bottom + margin
    let vpLeft = rect.left
    if (vpTop + cardRect.height > vh - margin) vpTop = rect.top - cardRect.height - margin
    if (vpLeft + cardRect.width > vw - margin) vpLeft = vw - cardRect.width - margin
    if (vpLeft < margin) vpLeft = margin
    if (vpTop < margin) vpTop = margin
    top = vpTop + scrollY
    left = vpLeft + scrollX
  } else {
    top = scrollY + margin
    left = scrollX + vw - cardRect.width - margin
  }
  wrap.style.top = `${top}px`
  wrap.style.left = `${left}px`

  setTimeout(() => {
    const onOutside = (e) => {
      if (!host.contains(e.target)) {
        destroyCard()
        document.removeEventListener('mousedown', onOutside, true)
      }
    }
    document.addEventListener('mousedown', onOutside, true)
  }, 0)
}

onMessage('show-selection', ({ data }) => {
  console.log('[v-extension] show-selection received', data)
  showSelectionCard(data?.text ?? '')
})
