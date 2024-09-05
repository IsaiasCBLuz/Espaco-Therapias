import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import { Portifolio } from './pages/Client/portifolio/index.js'
import { Agendamento } from './pages/Client/agendamento/index.js'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router basename='/espaco'>
            <Routes>
                <Route path='/' element={<Portifolio/>}/>
                <Route path='/agendamento' element={<Agendamento/>}/>
            </Routes>
        </Router>
    </React.StrictMode>
)