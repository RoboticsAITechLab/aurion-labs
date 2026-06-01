import Link from "next/link";

import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
const whatsappHref = whatsappNumber
	? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Aurion Labs, I\'m interested in a website that drives more bookings and faster replies.")}`
	: "/contact";

const footerLinks = [
	{ href: "/services", label: "Services" },
	{ href: "/industries", label: "Industries" },
	{ href: "/portfolio", label: "Portfolio" },
	{ href: "/support", label: "Support & SLA" },
	{ href: "/pricing", label: "Pricing" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
];

export default function Footer() {
	return (
		<footer className="border-t border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(248,250,252,1))]">
			<Container>
				<div className="grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:py-16">
					<div>
						<Link href="/" className="text-base font-semibold tracking-tight text-slate-950">
							Aurion Labs
						</Link>
						<p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
							We help local businesses get more leads, bookings, and faster responses with clear websites, booking flows and WhatsApp handoffs.
						</p>
						<div className="mt-6 flex flex-col gap-3 sm:flex-row">
							<Button asChild size="sm" className="rounded-full px-4 shadow-sm">
								<Link href="/contact?source=footer">Book Consultation</Link>
							</Button>
							<Button asChild variant="outline" size="sm" className="rounded-full border-slate-200 px-4 text-slate-700 shadow-sm">
								<Link href={whatsappHref}>WhatsApp Inquiry</Link>
							</Button>
						</div>
					</div>

					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Navigation</p>
						<div className="mt-4 grid gap-3 text-sm text-slate-600">
							{footerLinks.map((link) => (
								<Link key={link.label} href={link.href} className="transition-colors hover:text-slate-950">
									{link.label}
								</Link>
							))}
						</div>
					</div>

					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Social</p>
						<div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
							<span className="rounded-full border border-slate-200 px-3 py-1.5">LinkedIn</span>
							<span className="rounded-full border border-slate-200 px-3 py-1.5">Instagram</span>
							<span className="rounded-full border border-slate-200 px-3 py-1.5">X</span>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-3 border-t border-slate-200 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
					<p>© {new Date().getFullYear()} Aurion Labs. All rights reserved.</p>
					<p>Built for local businesses that want clearer growth.</p>
				</div>
			</Container>
		</footer>
	);
}
