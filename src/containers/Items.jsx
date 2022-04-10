import React, { useCallback, useEffect, useState, useContext} from 'react';
import {createTestItem, getItemsByOwner, getAllItems, init, getUserByPubKey, registerUser} from "../useBlockchain";
import {ItemCard} from "../components/Cards/ItemCard";
import { Button, Card } from 'react-bootstrap';
import { UserContext } from '../context/user';

export const Items = () => {
const [nftList,setNftList]=useState(undefined);

const [user,setUser]=useContext(UserContext);

const [isUser,setIsUser]=useState(false);

useEffect(async ()=>{
    try{
        if(user){
    const registered_user=await getUserByPubKey(user);
        if(registered_user){
            setIsUser(true);
        }

        getItems();
    }
}
    catch(e){
    console.log(e)
    }
},[user])

const getItems= useCallback(() => {
    
        getAllItems().then((items)=> {
        console.log("Items: ",items);
        if(items.length>0){
        setNftList(items);
    }
    
      }).catch((e)=> console.log(e));
    
},[]);

const handleRefresh= e => {
e.preventDefault()
try {
    getItems();

} catch (error) {
    console.log(error)
}
}

const handleInit= e => {
    e.preventDefault()
       
        init(user).then( (res) => {console.log("success, Result: ",res);getItems();}).catch((e)=> console.log("Error is : ",e))
    
    }
    const handleCreateTestItem= e => {
        e.preventDefault()
           
            createTestItem(user).then( (res) => {console.log("success, Result: ",res);getItems();} ).catch((e)=> console.log("Error is : ",e))
        
        }

        const handleRegister= e => {
            e.preventDefault()
               
                registerUser(user,"testUser").then( (res) => {console.log("success, Result: ",res);window.location.reload(false);} ).catch((e)=> console.log("Error is : ",e))
            
            }

return(     <div>

    { !isUser ?
    <Button variant='warning' className='p-3 m-3' onClick={handleRegister}>Welcome! Please Press HERE to Register as a user</Button>
        :

    <div>
    {
   user && nftList && 
     nftList.map((item,index) =>
      <ItemCard key={index} item={item} user={user} handleAction={() => getItems()} />
)}
   

   

<p>
    You can create a test item!!
</p>

{ isUser ?
<Button variant='warning' className='p-3 m-3' onClick={handleCreateTestItem}>Press HERE you are a registered user to Create a Test Item</Button>
:
<Button variant='warning' className='p-3 m-3' onClick={handleInit}>Press HERE to Create a Test Item</Button>

}
<Button variant='warning' className='p-3 m-3' onClick={handleRefresh}>Press HERE to Refresh The Test Items</Button>
</div>
}
</div>
)


}