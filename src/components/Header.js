import React, { useEffect, useState } from "react";
import { formatWallet } from "../utils/index";
import toast from "react-hot-toast";

const { ethereum } = window;

const Header = () => {
  const [currentAccount, setCurrentAccount] = useState();

  // Check if wallet is connected by trying to get accounts from the ethereum provider
  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return toast.error("Please install metamask!");

    // Try to get accounts from the provider
    const accounts = await ethereum.request({ method: "eth_accounts" });
    setCurrentAccount(accounts[0]);
  };

  // Connect wallet by requesting accounts from the ethereum provider
  const connectWallet = async () => {
    try {
      if (!ethereum) return toast.error("Please install metamask!");

      // Request accounts from the provider
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (e) {
      console.log(e);
      throw new Error("No Ethereum object.");
    }
  };

  useEffect(() => {
    // Check if wallet is connected when component mounts
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="header">
      <h1>Minting app</h1>
      <button className="bg-gradient" onClick={connectWallet}>
        {formatWallet(currentAccount) || "Connect Wallet"}
      </button>
    </div>
  );
};

export default Header;
