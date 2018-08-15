
// This is a file to compile the code at ./contracts/lottery.sol
const solc = require("solc");
const fs = require("fs");
const path = require("path");

const lotteryPath = path.resolve(__dirname, "contracts", "lottery.sol");
const source = fs.readFileSync(lotteryPath, "utf8");

//console.log(solc.compile(source, 1).contracts[":Lottery"])
module.exports = solc.compile(source, 1).contracts[":Inbox"]