import { ZeroAddress } from "ethers";
import { getReadContracts } from "./client";

export async function getDaoUserSummary(account: string) {
  const { vndx } = getReadContracts();

  const [balance, votes, delegatee] = await Promise.all([
    vndx.balanceOf(account),
    vndx.getVotes(account),
    vndx.delegates(account),
  ]);

  return {
    balance,
    votes,
    delegatee,
    isSelfDelegated: delegatee.toLowerCase() === account.toLowerCase(),
  };
}

export async function getProposalSummary(proposalId: bigint, account?: string) {
  const { governor } = getReadContracts();

  const snapshot = await governor.proposalSnapshot(proposalId);
  const [state, deadline, votes, quorum, needsQueuing] = await Promise.all([
    governor.state(proposalId),
    governor.proposalDeadline(proposalId),
    governor.proposalVotes(proposalId),
    governor.quorum(snapshot),
    governor.proposalNeedsQueuing(proposalId),
  ]);

  const hasVoted = account ? await governor.hasVoted(proposalId, account) : false;

  return {
    state: Number(state),
    snapshot,
    deadline,
    quorum,
    againstVotes: votes.againstVotes,
    forVotes: votes.forVotes,
    abstainVotes: votes.abstainVotes,
    hasVoted,
    needsQueuing,
  };
}

export async function getDaoConfig() {
  const { governor, timelock } = getReadContracts();

  const [proposalThreshold, votingDelay, votingPeriod, minDelay] = await Promise.all([
    governor.proposalThreshold(),
    governor.votingDelay(),
    governor.votingPeriod(),
    timelock.getMinDelay(),
  ]);

  return {
    proposalThreshold,
    votingDelay,
    votingPeriod,
    minDelay,
  };
}

export async function getDaoExecutionAccess(account: string) {
  const { timelock } = getReadContracts();
  const executorRole = await timelock.EXECUTOR_ROLE();

  const [hasExecutionRole, hasOpenExecution] = await Promise.all([
    timelock.hasRole(executorRole, account),
    timelock.hasRole(executorRole, ZeroAddress),
  ]);

  return {
    executorRole,
    hasExecutionRole,
    hasOpenExecution,
    canExecute: hasExecutionRole || hasOpenExecution,
  };
}

export async function getDaoAdminAccess(account: string) {
  const { timelock, daoTreasury } = getReadContracts();
  const [adminRole, cancellerRole, proposerRole, executorRole, treasuryOwner] = await Promise.all([
    timelock.DEFAULT_ADMIN_ROLE(),
    timelock.CANCELLER_ROLE(),
    timelock.PROPOSER_ROLE(),
    timelock.EXECUTOR_ROLE(),
    daoTreasury.owner(),
  ]);

  const [isTimelockAdmin, isEmergencyCanceller, isGovernorProposer, isExecutor] = await Promise.all([
    timelock.hasRole(adminRole, account),
    timelock.hasRole(cancellerRole, account),
    timelock.hasRole(proposerRole, account),
    timelock.hasRole(executorRole, account),
  ]);

  const isTreasuryOwner = treasuryOwner.toLowerCase() === account.toLowerCase();

  return {
    isTimelockAdmin,
    isEmergencyCanceller,
    isGovernorProposer,
    isExecutor,
    isTreasuryOwner,
    hasAdminAccess: isTimelockAdmin || isEmergencyCanceller || isTreasuryOwner,
  };
}
