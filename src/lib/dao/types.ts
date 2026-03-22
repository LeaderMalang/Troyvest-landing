export type DaoConnectorLike = {
  getProvider: () => Promise<unknown>;
};

export type DaoProposalRecord = {
  proposalId: bigint;
  proposer: string;
  recipient: string;
  amountWei: bigint;
  description: string;
  descriptionHash: string;
  targets: string[];
  values: bigint[];
  calldatas: string[];
  voteStart: bigint;
  voteEnd: bigint;
  createdBlockNumber: number;
  transactionHash: string;
};

export type DaoUserSummary = {
  balance: bigint;
  votes: bigint;
  delegatee: string;
  isSelfDelegated: boolean;
};

export type DaoConfig = {
  proposalThreshold: bigint;
  votingDelay: bigint;
  votingPeriod: bigint;
  minDelay: bigint;
};

export type DaoProposalSummary = {
  state: number;
  snapshot: bigint;
  deadline: bigint;
  quorum: bigint;
  againstVotes: bigint;
  forVotes: bigint;
  abstainVotes: bigint;
  hasVoted: boolean;
  needsQueuing: boolean;
};

export type DaoExecutionAccess = {
  executorRole: string;
  hasExecutionRole: boolean;
  hasOpenExecution: boolean;
  canExecute: boolean;
};

export type DaoAdminAccess = {
  isTimelockAdmin: boolean;
  isEmergencyCanceller: boolean;
  isGovernorProposer: boolean;
  isExecutor: boolean;
  isTreasuryOwner: boolean;
  hasAdminAccess: boolean;
};

export const DAO_PROPOSAL_STATE_LABELS: Record<number, string> = {
  0: "Pending",
  1: "Active",
  2: "Canceled",
  3: "Defeated",
  4: "Succeeded",
  5: "Queued",
  6: "Expired",
  7: "Executed",
};
