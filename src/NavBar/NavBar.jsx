import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import {faPaw} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'


function NavBar() {
  const {usuario} = useContext(Context)
  const [inicio,SetInicio] = useState(false)
  useEffect(()=>{
    if (usuario=='') {
      SetInicio(false)
    }else{
      SetInicio(true)
    }
  },[usuario])
  return (
    <Navbar bg="dark" variant="dark" id='bar'>
        <Container>
        <Link to={'/'} style={{'textDecoration':'none'}}>
            <Navbar.Brand href="#home">En adopción</Navbar.Brand>
        </Link>
        <Nav className="me-auto">
          <Link to={'/PublicarAdopcion'} style={{'textDecoration':'none'}}>
            <Nav.Link href="#home">Publicar Adopción</Nav.Link>
          </Link>
          <Link to={'/MisPublicaciones'} style={{'textDecoration':'none'}}>
            <Nav.Link href="#home">Mis Publicaciones</Nav.Link>
          </Link>
        </Nav>
        </Container>
        <div style={{"marginRight":"2%"}}>
          {
            inicio ?
            (
              <Link to={'/NuevoUsuario'}>
                <button style={{"borderRadius":"24px"}}>{usuario}</button>
              </Link>
            )
            :
            (
            <Link to={'/IniciarSesion'}>
              <button style={{"borderRadius":"24px"}}>Iniciar sesión</button>
            </Link>
          )
          }
          <Link to={'/cart'}>
            <button style={{"borderRadius":"24px"}}><FontAwesomeIcon icon={faPaw} size={'2x'}/></button>
          </Link>
        </div>
  </Navbar>
  )
}

export default NavBar