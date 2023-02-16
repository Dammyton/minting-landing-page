import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import MyNFT from "../MyNFT.json";
import { contractAddress } from "../config";
import { formatWallet } from "../utils";
import copyIcon from "../assets/copy.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
const { ethereum } = window;

const MintingForm = () => {
  const [tokenInfo, setTokenInfo] = useState(null);
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Check if wallet is connected by trying to get accounts from the ethereum provider
  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return toast.error("Please install metamask!");

    // Try to get accounts from the provider
    const accounts = await ethereum.request({ method: "eth_accounts" });
    setCurrentAccount(accounts[0]);
  };

  useEffect(() => {
    // Check if wallet is connected when component mounts
    checkIfWalletIsConnected();
  }, []);

  async function handleMint() {
    // Check if currentAccount exists, if not display an error message and exit the function.
    if (!currentAccount) {
      toast.error("Please connect your wallet first");
      return;
    }
    setIsLoading(true);

    // Creates a provider object from the Web3Provider and the Ethereum window object
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Creates a contract object using the contract address, the contract ABI, and the signer
    const contract = new ethers.Contract(contractAddress, MyNFT.abi, signer);

    // Mint a new NFT and store the transaction.
    const transaction = await contract.mint(currentAccount);
    const receipt = await transaction.wait();

    // Checks if the transaction was successful

    if (receipt.status === 1) {
      // Sets the token information using the receipt
      setTokenInfo(receipt);
      setIsLoading(false);
    } else {
      // Displays an error message
      toast.error("NFT minting failed");
      setIsLoading(false);
    }
  }

  const copyText = () => {
    // Display a success message when a text is copied
    toast.success("Copied successfully!");
  };

  return (
    <div className="mintingForm">
      <div className="justify-center">
        {" "}
        <button
          disabled={isLoading}
          onClick={handleMint}
          className="bg-gradient"
        >
          {isLoading ? "Minting..." : "Mint NFT"}
        </button>
      </div>
      {tokenInfo && (
        <div>
          {/* Display information about the newly minted NFT */}
          <h6 className="text-xl mt-0 mb-0">NFT MINTED:</h6>
          <div className="flex">
            <p>
              <span className="font-bold">ID:&nbsp;</span>
              {tokenInfo?.blockNumber}
            </p>
            &nbsp;
            <CopyToClipboard
              text={tokenInfo?.blockNumber}
              onCopy={() => copyText()}
            >
              <img
                src={copyIcon}
                alt="copyIcon"
                height={20}
                className="cursor-pointer"
              />
            </CopyToClipboard>
          </div>
          <div className="flex">
            <p>
              <span className="font-bold">From:&nbsp;</span>
              {formatWallet(tokenInfo?.from)}
            </p>
            &nbsp;
            <CopyToClipboard text={tokenInfo?.from} onCopy={() => copyText()}>
              <img
                src={copyIcon}
                alt="copyIcon"
                height={20}
                className="cursor-pointer"
              />
            </CopyToClipboard>{" "}
          </div>
          <div className="flex">
            <p>
              <span className="font-bold">To:&nbsp;</span>
              {formatWallet(tokenInfo?.to)}
            </p>
            &nbsp;
            <CopyToClipboard text={tokenInfo?.to} onCopy={() => copyText()}>
              <img
                src={copyIcon}
                alt="copyIcon"
                height={20}
                className="cursor-pointer"
              />
            </CopyToClipboard>{" "}
          </div>
          <div className="flex">
            <p>
              <span className="font-bold">TxHash:&nbsp;</span>
              {formatWallet(tokenInfo?.transactionHash)}
            </p>
            &nbsp;
            <CopyToClipboard
              text={tokenInfo?.transactionHash}
              onCopy={() => copyText()}
            >
              <img
                src={copyIcon}
                alt="copyIcon"
                height={20}
                className="cursor-pointer"
              />
            </CopyToClipboard>{" "}
          </div>
          <div className="flex">
            <p>
              <span className="font-bold">BlockHash:&nbsp;</span>
              {formatWallet(tokenInfo?.blockHash)}
            </p>
            &nbsp;
            <CopyToClipboard
              text={tokenInfo?.blockHash}
              onCopy={() => copyText()}
            >
              <img
                src={copyIcon}
                alt="copyIcon"
                height={20}
                className="cursor-pointer"
              />
            </CopyToClipboard>{" "}
          </div>
          <div className="flex">
            <a
              href={`https://goerli.etherscan.io/tx/${tokenInfo?.transactionHash}`}
              target="_blank"
              rel="noreferrer"
            >
              View on block explorer
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MintingForm;
