import { buildReleaseProposal, getWriteContracts } from "./client";
import type { DaoConnectorLike } from "./types";

export async function delegateVotesToSelf(connector: DaoConnectorLike, account: string) {
  const { vndx } = await getWriteContracts(connector);
  const tx = await vndx.delegate(account);
  await tx.wait();
  return tx.hash as string;
}

export async function createReleaseProposal(
  connector: DaoConnectorLike,
  recipient: string,
  amountWei: bigint,
  description: string,
) {
  const { governor } = await getWriteContracts(connector);
  const payload = buildReleaseProposal(recipient, amountWei, description);

  const proposalId = await governor.hashProposal(
    payload.targets,
    payload.values,
    payload.calldatas,
    payload.descriptionHash,
  );

  const tx = await governor.proposeRelease(recipient, amountWei, description);
  await tx.wait();

  return {
    txHash: tx.hash as string,
    proposalId: proposalId as bigint,
    ...payload,
  };
}

export async function castReleaseVote(connector: DaoConnectorLike, proposalId: bigint, support: 0 | 1 | 2) {
  const { governor } = await getWriteContracts(connector);
  const tx = await governor.castVote(proposalId, support);
  await tx.wait();
  return tx.hash as string;
}

export async function queueReleaseProposal(
  connector: DaoConnectorLike,
  recipient: string,
  amountWei: bigint,
  description: string,
) {
  const { governor } = await getWriteContracts(connector);
  const payload = buildReleaseProposal(recipient, amountWei, description);
  const tx = await governor.queue(payload.targets, payload.values, payload.calldatas, payload.descriptionHash);
  await tx.wait();
  return tx.hash as string;
}

export async function executeReleaseProposal(
  connector: DaoConnectorLike,
  recipient: string,
  amountWei: bigint,
  description: string,
) {
  const { governor } = await getWriteContracts(connector);
  const payload = buildReleaseProposal(recipient, amountWei, description);
  const tx = await governor.execute(payload.targets, payload.values, payload.calldatas, payload.descriptionHash);
  await tx.wait();
  return tx.hash as string;
}

export async function fundReleaseVault(connector: DaoConnectorLike, amountWei: bigint) {
  const { troy } = await getWriteContracts(connector);
  const tx = await troy.transfer(import.meta.env.VITE_TROY_RELEASE_VAULT_ADDRESS, amountWei);
  await tx.wait();
  return tx.hash as string;
}

export async function grantGovernorProposerRole(connector: DaoConnectorLike) {
  const { timelock } = await getWriteContracts(connector);
  const proposerRole = await timelock.PROPOSER_ROLE();
  const tx = await timelock.grantRole(proposerRole, import.meta.env.VITE_TROY_RELEASE_GOVERNOR_ADDRESS);
  await tx.wait();
  return tx.hash as string;
}

export async function grantEmergencyCanceller(connector: DaoConnectorLike, address: string) {
  const { timelock } = await getWriteContracts(connector);
  const role = await timelock.CANCELLER_ROLE();
  const tx = await timelock.grantRole(role, address);
  await tx.wait();
  return tx.hash as string;
}

export async function renounceTimelockAdmin(connector: DaoConnectorLike) {
  const { signer, timelock } = await getWriteContracts(connector);
  const adminRole = await timelock.DEFAULT_ADMIN_ROLE();
  const adminAddress = await signer.getAddress();
  const tx = await timelock.renounceRole(adminRole, adminAddress);
  await tx.wait();
  return tx.hash as string;
}

export async function treasurySetAllowedTarget(connector: DaoConnectorLike, target: string, allowed: boolean) {
  const { daoTreasury } = await getWriteContracts(connector);
  const tx = await daoTreasury.setAllowedTarget(target, allowed);
  await tx.wait();
  return tx.hash as string;
}

export async function treasuryExecute(
  connector: DaoConnectorLike,
  target: string,
  valueWei: bigint,
  data: string,
) {
  const { daoTreasury } = await getWriteContracts(connector);
  const tx = await daoTreasury.execute(target, valueWei, data);
  await tx.wait();
  return tx.hash as string;
}

export async function treasuryTransferToken(
  connector: DaoConnectorLike,
  token: string,
  to: string,
  amountWei: bigint,
) {
  const { daoTreasury } = await getWriteContracts(connector);
  const tx = await daoTreasury.transferToken(token, to, amountWei);
  await tx.wait();
  return tx.hash as string;
}

export async function treasuryApproveToken(
  connector: DaoConnectorLike,
  token: string,
  spender: string,
  amountWei: bigint,
) {
  const { daoTreasury } = await getWriteContracts(connector);
  const tx = await daoTreasury.approveToken(token, spender, amountWei);
  await tx.wait();
  return tx.hash as string;
}

export async function treasuryTransferNative(
  connector: DaoConnectorLike,
  to: string,
  amountWei: bigint,
) {
  const { daoTreasury } = await getWriteContracts(connector);
  const tx = await daoTreasury.transferNative(to, amountWei);
  await tx.wait();
  return tx.hash as string;
}
