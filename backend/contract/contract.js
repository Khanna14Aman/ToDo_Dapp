const { ethers } = require("ethers");
const ABI = require("../abi.json");
const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${process.env.api_key}`
);
const contractAddress = `${process.env.address}`;
const contract = new ethers.Contract(contractAddress, ABI.abi, provider);

module.exports = { contract };
