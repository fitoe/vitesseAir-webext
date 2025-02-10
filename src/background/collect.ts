import { onMessage, sendMessage } from 'webext-bridge/background'
import { isLogin, user } from '~/composables/user'

import('./tabs')
interface InjectMessage {
  data: {
    url: string
    data: any
    tabid: number
  }
}
onMessage('message', ({ data }: InjectMessage) => {
  // do something
})
