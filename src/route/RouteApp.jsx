import React from 'react'
import ContactList from '../ContactList/ContactList'
import NavBar from '../NavBar/NavBar'
import ContextProvider from '../context/Context'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CartList from '../Cart/CartList'


function RouteApp() {
  return (
      <div>
        <BrowserRouter>
          <ContextProvider>
              <NavBar/>
              <Routes>

                <Route path='/'element={
                <ContactList/>}/>

                <Route path='/cart' element={
                  <CartList/>
                }/>

              </Routes>
              
          </ContextProvider>
        </BrowserRouter>
      </div>
    
  )
}

export default RouteApp