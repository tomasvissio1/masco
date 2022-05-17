import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import Contact from './Contact'
import '../ContactList/ContactList.css'
import { collection, getDocs, getFirestore } from 'firebase/firestore'

function ContactList() {
    const {indice,cargando2} = useContext(Context)
    const [gente,SetGente] = useState([])
    const [activado,SetActivado] = useState(false)
    const [limite,SetLimite] = useState(true)
    let largo=0
    useEffect(()=>{
            SetActivado(cargando2)
            const querydb = getFirestore()
            const queryCollection = collection(querydb,'mascotas')
            getDocs(queryCollection)
            .then(resp=>{
                largo=(resp.size-1)
                console.log(largo+'eso es tamnaio '+indice+' eso es indice')
                if (largo<indice) {
                    SetLimite(false)
                }
                SetGente(resp.docs[indice].data())
                
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
                (<div style={{'height':'100vh','textAlign':'center'}}><h2 style={{'position':'absolute','top':'50%','left':'50%','transform':'translate(-50%,-50%)','maxWidth':'50%'}}>Cargando...</h2></div>)
            }</>)
            :
            (<div style={{'height':'100vh','textAlign':'center','display':'flex','alignItems':'center','justifyContent':'center'}}>
                <h2 style={{'fontSize':'5rem','color':'white','textShadow':'2px 2px 2px #000000'}} className='alert alert-primary'>No hay más</h2>
            </div>)
        } 

    </div>
  )
}

export default ContactList
