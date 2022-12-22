import 'antd/dist/antd.less'
import '../styles/global.less'

import moment from 'moment-timezone'
import type { AppProps } from 'next/app'

import { AppProvider } from '../hooks/app'

moment.tz.setDefault('Europe/Berlin')

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
