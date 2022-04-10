import * as pcl from "postchain-client";

const rest = pcl.restClient.createRestClient(
  process.env.REACT_APP_NODE_URL,
  process.env.REACT_APP_BLOCKCHAIN_RID,
  5
);
const gtx = pcl.gtxClient.createClient(
  rest,
  Buffer.from(process.env.REACT_APP_BLOCKCHAIN_RID, "hex"),
  []
);
export function makeKeyPair() {
  return pcl.util.makeKeyPair();
}

export function registerUser(user) {
  const pubKey = Buffer.from(user.pubKey);
  const privKey = Buffer.from(user.privKey);
  const rq = gtx.newTransaction([pubKey]);
  rq.addOperation("register_user", pubKey);
  rq.sign(privKey, pubKey);
  return rq.postAndWaitConfirmation();
}

export async function createTestItem(user) {
  const pubKey = Buffer.from(user.pubKey);
  const privKey = Buffer.from(user.privKey);
  const rq = gtx.newTransaction([pubKey]);
  rq.addOperation("create_test_item", pubKey);
  rq.sign(privKey, pubKey);
  return rq.postAndWaitConfirmation();
}

export async function sellItem(user, price, id) {
  const pubKey = Buffer.from(user.pubKey);
  const privKey = Buffer.from(user.privKey);
  const rq = gtx.newTransaction([pubKey]);
  rq.addOperation("sell_item", pubKey, price, id);
  rq.sign(privKey, pubKey);
  return rq.postAndWaitConfirmation();
}

export async function buy(user, id) {
  const pubKey = Buffer.from(user.pubKey, "hex");
  const privKey = Buffer.from(user.privKey, "hex");
  const rq = gtx.newTransaction([pubKey]);
  rq.addOperation("buy", pubKey, id);
  rq.sign(privKey, pubKey);
  return rq.postAndWaitConfirmation();
}

export async function getAllItems() {
  return await gtx.query("get_all_items", {});
}

export async function getItemsOnSale() {
  return await gtx.query("get_items_on_sale", {});
}

export function getItemsByOwner(user) {
  const pubKey = Buffer.from(user.pubKey);

  return gtx.query("get_items_by_owner", { owner_pubkey: pubKey });
}
export async function getItem(id) {
  return await gtx.query("get_item", {
    item_id: id,
  });
}

export async function getBalance(user) {
  const pubKey = Buffer.from(user.pubKey);

  return await gtx.query("get_balance_by_pubkey", {
    user_pubkey: pubKey,
  });
}

export async function getUserByPubKey(user) {
  const pubKey = Buffer.from(user.pubKey).toString("hex");

  return await gtx.query("get_user_by_pubkey", {
    user_pubkey: pubKey,
  });
}
