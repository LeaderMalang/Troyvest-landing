import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defineChain } from "viem";
import { createConfig, http } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import { daoAddresses, daoWalletConnectProjectId } from "./addresses";

const getConfiguredChain = () => {
  if (daoAddresses.chainId === bsc.id) {
    return {
      ...bsc,
      rpcUrls: {
        ...bsc.rpcUrls,
        default: { http: [daoAddresses.rpcUrl || bsc.rpcUrls.default.http[0]] },
        public: { http: [daoAddresses.rpcUrl || bsc.rpcUrls.public.http[0]] },
      },
    };
  }

  if (daoAddresses.chainId === bscTestnet.id || !daoAddresses.chainId) {
    return {
      ...bscTestnet,
      rpcUrls: {
        ...bscTestnet.rpcUrls,
        default: { http: [daoAddresses.rpcUrl || bscTestnet.rpcUrls.default.http[0]] },
        public: { http: [daoAddresses.rpcUrl || bscTestnet.rpcUrls.public.http[0]] },
      },
    };
  }

  return defineChain({
    id: daoAddresses.chainId,
    name: `Chain ${daoAddresses.chainId}`,
    nativeCurrency: {
      name: "Native Token",
      symbol: "NATIVE",
      decimals: 18,
    },
    rpcUrls: {
      default: { http: [daoAddresses.rpcUrl] },
      public: { http: [daoAddresses.rpcUrl] },
    },
  });
};

export const daoChain = getConfiguredChain();
export const daoChains = [daoChain] as const;

export const daoWagmiConfig = createConfig({
  multiInjectedProviderDiscovery: true,
  chains: daoChains,
  connectors: [
    injected({ target: "metaMask" }),
    ...(daoWalletConnectProjectId ? [walletConnect({ projectId: daoWalletConnectProjectId })] : []),
  ],
  transports: {
    [daoChain.id]: http(daoChain.rpcUrls.default.http[0]),
  },
});

let modalInitialized = false;

export const initializeDaoWeb3Modal = () => {
  if (modalInitialized || typeof window === "undefined" || !daoWalletConnectProjectId) {
    return;
  }

  createWeb3Modal({
    wagmiConfig: daoWagmiConfig,
    projectId: daoWalletConnectProjectId,
    chains: daoChains,
    themeMode: "dark",
  });

  modalInitialized = true;
};

declare module "wagmi" {
  interface Register {
    config: typeof daoWagmiConfig;
  }
}
