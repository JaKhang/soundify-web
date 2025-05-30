import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import store from "@redux/store.ts";
import './i18n/i18next.ts'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./config/theme.ts"
import {BrowserRouter} from "react-router";
import {CookiesProvider} from "react-cookie";

createRoot(document.getElementById('root')!).render(
  <>
      <BrowserRouter>
      <Provider store={store}>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
          </ThemeProvider>
      </Provider>
      </BrowserRouter>
  </>,
)
