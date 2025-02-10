// 监听的请求白名单
export const injectWhitelist: Inject[] = [
  {
    name: 'the page to inject',
    command: 'command1',
    url: '/api/theapipath',
    method: 'GET',
  },
  // ...more
]
// allow access to network requests
export const netWorkList = [
  'https://www.baidu.com/*',
  // 'http://localhost:3839/*',
]

// the page path to inject
export const pathList = [
  {
    name: 'the page to inject',
    path: 'https://www.baidu.com/*',
  },
]
// 注入的页面路径
export const injectPaths = pathList.map(item => item.path) || ['<all_urls>']
