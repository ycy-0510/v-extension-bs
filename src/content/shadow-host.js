// Internal helper. Mounts a Vue app inside a Shadow Root with Bootstrap
// styles scoped to the shadow, so nothing leaks into the host page.
import { createApp } from 'vue'
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css'

// Bootstrap defines CSS vars on :root, which won't match inside a Shadow Root.
// Rewrite to :host so Bootstrap classes work when injected into shadow.
// Caveats:
//   - Bootstrap 5.3+ dark mode uses [data-bs-theme="dark"], not :root, so dark
//     mode will not activate inside the shadow.
//   - Naive regex: nested forms like :not(:root) would also be rewritten.
//     Bootstrap doesn't use any today, but watch for this on upgrade.
const scopedBootstrapCss = bootstrapCss.replace(/:root\b/g, ':host')

// Constructable stylesheets can be shared across multiple shadow roots, so we
// parse the ~160KB Bootstrap CSS once at module load instead of on every mount.
let cachedSheet
let cacheTried = false
function getBootstrapSheet() {
  if (cacheTried) return cachedSheet
  cacheTried = true
  try {
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(scopedBootstrapCss)
    cachedSheet = sheet
  } catch {
    cachedSheet = null
  }
  return cachedSheet
}

function injectStyles(shadow, extraCss) {
  const base = getBootstrapSheet()
  if (base) {
    const sheets = [base]
    if (extraCss) {
      const extra = new CSSStyleSheet()
      extra.replaceSync(extraCss)
      sheets.push(extra)
    }
    shadow.adoptedStyleSheets = sheets
    return
  }
  // Browsers without constructable stylesheets.
  const style = document.createElement('style')
  style.textContent = scopedBootstrapCss + (extraCss ? `\n${extraCss}` : '')
  shadow.appendChild(style)
}

// Track live instances by id so re-mounting with the same id fully unmounts
// the previous Vue app (releases reactive scopes and runs onBeforeUnmount),
// not just removes the host node.
const instances = new Map()

/**
 * Mount a Vue component inside a Shadow DOM attached to <body>.
 *
 * @param {object} options
 * @param {string} options.id - Unique host element id (used for replace/unmount).
 * @param {object} options.component - Vue component definition.
 * @param {object} [options.props] - Props passed to the component.
 * @param {string} [options.extraCss] - Extra CSS scoped to the shadow.
 * @returns {{ unmount: () => void }}
 */
export function mountShadowApp({ id, component, props = {}, extraCss = '' }) {
  instances.get(id)?.unmount()

  const host = document.createElement('div')
  host.id = id
  const shadow = host.attachShadow({ mode: 'open' })
  injectStyles(shadow, extraCss)

  const mountPoint = document.createElement('div')
  shadow.appendChild(mountPoint)
  document.body.appendChild(host)

  const app = createApp(component, props)
  app.mount(mountPoint)

  const handle = {
    unmount() {
      app.unmount()
      host.remove()
      if (instances.get(id) === handle) instances.delete(id)
    }
  }
  instances.set(id, handle)
  return handle
}
