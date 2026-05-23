"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MenuIcon } from "lucide-react";

import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const links = [
	{ href: "/services", label: "Services" },
	{ href: "/industries", label: "Industries" },
	{ href: "/portfolio", label: "Portfolio" },
	{ href: "/pricing", label: "Pricing" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
];

export default function Navbar() {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
			<Container>
				<nav className="flex h-18 items-center justify-between py-3 sm:h-20">
					<Link href="/" className="flex items-center gap-2 text-base font-semibold tracking-tight text-slate-950">
						<span className="inline-flex size-2 rounded-full bg-blue-600" />
						Aurion Labs
					</Link>

					<div className="hidden items-center gap-8 lg:flex">
						{links.map((link) => (
							<Link key={link.label} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={`text-sm font-medium transition-colors hover:text-slate-950 ${pathname === link.href ? "text-slate-950" : "text-slate-600"}`}>
								{link.label}
							</Link>
						))}
					</div>

					<div className="hidden items-center gap-3 lg:flex">
						<Button asChild size="sm" className="rounded-full px-4">
							<Link href="/contact">
								Book Consultation
								<ArrowUpRight className="size-4" />
							</Link>
						</Button>
					</div>

					<div className="lg:hidden">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="outline" size="icon-sm" className="rounded-full border-slate-200 bg-white/90">
									<MenuIcon className="size-4" />
									<span className="sr-only">Open menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="border-slate-200 bg-white/95 backdrop-blur-xl">
								<SheetHeader className="p-0">
									<SheetTitle className="text-left text-lg font-semibold tracking-tight">Aurion Labs</SheetTitle>
								</SheetHeader>
								<div className="mt-8 flex flex-col gap-4">
									{links.map((link) => (
										<SheetClose asChild key={link.label}>
											<Link href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={`text-base font-medium transition-colors hover:text-slate-950 ${pathname === link.href ? "text-slate-950" : "text-slate-700"}`}>
												{link.label}
											</Link>
										</SheetClose>
									))}
								</div>
								<div className="mt-auto pt-8">
									<Button asChild className="w-full rounded-full">
										<Link href="/contact">
											Book Consultation
											<ArrowUpRight className="size-4" />
										</Link>
									</Button>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</nav>
			</Container>
		</header>
	);
}
