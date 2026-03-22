const readEnv = (value: string | undefined) => value?.trim() ?? "";

const parseNumberEnv = (value: string | undefined) => {
  const trimmed = readEnv(value);
  if (!trimmed) return null;

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
};

const coreEnvEntries = [
  ["VITE_CHAIN_ID", parseNumberEnv(import.meta.env.VITE_CHAIN_ID)],
  ["VITE_RPC_URL", readEnv(import.meta.env.VITE_RPC_URL)],
  ["VITE_VNDX_ADDRESS", readEnv(import.meta.env.VITE_VNDX_ADDRESS)],
  ["VITE_TROY_RELEASE_GOVERNOR_ADDRESS", readEnv(import.meta.env.VITE_TROY_RELEASE_GOVERNOR_ADDRESS)],
  ["VITE_TROY_RELEASE_VAULT_ADDRESS", readEnv(import.meta.env.VITE_TROY_RELEASE_VAULT_ADDRESS)],
  ["VITE_TIMELOCK_ADDRESS", readEnv(import.meta.env.VITE_TIMELOCK_ADDRESS)],
  ["VITE_TROY_TOKEN_ADDRESS", readEnv(import.meta.env.VITE_TROY_TOKEN_ADDRESS)],
  ["VITE_DAO_TREASURY_ADDRESS", readEnv(import.meta.env.VITE_DAO_TREASURY_ADDRESS)],
  ["VITE_DAO_PROPOSAL_SCAN_FROM_BLOCK", parseNumberEnv(import.meta.env.VITE_DAO_PROPOSAL_SCAN_FROM_BLOCK)],
] as const;

export const daoAddresses = {
  chainId: parseNumberEnv(import.meta.env.VITE_CHAIN_ID),
  rpcUrl: readEnv(import.meta.env.VITE_RPC_URL),
  vndx: readEnv(import.meta.env.VITE_VNDX_ADDRESS),
  governor: readEnv(import.meta.env.VITE_TROY_RELEASE_GOVERNOR_ADDRESS),
  releaseVault: readEnv(import.meta.env.VITE_TROY_RELEASE_VAULT_ADDRESS),
  timelock: readEnv(import.meta.env.VITE_TIMELOCK_ADDRESS),
  troy: readEnv(import.meta.env.VITE_TROY_TOKEN_ADDRESS),
  daoTreasury: readEnv(import.meta.env.VITE_DAO_TREASURY_ADDRESS),
  proposalScanFromBlock: parseNumberEnv(import.meta.env.VITE_DAO_PROPOSAL_SCAN_FROM_BLOCK),
} as const;

export const daoWalletConnectProjectId = readEnv(import.meta.env.VITE_WALLETCONNECT_PROJECT_ID);

export const getMissingDaoCoreEnvVars = () =>
  coreEnvEntries
    .filter(([, value]) => value === null || value === "")
    .map(([key]) => key);

export const getMissingDaoWalletEnvVars = () =>
  daoWalletConnectProjectId ? [] : ["VITE_WALLETCONNECT_PROJECT_ID"];

export const isDaoReadConfigured = getMissingDaoCoreEnvVars().length === 0;
export const isDaoWalletConfigured = getMissingDaoWalletEnvVars().length === 0;
