import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layout/App.tsx'
import './app/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // şuan katı moddayız ve kontroller 2 istek üzerinden geliyor reactın hata yapmamızı azaltması için kullandığı yöntem
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
