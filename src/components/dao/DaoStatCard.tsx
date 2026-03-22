import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
};

export const DaoStatCard = ({ label, value, hint }: Props) => (
  <Card className="border-white/10 bg-black/35 text-white backdrop-blur">
    <CardContent className="space-y-2 p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{label}</p>
      <div className="text-2xl font-semibold text-white">{value}</div>
      {hint ? <p className="text-sm text-slate-400">{hint}</p> : null}
    </CardContent>
  </Card>
);
