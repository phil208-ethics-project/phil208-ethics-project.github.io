import App from './App'

import { SessionContextProvider } from '@components/SessionContext'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import './index.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <SessionContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </SessionContextProvider>
  </StrictMode>,
)
