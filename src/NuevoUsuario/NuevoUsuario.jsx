import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Context, UserContext } from '../context/Context'

function NuevoUsuario() {
    const {usuario,cargarUsuario} = UserContext(Context)
    const [activado,SetActivado] = useState(false)

    function salir(){
        SetActivado(true)
        cargarUsuario('')
    }
  return (
    <div>
        {
            activado ? (
            <>volver al menu</>
            )
            :
            (
                <div>
                    <h4>Desea salir de la sesion</h4>
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