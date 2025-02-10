export const downloadPage = 'https://domain.com/doc/download.html'
export const defaultManifest = { version: '0.0.0', status: 'ok', remark: '' }

export const status = [
  { value: 0, name: 'not started' },
  { value: 1, name: 'applied' },
  { value: 2, name: 'passed' },
]

export function _const(name, value) {
  return name.find(item => item.value === value)?.name
}
