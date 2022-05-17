import React, { useContext, useEffect, useState } from 'react'
import ContactList from '../ContactList/ContactList'
import { Context } from '../context/Context'
import '../inicio/Inicio.css'

function Inicio() {
    const {inicioActivado,cargaInicio} = useContext(Context)
    
    useEffect(()=>{
        setTimeout(()=>{
            cargaInicio(true)
        },1000)
    })
    
    
  return (
    <div>
        {
            inicioActivado ? 
            (<ContactList/>)
            :
            (
            <div id='fondo'>
                <div id='Contenedor'>
                    <img src="img/perroAnimacion.gif" alt="" />
                </div>
                <div id='ContenedorTexto'>
                    <div >
                        <h1 style={{'fontSize':'2rem','color':'white','textShadow':'2px 2px 2px #000000'}} className='alert alert-primary'>Encontrá tu mascota ideal!</h1>
                    </div>
                    
                </div>
            </div>
            )
        }
    </div>
  )
}

export default Inicio