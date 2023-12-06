import { useState } from 'react'
import{BrowserRouter as Router,Route,Routes} from 'react-router-dom'

import NavBar from './components/estructura/NavBar'
import Inicio from './components/estructura/Inicio'
import Fabricante from './components/paginas/Fabricante'
import Articulo from './components/paginas/Articulo'

const App = () => {


  return (
    <>
        <Router>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Inicio/>}/>
            <Route path="/Fabricante" element={<Fabricante/>}/>
            <Route path="/Articulo" element={<Articulo/>}/>
          </Routes>
        </Router> 
    </>
  )
}

export default App
