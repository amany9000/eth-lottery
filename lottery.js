
// This function returns a promis containing the contract instance of inbox
const Web3 = require("web3");
const hdWalletProvider = require("truffle-hdwallet-provider");
const { interface, bytecode } = require("./compile");

const getWeb3 = async()=> {
	const provider = new hdWalletProvider(
		"{Your Account Mnemonics from Metamask}",
		"https://rinkeby.infura.io/v3/e8bccfbf91864d7ea8797b0ae8b2d30a"  // This address will be generated through infura 
	);
	
	return new Web3(provider);
}

const read = async () => {

	const web3 = await getWeb3();
	return await new web3.eth.Contract((JSON.parse(interface)), 
		"0x709FbA5AD9303a86A49E634e8dB8Ebc4d16dCD22");
} 

module.exports = {read,getWeb3};
