import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import { UserContext } from "../../context/user";
import { buy, sellItem } from "../../useBlockchain";
import toast from "react-hot-toast";

export const ItemCard = ({item, user, handleAction}) => {
  const handleSell = (e) => {
    e.preventDefault();
    toast.promise(sellItem(user, 20, item.id), {
      loading: "Putting item to the sale ",
      success: () => {
        handleAction();
        toast.success("You successfully put it to sale");
      },
      error: "Failed to put it sale",
    });
  };
  const handleBuy = (e) => {
    e.preventDefault();

    buy(user, item.id)
      .then((res) => {
        handleAction();
        toast.success("You successfully bought");
      })
      .catch((e) => console.log("Error is : ", e));
  };
  return (
    <Card style={{ width: "18rem" }} className="d-inline-block p-2">
      <Card.Img variant="top" src={item.tokenURI} />
      <Card.Body>
        <Card.Title> {item.name}</Card.Title>

        {item.on_sale ? (
          <Card.Text>Price : {item.price}</Card.Text>
        ) : (
          <Card.Text>Not On Sale</Card.Text>
        )}
        {Buffer.from(user.pubKey).toString("hex").toUpperCase() ==
        item.owner ? (
          item.on_sale ? (
            <Button variant="danger" className="disabled" onClick={handleBuy}>
              You can't buy your own item
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSell}>
              Sell
            </Button>
          )
        ) : item.on_sale ? (
          <Button variant="success" onClick={handleBuy}>
            Buy
          </Button>
        ) : (
          <span></span>
        )}
      </Card.Body>
    </Card>
  );
};
