import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'
import PublicarAdopcion from './PublicarAdopcion'

function PrePublicacion() {
    const {usuario} = useContext(Context)
    const [registrado,SetRegistrado] = useState(false)
    
    useEffect(()=>{
        if (usuario=='') {
            SetRegistrado(false)
        }
        else{
            SetRegistrado(true)
        }
    },[])
  return (
    <div>
        {
            registrado ? 
            (<PublicarAdopcion/>)
            :
            (<div>
                <div>
                    <h3>Debes iniciar sesión para poder publicar una adopción</h3>
                    <Link to={'/IniciarSesion'}>
                        <Button variant="primary" type="submit">
                            Iniciar Sesión
                        </Button>
                    </Link>
                </div>
            </div>)
        }
    </div>
  )
}

export default PrePublicacion