import '../styles/globals.scss';
import Header from '../components/Header';
import Login from '.';
import App from 'next/app';
import { AuthProvider } from '../contexts/AuthContext'
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps}) {
  return (
    <>
      <Header />
      <main>
      {/* <SessionProvider session={session}> */}
      {/* <AuthProvider> */}
        <Component {...pageProps} />
      {/* </AuthProvider>
      </SessionProvider> */}
      </main>
    </>
  )
}

export default MyApp
