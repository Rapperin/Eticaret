import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css'; 
import {RouterProvider} from 'react-router-dom'
import { router } from './app/router/Router';




  // şuan katı moddayız ve kontroller 2 istek üzerinden geliyor reactın hata yapmamızı azaltması için kullandığı yöntem
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
     
        <RouterProvider router={router} />
      
    </React.StrictMode>
  );
  

 