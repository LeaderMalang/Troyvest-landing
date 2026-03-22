import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAccount, useChainId } from "wagmi";
import { toast } from "sonner";
import { castReleaseVote, executeReleaseProposal, queueReleaseProposal } from "@/lib/dao/actions";
import { isDaoReadConfigured } from "@/lib/dao/addresses";
import { getDaoProposalById } from "@/lib/dao/events";
import { getDaoExecutionAccess, getProposalSummary } from "@/lib/dao/reads";
import { formatTokenAmount, shortenAddress } from "@/lib/dao/utils";
import { daoChain } from "@/lib/dao/wagmi";
import { DaoLayout } from "@/components/dao/DaoLayout";
import { DaoStatusBadge } from "@/components/dao/DaoStatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProposalDetails = () => {
  const params = useParams();
  const { address, connector, isConnected } = useAccount();
  const chainId = useChainId();
  const queryClient = useQueryClient();
  const isWrongChain = isConnected && chainId !== daoChain.id;
  const proposalId = useMemo(() => {
    try {
      return params.proposalId ? BigInt(params.proposalId) : null;
    } catch {
      return null;
    }
  }, [params.proposalId]);

  const proposalQuery = useQuery({
    queryKey: ["dao", "proposal", proposalId?.toString()],
    queryFn: () => getDaoProposalById(proposalId!),
    enabled: isDaoReadConfigured && proposalId !== null,
  });

  const summaryQuery = useQuery({
    queryKey: ["dao", "proposal-summary", proposalId?.toString(), address],
    queryFn: () => getProposalSummary(proposalId!, address),
    enabled: isDaoReadConfigured && proposalId !== null && proposalQuery.data !== null,
  });

  const executionAccessQuery = useQuery({
    queryKey: ["dao", "execution-access", address],
    queryFn: () => getDaoExecutionAccess(address!),
    enabled: isDaoReadConfigured && Boolean(address),
  });

  const runAndRefresh = async (action: () => Promise<string>, successMessage: string) => {
    const txHash = await action();
    toast.success(`${successMessage}. Tx ${txHash.slice(0, 10)}...`);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["dao", "proposal-summary", proposalId?.toString()] }),
      queryClient.invalidateQueries({ queryKey: ["dao", "proposals"] }),
    ]);
    return txHash;
  };

  const voteMutation = useMutation({
    mutationFn: async (support: 0 | 1 | 2) => {
      if (!connector || proposalId === null) throw new Error("Connect a wallet first");
      return runAndRefresh(() => castReleaseVote(connector, proposalId, support), "Vote submitted");
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Vote failed"),
  });

  const queueMutation = useMutation({
    mutationFn: async () => {
      if (!connector || !proposalQuery.data) throw new Error("Connect a wallet first");
      return runAndRefresh(
        () =>
          queueReleaseProposal(
            connector,
            proposalQuery.data!.recipient,
            proposalQuery.data!.amountWei,
            proposalQuery.data!.description,
          ),
        "Proposal queued",
      );
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Queue failed"),
  });

  const executeMutation = useMutation({
    mutationFn: async () => {
      if (!connector || !proposalQuery.data) throw new Error("Connect a wallet first");
      return runAndRefresh(
        () =>
          executeReleaseProposal(
            connector,
            proposalQuery.data!.recipient,
            proposalQuery.data!.amountWei,
            proposalQuery.data!.description,
          ),
        "Proposal executed",
      );
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Execute failed"),
  });

  const canVote =
    Boolean(connector) &&
    !isWrongChain &&
    summaryQuery.data?.state === 1 &&
    summaryQuery.data.hasVoted === false;
  const hasExecutionAccess = executionAccessQuery.data?.canExecute ?? false;
  const canQueue = Boolean(connector) && !isWrongChain && summaryQuery.data?.state === 4 && hasExecutionAccess;
  const canExecute = Boolean(connector) && !isWrongChain && summaryQuery.data?.state === 5 && hasExecutionAccess;

  return (
    <DaoLayout
      title="Proposal Details"
      description="Inspect one release proposal, cast a vote, and queue or execute it with the exact original payload."
    >
      {!proposalId ? (
        <Card className="border-rose-400/20 bg-rose-500/10 text-white">
          <CardContent className="p-6 text-sm">The proposal id in this URL is invalid.</CardContent>
        </Card>
      ) : null}

      {proposalId && proposalQuery.data === null && !proposalQuery.isPending ? (
        <Card className="border-white/10 bg-black/35 text-white">
          <CardContent className="p-6 text-sm">
            Proposal not found in the configured governor event range. Check the scan start block and proposal id.
          </CardContent>
        </Card>
      ) : null}

      {proposalQuery.data ? (
        <>
          <div className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
            <Card className="border-white/10 bg-black/35 text-white backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-3">
                  <span>Proposal #{proposalQuery.data.proposalId.toString()}</span>
                  <DaoStatusBadge state={summaryQuery.data?.state ?? null} />
                </CardTitle>
                <CardDescription className="text-slate-400">
                  This proposal resolves to one vault release call and must be queued and executed with the exact same
                  recipient, amount, and description.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Description</p>
                  <p className="mt-3 leading-6">{proposalQuery.data.description}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Recipient</p>
                    <p className="mt-2 font-mono text-xs text-slate-200">{proposalQuery.data.recipient}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Amount</p>
                    <p className="mt-2 text-slate-200">{formatTokenAmount(proposalQuery.data.amountWei)} TROY</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Proposer</p>
                    <p className="mt-2 text-slate-200">{shortenAddress(proposalQuery.data.proposer)}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Created block</p>
                    <p className="mt-2 text-slate-200">{proposalQuery.data.createdBlockNumber}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Description hash</p>
                  <p className="mt-2 break-all font-mono text-xs text-slate-300">{proposalQuery.data.descriptionHash}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Creation transaction</p>
                  <p className="mt-2 break-all font-mono text-xs text-slate-300">{proposalQuery.data.transactionHash}</p>
                </div>
                <Link to="/dao/proposals" className="inline-flex text-sm text-yellow-200 hover:text-yellow-100">
                  Back to proposal list
                </Link>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-black/35 text-white backdrop-blur">
              <CardHeader>
                <CardTitle>Voting and execution</CardTitle>
                <CardDescription className="text-slate-400">
                  Vote only while active. Queue after success. Execute after queue and timelock readiness.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-200">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Against votes</p>
                    <p className="mt-2">{summaryQuery.data ? formatTokenAmount(summaryQuery.data.againstVotes) : "Loading..."}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">For votes</p>
                    <p className="mt-2">{summaryQuery.data ? formatTokenAmount(summaryQuery.data.forVotes) : "Loading..."}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Abstain votes</p>
                    <p className="mt-2">{summaryQuery.data ? formatTokenAmount(summaryQuery.data.abstainVotes) : "Loading..."}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Quorum</p>
                    <p className="mt-2">{summaryQuery.data ? formatTokenAmount(summaryQuery.data.quorum) : "Loading..."}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Snapshot block</p>
                    <p className="mt-2">{summaryQuery.data?.snapshot.toString() ?? "Loading..."}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Deadline block</p>
                    <p className="mt-2">{summaryQuery.data?.deadline.toString() ?? "Loading..."}</p>
                  </div>
                </div>

                {summaryQuery.data?.hasVoted ? (
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-emerald-100">
                    The connected wallet has already voted on this proposal.
                  </div>
                ) : null}

                {Boolean(connector) && !executionAccessQuery.isPending && !hasExecutionAccess ? (
                  <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-amber-100">
                    Queue and execute remain hidden for this wallet because the timelock executor role is restricted.
                  </div>
                ) : null}

                <div className="grid gap-3 md:grid-cols-3">
                  <Button
                    variant="outline"
                    onClick={() => voteMutation.mutate(0)}
                    disabled={!canVote || voteMutation.isPending}
                    className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                  >
                    {voteMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Vote Against
                  </Button>
                  <Button
                    onClick={() => voteMutation.mutate(1)}
                    disabled={!canVote || voteMutation.isPending}
                    className="bg-gradient-to-r from-[#fee372] to-[#f8c95d] text-black"
                  >
                    {voteMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Vote For
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => voteMutation.mutate(2)}
                    disabled={!canVote || voteMutation.isPending}
                    className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                  >
                    {voteMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Abstain
                  </Button>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <Button
                    onClick={() => queueMutation.mutate()}
                    disabled={!canQueue || queueMutation.isPending}
                    className="bg-gradient-to-r from-sky-300 to-cyan-300 text-slate-950"
                  >
                    {queueMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Queue proposal
                  </Button>
                  <Button
                    onClick={() => executeMutation.mutate()}
                    disabled={!canExecute || executeMutation.isPending}
                    className="bg-gradient-to-r from-emerald-300 to-lime-300 text-slate-950"
                  >
                    {executeMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Execute proposal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : null}
    </DaoLayout>
  );
};

export default ProposalDetails;
