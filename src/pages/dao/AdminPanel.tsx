import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useAccount, useChainId } from "wagmi";
import { toast } from "sonner";
import {
  fundReleaseVault,
  grantEmergencyCanceller,
  grantGovernorProposerRole,
  renounceTimelockAdmin,
  treasuryApproveToken,
  treasuryExecute,
  treasurySetAllowedTarget,
  treasuryTransferNative,
  treasuryTransferToken,
} from "@/lib/dao/actions";
import { isDaoReadConfigured } from "@/lib/dao/addresses";
import { getDaoAdminAccess } from "@/lib/dao/reads";
import { isValidAddress, parseBigIntInput, shortenAddress } from "@/lib/dao/utils";
import { daoChain } from "@/lib/dao/wagmi";
import { toWei } from "@/lib/dao/client";
import { DaoLayout } from "@/components/dao/DaoLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AdminPanel = () => {
  const { address, connector, isConnected } = useAccount();
  const chainId = useChainId();
  const queryClient = useQueryClient();
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [fundAmount, setFundAmount] = useState("");
  const [emergencyCanceller, setEmergencyCanceller] = useState("");
  const [allowedTarget, setAllowedTarget] = useState("");
  const [targetAllowed, setTargetAllowed] = useState(true);
  const [executeTarget, setExecuteTarget] = useState("");
  const [executeValue, setExecuteValue] = useState("");
  const [executeData, setExecuteData] = useState("0x");
  const [transferTokenAddress, setTransferTokenAddress] = useState("");
  const [transferTokenRecipient, setTransferTokenRecipient] = useState("");
  const [transferTokenAmount, setTransferTokenAmount] = useState("");
  const [approveTokenAddress, setApproveTokenAddress] = useState("");
  const [approveSpender, setApproveSpender] = useState("");
  const [approveAmount, setApproveAmount] = useState("");
  const [nativeRecipient, setNativeRecipient] = useState("");
  const [nativeAmount, setNativeAmount] = useState("");
  const isWrongChain = isConnected && chainId !== daoChain.id;

  const adminAccessQuery = useQuery({
    queryKey: ["dao", "admin-access", address],
    queryFn: () => getDaoAdminAccess(address!),
    enabled: isDaoReadConfigured && Boolean(address),
  });

  const adminAccess = adminAccessQuery.data;

  const runAdminAction = async (
    key: string,
    action: () => Promise<string>,
    successMessage: string,
    reset?: () => void,
  ) => {
    if (!connector) {
      toast.error("Connect a wallet first");
      return;
    }

    try {
      setBusyKey(key);
      const txHash = await action();
      toast.success(`${successMessage}. Tx ${txHash.slice(0, 10)}...`);
      reset?.();
      await queryClient.invalidateQueries({ queryKey: ["dao", "admin-access", address] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Admin action failed");
    } finally {
      setBusyKey(null);
    }
  };

  const validateAddress = (value: string, label: string) => {
    if (!isValidAddress(value.trim())) {
      throw new Error(`${label} address is invalid`);
    }
  };

  return (
    <DaoLayout
      title="Admin Panel"
      description="Privileged timelock and treasury actions live here. These are not public governance controls."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-white/10 bg-black/35 text-white">
          <CardContent className="space-y-2 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Connected wallet</p>
            <div className="text-lg font-semibold">{address ? shortenAddress(address) : "Not connected"}</div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-black/35 text-white">
          <CardContent className="space-y-2 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Timelock admin</p>
            <div className="text-lg font-semibold">{adminAccess?.isTimelockAdmin ? "Yes" : "No"}</div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-black/35 text-white">
          <CardContent className="space-y-2 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Emergency canceller</p>
            <div className="text-lg font-semibold">{adminAccess?.isEmergencyCanceller ? "Yes" : "No"}</div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-black/35 text-white">
          <CardContent className="space-y-2 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Treasury owner</p>
            <div className="text-lg font-semibold">{adminAccess?.isTreasuryOwner ? "Yes" : "No"}</div>
          </CardContent>
        </Card>
      </div>

      {!isConnected ? (
        <Card className="border-white/10 bg-black/35 text-white">
          <CardContent className="p-6 text-sm text-slate-300">Connect a wallet to inspect admin access and run privileged actions.</CardContent>
        </Card>
      ) : null}

      {isWrongChain ? (
        <Card className="border-amber-400/20 bg-amber-500/10 text-white">
          <CardContent className="p-6 text-sm text-amber-100">Switch to {daoChain.name} before using any admin controls.</CardContent>
        </Card>
      ) : null}

      {isConnected && adminAccess && !adminAccess.hasAdminAccess ? (
        <Card className="border-rose-400/20 bg-rose-500/10 text-white">
          <CardContent className="p-6 text-sm text-rose-100">
            The connected wallet is not recognized as a timelock admin, emergency canceller, or treasury owner.
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-white/10 bg-black/35 text-white backdrop-blur">
          <CardHeader>
            <CardTitle>Vault funding</CardTitle>
            <CardDescription className="text-slate-400">
              Fund the release vault with TROY. Amount uses TROY token decimals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={fundAmount}
              onChange={(event) => setFundAmount(event.target.value)}
              placeholder="10000"
              className="border-white/10 bg-white/5 text-white"
            />
            <Button
              disabled={!adminAccess?.hasAdminAccess || isWrongChain || busyKey === "fund"}
              onClick={() =>
                runAdminAction(
                  "fund",
                  () => fundReleaseVault(connector!, toWei(fundAmount)),
                  "Vault funded",
                  () => setFundAmount(""),
                )
              }
              className="bg-gradient-to-r from-[#fee372] to-[#f8c95d] text-black"
            >
              {busyKey === "fund" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Fund release vault
            </Button>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-black/35 text-white backdrop-blur">
          <CardHeader>
            <CardTitle>Timelock setup</CardTitle>
            <CardDescription className="text-slate-400">
              These actions should only be performed by a timelock admin or deployment multisig.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              disabled={!adminAccess?.isTimelockAdmin || isWrongChain || busyKey === "grant-proposer"}
              onClick={() =>
                runAdminAction(
                  "grant-proposer",
                  () => grantGovernorProposerRole(connector!),
                  "Governor proposer role granted",
                )
              }
              className="w-full bg-gradient-to-r from-sky-300 to-cyan-300 text-slate-950"
            >
              {busyKey === "grant-proposer" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Grant governor proposer role
            </Button>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Input
                value={emergencyCanceller}
                onChange={(event) => setEmergencyCanceller(event.target.value)}
                placeholder="Emergency canceller address"
                className="border-white/10 bg-black/30 text-white"
              />
              <Button
                disabled={!adminAccess?.isTimelockAdmin || isWrongChain || busyKey === "grant-canceller"}
                onClick={() =>
                  runAdminAction(
                    "grant-canceller",
                    async () => {
                      validateAddress(emergencyCanceller, "Emergency canceller");
                      return grantEmergencyCanceller(connector!, emergencyCanceller.trim());
                    },
                    "Emergency canceller granted",
                    () => setEmergencyCanceller(""),
                  )
                }
                className="w-full bg-gradient-to-r from-sky-300 to-cyan-300 text-slate-950"
              >
                {busyKey === "grant-canceller" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Grant canceller role
              </Button>
            </div>

            <Button
              variant="outline"
              disabled={!adminAccess?.isTimelockAdmin || isWrongChain || busyKey === "renounce-admin"}
              onClick={() =>
                runAdminAction(
                  "renounce-admin",
                  () => renounceTimelockAdmin(connector!),
                  "Timelock admin role renounced",
                )
              }
              className="w-full border-rose-400/30 bg-rose-500/10 text-rose-100 hover:bg-rose-500/20"
            >
              {busyKey === "renounce-admin" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Renounce timelock admin role
            </Button>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-black/35 text-white backdrop-blur">
          <CardHeader>
            <CardTitle>Treasury allowlist</CardTitle>
            <CardDescription className="text-slate-400">
              Set whether a target address is callable through the owner-controlled treasury.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={allowedTarget}
              onChange={(event) => setAllowedTarget(event.target.value)}
              placeholder="Target address"
              className="border-white/10 bg-white/5 text-white"
            />
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
              <input
                type="checkbox"
                checked={targetAllowed}
                onChange={(event) => setTargetAllowed(event.target.checked)}
              />
              Mark target as allowed
            </label>
            <Button
              disabled={!adminAccess?.isTreasuryOwner || isWrongChain || busyKey === "set-allowed-target"}
              onClick={() =>
                runAdminAction(
                  "set-allowed-target",
                  async () => {
                    validateAddress(allowedTarget, "Target");
                    return treasurySetAllowedTarget(connector!, allowedTarget.trim(), targetAllowed);
                  },
                  "Allowed target updated",
                  () => setAllowedTarget(""),
                )
              }
              className="bg-gradient-to-r from-emerald-300 to-lime-300 text-slate-950"
            >
              {busyKey === "set-allowed-target" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save allowlist setting
            </Button>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-black/35 text-white backdrop-blur">
          <CardHeader>
            <CardTitle>Treasury execute</CardTitle>
            <CardDescription className="text-slate-400">
              Low-level treasury call. Value uses raw wei. Data must be ABI-encoded hex.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={executeTarget}
              onChange={(event) => setExecuteTarget(event.target.value)}
              placeholder="Target address"
              className="border-white/10 bg-white/5 text-white"
            />
            <Input
              value={executeValue}
              onChange={(event) => setExecuteValue(event.target.value)}
              placeholder="Value in wei"
              className="border-white/10 bg-white/5 text-white"
            />
            <Textarea
              value={executeData}
              onChange={(event) => setExecuteData(event.target.value)}
              placeholder="0x"
              className="min-h-28 border-white/10 bg-white/5 text-white"
            />
            <Button
              disabled={!adminAccess?.isTreasuryOwner || isWrongChain || busyKey === "treasury-execute"}
              onClick={() =>
                runAdminAction(
                  "treasury-execute",
                  async () => {
                    validateAddress(executeTarget, "Target");
                    if (!executeData.trim().startsWith("0x")) throw new Error("Call data must be a hex string");
                    return treasuryExecute(
                      connector!,
                      executeTarget.trim(),
                      parseBigIntInput(executeValue || "0"),
                      executeData.trim(),
                    );
                  },
                  "Treasury execute submitted",
                )
              }
              className="bg-gradient-to-r from-emerald-300 to-lime-300 text-slate-950"
            >
              {busyKey === "treasury-execute" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Execute treasury call
            </Button>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-black/35 text-white backdrop-blur">
          <CardHeader>
            <CardTitle>Transfer token</CardTitle>
            <CardDescription className="text-slate-400">
              Generic token transfer using raw token units, not decimal-converted display amounts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={transferTokenAddress}
              onChange={(event) => setTransferTokenAddress(event.target.value)}
              placeholder="Token address"
              className="border-white/10 bg-white/5 text-white"
            />
            <Input
              value={transferTokenRecipient}
              onChange={(event) => setTransferTokenRecipient(event.target.value)}
              placeholder="Recipient address"
              className="border-white/10 bg-white/5 text-white"
            />
            <Input
              value={transferTokenAmount}
              onChange={(event) => setTransferTokenAmount(event.target.value)}
              placeholder="Amount in raw units"
              className="border-white/10 bg-white/5 text-white"
            />
            <Button
              disabled={!adminAccess?.isTreasuryOwner || isWrongChain || busyKey === "transfer-token"}
              onClick={() =>
                runAdminAction(
                  "transfer-token",
                  async () => {
                    validateAddress(transferTokenAddress, "Token");
                    validateAddress(transferTokenRecipient, "Recipient");
                    return treasuryTransferToken(
                      connector!,
                      transferTokenAddress.trim(),
                      transferTokenRecipient.trim(),
                      parseBigIntInput(transferTokenAmount),
                    );
                  },
                  "Treasury token transfer submitted",
                )
              }
              className="bg-gradient-to-r from-emerald-300 to-lime-300 text-slate-950"
            >
              {busyKey === "transfer-token" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Transfer token
            </Button>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-black/35 text-white backdrop-blur">
          <CardHeader>
            <CardTitle>Approve token / transfer native</CardTitle>
            <CardDescription className="text-slate-400">
              Token approvals use raw units. Native transfer uses raw wei.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Input
                value={approveTokenAddress}
                onChange={(event) => setApproveTokenAddress(event.target.value)}
                placeholder="Token address"
                className="border-white/10 bg-black/30 text-white"
              />
              <Input
                value={approveSpender}
                onChange={(event) => setApproveSpender(event.target.value)}
                placeholder="Spender address"
                className="border-white/10 bg-black/30 text-white"
              />
              <Input
                value={approveAmount}
                onChange={(event) => setApproveAmount(event.target.value)}
                placeholder="Allowance in raw units"
                className="border-white/10 bg-black/30 text-white"
              />
              <Button
                disabled={!adminAccess?.isTreasuryOwner || isWrongChain || busyKey === "approve-token"}
                onClick={() =>
                  runAdminAction(
                    "approve-token",
                    async () => {
                      validateAddress(approveTokenAddress, "Token");
                      validateAddress(approveSpender, "Spender");
                      return treasuryApproveToken(
                        connector!,
                        approveTokenAddress.trim(),
                        approveSpender.trim(),
                        parseBigIntInput(approveAmount),
                      );
                    },
                    "Treasury token approval submitted",
                  )
                }
                className="w-full bg-gradient-to-r from-emerald-300 to-lime-300 text-slate-950"
              >
                {busyKey === "approve-token" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Approve token
              </Button>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Input
                value={nativeRecipient}
                onChange={(event) => setNativeRecipient(event.target.value)}
                placeholder="Native transfer recipient"
                className="border-white/10 bg-black/30 text-white"
              />
              <Input
                value={nativeAmount}
                onChange={(event) => setNativeAmount(event.target.value)}
                placeholder="Amount in wei"
                className="border-white/10 bg-black/30 text-white"
              />
              <Button
                disabled={!adminAccess?.isTreasuryOwner || isWrongChain || busyKey === "transfer-native"}
                onClick={() =>
                  runAdminAction(
                    "transfer-native",
                    async () => {
                      validateAddress(nativeRecipient, "Recipient");
                      return treasuryTransferNative(connector!, nativeRecipient.trim(), parseBigIntInput(nativeAmount));
                    },
                    "Treasury native transfer submitted",
                  )
                }
                className="w-full bg-gradient-to-r from-emerald-300 to-lime-300 text-slate-950"
              >
                {busyKey === "transfer-native" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Transfer native
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DaoLayout>
  );
};

export default AdminPanel;
