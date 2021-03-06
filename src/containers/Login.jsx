import React, { useEffect, useState, useContext } from "react";
import { useHref, useNavigate } from "react-router-dom";

import { Form, Button } from "react-bootstrap";
import { makeKeyPair } from "../useBlockchain";
import { Container } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { UserContext } from "../context/user";
import { convertKeyPairToProperString } from "../utils/keypairTools";

export const Login = () => {
  let itemsURL = useHref("../items");
  const [user, setUser] = useContext(UserContext);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("Formdata 0: ",formData[0]);
    console.log("Formdata: ",formData);

    window.localStorage.setItem(
      "user",
      `{ "pubKey": "${formData[0]}", "privKey": "${formData[1]}" }`
    );

    window.localStorage.setItem("privKey", formData[1]);
    window.localStorage.setItem("pubKey", formData[0]);

    let keyPair = { pubKey: formData[0], privKey: formData[1] };

    setUser(keyPair);
    window.location.replace(itemsURL);

  };

  const createRandomKeyPairAndLogin = (e) => {
    e.preventDefault();

    const user = makeKeyPair();
    const [pubKey, privKey] = convertKeyPairToProperString(user);

    window.localStorage.setItem("privKey", privKey);
    window.localStorage.setItem("pubKey", pubKey);

    let keyPair = { pubKey: pubKey, privKey: privKey };

    setUser(keyPair);

    window.location.replace(itemsURL);

  };

  return (
    <Container className="container pt-5">
      <Form className="pt-5" onSubmit={onFormSubmit}>
        <Form.Group className="d-flex  mb-3 mt-5 p-3  ">
          <Form.Label className="col-sm-2"> Password </Form.Label>
          <Form.Control
            className=""
            type="text"
            placeholder="Enter your password"
          />
        </Form.Group>
        <ListGroup className="list-group">
          <Button
            variant="primary"
            className="d-inline-block mt-5"
            type="submit"
          >
            Submit
          </Button>

          <h3 className="p-5">OR</h3>
          <Button
            variant="success"
            className="d-inline-block"
            type="button"
            onClick={createRandomKeyPairAndLogin}
          >
            Generate Random Keypair ( one-time-usage )
          </Button>
        </ListGroup>
      </Form>
    </Container>
  );
};
