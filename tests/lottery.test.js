
const Web3 = require("web3");
const ganache = require("ganache-cli");
const assert = require("assert");

const web3 = new Web3(ganache.provider());

let lottery;
let accounts;

beforeEach( async () => {
	accounts = await web3.eth.getAccounts();

	lottery = await web3.eth.Contract(JSON.parse(interface))
	.deploy({data: bytecode})
	.send({from: accounts[0], gas: "1000000"}); 
});

describe("Lottery Contract" () => {
	
})