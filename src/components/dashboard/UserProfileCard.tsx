import { useEffect, useState } from "react";
import { ethers } from "ethers";
import CONTRACT_ABI from "../../../futurepro-contract/artifacts/contracts/FuurePro.sol/FuturePro.json";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const CONTRACT_ADDRESS = "0x8ed7C1bB42E402d1620bEc740EBEeb9281b03E63";
declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
      on?: (eventName: string, callback: (...args: unknown[]) => void) => void;
      removeListener?: (
        eventName: string,
        callback: (...args: unknown[]) => void
      ) => void;
    };
  }
}
interface UserStruct {
  wallet: string;
  userId: bigint;
  referrerId: bigint;
  isActive: boolean;
  joinTime: bigint;
  directPartners: bigint;
  totalTeam: bigint;
  royaltyLevel: bigint;
  activeSlotsCount: bigint;
}

interface UserProfileCardProps {
  account: string;
}

export function UserProfileCard({ account }: UserProfileCardProps) {
  const [joinDate, setJoinDate] = useState<string>("");

  useEffect(() => {
    if (!account) return;

    const fetchUserInfo = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI.abi,
          provider
        );
        const userInfo: UserStruct = await contract.users(account);

        const zeroAddress = "0x0000000000000000000000000000000000000000";
        if (!userInfo.wallet || userInfo.wallet === zeroAddress) {
          setJoinDate("Not registered");
          return;
        }

        setJoinDate(
          new Date(Number(userInfo.joinTime) * 1000).toLocaleString()
        );
      } catch (err) {
        console.error(err);
        setJoinDate("Error fetching info");
      }
    };

    fetchUserInfo();
  }, [account]);

  if (!account) return <p className="text-red-500">Wallet not connected</p>;

  return (
    <div className="glass-card rounded-2xl border p-6 max-w-md mx-auto shadow-xl">
      <Avatar className="h-20 w-20">
        <AvatarImage src="/logo.png" alt="User Avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <p>
        Username: <span className="text-blue-500">U</span>
      </p>
      <p>
        Joined on: <span>{joinDate}</span>
      </p>
      <p>
        Wallet: {account.slice(0, 6)}...{account.slice(-4)}
      </p>
    </div>
  );
}
