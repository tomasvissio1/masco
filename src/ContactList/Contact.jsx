import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Button, Card, Carousel } from 'react-bootstrap'
import '../ContactList/Contact.css'
import { Context } from '../context/Context'
import {faHeart,faMarker,faXmark} from '@fortawesome/free-solid-svg-icons'

function Contact({gente}) {
    const {siguiente,indice,addToCart} = useContext(Context)
    const [numero,setNumero] = useState(indice)
    //const [cargando,SetCargando] = useState(false)
    console.log(gente)
      function next(e){
        e.preventDefault()
        addToCart(gente)
        quiere()
        setTimeout(() => {
          const newCount = indice + 1;
            setNumero(newCount)
            siguiente(newCount)
            volver()
        }, 1000);
      }
    
    function fail(e){
      e.preventDefault()
      noQuiere()
      setTimeout(() => {
        const newCount = indice + 1;
          setNumero(newCount)
          siguiente(newCount)
          volver()
      }, 1000);
      
    }
    function quiere(){
      document.getElementById('colores').style.background='#d1e7dd'
      
    }
    function noQuiere(){
      document.getElementById('colores').style.background='#f8d7da'
    }
    function volver(){
      document.getElementById('colores').style.background='white'
    }


  return (
      <div id='principal'>
          <Card id='tarjeta' >
          <Carousel interval={null}>
              {
                  
                  gente.foto1.map((gentes=>{

                    return(
                      <Carousel.Item >
                          <img
                          className="d-block w-100"
                          src={gentes}
                          alt="First slide"
                          />
                      </Carousel.Item>
                        
                    )
                      
                  }))
              }
              </Carousel>

            <Card.Body id="colores">
                {/* <Card.Title>Nombre: {gente.nombre}</Card.Title> */}
                <h2 className='alert alert-primary'>{gente.nombre}</h2>
                <h3>{gente.edad} años</h3>
                <Card.Text>{gente.acerca}</Card.Text>
                <Button variant="primary" className='botones botonIzquierda alert alert-primary' onClick={next} id="botonActivar"><FontAwesomeIcon icon={faHeart} size={"lg"}/></Button>
                <Button variant="primary" className='botones botonDerecha alert alert-primary' onClick={fail}><FontAwesomeIcon icon={faXmark} size={"lg"}/></Button>
            </Card.Body>
        </Card>
      </div>
    
  )
}

export default Contact