import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useStore from '../store/Store'

import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const formattedPath = router.pathname.replace(/\//, '').replace(/-/, ' ');
  const login = useStore(state => state.loginUser)

  useEffect(() => {
    const storedUser: { username: string, accessToken: string } = JSON.parse(localStorage.getItem('currentUser') as string);
    if (storedUser && typeof storedUser !== 'undefined') {
      login(storedUser.username, storedUser.accessToken)
    }
  })

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
