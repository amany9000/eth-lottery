
const Web3 = require("web3");
const ganache = require("ganache-cli");
const assert = require("assert");

const {interface, bytecode} = require("../compile.js")
const web3 = new Web3(ganache.provider());

let lottery;
let accounts;

beforeEach( async () => {
	accounts = await web3.eth.getAccounts();

	lottery = await new web3.eth.Contract(JSON.parse(interface))
	.deploy({data: bytecode})
	.send({from: accounts[0], gas: "1000000"}); 
});

describe("Lottery Contract", () => {
	 
	 it("deploys a contract", () => {
	 	assert.ok(lottery.options.address);
	 });

	 it("allow one account to enter", async () => {
	 	
	 	await lottery.methods.enter().send({
	 		from: accounts[1],
	 		value: web3.utils.toWei("0.11","ether")
	 	});

	 	const players = await lottery.methods.getPlayers().call({
	 		from: accounts[0]
	 	});

	 	assert.equal(accounts[1], players[0]);
	 	assert.equal(1,players.length);
	 });

	 it("allow three account to enter", async () => {
	 	
	 	await lottery.methods.enter().send({
	 		from: accounts[1],
	 		value: web3.utils.toWei("0.11","ether")
	 	});

	 	await lottery.methods.enter().send({
	 		from: accounts[2],
	 		value: web3.utils.toWei("0.1112","ether")
	 	});
	 	
	 	await lottery.methods.enter().send({
	 		from: accounts[3],
	 		value: web3.utils.toWei("0.011","ether")
	 	});
	 	
	 	const players = await lottery.methods.getPlayers().call({
	 		from: accounts[0]
	 	});

	 	assert.equal(accounts[1], players[0]);
	 	assert.equal(accounts[2], players[1]);
	 	assert.equal(accounts[3], players[2]);
	 	assert.equal(3,players.length);
	 });

	 it("should fail because of lower than threshold ether", async () => {
	 	try{
	 		
	 		await lottery.methods.enter().send({
	 			from: accounts[1],
	 			value: web3.utils.toWei("0.009","ether")
	 		});
			assert(false);			 		
	 	}
	 	
	 	catch(err){
	 		assert(err);
	 	}
	 })
})