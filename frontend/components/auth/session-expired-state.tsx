"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

type SessionExpiredStateProps = {
	onRetry?: () => void;
};

export default function SessionExpiredState({ onRetry }: SessionExpiredStateProps) {
	return (
		<div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-950 shadow-sm">
			<p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">Session expired</p>
			<h3 className="mt-3 text-xl font-semibold tracking-tight text-amber-950">Your session needs to be refreshed</h3>
			<p className="mt-2 max-w-xl text-sm leading-7 text-amber-900/80">
				You can keep browsing public content, or sign in again to resume the protected action you started.
			</p>
			<div className="mt-4 flex flex-col gap-3 sm:flex-row">
				<Button type="button" className="rounded-full" onClick={onRetry}>
					Sign in again
				</Button>
				<Button asChild variant="outline" className="rounded-full border-amber-200 text-amber-900">
					<Link href="/">Continue browsing</Link>
				</Button>
			</div>
		</div>
	);
}