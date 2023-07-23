import '@/styles/globals.css'
import { theme } from '@/theme'
import createEmotionCache from '@/utils/createEmotionCache'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

const clientSideEmotionCache = createEmotionCache()

export default function App({
    Component,
    pageProps: { session, emotionCache = clientSideEmotionCache, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </SessionProvider>
    )
}
