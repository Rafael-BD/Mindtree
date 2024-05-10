import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from './pages/home.jsx'
import LoginPage from './pages/login.jsx'
import Canvas from './pages/canvas.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/app" element={<Canvas />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
