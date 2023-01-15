import { FC, useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useCookies } from 'react-cookie'
import NextNProgress from 'nextjs-progressbar'
import { EmotionCache } from '@emotion/cache'
import createEmotionCache from '../common/utils/createEmotionCache'

import { wrapper } from '../store'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'

import { lightThemeStyles } from '../styles/theme/lightTheme'
import { darkThemeStyles } from '../styles/theme/darkTheme'

import '../styles/globals.scss'
import { CacheProvider } from '@emotion/react'

const lightTheme = createTheme(lightThemeStyles)

const darkTheme = createTheme(darkThemeStyles)

function getActiveTheme(themeMode: 'light' | 'dark') {
  return themeMode === 'light' ? lightTheme : darkTheme
}

const PREFERENCE_COOKIE_NAME = 'theme_preference'

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: FC<AppProps> = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const userSystemThemePreferenceDark = useMediaQuery(
    '(prefers-color-scheme: dark)',
  )

  const [activeTheme, setActiveTheme] = useState(lightTheme)
  const [cookieTheme, setCookieTheme] = useCookies([PREFERENCE_COOKIE_NAME])

  const defaultInitialTheme = userSystemThemePreferenceDark ? 'dark' : 'light'
  const preferredTheme =
    cookieTheme && cookieTheme[PREFERENCE_COOKIE_NAME]
      ? cookieTheme[PREFERENCE_COOKIE_NAME]
      : defaultInitialTheme

  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>(
    preferredTheme,
  )

  const toggleTheme: React.MouseEventHandler<HTMLAnchorElement> = () => {
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light'

    setSelectedTheme(desiredTheme)
    setCookieTheme(PREFERENCE_COOKIE_NAME, desiredTheme)
  }

  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme))
  }, [selectedTheme])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={activeTheme}>
        <NextNProgress color="#d50000" height={2} showOnShallow={true}/>
        <Component {...pageProps} toggleTheme={toggleTheme} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default wrapper.withRedux(MyApp)
