import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Context } from '../context/Context'
import NuevoUsuario from '../NuevoUsuario/NuevoUsuario'
import PrePublicacion from '../PublicarAdopcion/PrePublicacion'

function CrearCuenta() {
    const {cargarUsuario} = useContext(Context)
    const [usuarios,SetUsuarios]=useState([])
    const [distinto,SetDistinto]=useState()
    const [creado,SetCreado] = useState(false)

    useEffect(()=>{
        const quedydb = getFirestore()
        const queryCollection = collection(quedydb,'usuarios')
        getDocs(queryCollection)
        .then(resp=>{
            SetUsuarios(resp.docs.map(item=>({id:item.id,...item.data()})))
        })
    },[])

    function buscar(e){
        e.preventDefault()
        for (let i = 0; i < usuarios.length; i++) {
            if(usuarios[i].usuario!=document.getElementById('txtUsuario').value){
                SetDistinto(false)
            }else{
                alert('ya existe ese usuario')
                SetDistinto(true)
                window.location.replace('');
            }
        }
        if (distinto==false) {
            comparativa()
        }
    }
    function comparativa(){
            if (distinto==false) {
                if (document.getElementById('txtContra1').value == document.getElementById('txtContra2').value) {
                    alert('entra')
                    let objeto={usuario:document.getElementById('txtUsuario').value,contra:document.getElementById('txtContra1').value}
                    const querydb = getFirestore()
                    const queryCollection = collection(querydb,'usuarios')
                    addDoc(queryCollection,objeto)
                    .then(resp=>{
                        alert('listo')
                        cargarUsuario(objeto.usuario)
                        localStorage.setItem('usuario',objeto.usuario)
                        SetCreado(true)
                    })
                    
                }
                else{
                    alert('las contras no son iguales')
                    document.getElementById('txtContra1').value=''
                    document.getElementById('txtContra2').value=''
                }
            }
    }
  return (
    <div>
        {
            creado ? 
            (<div>
                <NuevoUsuario/>
            </div>)
            :
            (<Form style={{'width':'50%','margin':'auto','border':'1px groove','textAlign':'center'}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ingresa un usuario</Form.Label>
                <br />
                <input type="text" maxlength="14" name="" id="txtUsuario" />
                <br />
                <Form.Text className="text-muted">
                    El usuario que elijas debe tener mas de 8 caracteres
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Ingresa una contraseña</Form.Label>
                <br />
                <input type="password" name="" id="txtContra1" />
                <br />
                <Form.Text className="text-muted">
                    Ingresa una contraseña con al menos 8 caracteres
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Repite la contraseña</Form.Label>
                <br />
                <input type="password" name="" id="txtContra2" />
                <br />
                <Form.Text className="text-muted">
                    Repita la contraseña
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={buscar}>
                Confirmar
            </Button>
        </Form>)
        }
    </div>
  )
}

export default CrearCuenta