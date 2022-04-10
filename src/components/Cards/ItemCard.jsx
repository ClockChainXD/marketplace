import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import { UserContext } from '../../context/user';
import { buy, sellItem } from '../../useBlockchain';




export const ItemCard = (item,user,handleAction) => {
  

    const handleSell= e =>{
        e.preventDefault()
        sellItem(item.user,20,item.item.id).then( () => { item.handleAction(); handleAction();}).catch((e)=> console.log("Error is : ",e))
    }
    const handleBuy= e =>{
        e.preventDefault()

        buy(item.user,item.item.id).then( () => { item.handleAction(); handleAction();}).catch((e)=> console.log("Error is : ",e))
    }
    return(
         
<Card style={{ width: '18rem'  }} className="d-inline-block p-2">
  <Card.Img variant="top" src={item.item.tokenURI} />
  <Card.Body>
    <Card.Title> { item.item.name }</Card.Title>
    
   {  item.item.on_sale ?
   <Card.Text>
   Price : { item.item.price }
    </Card.Text>
    :
    <Card.Text>
   Not On Sale
    </Card.Text>
}
       {Buffer.from(item.user.pubKey).toString('hex').toUpperCase()==item.item.owner   ?  item.item.on_sale ? <Button variant="danger" className='disabled' onClick={handleBuy}>You can't buy your own item</Button> :  <Button variant="primary" onClick={handleSell}>Sell</Button> : item.item.on_sale ?  <Button variant="success" onClick={handleBuy}>Buy</Button> : <span></span>   }
        
  </Card.Body>
</Card> 

);


}