import '../styles/reset.css'
import '../styles/globals.scss'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import useRem from '../hooks/useRem'
import { ConfigProvider } from 'antd/lib';
import React from 'react'
import styleVariables from '../styles/_app.module.scss'

function MyApp({ Component, pageProps }: AppProps) {
  useRem();
  return (
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: styleVariables.colorPrimary,
          },
        }}
      >
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </ConfigProvider>

  )
}

export default MyApp
