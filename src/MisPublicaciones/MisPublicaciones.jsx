import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import MisPublicacionesCart from './MisPublicacionesCart'


function MisPublicaciones() {
    const {usuario} = useContext(Context)
    const [publicaciones,SetPublicaciones] = useState([])
    const [activado,SetActivado] = useState(false)
    const [sinPublicaciones,SetSinPublicaciones] = useState(true)

    useEffect(()=>{
        filtrado()
        function filtrado(){
            const querydb = getFirestore()
            const queryCollection = collection(querydb,'mascotas')
            const queryFilter = query(queryCollection,where('usuario','==',usuario))
            getDocs(queryFilter)
            .then(resp=>{SetPublicaciones(resp.docs.map(item=>({id:item.id,...item.data()})))
             
            })
        }
    },[])

    useEffect(()=>{
        setTimeout(()=>{
            if (publicaciones.length==0) {
                SetSinPublicaciones(false)
            }else{
                SetActivado(true)
            }
        },3000)
        console.log(publicaciones)
    },[publicaciones])

    
            
        
  
  
  
  
    return (
    <div >
        {
            activado ? 
            (<div style={{'display':'flex','alignItems':'center','justifyContent':'space-evenly'}}>
                {
                    publicaciones.map((individual)=>{
                        return(
                            <div key={individual.id} >
                                <MisPublicacionesCart
                                individual={publicaciones}
                                nombre={individual.nombre}
                                id = {individual.id}
                                detalle = {individual.detalle}
                                foto1={individual.foto1}
                                edad={individual.edad}
                                categoria={individual.categoria}
                                localidad={individual.localidad}
                                />
                            </div>
                        );
                    })
                }
            </div>)
            :
            
            (<div>
                {
                sinPublicaciones ? (<div>Cargando...</div>):(<div>No tienes publicaciones</div>)
                }
            </div>)
        }
    </div>
  )
}

export default MisPublicaciones