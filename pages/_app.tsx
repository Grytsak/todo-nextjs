import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import store from '../redux/store'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'

function MyApp({ 
  Component, 
  pageProps
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  )
  
}

export default MyApp