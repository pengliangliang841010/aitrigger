import '../styles/reset.css'
import '../styles/globals.scss'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import useRem from '../hooks/useRem'
import { ConfigProvider } from 'antd/lib';
import React, { useEffect } from 'react'
import styleVariables from '../styles/_app.module.scss'

function MyApp({ Component, pageProps }: AppProps) {
  useRem();

  return (
    <ConfigProvider
        theme={{
          components:{
            Segmented:{
              itemSelectedBg:styleVariables.colorPrimary,
              itemSelectedColor:'#fff'
            },
          },
          token: {
            colorPrimary: styleVariables.colorPrimary,
            fontFamily:'Open Sans'
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
