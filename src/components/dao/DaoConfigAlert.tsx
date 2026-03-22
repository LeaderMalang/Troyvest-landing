import { AlertTriangle, KeyRound } from "lucide-react";
import {
  getMissingDaoCoreEnvVars,
  getMissingDaoWalletEnvVars,
} from "@/lib/dao/addresses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DaoConfigAlert = () => {
  const missingCore = getMissingDaoCoreEnvVars();
  const missingWallet = getMissingDaoWalletEnvVars();

  if (missingCore.length === 0 && missingWallet.length === 0) {
    return null;
  }

  return (
    <Card className="border-amber-400/30 bg-amber-500/10 text-amber-50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertTriangle className="h-5 w-5" />
          DAO configuration is incomplete
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {missingCore.length > 0 && (
          <div>
            <p className="font-medium text-white">Read and contract configuration missing</p>
            <p className="mt-1 text-amber-100/90">{missingCore.join(", ")}</p>
          </div>
        )}
        {missingWallet.length > 0 && (
          <div className="flex items-start gap-2">
            <KeyRound className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-medium text-white">Wallet connect configuration missing</p>
              <p className="mt-1 text-amber-100/90">
                Public DAO reads can still render, but wallet actions stay unavailable until{" "}
                {missingWallet.join(", ")} is supplied.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
