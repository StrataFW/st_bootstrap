import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { theme } from './nui-kit/theme'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>,
)
