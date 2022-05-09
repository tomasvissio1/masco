import { createContext, useContext, useState } from "react";

export const Context = createContext([])

export const UserContext =()=>useContext(Context) 



function ContextProvider ({children}){
    const [indice,setIndice] = useState(0)
    const [cargando2,SetCargando2] = useState(false)
    const [cachorros,SetCachorros] = useState([])
    
    const addToCart=(gente)=>{
        SetCachorros([
            ...cachorros,
            gente
        ])
    }

    const siguiente =(numero)=>{
        setIndice(numero)
    }
    const funcionCargando=(cargando)=>{
        SetCargando2(cargando)
    }
    return(
        <Context.Provider value={{
            indice,
            siguiente,
            cargando2,
            funcionCargando,
            addToCart,
            cachorros
            
        }}>
            {children}
        </Context.Provider>
    )
}
export default ContextProvider