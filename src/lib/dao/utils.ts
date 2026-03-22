import { ZeroAddress, formatUnits, isAddress } from "ethers";
import { DAO_PROPOSAL_STATE_LABELS } from "./types";

export const shortenAddress = (value?: string | null) => {
  if (!value) return "Not connected";
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
};

export const formatTokenAmount = (value?: bigint | null, decimals = 18, maximumFractionDigits = 4) => {
  if (value === null || value === undefined) return "0";

  const numeric = Number(formatUnits(value, decimals));
  if (!Number.isFinite(numeric)) return formatUnits(value, decimals);

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(numeric);
};

export const formatBlock = (value?: bigint | null) => (value === null || value === undefined ? "-" : value.toString());

export const formatDuration = (seconds?: bigint | null) => {
  if (seconds === null || seconds === undefined) return "-";

  const raw = Number(seconds);
  if (!Number.isFinite(raw)) return `${seconds.toString()} sec`;

  if (raw < 60) return `${raw} sec`;
  if (raw < 3600) return `${Math.round(raw / 60)} min`;
  if (raw < 86400) return `${Math.round(raw / 3600)} hr`;
  return `${Math.round(raw / 86400)} days`;
};

export const formatProposalState = (state?: number | null) =>
  state === null || state === undefined ? "Unknown" : DAO_PROPOSAL_STATE_LABELS[state] ?? `State ${state}`;

export const isValidAddress = (value: string) => isAddress(value);

export const isZeroAddress = (value?: string | null) =>
  Boolean(value) && value.toLowerCase() === ZeroAddress.toLowerCase();

export const parseBigIntInput = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) throw new Error("Amount is required");
  return BigInt(trimmed);
};
