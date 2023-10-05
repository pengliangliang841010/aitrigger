import '../styles/reset.css'
import '../styles/globals.scss'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import useRem from '../hooks/useRem'
import { ConfigProvider } from 'antd/lib';
import React from 'react'
import styleVariables from '../styles/_app.module.scss'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { envGtw } from '../api.config'

function MyApp({ Component, pageProps }: AppProps) {
  useRem();
  return (
    <GoogleOAuthProvider clientId={envGtw.GOOGLE_CLIENT_ID}>
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
    </GoogleOAuthProvider>

  )
}

export default MyApp
