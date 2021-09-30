import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import '../styles/globals.css'
import { useUserChanged } from '../hooks/useUserChanged'
import { store } from '../app/store'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const {} = useUserChanged()
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: false, refetchOnWindowFocus: false },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
