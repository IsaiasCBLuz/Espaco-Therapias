import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import { Portifolio } from './pages/Client/portifolio/index.js'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router basename='/espaco'>
            <Routes>
                <Route path='/' element={<Portifolio/>}/>
            </Routes>
        </Router>
    </React.StrictMode>
)