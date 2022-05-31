import { render } from '@testing-library/react'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, Navigate, Route,Redirect, NavigationType } from 'react-router-dom'
import { Context } from '../context/Context'

function IniciarSesion() {
    const {cargarUsuario,usuario} = useContext(Context)
    const [traerUsuarios,SetTraerUsuarios] = useState([])
    const [volver,SetVolver] = useState(false)
    let cambiar=false

    useEffect(()=>{
        const querydb = getFirestore()
        const queryCollection = collection(querydb,'usuarios')
        getDocs(queryCollection)
        .then(resp=>{
            SetTraerUsuarios(resp.docs.map(item=>({id:item.id,...item.data()})))
        })
    },[])
    
    function comparar(e){
        e.preventDefault()
        for (let i = 0; i < traerUsuarios.length; i++) {
            if(traerUsuarios[i].usuario==document.getElementById('txtUsuario').value){
                if(traerUsuarios[i].contra==document.getElementById('txtContra').value){
                    alert('entro')
                    cargarUsuario(document.getElementById('txtUsuario').value)
                    localStorage.setItem('usuario',document.getElementById('txtUsuario').value)
                    SetVolver(true)
                }else{
                    alert('contrasenia mal')
                }
            }else{
                alert('usuario no encontrado')
            }
        }
    }
  return (
      <div>
          <div>
        <Form style={{'width':'50%','margin':'auto','border':'1px groove'}}>
            {
                volver ? 
                (
                    <>
                    <br />
                    Estas registrad@ como {usuario}
                    <br />
                    <Link to={'/'}>
                        <Button variant="primary" type="">
                            Volver al menu
                        </Button>
                    </Link>
                    </>
                )
                :
                (
                    <>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Ingresa un usuario</Form.Label>
                        <br />
                        <input type="text" name="" id="txtUsuario" />
                        {/* <inpu type="text" placeholder="Enter email" id='txtUsuario'/> */}
                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <br />
                        <input type="password" placeholder="Password" id="txtContra"/>
                    </Form.Group>
                    <Button variant="primary" type="" onClick={comparar}>
                        Iniciar Sesión
                    </Button>
                    </>
                )
            }
            
        </Form>
        </div>
        <div style={{'textAlign':'center','marginTop':'2%'}}>
        <Form.Text className="text-muted">
                ¿No tienes cuenta?
        </Form.Text>
        <br />
        <Link to={'/CrearCuenta'}>
            <Button variant="primary" type="submit" >
                    Registrarme
            </Button>
        </Link>
        </div>   
      </div>
    
  )
}

export default IniciarSesion