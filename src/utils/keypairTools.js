// This functions are for storing the keypair of the user properly and
//  retrieve properly  to/from local storage.

export function convertKeyPairToProperString(user) {
  const privArray = Array.from // if available
    ? Array.from(user.privKey) // use Array#from
    : [].map.call(user.privKey, (v) => v);
  const privKey = JSON.stringify(privArray);

  const pubArray = Array.from // if available
    ? Array.from(user.pubKey) // use Array#from
    : [].map.call(user.pubKey, (v) => v);
  const pubKey = JSON.stringify(pubArray);

  return [pubKey, privKey];
}

export function retrieveKeyPairFromStorage(pub, priv) {
  const retrievedPub = JSON.parse(pub);
  const pubKey = new Uint8Array(retrievedPub);

  const retrievedPriv = JSON.parse(priv);
  const privKey = new Uint8Array(retrievedPriv);
  return [pubKey, privKey];
}
