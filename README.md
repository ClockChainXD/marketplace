# Simple Item Market

I ran the node from rell web ide. To use the rell code, you should run a node, for example  at https://try.chromia.dev/ by importing the market3.zip to there or run it on eclipse and then paste the blockchain RID and url to .env file.

# Start React App

yarn start or npm start

# Login

Login screen has two options.

## Register with public and private key pair

## Generate Random Keypair and store it in the local storage

# Items

You will see the register button first if your pubkey not registered as user to the chain.

Then You can press the create test item button to create a template item for the test.

When it is created, you can sell it. The item is written as a template because the main functionality is to put it to sale and buy it.

## Sell

When you press sell I configured it to put it sale from 20 tokens price automatically for avoiding extra component and css.

## Buy
You can press buy if you are not the owner of the item. When you press it you buy it.

Note : You need to re-generate keypair from login screen to buy the item created. Because you have to login as another user.


