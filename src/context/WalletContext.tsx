// import { createContext, useContext, useState, ReactNode } from "react";

// interface WalletContextType {
//   account: string;
//   setAccount: (acc: string) => void;
// }

// const WalletContext = createContext<WalletContextType>({
//   account: "",
//   setAccount: () => {},
// });

// export const WalletProvider = ({ children }: { children: ReactNode }) => {
//   const [account, setAccount] = useState("");

//   return (
//     <WalletContext.Provider value={{ account, setAccount }}>
//       {children}
//     </WalletContext.Provider>
//   );
// };

// // eslint-disable-next-line react-refresh/only-export-components
// export const useWallet = () => useContext(WalletContext);

// In your WalletContext
import { createContext, useContext, useState, ReactNode } from "react";

interface WalletContextType {
  account: string;
  setAccount: (account: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string>("");

  return (
    <WalletContext.Provider value={{ account, setAccount }}>
      {children}
    </WalletContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
