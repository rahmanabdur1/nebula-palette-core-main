import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, X } from "lucide-react";
import { ethers } from "ethers";
import CONTRACT_ABI from "../../futurepro-contract/artifacts/contracts/FuurePro.sol/FuturePro.json";
import { useWallet } from "@/context/WalletContext";

const CONTRACT_ADDRESS = "0x8ed7C1bB42E402d1620bEc740EBEeb9281b03E63";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { account, setAccount } = useWallet();
  const navigate = useNavigate();

  const connectWallet = async () => {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      alert("Please install MetaMask to use this dApp!");
      return;
    }

    try {
      console.log("Requesting accounts...");

      // Request account access - this should open MetaMask
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found. Please unlock MetaMask.");
      }

      const connectedAccount = accounts[0];
      console.log("Connected account:", connectedAccount);
      setAccount(connectedAccount);

      // Check network after connection
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      console.log("Current chainId:", chainId);

      // BSC Testnet chainId is 97 (0x61 in hex)
      if (chainId !== "0x61") {
        const shouldSwitch = confirm(
          "You are not on BNB Testnet. Would you like to switch to BNB Testnet?"
        );

        if (shouldSwitch) {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x61" }],
            });
          } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: "0x61",
                      chainName: "BNB Smart Chain Testnet",
                      rpcUrls: [
                        "https://data-seed-prebsc-1-s1.binance.org:8545/",
                      ],
                      blockExplorerUrls: ["https://testnet.bscscan.com"],
                      nativeCurrency: {
                        name: "BNB",
                        symbol: "BNB",
                        decimals: 18,
                      },
                    },
                  ],
                });
              } catch (addError) {
                console.error("Error adding BSC Testnet:", addError);
                alert(
                  "Failed to add BSC Testnet to MetaMask. Please add it manually."
                );
              }
            } else {
              console.error("Error switching network:", switchError);
            }
          }
        } else {
          alert("Please switch to BNB Testnet to use this dApp.");
          return;
        }
      }

      // Now check user registration with contract
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI.abi,
          provider
        );

        // Check if user exists in contract
        const userInfo = await contract.users(connectedAccount);
        const zeroAddress = "0x0000000000000000000000000000000000000000";

        if (!userInfo.wallet || userInfo.wallet === zeroAddress) {
          // User is not registered
          alert(
            "Welcome! You are connected but not registered. Please complete registration."
          );
        } else {
          // User is registered
          alert("Login successful! Welcome back.");
          navigate("/dashboard");
        }
      } catch (contractError) {
        console.error("Contract error:", contractError);
        alert(
          "Connected to wallet! Contract interaction failed. Please try again."
        );
        navigate("/dashboard"); // Still navigate to dashboard
      }
    } catch (error: any) {
      console.error("Wallet connection failed:", error);

      if (error.code === 4001) {
        // User rejected the request
        alert(
          "Connection rejected. Please approve the connection in MetaMask."
        );
      } else {
        alert(
          "Wallet connection failed: " + (error.message || "Unknown error")
        );
      }
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    navigate("/");
    alert("Wallet disconnected");
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b border-cyan-400/20">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-13 w-14 object-contain"
          />
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500">
            FUTURE PRO <br /> SPACE
          </div>
        </div>

        <div className="flex items-center gap-4">
          {account ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-cyan-400">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
              <Button
                onClick={disconnectWallet}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              onClick={connectWallet}
              className="bg-cyan-500 text-white hover:bg-blue-500"
            >
              Connect Wallet
            </Button>
          )}

          <button
            className="md:hidden text-cyan-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-cyan-400/20">
          <div className="flex flex-col space-y-4 pt-4">
            <a
              href="/"
              className="text-cyan-500 hover:text-blue-500 transition-colors"
            >
              Home
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
