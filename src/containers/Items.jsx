import React, { useCallback, useEffect, useState, useContext } from "react";
import {
  createTestItem,
  getAllItems,
  getUserByPubKey,
  registerUser,
} from "../useBlockchain";
import { ItemCard } from "../components/Cards/ItemCard";
import { Button, Card, CardGroup, Container } from "react-bootstrap";
import { UserContext } from "../context/user";
import toast, { Toaster } from "react-hot-toast";
export const Items = () => {
  const [nftList, setNftList] = useState(undefined);

  const [user, setUser] = useContext(UserContext);

  const [isUser, setIsUser] = useState(false);

  useEffect(async () => {
    try {
      if (user) {
        const registered_user = await getUserByPubKey(user);
        if (registered_user) {
          setIsUser(true);
        }

        getItems();
      }
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  const getItems = useCallback(() => {
    getAllItems()
      .then((items) => {
        if (items.length > 0) {
          setNftList(items);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const handleRefresh = (e) => {
    e.preventDefault();
    try {
      getItems();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTestItem = (e) => {
    e.preventDefault();

    toast.promise(createTestItem(user), {
      loading: "Creating the item...",
      success: () => {
        toast.success("Item successfully created");
        getItems();
      },
      error: (error) => {
        toast.error("Failed to Create");
        console.log(error);
      },
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    toast.promise(registerUser(user), {
      loading: "Registering...",
      success: () => {
        toast.success("You have successfully registered");
        window.location.reload(false);
      },
      error: (error) => {
        toast.error("Failed to Register");
        console.log(error);
      },
    });
  };

  return (
    <Container>

      {!isUser ? (
        <Button variant="warning" className="p-3 m-3" onClick={handleRegister}>
          Welcome! Please Press HERE to Register as a user
        </Button>
      ) : (
        <div>
          {user &&
            nftList &&
            nftList.map((item, index) => (
            
              <ItemCard
                key={index}
                item={item}
                user={user}
                handleAction={getItems}
              />
            
            ))}

          <p>You can create a test item!!</p>

          <Button
            variant="warning"
            className="p-3 m-3"
            onClick={handleCreateTestItem}
          >
            Create a Test Item
          </Button>
        </div>
      )}
    </Container>
  );
};
