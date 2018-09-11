
// This file is a demo of an endpoint, adding and manipulating the contract's data 
const {read,getWeb3} = require("./lottery.js");


read().then( async (lottery) => {
	
	web3 = await getWeb3();
	const accounts = await web3.eth.getAccounts();

	//Printing the manager
	console.log("Le Manager",await lottery.methods.manager().call());

	//account no. 2 is entering the game 
	await lottery.methods.enter()
		.send({from: accounts[0], value: web3.utils.toWei("0.11","ether")}
	);
	
	// Printing the list of players
	console.log("The players - ", await lottery.methods.getPlayers().call());	

	// choosing the winner
	console.log(await lottery.methods.pickWinner().send({from: accounts[0]}))
});
