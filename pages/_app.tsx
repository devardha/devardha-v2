import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
        </QueryClientProvider>
    )
}

export default MyApp
