import { collection, Firestore, getDocs, getFirestore } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card,Modal } from 'react-bootstrap'
import { alignPropType } from 'react-bootstrap/esm/types'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'



function CartList() {
  const {cachorros} = useContext(Context)
  const [modal,SetModal] = useState(false)
  const [mascotas,SetMascotas] = useState([])
  const [hayMascotas,SetHayMascotas] = useState(false)
  const [traerIndice,SetIndice] = useState('')
  
  
  
  
  
  useEffect(()=>{
    if (cachorros.length === 0) {
    }else{
      
      SetHayMascotas(true)
    }
  },[])

   useEffect(()=>{
        setTimeout(()=>{
          let botones = document.getElementsByClassName('boton')
          for (let i = 0; i < botones.length; i++) {
            botones[i].addEventListener('click',function(){
              SetIndice(this.id)
              AbrirModal()
            })
          }
        },1000)
        
        
    
},[]) 

  function AbrirModal(){
    SetModal(true)
    
  }
  function CerrarModal(){
    SetModal(false)
  }
  
    


  return (
    <div>
      <div>
    {
      hayMascotas ? 
      (cachorros.map((produ,index)=> <div key={index}>
      <Card>
        <Card.Header as="h2" style={{'textAlign':'center',"color":'white','textShadow':'3px 2px 6px rgba(0,0,0,0.58)'}} className='alert alert-success'>Hola! soy {produ.nombre}</Card.Header>
        <Card.Body>
          <div style={{'display':'flex','justifyContent':'space-evenly','alignItems':'center'}}>
            <div>
                <img src={produ.foto1[0]} style={{'margin':'auto','borderRadius':'50%','width': '18rem'}}  className="d-block w-1" alt="" />
            </div>
            <div style={{'textAlign':'center'}}>
                <Card.Title>Gracias por interesarte en mi!</Card.Title>
                <Card.Text>
                  {produ.detalle}
                </Card.Text>
                  <Button variant="outline-secondary" className='boton' id={index} >Comunicate conmigo!</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>))
      :
      (<div style={{'textAlign':'center'}}>No has elegido ninguna mascota</div>)
    }
    </div>

    <div>
        {
            modal ? 
            (
              <div style={{'position':'fixed','top':'0','left':'0','right':'0','bottom':'0','zIndex':'1','background':'rgba(0,0,0,0.5)'}}>
                <Modal.Dialog style={{'position':'fixed','top':'0','left':'0','right':'0','bottom':'0','zIndex':'2',"textAlign":'center'}}>
                <Modal.Header closeButton onClick={CerrarModal}>
                  <Modal.Title >{cachorros[traerIndice].nombre}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <h2>{cachorros[traerIndice].localidad}</h2>
                  <p>Teléfono: {cachorros[traerIndice].telefono}</p>
                  <Button variant="secondary" className='alert-success' style={{'color':'white','textShadow':'1px 1px 1px rgba(0,0,0,0.8)'}} onClick={CerrarModal}>Abrir Whatsapp</Button>
                </Modal.Body>
              </Modal.Dialog>
              </div>
            )
            :
            (<></>)
        }
    </div>
    </div>
    
  )
}

export default CartList