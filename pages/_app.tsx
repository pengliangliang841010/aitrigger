import '../styles/reset.css'
import '../styles/globals.scss'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import useRem from '../hooks/useRem'
import { ConfigProvider } from 'antd/lib';

function MyApp({ Component, pageProps }: AppProps) {
  useRem();
  return (
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'rgb(236, 86, 124)',
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
