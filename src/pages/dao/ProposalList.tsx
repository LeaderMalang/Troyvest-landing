import { useMemo } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getDaoProposals } from "@/lib/dao/events";
import { isDaoReadConfigured } from "@/lib/dao/addresses";
import { getProposalSummary } from "@/lib/dao/reads";
import { DaoLayout } from "@/components/dao/DaoLayout";
import { DaoStatCard } from "@/components/dao/DaoStatCard";
import { ProposalTable } from "@/components/dao/ProposalTable";

const ProposalList = () => {
  const proposalsQuery = useQuery({
    queryKey: ["dao", "proposals", "all"],
    queryFn: () => getDaoProposals(),
    enabled: isDaoReadConfigured,
  });

  const stateQueries = useQueries({
    queries: (proposalsQuery.data ?? []).map((proposal) => ({
      queryKey: ["dao", "proposal-summary", proposal.proposalId.toString()],
      queryFn: () => getProposalSummary(proposal.proposalId),
      enabled: isDaoReadConfigured,
    })),
  });

  const proposalStates = useMemo(
    () =>
      Object.fromEntries(
        (proposalsQuery.data ?? []).map((proposal, index) => [
          proposal.proposalId.toString(),
          stateQueries[index]?.data?.state ?? null,
        ]),
      ),
    [proposalsQuery.data, stateQueries],
  );

  const activeCount = Object.values(proposalStates).filter((state) => state === 1).length;

  return (
    <DaoLayout
      title="Proposal List"
      description="Browse release proposals discovered from governor events and inspect their live governance status."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <DaoStatCard
          label="Detected proposals"
          value={proposalsQuery.data ? proposalsQuery.data.length.toString() : proposalsQuery.isPending ? "Loading..." : "0"}
          hint="From the configured scan range"
        />
        <DaoStatCard
          label="Active proposals"
          value={proposalsQuery.isPending ? "Loading..." : activeCount.toString()}
          hint="Currently in voting"
        />
        <DaoStatCard
          label="Ordering"
          value="Newest first"
          hint="Sorted by proposal creation block"
        />
      </div>

      <ProposalTable proposals={proposalsQuery.data ?? []} states={proposalStates} />
    </DaoLayout>
  );
};

export default ProposalList;
