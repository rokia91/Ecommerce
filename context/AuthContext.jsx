import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'
import { createContext } from 'react'
import { useState } from 'react';
export const authContext = createContext()

export default function AuthContextProvider({children}) {

    const [usertoken, setUsertoken] = useState(function(){
        return localStorage.getItem('tkn')
    })

    const [userData, setuserData] = useState(null)
    function decrypyusertoken(){
      const res =jwtDecode(usertoken)
      console.log('user data', res)
      setuserData(res)
    }
    useEffect(() => {
      if(usertoken){
        decrypyusertoken()
      }
   }, [usertoken])
    

    


  return (
    <authContext.Provider value={{
        setUsertoken,
        usertoken,
        userData,
    }}>
        {children}
    </authContext.Provider>
  )
}
