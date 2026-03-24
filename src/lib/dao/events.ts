import { keccak256, toUtf8Bytes } from "ethers";
import { daoAddresses } from "./addresses";
import { getReadContracts, releaseVaultInterface, rpcProvider } from "./client";
import type { DaoProposalRecord } from "./types";

type ProposalCreatedLogArgs = {
  proposalId: bigint;
  proposer: string;
  targets: string[];
  values: bigint[];
  signatures: string[];
  calldatas: string[];
  voteStart: bigint;
  voteEnd: bigint;
  description: string;
};

const CHUNK_SIZE = 4_999;

const normalizeProposal = (args: ProposalCreatedLogArgs, blockNumber: number, transactionHash: string) => {
  if (args.targets.length !== 1 || args.values.length !== 1 || args.calldatas.length !== 1) {
    return null;
  }

  const [target] = args.targets;
  if (target.toLowerCase() !== daoAddresses.releaseVault.toLowerCase()) {
    return null;
  }

  try {
    const [recipient, amountWei] = releaseVaultInterface.decodeFunctionData("release", args.calldatas[0]) as [
      string,
      bigint,
    ];

    return {
      proposalId: args.proposalId,
      proposer: args.proposer,
      recipient,
      amountWei,
      description: args.description,
      descriptionHash: keccak256(toUtf8Bytes(args.description)),
      targets: args.targets,
      values: args.values,
      calldatas: args.calldatas,
      voteStart: args.voteStart,
      voteEnd: args.voteEnd,
      createdBlockNumber: blockNumber,
      transactionHash,
    } satisfies DaoProposalRecord;
  } catch {
    return null;
  }
};

export async function getDaoProposals(limit?: number) {
  if (!rpcProvider || daoAddresses.proposalScanFromBlock === null) {
    return [] as DaoProposalRecord[];
  }

  const { governor } = getReadContracts();
  const latestBlock = await rpcProvider.getBlockNumber();
  const proposals: DaoProposalRecord[] = [];

  for (let fromBlock = daoAddresses.proposalScanFromBlock; fromBlock <= latestBlock; fromBlock += CHUNK_SIZE + 1) {
    const toBlock = Math.min(fromBlock + CHUNK_SIZE, latestBlock);
    const logs = await governor.queryFilter(governor.filters.ProposalCreated(), fromBlock, toBlock);

    for (const log of logs) {
      const normalized = normalizeProposal(
        log.args as unknown as ProposalCreatedLogArgs,
        log.blockNumber,
        log.transactionHash,
      );

      if (normalized) {
        proposals.push(normalized);
      }
    }
  }

  const deduped = Array.from(new Map(proposals.map((proposal) => [proposal.proposalId.toString(), proposal])).values());
  const sorted = deduped.sort((left, right) => right.createdBlockNumber - left.createdBlockNumber);

  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export async function getDaoProposalById(proposalId: bigint) {
  const proposals = await getDaoProposals();
  return proposals.find((proposal) => proposal.proposalId === proposalId) ?? null;
}
