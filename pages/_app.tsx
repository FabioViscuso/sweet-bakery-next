import Head from 'next/head'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const formattedPath = router.pathname.replace(/\//, '').replace(/-/, ' ');

  return (
    <>
      <Head>
        <title>
          {router.pathname === '/' ? 'Demo: home' : `Demo: ${formattedPath}`}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
