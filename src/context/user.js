import React, { useState, useEffect, useCallback } from 'react'
import { getUserByPubKey } from '../useBlockchain';



export const UserContext= React.createContext({user: {pubKey: new Uint8Array(0), privKey: new Uint8Array(0)}, setUser : React.Dispatch})

export const UserContextProvider = ( { children } ) => {

    const [user,setUser]=useState();
    const [registered,setRegistered]=useState(false);

     useEffect(()=> {
        const str=window.localStorage.getItem("pubKey")
        if(str){
        const retrievedArr = JSON.parse(str);
const pubKey = new Uint8Array(retrievedArr);
console.log(pubKey.byteLength);

const str2=window.localStorage.getItem("privKey");
const retrievedArr2 = JSON.parse(str2);
const privKey = new Uint8Array(retrievedArr2);
console.log(privKey.byteLength);
let user= { pubKey: pubKey, privKey: privKey}
        setUser(user);
    }
     },[])

     return <UserContext.Provider value={[user,setUser]}>{children}</UserContext.Provider>
}
