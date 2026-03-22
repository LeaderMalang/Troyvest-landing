import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { DaoConnectButton } from "@/components/dao/DaoConnectButton";
import { DaoConfigAlert } from "@/components/dao/DaoConfigAlert";
import { ClientOnly } from "@/components/ClientOnly";
import { WidePageLayout } from "@/components/WidePageLayout";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

const navItems = [
  { label: "Dashboard", to: "/dao" },
  { label: "Proposals", to: "/dao/proposals" },
  { label: "Admin", to: "/dao/admin" },
];

export const DaoLayout = ({ title, description, children }: Props) => {
  const location = useLocation();

  return (
    <WidePageLayout title={title}>
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-yellow-200/70">Troyvest DAO</p>
            <p className="max-w-3xl text-sm text-slate-300">{description}</p>
          </div>
          <ClientOnly>
            <DaoConnectButton />
          </ClientOnly>
        </div>

        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => {
            const active =
              location.pathname === item.to ||
              (item.to !== "/dao" && location.pathname.startsWith(item.to));

            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition",
                  active
                    ? "border-yellow-300/50 bg-yellow-400/15 text-yellow-100"
                    : "border-white/10 bg-black/30 text-slate-300 hover:border-white/25 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <DaoConfigAlert />
        {children}
      </div>
    </WidePageLayout>
  );
};
