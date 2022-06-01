import { collection, deleteDoc, doc, Firestore, getFirestore, query, where } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Carousel } from 'react-bootstrap'
import { getStorage, ref, deleteObject } from "firebase/storage"; 
import { Context } from '../context/Context';

function MisPublicacionesCart({nombre,detalle,foto1,edad,categoria,id,individual,localidad}) {
    const [indice,SetIndice]=useState('')
    const [indice2,SetIndice2]=useState(0)
    const {usuario} = useContext(Context)
    useEffect(()=>{
            setTimeout(()=>{
            let botones = document.getElementsByClassName('botonEliminar')
            for (let i = 0; i < botones.length; i++) {
                botones[i].addEventListener('click',function(){
                    SetIndice(this.id)
                    SetIndice2(i)
                })
            }
            },1000)
    },[]) 

     async function borrar(){
        const storage = getStorage();

            // Create a reference to the file to delete
            console.log(indice2)
            const desertRef = ref(storage, `${usuario}/${individual[indice2].nombre}/${individual[indice2].nombreImagen}`)
            alert(`${usuario}/${individual[indice2].nombre}/${individual[indice2].nombreImagen}`)

            // Delete the file
            deleteObject(desertRef).then(() => {
            // File deleted successfully
            }).catch((error) => {
            // Uh-oh, an error occurred!
            });



        const querydb = getFirestore()
        await deleteDoc(doc(querydb,'mascotas',indice))
        .then(resp=>{window.location.replace('');})
            
        
        
    }

  return (
    <div style={{'textAlign':'center'}}>
        <Card style={{ width: '18rem' }}>
            <Carousel interval={null}>
                {
                    
                    foto1.map((gentes=>{

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
            <Card.Body>
                <Card.Title><h2 className='alert alert-primary'>{nombre}</h2></Card.Title>
                <h4>{localidad}</h4>
                <h4>Edad: {edad}</h4>
                <h6>Es un {categoria}</h6>
                <Card.Text>
                    Detalles: {detalle}
                </Card.Text>
                <Button variant="primary" onClick={borrar} className='botonEliminar btn-danger' id={id}>Eliminar</Button>
            </Card.Body>
        </Card>
    </div>
  )
}

export default MisPublicacionesCart