import { useMemo } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { LogOut, Wallet } from "lucide-react";
import { useAccount, useChainId, useDisconnect, useSwitchChain } from "wagmi";
import { daoWalletConnectProjectId } from "@/lib/dao/addresses";
import { shortenAddress } from "@/lib/dao/utils";
import { daoChain } from "@/lib/dao/wagmi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DaoConnectButton = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitchingChain } = useSwitchChain();
  const chainId = useChainId();
  const isWrongChain = isConnected && chainId !== daoChain.id;
  const label = useMemo(() => shortenAddress(address), [address]);

  if (!daoWalletConnectProjectId) {
    return (
      <Button disabled variant="outline" className="border-amber-400/40 bg-amber-500/10 text-amber-100">
        WalletConnect not configured
      </Button>
    );
  }

  if (!isConnected) {
    return (
      <Button onClick={() => open()} className="bg-gradient-to-r from-[#fee372] to-[#f8c95d] text-black">
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-white/20 bg-black/40 text-white hover:bg-black/60">
          <Wallet className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 border-white/10 bg-slate-950/95 text-white">
        <DropdownMenuLabel className="space-y-1">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-400">DAO Wallet</div>
          <div className="font-mono text-sm">{label}</div>
          <div className="text-xs text-slate-400">{isWrongChain ? "Wrong network" : daoChain.name}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        {isWrongChain && (
          <DropdownMenuItem
            onClick={() => switchChain({ chainId: daoChain.id })}
            disabled={isSwitchingChain}
            className="cursor-pointer"
          >
            Switch to {daoChain.name}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => disconnect()} className="cursor-pointer text-rose-300">
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
