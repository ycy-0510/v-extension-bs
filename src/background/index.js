import { sendMessage, onMessage } from 'webext-bridge'

const CTX_MENU_ID = 'v-extension-show-selection'

chrome.runtime.onInstalled.addListener(() => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')

  chrome.contextMenus.create({
    id: CTX_MENU_ID,
    title: '顯示選取文字',
    contexts: ['selection']
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== CTX_MENU_ID || !tab?.id) return
  sendMessage(
    'show-selection',
    { text: info.selectionText ?? '' },
    { context: 'content-script', tabId: tab.id }
  )
})

let previousTabId = 0

// communication example: send previous tab title from background page
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  if (!previousTabId) {
    previousTabId = tabId
    return
  }
  const tab = await chrome.tabs.get(previousTabId)
  previousTabId = tabId
  if (!tab) return

  // eslint-disable-next-line no-console
  console.log('previous tab', tab)
  sendMessage(
    'tab-prev',
    { title: tab.title },
    { context: 'content-script', tabId }
  )
})

onMessage('get-current-tab', async () => {
  try {
    const tab = await chrome.tabs.get(previousTabId)
    return {
      title: tab?.id
    }
  } catch {
    return {
      title: undefined
    }
  }
})
