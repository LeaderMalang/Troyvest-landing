import { useEffect, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { daoWagmiConfig, initializeDaoWeb3Modal } from "@/lib/dao/wagmi";

type Props = {
  children: ReactNode;
};

export const DaoWeb3Provider = ({ children }: Props) => {
  useEffect(() => {
    initializeDaoWeb3Modal();
  }, []);

  return <WagmiProvider config={daoWagmiConfig}>{children}</WagmiProvider>;
};
