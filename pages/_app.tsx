import { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import '../styles/globals.css'
import { useUserChanged } from '../hooks/useUserChanged'
import { store } from '../app/store'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const {} = useUserChanged()

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
