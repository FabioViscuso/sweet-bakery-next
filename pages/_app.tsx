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
  const login = useStore(state => state.loginUser);
  const initCart = useStore(state => state.replaceCart);

  useEffect(() => {
    // try to fetch the stored user
    const storedUser: { username: string, email: string, accessToken: string } = JSON.parse(localStorage.getItem('currentUser') as string);
    // if present, log automatically
    if (storedUser && typeof storedUser !== 'undefined') {
      login(storedUser.username, storedUser.email, storedUser.accessToken)
      // try to fetch the stored cart
      const localCart = JSON.parse(localStorage.getItem(`cartFor${storedUser.username}`) as string)
      // if present, put it as the actual cart in the store
      if (localCart && localCart.length > 0) {
        initCart(localCart)
      }
    }
  }, [login, initCart])

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
