import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import Contact from './Contact'
import '../ContactList/ContactList.css'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'

function ContactList() {
    const {indice,cargando2,siguiente} = useContext(Context)
    const [gente,SetGente] = useState([])
    const [activado,SetActivado] = useState(false)
    const [limite,SetLimite] = useState(true)
    const [categoria,SetCategoria]=useState('')
    let largo=0
   /*  useEffect(()=>{
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

    },[indice]) */
         //pruba

    function cualBoton(){
        let categoria1=''
       if (document.getElementById('radioTodos').checked) {
          categoria1=''
          SetCategoria(categoria1)
          siguiente(0)
      }
      if(document.getElementById('radioGatos').checked){
          categoria1='gato'
          SetCategoria(categoria1)
          siguiente(0)
      }
      if(document.getElementById('radioPerros').checked){
          categoria1='perro'
          SetCategoria(categoria1)
          siguiente(0)
      }
    }


      //fin pruba
    useEffect(()=>{
       
        if (categoria==='') {
            SetActivado(cargando2)
            const querydb = getFirestore()
            const queryCollection = collection(querydb,'mascotas')
            /* const queryFilter = query(queryCollection, where('categoria','==','gato'))
            getDocs(queryFilter) */
            getDocs(queryCollection)
            .then(resp=>{
                largo=(resp.size-1)
                if (largo<indice) {
                    SetLimite(false)
                }
                SetGente(resp.docs[indice].data())
                SetActivado(true)
            })
        }
        else{
            SetActivado(cargando2)
            const querydb = getFirestore()
            const queryCollection = collection(querydb,'mascotas')
            const queryFilter = query(queryCollection, where('categoria','==',categoria))
            getDocs(queryFilter)
            getDocs(queryFilter)
            .then(resp=>{
                largo=(resp.size-1)
                if (largo<indice) {
                    SetLimite(false)
                }
                SetGente(resp.docs[indice].data())
                SetActivado(true)
            })
        }
        

},[indice,categoria])

    

  return (
    <div>
        <div id='botonesCategoria' style={{'background':"black"}}>
            <div style={{'textAlign':'center','color':'white'}}>
                <input type="radio" name="categoria" id="radioTodos" onClick={cualBoton}/>Todos
                <input type="radio" name="categoria" id="radioGatos" onClick={cualBoton}/>Gatos
                <input type="radio" name="categoria" id="radioPerros" onClick={cualBoton}/>Perros
            </div>
        </div>
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
    </div>
    
  )
}

export default ContactList
