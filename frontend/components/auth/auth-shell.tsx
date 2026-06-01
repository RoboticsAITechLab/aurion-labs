"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, LockKeyhole, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AuthMode, ProtectedIntent } from "@/lib/auth/auth-intents";

type AuthShellProps = {
	mode: AuthMode;
	title: string;
	description: string;
	intent?: ProtectedIntent | null;
	children: ReactNode;
	className?: string;
	compact?: boolean;
};

const featureCopy = [
	{ icon: CheckCircle2, label: "Guest-first", detail: "Browsing stays open until action requires auth." },
	{ icon: LockKeyhole, label: "Session restore", detail: "Refreshes happen silently and preserve intent." },
	{ icon: Sparkles, label: "Intent replay", detail: "Return to the exact protected action after login." },
];

export default function AuthShell({ mode, title, description, intent, children, className, compact = false }: AuthShellProps) {
	return (
		<div className={cn("grid gap-0 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_24px_90px_-48px_rgba(15,23,42,0.32)] sm:rounded-[2rem]", className)}>
			<div className="grid xl:grid-cols-[0.92fr_1.08fr]">
				<div className="relative order-2 overflow-hidden border-t border-slate-200 bg-[linear-gradient(180deg,rgba(248,250,252,1),rgba(255,255,255,1))] p-4 sm:p-5 xl:order-1 xl:border-t-0 xl:border-r xl:p-8">
					<div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.10),transparent_55%)]" />
					<div className="relative flex flex-col gap-3 sm:gap-4">
						<Badge variant="outline" className="w-fit border-slate-200 bg-white text-slate-600">
							{mode === "signin" ? "Sign in" : mode === "signup" ? "Get started" : mode === "forgot-password" ? "Reset access" : mode === "reset-password" ? "Set new password" : "Verify account"}
						</Badge>
						<h2 className="max-w-md text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl xl:text-4xl">
							{title}
						</h2>
						<p className="max-w-xl text-sm leading-6 text-slate-600 sm:leading-7 sm:text-base">
							{description}
						</p>
					</div>

					<div className="relative mt-5 grid gap-3 sm:grid-cols-2 xl:mt-8 xl:grid-cols-3">
						{featureCopy.map((item) => {
							const Icon = item.icon;

							return (
								<Card key={item.label} className="border-slate-200 bg-white shadow-sm">
									<CardContent className="p-4">
										<div className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
											<Icon className="size-4" />
										</div>
										<p className="mt-4 text-sm font-semibold text-slate-950">{item.label}</p>
										<p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
									</CardContent>
								</Card>
							);
						})}
					</div>

					<div className="relative mt-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-6 xl:mt-8">
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Protected intent</p>
						<div className="mt-3 flex flex-wrap items-center gap-2">
							{intent ? <Badge variant="secondary" className="rounded-full">{intent.label}</Badge> : <Badge variant="outline" className="rounded-full">None active</Badge>}
							{compact ? <Badge variant="outline" className="rounded-full">Compact mode</Badge> : null}
						</div>
						<p className="mt-3 text-sm leading-6 text-slate-600 sm:leading-7">
							Guests can browse freely. When a protected action is triggered, this flow stores the intent and resumes it after auth completes.
						</p>
					</div>
				</div>

				<div className="order-1 flex min-h-0 flex-col gap-4 p-4 sm:p-5 xl:order-2 xl:p-8">
					<motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="min-h-0">
						{children}
					</motion.div>
					<div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm leading-6 text-slate-600">
						Use the auth sheet or auth page without leaving the browsing flow. The form below is the only place that should touch credentials.
					</div>
				</div>
			</div>
		</div>
	);
}