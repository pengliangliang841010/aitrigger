import '../styles/reset.css'
import '../styles/ignoreCss/html.css'
import '../styles/globals.scss'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import useRem from '../hooks/useRem'
import { ConfigProvider } from 'antd/lib';
import React, { useEffect } from 'react'
import theme from '../antdTheme'
import Head from 'next/head'
import { useRouter } from 'next/router'


function MyApp({ Component, pageProps }: AppProps) {
  
  useRem();
  
  const router=useRouter()

  useEffect(()=>{
    if(localStorage.getItem('18+')!=='accept'){
      router.push(`/allow`)
    }
  },[])

  return (
    <ConfigProvider
      theme={theme}
    >
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ConfigProvider>

  )
}

export default MyApp
