import React, { useEffect, useState } from 'react'
import {Button, Card, Modal} from 'react-bootstrap'
import {storage} from '../FireBase/Config'
import {getDownloadURL, listAll, ref,uploadBytes} from 'firebase/storage'
import {v4} from 'uuid'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import '../PublicarAdopcion/PublicarAdopcion.css'

function PublicarAdopcion() {
    const [realizado,SetRealizado]=useState(false)
    const [subirImagen, SetSubirImagen] =useState(null)
    const [listaDeImagenes,setListaDeImagenes] = useState([])
    const [confirmarDatos,SetConfirmarDatos] = useState(false)
    completarDatos()
        function completarDatos(){
            setTimeout(() => {
                let valor = 0
            if (document.getElementById('nombre').value=='') {
                valor++
            }
            if(document.getElementById('edad').value==''){
                valor++
            }
            if(document.getElementById('localidad').value==''){
                valor++
                
            }
            if(document.getElementById('telefono').value==''){
                valor++
            }
            if(document.getElementById('detalles').value==''){
                valor++
            }
            if (valor==0) {
                document.getElementById('cmdSubir').disabled=false
            }else{
                document.getElementById('cmdSubir').disabled=true
            }
            }, 500);

            
        }
    //traigo datos de todo lo que se escribio y tambien de las fotos
    function traerDatos(){
        let categoriaf=''
        if (document.getElementById('radioGato').checked) {
            categoriaf='gato'
        }
        if (document.getElementById('radioPerro').checked) {
            categoriaf='perro'
        }
        let nombref = document.getElementById('nombre').value
        let edadf = document.getElementById('edad').value
        let localidadf = document.getElementById('localidad').value
        let telefonof = document.getElementById('telefono').value
        let detallesf = document.getElementById('detalles').value
        let objeto={nombre:nombref,edad:edadf,localidad:localidadf,telefono:telefonof,detalle:detallesf,foto1:listaDeImagenes,categoria:categoriaf}

        const db = getFirestore()
        const queryCollection = collection(db,'mascotas')
        addDoc(queryCollection, objeto)

        SetRealizado(true)
    }
    //hago que el label active al input file
    /* setTimeout(() => {
        let labelImagen1= document.getElementById('labelImagen1')
        labelImagen1.addEventListener('click',function(){
            const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
              });
              const element = document.getElementById('cargarImagen1');
              element.dispatchEvent(event);
        })
    }, 1000); */

    // el onChange del input file, que fuarda la imagen en storage
    const funcionSubirImagen=(e)=>{
        inhabilitar()
        e.preventDefault()
        if (subirImagen==null) return;
        console.log(subirImagen.name)
       /*  const imageRef = ref(storage, `images/${subirImagen.name + v4()}`) */
       const imageRef = ref(storage, `${document.getElementById('nombre').value}/${subirImagen.name + v4()}`)
        console.log(imageRef)
        uploadBytes(imageRef, subirImagen)
        .then(()=>{
            alert("imagn cargada")
            traerFotos()
        })
    }

    //traigo la url de las fotos y la coloco en el objeto donde guardo todos los datos
    function traerFotos(){
        const imageListRef=ref(storage,`${document.getElementById('nombre').value}/`)
        listAll(imageListRef).then((response)=>{
            response.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setListaDeImagenes((prev)=> [...prev, url]
                    
                    )
                    alert("url cargada")
                    SetConfirmarDatos(true)
                    
                    
                    /* listaDeImagenes.map((foto)=>{
                        return SetFotos(...fotos,foto)
                        
                    }) */
                })
                
            })
        })
        
    }

    function inhabilitar(){
        document.getElementById('nombre').disabled=true
        document.getElementById('edad').disabled=true
        document.getElementById('localidad').disabled=true
        document.getElementById('telefono').disabled=true
        document.getElementById('detalles').disabled=true
        document.getElementById('cargarImagen1').disabled=true
        document.getElementById('cmdSubir').remove()
    }
        
        
    

  return (
    <div>
        {
            realizado ?(
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Realizado!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Aviso importante: Debes de estar atent@ a tu teléfono por si te llaman :D</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary">Close</Button>
                        <Button variant="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            ):
            
            (
                <div>
                    <Card>
                            <Card.Header as="h2" style={{'textAlign':'center'}}></Card.Header>
                            <Card.Body>
                            <div style={{'textAlign':'center'}}>
                                <form action="" method='POST' encType='application/x-www-form-urlencoded'>
                                    <div className='formGroup'>
                                        <label htmlFor="nombre">Nombre de la mascota</label>
                                        <br/>
                                        <input type="text" name="nombre" id="nombre" placeholder='Tomy...' onKeyUp={completarDatos}required/>
                                    </div>
                                    <div className='formGroup'>
                                        <label htmlFor="edad">Edad aproximada</label>
                                        <br/>
                                        <input type="number" name="edad" id="edad" placeholder='3...'onClick={completarDatos} required/>
                                    </div>
                                    <div className='formGroup'>
                                        <label htmlFor="localidad">Lugar donde se encuentra</label>
                                        <br/>
                                        <input type="text" name="localidad" id="localidad" placeholder='General Cabrera...' onClick={completarDatos} required/>
                                    </div>
                                    <div className='formGroup'>
                                        <label htmlFor="telefono">Número de teléfono</label>
                                        <br/>
                                        <input type="text" name="telefono" id="telefono"  placeholder='Contacto...'onClick={completarDatos}  required/>
                                    </div>
                                    <div className='formGroup'>
                                        <label htmlFor="detalles">Detalles de la mascota</label>
                                        <br/>
                                        <input type="text" name="detalles" id="detalles"  placeholder='Tiene tales vacunas...' onClick={completarDatos} required/>
                                    </div>
                                    <div>
                                        <h5>Elige tipo de mascota</h5>
                                        <div>
                                        <input type="radio" name="categoria" id="radioGato" required/>Gato
                                        <br/>
                                        <input type="radio" name="categoria" id="radioPerro"/>Perro
                                        </div>
                                    </div>
                                    <div>
                                        <br />
                                        {/* <label for="imagen1" class="cambiar" id="labelImagen1" className="alert alert-primary" style={{'cursor':'pointer'}}> Subir imagen</label> */}
                                        <input type="file" accept="image/*"  name="imagen1" id="cargarImagen1" onChange={(event)=>{SetSubirImagen(event.target.files[0])}} size="500" required/>
                                        <br/>
                                        <br/>
                                        <button onClick={funcionSubirImagen} id="cmdSubir">Confirmar Datos</button>
                                        <br/>
                                        
                                        <div className='formGroup'>
                                        {
                                            confirmarDatos?(<><br/>
                                            <Button variant="alert alert-primary" onClick={traerDatos}>Publicar</Button></>):(<></>)
                                        }
                                        </div>
                                    </div>
                                    
                                </form>
                            </div>
                            </Card.Body>
                        </Card>
                        
                        
                    
                </div>
            
            )
        }
    </div>
    
  )
}

export default PublicarAdopcion