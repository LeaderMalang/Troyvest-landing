import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAccount, useChainId } from "wagmi";
import { toast } from "sonner";
import { createReleaseProposal, delegateVotesToSelf } from "@/lib/dao/actions";
import { isDaoReadConfigured } from "@/lib/dao/addresses";
import { toWei } from "@/lib/dao/client";
import { getDaoProposals } from "@/lib/dao/events";
import { getDaoConfig, getDaoUserSummary } from "@/lib/dao/reads";
import { formatDuration, formatTokenAmount, formatBlock, isValidAddress, shortenAddress } from "@/lib/dao/utils";
import { daoChain } from "@/lib/dao/wagmi";
import { DaoLayout } from "@/components/dao/DaoLayout";
import { DaoStatCard } from "@/components/dao/DaoStatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const DaoDashboard = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { address, connector, isConnected } = useAccount();
  const chainId = useChainId();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isWrongChain = isConnected && chainId !== daoChain.id;

  const configQuery = useQuery({
    queryKey: ["dao", "config"],
    queryFn: getDaoConfig,
    enabled: isDaoReadConfigured,
  });

  const userQuery = useQuery({
    queryKey: ["dao", "user-summary", address],
    queryFn: () => getDaoUserSummary(address!),
    enabled: isDaoReadConfigured && Boolean(address),
  });

  const proposalsQuery = useQuery({
    queryKey: ["dao", "proposals", "recent"],
    queryFn: () => getDaoProposals(5),
    enabled: isDaoReadConfigured,
  });

  const canPropose = useMemo(() => {
    if (!userQuery.data || !configQuery.data) return false;
    return userQuery.data.votes >= configQuery.data.proposalThreshold;
  }, [configQuery.data, userQuery.data]);

  const delegateMutation = useMutation({
    mutationFn: async () => {
      if (!connector || !address) {
        throw new Error("Connect a wallet first");
      }

      return delegateVotesToSelf(connector, address);
    },
    onSuccess: (txHash) => {
      toast.success(`Votes delegated. Tx ${txHash.slice(0, 10)}...`);
      void queryClient.invalidateQueries({ queryKey: ["dao", "user-summary", address] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Delegate failed");
    },
  });

  const proposalMutation = useMutation({
    mutationFn: async () => {
      if (!connector) {
        throw new Error("Connect a wallet first");
      }
      if (!isValidAddress(recipient.trim())) {
        throw new Error("Recipient address is invalid");
      }
      if (!description.trim()) {
        throw new Error("Description is required");
      }

      return createReleaseProposal(connector, recipient.trim(), toWei(amount), description.trim());
    },
    onSuccess: (result) => {
      toast.success(`Proposal created. ID ${result.proposalId.toString()}`);
      setRecipient("");
      setAmount("");
      setDescription("");
      void queryClient.invalidateQueries({ queryKey: ["dao", "proposals"] });
      void navigate(`/dao/proposals/${result.proposalId.toString()}`);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Proposal creation failed");
    },
  });

  return (
    <DaoLayout
      title="DAO Dashboard"
      description="Track voting power, delegate VNDX, and create the exact release proposals supported by TroyReleaseGovernor."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DaoStatCard
          label="Wallet"
          value={address ? shortenAddress(address) : "Not connected"}
          hint={isWrongChain ? `Switch to ${daoChain.name}` : "Connect to propose or vote"}
        />
        <DaoStatCard
          label="VNDX Balance"
          value={userQuery.data ? `${formatTokenAmount(userQuery.data.balance)} VNDX` : configQuery.isPending ? "Loading..." : "-"}
          hint="Wallet token balance"
        />
        <DaoStatCard
          label="Voting Power"
          value={userQuery.data ? `${formatTokenAmount(userQuery.data.votes)} VNDX` : configQuery.isPending ? "Loading..." : "-"}
          hint={userQuery.data?.isSelfDelegated ? "Self-delegated" : "Delegate to activate voting power"}
        />
        <DaoStatCard
          label="Proposal Threshold"
          value={
            configQuery.data
              ? `${formatTokenAmount(configQuery.data.proposalThreshold)} VNDX`
              : configQuery.isPending
                ? "Loading..."
                : "-"
          }
          hint="Minimum active votes required to propose"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <Card className="border-white/10 bg-black/35 text-white backdrop-blur">
          <CardHeader>
            <CardTitle>Governance readiness</CardTitle>
            <CardDescription className="text-slate-400">
              This DAO flow only supports release proposals targeting the release vault.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Delegatee</p>
                <p className="mt-2 font-mono text-sm text-slate-200">
                  {userQuery.data ? shortenAddress(userQuery.data.delegatee) : "Connect wallet"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Timelock delay</p>
                <p className="mt-2 text-sm text-slate-200">
                  {configQuery.data ? formatDuration(configQuery.data.minDelay) : "Loading..."}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Voting delay</p>
                <p className="mt-2 text-sm text-slate-200">
                  {configQuery.data ? `${formatBlock(configQuery.data.votingDelay)} blocks` : "Loading..."}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Voting period</p>
                <p className="mt-2 text-sm text-slate-200">
                  {configQuery.data ? `${formatBlock(configQuery.data.votingPeriod)} blocks` : "Loading..."}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm text-yellow-50">
              Holders without delegation will often see zero voting power even when they own VNDX. Delegate to your own
              address before trying to propose or vote.
            </div>

            <Button
              onClick={() => delegateMutation.mutate()}
              disabled={!isConnected || isWrongChain || delegateMutation.isPending}
              className="bg-gradient-to-r from-[#fee372] to-[#f8c95d] text-black"
            >
              {delegateMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Delegate votes to self
            </Button>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-black/35 text-white backdrop-blur">
          <CardHeader>
            <CardTitle>Create release proposal</CardTitle>
            <CardDescription className="text-slate-400">
              This calls <span className="font-mono">proposeRelease(recipient, amount, description)</span> only.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Recipient</label>
              <Input
                value={recipient}
                onChange={(event) => setRecipient(event.target.value)}
                placeholder="0x..."
                className="border-white/10 bg-white/5 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Amount in TROY</label>
              <Input
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="1000"
                className="border-white/10 bg-white/5 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Description</label>
              <Textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Explain the release request and milestone."
                className="min-h-32 border-white/10 bg-white/5 text-white"
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              {canPropose
                ? "Your current voting power meets the proposal threshold."
                : "Proposal creation stays disabled until delegated votes meet the current proposal threshold."}
            </div>

            <Button
              onClick={() => proposalMutation.mutate()}
              disabled={!isConnected || isWrongChain || !canPropose || proposalMutation.isPending}
              className="w-full bg-gradient-to-r from-[#fee372] to-[#f8c95d] text-black"
            >
              {proposalMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Create release proposal
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-white/10 bg-black/35 text-white backdrop-blur">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Recent proposals</CardTitle>
            <CardDescription className="text-slate-400">
              Event-derived proposal history from the configured governor start block.
            </CardDescription>
          </div>
          <Link to="/dao/proposals" className="inline-flex items-center text-sm text-yellow-200 hover:text-yellow-100">
            View all proposals
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {proposalsQuery.isPending ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">Loading proposals...</div>
          ) : null}
          {(proposalsQuery.data ?? []).map((proposal) => (
            <Link
              key={proposal.proposalId.toString()}
              to={`/dao/proposals/${proposal.proposalId.toString()}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-yellow-300/30 hover:bg-white/10"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Proposal #{proposal.proposalId.toString()}</p>
              <p className="mt-3 line-clamp-2 text-sm text-slate-200">{proposal.description}</p>
              <div className="mt-4 grid gap-2 text-xs text-slate-400">
                <div>Recipient: {shortenAddress(proposal.recipient)}</div>
                <div>Amount: {formatTokenAmount(proposal.amountWei)} TROY</div>
                <div>Vote start block: {proposal.voteStart.toString()}</div>
              </div>
            </Link>
          ))}
          {!proposalsQuery.isPending && (proposalsQuery.data ?? []).length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-slate-400">
              No release proposals have been detected yet.
            </div>
          ) : null}
        </CardContent>
      </Card>
    </DaoLayout>
  );
};

export default DaoDashboard;
