import { createContext, useContext, useEffect, useState } from "react";

export const Context = createContext([])

export const UserContext =()=>useContext(Context) 



function ContextProvider ({children}){
    const [indice,setIndice] = useState(0)
    const [cargando2,SetCargando2] = useState(false)
    const [cachorros,SetCachorros] = useState([])
    const [inicioActivado,SetInicioActivado]=useState(false)
    const [usuario,setUsuario]=useState('')
    
    const addToCart=(gente)=>{
        SetCachorros([
            ...cachorros,
            gente
        ])
    }
    useEffect(()=>{
        if (localStorage.getItem('usuario')==null) {
        }else{
            setUsuario(localStorage.getItem('usuario'))
        }
    },[])

    const siguiente =(numero)=>{
        setIndice(numero)
    }
    const funcionCargando=(cargando)=>{
        SetCargando2(cargando)
    }

    const cargaInicio=(activar)=>{
        SetInicioActivado(activar)
    }
    const cargarUsuario=(usuario)=>{
        setUsuario(usuario)
    }
    return(
        <Context.Provider value={{
            indice,
            siguiente,
            cargando2,
            funcionCargando,
            addToCart,
            cargaInicio,
            inicioActivado,
            cachorros,
            usuario,
            cargarUsuario
            
        }}>
            {children}
        </Context.Provider>
    )
}
export default ContextProvider