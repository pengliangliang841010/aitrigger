import '../styles/reset.css'
import '../styles/ignoreCss/html.css'
import '../styles/globals.scss'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import useRem from '../hooks/useRem'
import { ConfigProvider } from 'antd/lib';
import React, { useEffect } from 'react'
import theme from '../antdTheme'

// import {getUser} from '../DynamoDB/userApi'

function MyApp({ Component, pageProps }: AppProps) {
  useRem();

  // useEffect(()=>{
  //   window.getUser=getUser
  // },[])

  return (
    <ConfigProvider
        theme={theme}
      >
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </ConfigProvider>

  )
}

export default MyApp
