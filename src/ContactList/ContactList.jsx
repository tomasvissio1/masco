import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import Contact from './Contact'
import '../ContactList/ContactList.css'

function ContactList() {
    const {indice,cargando2} = useContext(Context)
    const [gente,SetGente] = useState([])
    const [activado,SetActivado] = useState(false)
    const [limite,SetLimite] = useState(true)
    useEffect(()=>{
        SetActivado(cargando2)
            fetch('gente.json')
            .then(response => response.json())
            .then(resp=>{
                     SetGente(resp[indice])
                     if (resp[indice]==null) {
                         SetLimite(false)
                     }
                     SetActivado(true)
                    
            })
    },[indice])

    



  return (
    <div id='fondo'>
        {
        
        
            limite ? 
            (<>{
                activado ? (
                    <div >
                        <Contact
                            gente={gente}
                        />
                    </div>
                )
                :
                (<>Cargando...</>)
            }</>)
            :
            (<>no hay más</>)
        } 

    </div>
  )
}

export default ContactList

/* 
{
    limite ? 
    (<>{
        activado ? (
            <div >
                <Contact
                    gente={gente}
                />
            </div>
        )
        :
        (<>Cargando...</>)
    }</>)
    :
    (<>no hay más</>)
} */