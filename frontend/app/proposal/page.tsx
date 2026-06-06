"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProposalClient from "./proposal-client";

function ProposalContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Missing Proposal ID</h3>
          <p className="text-sm text-slate-500">
            A valid project proposal configuration ID must be provided in the URL query string (e.g. ?id=your-inquiry-id).
          </p>
        </div>
      </div>
    );
  }

  return <ProposalClient id={id} />;
}

export default function ProposalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 font-medium">Loading proposal workspace...</p>
        </div>
      </div>
    }>
      <ProposalContent />
    </Suspense>
  );
}
