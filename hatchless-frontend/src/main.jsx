import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@fontsource/inter';
import '@fontsource/outfit';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{
        fontFamily: 'Inter, sans-serif',
        headings: { fontFamily: 'Outfit, sans-serif' },
      }} forceColorScheme="light">
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
)
