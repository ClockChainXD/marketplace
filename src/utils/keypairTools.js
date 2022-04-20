// This functions are for storing the keypair of the user properly and
//  retrieve properly  to/from local storage.
import { createPublicKey, privateDecrypt, publicDecrypt, publicEncrypt } from "crypto";
import { sha256, verifyKeyPair } from "postchain-client/src/util";
import * as wordList from "../wordList.json"
export function convertKeyPairToProperString(keyPair) {
  const privArray = Array.from // if available
    ? Array.from(keyPair.privKey) // use Array#from
    : [].map.call(keyPair.privKey, (v) => v);
  const privKey = JSON.stringify(privArray);

  const pubArray = Array.from // if available
    ? Array.from(keyPair.pubKey) // use Array#from
    : [].map.call(keyPair.pubKey, (v) => v);
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

// Creating And Encrypt KeyPair Step 1:
export function createRandomMnemonicWithPassword(password){

  let i=0;
  let mnemonic=[];
  while (i<11) {
    let randomIndex=Math.random(2047)
    mnemonic.push(wordList[randomIndex]);  
  i++;   
  }
  mnemonic.push(password);
  return mnemonic;
}

// Creating And Encrypt KeyPair Step 2:
export function createKeyPairWithMnemonic(mnemonic){

  let privateKey=sha256(mnemonic);
  const keyPair= verifyKeyPair(privateKey);
  
  return keyPair;
}

// Creating And Encrypt KeyPair Step 3:
export function encryptKeyPairWithPassword(keyPair,password){

  const pubKeyOfEncryption=createPublicKey(sha256(password));
  const encryptedPublicKey=publicEncrypt(pubKeyOfEncryption,keyPair.pubKey);

  const privKeyOfEncryption=sha256(password);
  const encryptedPrivateKey=publicEncrypt(privKeyOfEncryption,keyPair.pubKey);


  return {encryptedPublicKey,encryptedPrivateKey};

}

// For Decryption Of The Local Stored KeyPair
export function decryptKeyPairWithPassword(password,encryptedKeyPair){

const decryptedPubKey=privateDecrypt(sha256(password),encryptedKeyPair.pubKey)
const decryptedPrivKey=privateDecrypt(sha256(password),encryptedKeyPair.privKey)

return {decryptedPubKey,decryptedPrivKey}

}