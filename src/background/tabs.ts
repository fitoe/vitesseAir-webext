browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTabId') {
    // 返回 sender.tab.id 作为 tabId
    sendResponse({ tabId: sender.tab.id })
  }
  return true // 表示异步响应
})
