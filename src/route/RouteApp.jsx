import React from 'react'
import ContactList from '../ContactList/ContactList'
import NavBar from '../NavBar/NavBar'
import ContextProvider from '../context/Context'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CartList from '../Cart/CartList'
import Inicio from '../inicio/Inicio'
import PublicarAdopcion from '../PublicarAdopcion/PublicarAdopcion'
import MisPublicaciones from '../MisPublicaciones/MisPublicaciones'
import IniciarSesion from '../IniciarSesion/IniciarSesion'
import NuevoUsuario from '../NuevoUsuario/NuevoUsuario'
import CrearCuenta from '../CrearCuenta/CrearCuenta'
import PrePublicacion from '../PublicarAdopcion/PrePublicacion'


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
                  <PrePublicacion/>
                }/>

                <Route path='/MisPublicaciones' element={
                  <MisPublicaciones/>
                }/>

                <Route path='/IniciarSesion' element={
                  <IniciarSesion/>
                }/>

                <Route path='/NuevoUsuario' element={
                  <NuevoUsuario/>
                }/>

                <Route path='/CrearCuenta' element={
                  <CrearCuenta/>
                }/>

              </Routes>
              
          </ContextProvider>
        </BrowserRouter>
      </div>
    
  )
}

export default RouteApp