import { createContext, useEffect, useState } from "react";
import { getLoggedUser } from "../Api/Auth/loggedUser.api";


export const tokenContext = createContext()

export default function TokenContextProvider(props) {

    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);

    async function getUserDataFn(){
        const res = await getLoggedUser()
        console.log(res)
        setUserData(res.user)

    }

    useEffect(()=>{

        if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserDataFn()
        }

    },[])

    return <tokenContext.Provider value={{ token, setToken,userData,setUserData}}>

        {props.children}

    </tokenContext.Provider>
}