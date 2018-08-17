
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

	 it("lower than threshold ether call should fail", async () => {
	 	try{
	 		returned = await lottery.methods.enter().send({
	 			from: accounts[1],
	 			value: web3.utils.toWei("0.000001","ether")
	 		});
	 		assert.fail()
	 	} catch(err){
	 		assert.notEqual('AssertionError [ERR_ASSERTION]', err.name);
	 	}
	 });

	 it("non-manager calling pickWinner() should fail", async () => {
	 	try{
	 		await lottery.methods.pickWinner().send({
	 			from: accounts[0],
	 		});
			assert.fail()
	 	} catch(err){
	 		//console.log(err)
	 		assert.notEqual('AssertionError [ERR_ASSERTION]', err.name);
	 	}
	 });

	 it("should pick a winner", async () => {
	 	await lottery.methods.enter().send({
	 		from: accounts[1],
	 		value: web3.utils.toWei("2", "ether")
	 	});

	 	const initialBalance = await web3.eth.getBalance(accounts[1]);
	 	await lottery.methods.pickWinner().send({from: accounts[0]});
	 	const finalBalance = await web3.eth.getBalance(accounts[1]);
	 	//console.log(initialBalance, finalBalance, finalBalance - initialBalance);
	 	assert( web3.utils.toWei("2","ether"), (finalBalance - initialBalance)) 
	 });
})