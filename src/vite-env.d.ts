/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
  readonly VITE_CHAIN_ID?: string;
  readonly VITE_RPC_URL?: string;
  readonly VITE_VNDX_ADDRESS?: string;
  readonly VITE_TROY_RELEASE_GOVERNOR_ADDRESS?: string;
  readonly VITE_TROY_RELEASE_VAULT_ADDRESS?: string;
  readonly VITE_TIMELOCK_ADDRESS?: string;
  readonly VITE_TROY_TOKEN_ADDRESS?: string;
  readonly VITE_DAO_TREASURY_ADDRESS?: string;
  readonly VITE_DAO_PROPOSAL_SCAN_FROM_BLOCK?: string;
  readonly VITE_WALLETCONNECT_PROJECT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
