import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import {faPaw} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


function NavBar() {
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
        </Nav>
        </Container>
        <div style={{"marginRight":"2%"}}>
          <Link to={'/cart'}>
            <button style={{"borderRadius":"24px"}}><FontAwesomeIcon icon={faPaw} size={'2x'}/></button>
          </Link>
        </div>
  </Navbar>
  )
}

export default NavBar