import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import {Form, Button} from "react-bootstrap";
import { makeKeyPair } from "../useBlockchain";
import { Container } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { UserContext } from '../context/user';


export  const Login = () => {

    let navigate =useNavigate();
    const [user,setUser]=useContext(UserContext);

    const onFormSubmit = e => {
        e.preventDefault()
        const formData = new FormData(e.target)
                window.localStorage.setItem('user', `{ "pubKey": "${formData[0]}", "privKey": "${formData[1]}" }`);

      }

      const login = e => {
        e.preventDefault()

         const user=makeKeyPair()
         const arr = Array.from // if available
  ? Array.from(user.privKey) // use Array#from
  : [].map.call(user.privKey, (v => v));
  const privKey=JSON.stringify(arr)


  const arr2 = Array.from // if available
  ? Array.from(user.pubKey) // use Array#from
  : [].map.call(user.pubKey, (v => v));
  const pubKey=JSON.stringify(arr2)

        window.localStorage.setItem('user', `{ "pubKey": "${Buffer.from(user.pubKey).toString('hex')}", "privKey": "${Buffer.from(user.privKey).toString('hex')}" }`);
        window.localStorage.setItem('privKey',privKey);
        window.localStorage.setItem('pubKey',pubKey);
        let keyPair= { pubKey: pubKey, privKey: privKey}
        setUser(keyPair);
        console.log(Buffer.from(user.pubKey).toString('hex'),Buffer.from(user.privKey).toString('hex'))
        navigate("../items", { replace: true })
      }


    return(
        <Container className="container pt-5">

<Form className="pt-5" onSubmit={onFormSubmit}>
  <Form.Group   className="d-flex  mb-3 mt-5 p-3" >
    <Form.Label className="col-sm-2">Public Key</Form.Label>
    <Form.Control   type="text" placeholder="Enter Public Key" />
  </Form.Group>
    
  <Form.Group className="d-flex  mb-3 mt-5 p-3  ">
    <Form.Label className="col-sm-2">Private Key</Form.Label>
    <Form.Control className="" type="text" placeholder="Enter Private Key" />
  </Form.Group>
  <ListGroup className="list-group">
  <Button variant="primary"className="d-inline-block mt-5" type="submit" >
    Submit
  </Button>

    <h3 className="p-5">
    OR
    </h3>
  <Button variant="success"className="d-inline-block" type="button" onClick={login} >
       Generate Random Keypair ( one-time-usage )
  </Button> 
  </ListGroup>
</Form>
</Container>
    );


}
