import {
  BrowserProvider,
  Contract,
  Interface,
  JsonRpcProvider,
  keccak256,
  parseUnits,
  toUtf8Bytes,
  type Eip1193Provider,
} from "ethers";
import {
  daoTreasuryAbi,
  erc20Abi,
  governorAbi,
  releaseVaultAbi,
  timelockAbi,
  vindexAbi,
} from "./abi";
import { daoAddresses, getMissingDaoCoreEnvVars } from "./addresses";
import type { DaoConnectorLike } from "./types";

const missingConfigError = () => {
  const missing = getMissingDaoCoreEnvVars();
  return new Error(`DAO environment is incomplete: ${missing.join(", ")}`);
};

export const rpcProvider = daoAddresses.rpcUrl
  ? new JsonRpcProvider(daoAddresses.rpcUrl, daoAddresses.chainId ?? undefined)
  : null;

export const releaseVaultInterface = new Interface(releaseVaultAbi);

export async function getWalletProvider(connector: DaoConnectorLike) {
  const providerLike = await connector.getProvider();

  if (!providerLike) {
    throw new Error("No connected wallet provider found");
  }

  const provider = new BrowserProvider(providerLike as Eip1193Provider);
  const signer = await provider.getSigner();

  return { provider, signer };
}

export function getReadContracts() {
  if (!rpcProvider) {
    throw missingConfigError();
  }

  return {
    vndx: new Contract(daoAddresses.vndx, vindexAbi, rpcProvider),
    governor: new Contract(daoAddresses.governor, governorAbi, rpcProvider),
    releaseVault: new Contract(daoAddresses.releaseVault, releaseVaultAbi, rpcProvider),
    timelock: new Contract(daoAddresses.timelock, timelockAbi, rpcProvider),
    troy: new Contract(daoAddresses.troy, erc20Abi, rpcProvider),
    daoTreasury: new Contract(daoAddresses.daoTreasury, daoTreasuryAbi, rpcProvider),
  };
}

export async function getWriteContracts(connector: DaoConnectorLike) {
  const { signer } = await getWalletProvider(connector);

  return {
    signer,
    vndx: new Contract(daoAddresses.vndx, vindexAbi, signer),
    governor: new Contract(daoAddresses.governor, governorAbi, signer),
    timelock: new Contract(daoAddresses.timelock, timelockAbi, signer),
    troy: new Contract(daoAddresses.troy, erc20Abi, signer),
    daoTreasury: new Contract(daoAddresses.daoTreasury, daoTreasuryAbi, signer),
  };
}

export function buildReleaseProposal(recipient: string, amountWei: bigint, description: string) {
  const targets = [daoAddresses.releaseVault];
  const values = [0n];
  const calldatas = [releaseVaultInterface.encodeFunctionData("release", [recipient, amountWei])];
  const descriptionHash = keccak256(toUtf8Bytes(description));

  return { targets, values, calldatas, descriptionHash };
}

export function toWei(amount: string) {
  return parseUnits(amount.trim(), 18);
}
