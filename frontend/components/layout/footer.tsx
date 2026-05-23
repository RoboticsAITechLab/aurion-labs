import Link from "next/link";

import Container from "@/components/common/container";

const footerLinks = [
	{ href: "/services", label: "Services" },
	{ href: "/industries", label: "Industries" },
	{ href: "/portfolio", label: "Portfolio" },
	{ href: "/pricing", label: "Pricing" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
];

export default function Footer() {
	return (
		<footer className="border-t border-slate-200 bg-white">
			<Container>
				<div className="grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:py-14">
					<div>
						<Link href="/" className="text-base font-semibold tracking-tight text-slate-950">
							Aurion Labs
						</Link>
						<p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
							We build websites and business systems that are straightforward to run and easy to trust.
						</p>
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
					<p>Built for teams that care about clarity.</p>
				</div>
			</Container>
		</footer>
	);
}
