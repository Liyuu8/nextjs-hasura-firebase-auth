import { AppProps } from 'next/app'

import '../styles/globals.css'
import { useUserChanged } from '../hooks/useUserChanged'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const {} = useUserChanged()

  return <Component {...pageProps} />
}

export default MyApp
