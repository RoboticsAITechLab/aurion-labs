"use client";

export default function AuthLoadingState() {
	return (
		<div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm">
			<div className="animate-pulse space-y-4">
				<div className="h-4 w-28 rounded-full bg-slate-200" />
				<div className="h-9 w-3/4 rounded-2xl bg-slate-200" />
				<div className="h-4 w-full rounded-full bg-slate-200" />
				<div className="h-4 w-5/6 rounded-full bg-slate-200" />
				<div className="grid gap-3 sm:grid-cols-3">
					<div className="h-28 rounded-3xl bg-slate-200" />
					<div className="h-28 rounded-3xl bg-slate-200" />
					<div className="h-28 rounded-3xl bg-slate-200" />
				</div>
			</div>
		</div>
	);
}