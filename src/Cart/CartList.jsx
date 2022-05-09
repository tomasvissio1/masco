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
  let botones = document.getElementsByClassName('boton')
  
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click',function(){
      SetIndice(this.id)
      AbrirModal()
    })
  }
  useEffect(()=>{
    if (cachorros.length === 0) {
    }else{
      
      SetHayMascotas(true)
        
      
      
    }
  },[])

   useEffect(()=>{
        fetch('gente.json')
        .then(response => response.json())
        .then(resp=>{SetMascotas(resp)
        })
    
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
      (cachorros.map((produ)=> <div key={produ.id}>
      <Card>
        <Card.Header as="h2" style={{'textAlign':'center'}}>Hola! soy {produ.nombre}</Card.Header>
        <Card.Body>
          <div style={{'display':'flex','justifyContent':'space-evenly','alignItems':'center'}}>
            <div>
                <img src={produ.foto1[0]} style={{'width':'60%','margin':'auto','borderRadius':'50%'}} alt="" />
            </div>
            <div style={{'textAlign':'center'}}>
                <Card.Title>Gracias por interesarte en mi!</Card.Title>
                <Card.Text>
                  {produ.acerca}
                </Card.Text>
                  <Button variant="outline-secondary" className='boton' id={produ.id} >Comunicate conmigo!</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>))
      :
      (<>No has elegido ninguna mascota</>)
    }
    </div>

    <div>
        {
            modal ? 
            (
              <div style={{'position':'fixed','top':'0','left':'0','right':'0','bottom':'0','zIndex':'1','background':'rgba(0,0,0,0.5)'}}>
                <Modal.Dialog style={{'position':'fixed','top':'0','left':'0','right':'0','bottom':'0','zIndex':'2',"textAlign":'center'}}>
                <Modal.Header closeButton onClick={CerrarModal}>
                  <Modal.Title >{mascotas[traerIndice].nombre}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <h2>{mascotas[traerIndice].ubicacion}</h2>
                  <p>Teléfono: {mascotas[traerIndice].telefono}</p>
                  <Button variant="secondary" onClick={CerrarModal}>Abrir Whatsapp</Button>
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