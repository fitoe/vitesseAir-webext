import { ElMessage } from 'element-plus'

const duration = 1500
// solution 1: create a wrapper function
export const $message = {
  success: (message: string) => ElMessage({ message, duration, type: 'success' }),
  warning: (message: string) => ElMessage({ message, duration, type: 'warning' }),
  error: (message: string) => ElMessage({ message, duration, type: 'error' }),
  info: (message: string) => ElMessage({ message, duration, type: 'info' }),
}
