import type { AppProps } from 'next/app'

import { ConfigProvider } from 'antd'
import { SWRConfig } from 'swr'

import '@/styles/globals.css'
import 'antd/dist/reset.css'

import type { NextPageWithLayout } from '@/types/next-page'
import fetchJson from '@/helpers/fetchJson'

const theme = {
  token: {
    colorPrimary: '#00b96b'
  }
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson
      }}
    >
      {getLayout(
        <ConfigProvider theme={theme}>
          <Component {...pageProps} />
        </ConfigProvider>
      )}
    </SWRConfig>
  )
}

export default MyApp
