import { Badge } from "@/components/ui/badge";
import { formatProposalState } from "@/lib/dao/utils";

type Props = {
  state?: number | null;
};

export const DaoStatusBadge = ({ state }: Props) => {
  const label = formatProposalState(state);

  const className =
    state === 1
      ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-200"
      : state === 4 || state === 5
        ? "border-sky-400/30 bg-sky-500/15 text-sky-200"
        : state === 7
          ? "border-violet-400/30 bg-violet-500/15 text-violet-200"
          : state === 2 || state === 3 || state === 6
            ? "border-rose-400/30 bg-rose-500/15 text-rose-200"
            : "border-white/10 bg-white/10 text-slate-200";

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
};
