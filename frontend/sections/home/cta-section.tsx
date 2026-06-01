"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/common/section-wrapper";
import OperationalVisual from "@/components/common/operational-visual";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";
import { getVariant, recordClick } from "@/lib/ab";

export default function CTASection() {
	const [variant, setVariant] = useState<'A' | 'B'>('A');

	useEffect(() => {
		try {
			setVariant(getVariant('primary_cta'));
		} catch (e) {
			setVariant('A');
		}
	}, []);

	return (
		<SectionWrapper id="contact" contained={false} density="compact">
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<div className="rounded-[2rem] border border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),_white_60%)] px-6 py-8 shadow-[0_30px_120px_-80px_rgba(15,23,42,0.5)] sm:px-12 sm:py-10 lg:px-14">
					<div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
						<div className="text-center lg:text-left">
							<p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Ready For Clearer Growth?</p>
							<h2 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:mx-0 lg:text-5xl">
								A short strategy call to assess fit, share a launch plan and give a rough ROI estimate.
							</h2>
							<p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
								If your current site looks fine but doesn't convert, we'll recommend a focused plan to fix the front door, booking flow, and handoff so the business gets more leads and bookings.
							</p>
							<div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
								<Button asChild size="lg" className="rounded-full px-6">
									<Link
										href="/contact?source=cta"
										onClick={() => {
										try {
											recordClick('primary_cta');
										} catch (e) {
											/* ignore */
										}
									}}
									>
										{variant === 'B' ? 'Request a Launch Plan' : 'Book 20‑min Strategy Call'}
										<ArrowUpRight className="size-4" />
									</Link>
								</Button>
								<Button asChild variant="outline" size="lg" className="rounded-full border-slate-200 px-6 text-slate-700">
									<Link href="/pricing">See Pricing Ranges</Link>
								</Button>
							</div>
						</div>

						<OperationalVisual
							eyebrow="Consultation preview"
							title="A structured conversation, not a sales form."
							subtitle="The intake is shaped to reveal scope, urgency, and support needs without making the first step feel heavy."
							statusLabel="Call outcome"
							status="Scope + next step"
							steps={[
								"We review the business goal and the current lead path.",
								"We identify the booking or inquiry gaps that need to be fixed.",
								"We leave with a practical launch plan and a clear follow-up route.",
							]}
							highlights={[
								{ label: "Fit", value: "Qualified" },
								{ label: "Speed", value: "Fast review" },
								{ label: "Next step", value: "Launch plan" },
							]}
							className="h-full"
						/>
					</div>
				</div>
			</div>
		</SectionWrapper>
	);
}
