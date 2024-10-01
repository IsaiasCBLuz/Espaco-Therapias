import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import { Portifolio } from './pages/Client/portifolio/index.js'
import { Agendamento } from './pages/Client/agendamento/index.js'
import { Login } from './pages/Admin/login/index.js'
import { Clientes } from './pages/Admin/clientes/index.js'
import { Agenda } from './pages/Admin/agenda/index.js'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path='/' element={<Portifolio/>}/>
                <Route path='/agendamento' element={<Agendamento/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/my-space/clientes' element={<Clientes/>}/>
                <Route path='/my-space/agenda' element={<Agenda/>}/>
            </Routes>
        </Router>
    </React.StrictMode>
)