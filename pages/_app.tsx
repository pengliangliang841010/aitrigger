import '../styles/reset.css'
import '../styles/globals.scss'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import useRem from '../hooks/useRem'
import { ConfigProvider } from 'antd/lib';
import React from 'react'
import styleVariables from '../styles/_app.module.scss'
import { Provider } from 'react-redux'
import { storeWrapper } from '../store'

function MyApp({ Component, ...rest }: AppProps) {
  useRem();
  const { store,props } = storeWrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: styleVariables.colorPrimary,
          },
        }}
      >
    <Layout>
      <Component {...props.pageProps} />
    </Layout>
    </ConfigProvider>
    </Provider>
  )
}

export default MyApp
