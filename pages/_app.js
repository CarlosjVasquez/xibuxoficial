import { ThemeProvider } from 'emotion-theming'
import GlobalStyles from 'components/GlobalStyles/GlobalStyles'
import { useState, useEffect } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-loader-spinner'
import styled from '@emotion/styled'

import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

library.add(fab, fas)

const theme = {
  colors: {
    primary: '#ff0000',
  },
}

export default function MyApp({ Component, pageProps }) {
  const [loader, setLoader] = useState(false)
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => start())
    router.events.on('routeChangeComplete', () => done())
    router.events.on('routeChangeError', () => done())

    return () => {
      router.events.off('routeChangeStart', () => start())
      router.events.off('routeChangeComplete', () => done())
      router.events.off('routeChangeError', () => done())
    }
  })

  const start = () => {
    NProgress.start()
    setLoader(true)
  }

  const done = () => {
    NProgress.done()
    setLoader(false)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} loader={loader} />
        <StyledLoader>
          <Loader type="TailSpin" color="#3b3b3b" height={40} width={40} />
        </StyledLoader>
      </ThemeProvider>
    </>
  )
}

const StyledLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -2;
`
