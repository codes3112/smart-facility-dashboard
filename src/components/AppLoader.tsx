import React from "react";
import { Spinner } from "@/components/ui/spinner";

export default function AppLoader({ loading }: { loading: boolean }) {
  if (!loading) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <Spinner className="size-8 text-white" />
    </div>
  );
}
