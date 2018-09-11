# ethereum-lottery
A lottery application on Ethereum.

## To Run 
* Clone the repository.  
 ``` cd ethereum-lottery```
* Include the dependecies - 
``` node
npm install
```
* To deploy - 
``` node
node deploy.js
```

## To check the smart contract 
* It is deployed on Ethereum's Rinkeby Test Network on the address - '0x709FbA5AD9303a86A49E634e8dB8Ebc4d16dCD22'.
* You can paste the smart contract <a href="http://remix.ethereum.org">here</a>.
* Compile and set the environment to "Injected Web3".
* Use the Test network address given above and click at "At Address".   
* Then you can generate transaction to enter the lottery by adding 0.011 Eth in the value button and click "enter" button (after getting ether for the test network  <a href = "https://www.rinkeby.io/#faucet" >here</a>).

## Note
* To deploy your own smart contract, first generate an API key at <a href = https://infura.io/>infura</a> 
* To check all the transaction of my deployed contract, check <a href = "https://rinkeby.etherscan.io/address/0x709FbA5AD9303a86A49E634e8dB8Ebc4d16dCD22">this</a>.

## To test
* Run - 
``` node 
npm test
```
* Testing is done through mocha and assert library.