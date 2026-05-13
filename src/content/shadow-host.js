// Internal helper. Mounts a Vue app inside a Shadow Root with Bootstrap
// styles scoped to the shadow, so nothing leaks into the host page.
import { createApp } from 'vue'
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css'

// Bootstrap defines CSS vars on :root, which won't match inside a Shadow Root.
// Rewrite to :host so Bootstrap classes work when injected into shadow.
const scopedBootstrapCss = bootstrapCss.replace(/:root\b/g, ':host')

function injectStyles(shadow, extraCss = '') {
  const css = scopedBootstrapCss + (extraCss ? `\n${extraCss}` : '')
  try {
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(css)
    shadow.adoptedStyleSheets = [sheet]
  } catch {
    // Fallback for browsers without constructable stylesheets
    const style = document.createElement('style')
    style.textContent = css
    shadow.appendChild(style)
  }
}

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
  document.getElementById(id)?.remove()

  const host = document.createElement('div')
  host.id = id
  const shadow = host.attachShadow({ mode: 'open' })
  injectStyles(shadow, extraCss)

  const mountPoint = document.createElement('div')
  shadow.appendChild(mountPoint)
  document.body.appendChild(host)

  const app = createApp(component, props)
  app.mount(mountPoint)

  return {
    unmount() {
      app.unmount()
      host.remove()
    }
  }
}
