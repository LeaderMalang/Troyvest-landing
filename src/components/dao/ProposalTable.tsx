import { Link } from "react-router-dom";
import { DaoStatusBadge } from "@/components/dao/DaoStatusBadge";
import type { DaoProposalRecord } from "@/lib/dao/types";
import { formatTokenAmount, shortenAddress } from "@/lib/dao/utils";

type Props = {
  proposals: DaoProposalRecord[];
  states?: Record<string, number | null>;
};

export const ProposalTable = ({ proposals, states = {} }: Props) => {
  if (proposals.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-8 text-center text-sm text-slate-400">
        No proposals found from the configured governor event range yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/35 backdrop-blur">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-200">
          <thead className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-[0.22em] text-slate-400">
            <tr>
              <th className="px-4 py-3">Proposal</th>
              <th className="px-4 py-3">Recipient</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Start Block</th>
              <th className="px-4 py-3">State</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((proposal) => (
              <tr key={proposal.proposalId.toString()} className="border-b border-white/5 last:border-b-0">
                <td className="px-4 py-4">
                  <Link
                    to={`/dao/proposals/${proposal.proposalId.toString()}`}
                    className="font-medium text-yellow-200 hover:text-yellow-100"
                  >
                    #{proposal.proposalId.toString()}
                  </Link>
                  <p className="mt-1 line-clamp-2 max-w-md text-xs text-slate-400">{proposal.description}</p>
                </td>
                <td className="px-4 py-4 font-mono text-xs">{shortenAddress(proposal.recipient)}</td>
                <td className="px-4 py-4">{formatTokenAmount(proposal.amountWei)} TROY</td>
                <td className="px-4 py-4">{proposal.voteStart.toString()}</td>
                <td className="px-4 py-4">
                  <DaoStatusBadge state={states[proposal.proposalId.toString()] ?? null} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
