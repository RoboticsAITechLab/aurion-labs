"use client";

import { AlertCircle, Loader2, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AuthSessionBannerProps = {
	status: "idle" | "loading" | "authenticated" | "error" | "refreshing";
	message?: string | null;
	onRetry?: () => void;
	className?: string;
};

export default function AuthSessionBanner({ status, message, onRetry, className }: AuthSessionBannerProps) {
	if (status === "idle" || status === "authenticated") {
		return null;
	}

	const isLoading = status === "loading" || status === "refreshing";
	const label = isLoading ? "Restoring session" : "Session issue detected";

	return (
		<div className={cn("rounded-2xl border px-4 py-3", status === "error" ? "border-amber-200 bg-amber-50 text-amber-900" : "border-slate-200 bg-slate-50 text-slate-700", className)}>
			<div className="flex items-start gap-3">
				<div className={cn("mt-0.5 flex size-9 items-center justify-center rounded-xl", status === "error" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700")}>
					{isLoading ? <Loader2 className="size-4 animate-spin" /> : <AlertCircle className="size-4" />}
				</div>
				<div className="min-w-0 flex-1">
					<p className="text-sm font-semibold">{label}</p>
					<p className="mt-1 text-sm leading-6">{message || (isLoading ? "Checking your session quietly in the background." : "Please sign in again to continue the action you started.")}</p>
					{status === "error" && onRetry ? (
						<div className="mt-3">
							<Button type="button" size="sm" variant="outline" className="rounded-full border-slate-200" onClick={onRetry}>
								<ShieldAlert className="size-4" />
								Retry session
							</Button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}