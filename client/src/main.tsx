import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRoot } from '@telegram-apps/telegram-ui';

import App from './App.tsx'

import './index.css'
import '@telegram-apps/telegram-ui/dist/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoot>
      <App />
    </AppRoot>
  </StrictMode>,
)
