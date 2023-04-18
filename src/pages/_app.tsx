import type { AppProps } from 'next/app'
import '~/styles/globals.css'

import PageTransitionContextProvider from '~/contexts/pageTransition'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <PageTransitionContextProvider>
      <Component {...pageProps} />
    </PageTransitionContextProvider>
  )
}

export default App
