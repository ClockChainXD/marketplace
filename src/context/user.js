import React, { useState, useEffect, useCallback } from "react";
import { getUserByPubKey } from "../useBlockchain";
import { retrieveKeyPairFromStorage } from "../utils/keypairTools";

export const UserContext = React.createContext({
  user: { pubKey: new Uint8Array(0), privKey: new Uint8Array(0) },
  setUser: React.Dispatch,
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    pubKey: new Uint8Array(0),
    privKey: new Uint8Array(0),
  });

  // Checking localStorage onMount to see if the user logged-in and saving it to context
  useEffect(() => {
    const pub = window.localStorage.getItem("pubKey");
    const priv = window.localStorage.getItem("privKey");
    if (pub && priv) {
      const [pubKey, privKey] = retrieveKeyPairFromStorage(pub, priv);
      let user = { pubKey: pubKey, privKey: privKey };
      setUser(user);
    }
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};
