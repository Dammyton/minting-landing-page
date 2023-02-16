const { ethers } = require("hardhat");

async function main() {
  // Use ethers to get the contract factory for "MyNFT"
  const NFT = await ethers.getContractFactory("MyNFT");

  // Deploy the NFT contract to the blockchain
  const nft = await NFT.deploy();

  // Log the deployed contract's address to the console
  console.log("NFT contract address:", nft.address);
}

main()
  .then(() => process.exit(0))
  // Log any errors to the console, and exit with an error code
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
