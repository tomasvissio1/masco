import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Context, UserContext } from '../context/Context'

function NuevoUsuario() {
    const {usuario,cargarUsuario} = UserContext(Context)
    const [activado,SetActivado] = useState(false)

    function salir(){
        localStorage.clear()
        SetActivado(true)
        cargarUsuario('')
    }
  return (
    <div>
        {
            activado ? 
            (
                <div style={{'textAlign':'center'}}>
                    <h2>Saliste de la sesión</h2>
                    <Link to={'/'}>
                        <Button variant="primary" type="">
                            Menú Principal
                        </Button>
                    </Link>
                    
                </div>
            )
            :
            (
                <div style={{'textAlign':'center'}}>
                    <h2>Buenos dias {usuario}</h2>
                    <h4>¿Desea salir de la sesión?</h4>
                    <Button variant="primary" type="" onClick={salir}>
                            cerrar sesion
                    </Button>
                </div>
            )
        }
        
    </div>
  )
}

export default NuevoUsuario