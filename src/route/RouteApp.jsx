import React from 'react'
import ContactList from '../ContactList/ContactList'
import NavBar from '../NavBar/NavBar'
import ContextProvider from '../context/Context'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CartList from '../Cart/CartList'
import Inicio from '../inicio/Inicio'
import PublicarAdopcion from '../PublicarAdopcion/PublicarAdopcion'


function RouteApp() {
  return (
      <div>
        <BrowserRouter>
          <ContextProvider>
              <NavBar/>
              <Routes>

                <Route path='/'element={
                <Inicio/>}/>

                <Route path='/cart' element={
                  <CartList/>
                }/>

                <Route path='/PublicarAdopcion' element={
                  <PublicarAdopcion/>
                }/>

              </Routes>
              
          </ContextProvider>
        </BrowserRouter>
      </div>
    
  )
}

export default RouteApp