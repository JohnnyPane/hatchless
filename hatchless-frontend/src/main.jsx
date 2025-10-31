import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@fontsource/inter';
import '@fontsource/spectral';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient()

const water = [
  '#e6f4f2',
  '#cfe8e3',
  '#a2d1c7',
  '#73b9ab',
  '#4ca18f',
  '#3b7b73',
  '#32655f',
  '#2a504c',
  '#213a38',
  '#172524',
];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{
        // fontFamily: 'Inter, sans-serif',
        fontFamily: 'Spectral, san-serif',
        // headings: { fontFamily: 'Spectral, san-serif' },
        colors: {
          water,
        },
        primaryColor: 'water',
        primaryShade: 5,
      }} forceColorScheme="light">

        <Router>
          <App />
        </Router>

      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
)
