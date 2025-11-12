"use client";

import { useState, useEffect, useCallback } from "react";
import { BrowserProvider, Contract, JsonRpcSigner } from "ethers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import ContractABI from "../../../futurepro-contract/artifacts/contracts/Lock.sol/FutureProSpace.json";

const CONTRACT_ADDRESS = "0x0BBd69fc5E3711A408DaB21B2f4D2c061b3d1E11";

// ---- MetaMask Type Definition ----
interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  isMetaMask?: boolean;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export default function UserRegisterAndProfile() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [joinedDate, setJoinedDate] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Connect Wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = (await provider.send(
        "eth_requestAccounts",
        []
      )) as string[];
      setWallet(accounts[0]);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  // ✅ Load user profile (memoized with useCallback)
  const loadUserProfile = useCallback(async () => {
    if (!wallet || !window.ethereum) return;

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer: JsonRpcSigner = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, ContractABI.abi, signer);

      const registered: boolean = await contract.isUserRegistered(wallet);
      setIsRegistered(registered);

      if (registered) {
        const name: string = await contract.getUsername(wallet);
        const joinedTimestamp: bigint = await contract.getJoinedDate(wallet);
        const date = new Date(
          Number(joinedTimestamp) * 1000
        ).toLocaleDateString();
        setUsername(name);
        setJoinedDate(date);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
  }, [wallet]);

  // ✅ Register new user
  const registerUser = async () => {
    if (!wallet || !username) return alert("Enter a username first!");

    setLoading(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer: JsonRpcSigner = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, ContractABI.abi, signer);

      const tx = await contract.registerUser(username, wallet);
      await tx.wait();

      alert("✅ Registration successful!");
      setIsRegistered(true);
      await loadUserProfile();
    } catch (error) {
      console.error("Registration failed:", error);
      alert("❌ Registration failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto-load profile when wallet changes
  useEffect(() => {
    if (wallet) {
      loadUserProfile();
    }
  }, [wallet, loadUserProfile]);

  // ---- UI Section ----
  return (
    <div
      className="glass-card rounded-2xl border border-blue-400/30 
      bg-gradient-to-br from-blue-500/5 via-indigo-500/10 to-cyan-500/5 
      p-6 w-full max-w-md mx-auto shadow-xl"
    >
      <h2 className="text-xl font-bold text-center mb-4 text-blue-500">
        User Profile
      </h2>

      {!wallet ? (
        <Button onClick={connectWallet} className="w-full">
          🔗 Connect Wallet
        </Button>
      ) : !isRegistered ? (
        <div className="flex flex-col space-y-3">
          <p className="text-sm text-muted-foreground text-center">
            Connected: {wallet.slice(0, 6)}...{wallet.slice(-4)}
          </p>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border border-blue-300 rounded-md"
          />
          <Button onClick={registerUser} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-3">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/logo.png" alt="User Avatar" />
            <AvatarFallback>{username[0]?.toUpperCase() ?? "U"}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium text-foreground">
            👤 Username: <span className="text-blue-500">{username}</span>
          </p>
          <p className="text-sm text-foreground">
            🕒 Joined on:{" "}
            <span className="text-muted-foreground">{joinedDate ?? "-"}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Wallet: {wallet.slice(0, 6)}...{wallet.slice(-4)}
          </p>
        </div>
      )}
    </div>
  );
}
