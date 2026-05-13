# Modernized Chrome Extension Vite Starter (Vue 3 + Bootstrap 5)

> A [Vite](https://vitejs.dev/) Powered `Modernized Chrome Extension Manifest V3` ([Chrome](https://developer.chrome.com/docs/extensions/mv3/getstarted/)) Starter Template, built with Vue 3 and Bootstrap 5.

|  Page Type   |                                                             Light Mode                                                              |                                                             Dark Mode                                                              |
| :----------: | :---------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: |
|  Popup Page  |  ![](https://cdn.jsdelivr.net/gh/xiaoluoboding/image-hub-for-repo@latest/chrome-ext-mv3-starter/202107_extpreview_popup_light.png)  |  ![](https://cdn.jsdelivr.net/gh/xiaoluoboding/image-hub-for-repo@latest/chrome-ext-mv3-starter/202107_extpreview_popup_dark.png)  |
| Options Page | ![](https://cdn.jsdelivr.net/gh/xiaoluoboding/image-hub-for-repo@latest/chrome-ext-mv3-starter/202107_extpreview_options_light.png) | ![](https://cdn.jsdelivr.net/gh/xiaoluoboding/image-hub-for-repo@latest/chrome-ext-mv3-starter/202107_extpreview_options_dark.png) |

## Features

- ⚡️ **Instant HMR** - use **Vite** on dev (no more refresh!)
- 🥝 Vue 3 - Composition API, [`<script setup>` syntax](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md) and more!
- 💬 Effortless communications - powered by [`webext-bridge`](https://github.com/antfu/webext-bridge) and [VueUse](https://github.com/antfu/vueuse) storage
- 🧭 Vue Router support - Navigation to pages
- 🅱️ [Bootstrap 5](https://getbootstrap.com/) - bundled locally (no CDN), full utility & component library
- 📦 [Components auto importing](./src/components)
- 🌟 [Icons](./src/components) - Access to icons from any iconset directly
- 🌛 Dark Mode - support toggle dark mode
- 📃 Dynamic `manifest.json`

## Pre-packed

### WebExtension Libraries

- [`webextension-polyfill-ts`](https://github.com/Lusito/webextension-polyfill-ts) - WebExtension browser API Polyfill with types
- [`webext-bridge`](https://github.com/antfu/webext-bridge) - effortlessly communication between contexts

### Vite Plugins

- [`vite-plugin-components`](https://github.com/antfu/vite-plugin-components) - components auto import

### Vue Plugins

- [`vue-global-api`](https://github.com/antfu/vue-global-api) - use Vue Composition API globally
- [VueUse](https://github.com/antfu/vueuse) - collection of useful composition APIs

### UI Frameworks

- [Bootstrap 5](https://github.com/twbs/bootstrap) - The world's most popular CSS framework. Imported from `node_modules` (no CDN), JS bundle includes Popper for dropdowns/modals/tooltips.

### Icons

- [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
- [`vite-plugin-icons`](https://github.com/antfu/vite-plugin-icons) - icons as Vue components

### Coding Style

- Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
- [ESLint](https://eslint.org/) with [@antfu/eslint-config](https://github.com/antfu/eslint-config), single quotes, no semi

### Dev tools

- [Yarn](https://yarnpkg.com/) - package manager
- [tsup](https://github.com/egoist/tsup) - Zero config bundler powered by esbuild
- [esno](https://github.com/antfu/esno) - ESNext node runtime powered by esbuild
- [npm-run-all](https://github.com/mysticatea/npm-run-all) - Run multiple npm-scripts in parallel or sequential

## Use the Template

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/ycy-0510/v-extension-bs/generate).

## Usage

### Folders

- `src` - background scripts and content scripts & frontend for the extension (popup and options).
  - `manifest.js` - manifest for the extension.
- `extension` - extension package root, also holds assets.
- `scripts` - development helper scripts.

### Development

```bash
yarn dev
```

Then **load extension in browser with the `extension/` folder**,

### Build

To build the extension, run

```bash
yarn build
```

And then pack files under `extension`.

## Credits

This is a template derived from [antfu/vitesse-webext](https://github.com/antfu/vitesse-webext) and [xiaoluoboding/chrome-ext-mv3-starter](https://github.com/xiaoluoboding/chrome-ext-mv3-starter). Forked and migrated to Bootstrap 5 by [@ycy-0510](https://github.com/ycy-0510).


## License

[MIT](./LICENSE) - [@xiaoluoboding](https://github.com/xiaoluoboding), [@ycy-0510](https://github.com/ycy-0510)
