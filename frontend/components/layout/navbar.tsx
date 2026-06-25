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
import { useAuthModal } from "@/hooks/use-auth-modal";

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
	const { openSignIn, openSignUp } = useAuthModal();

	return (
		<header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/78 backdrop-blur-xl supports-[backdrop-filter]:bg-white/72">
			<Container>
				<nav className="flex flex-col gap-3 py-3 lg:h-22 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:py-0">
					<div className="flex items-center justify-between gap-3">
						<Link href="/" className="flex items-center text-slate-950">
							<img src="/logo.svg" alt="Aurion Labs" className="h-16 w-auto object-contain" />
						</Link>

						<div className="flex items-center gap-2 lg:hidden">
							<Sheet>
								<SheetTrigger asChild>
									<Button variant="outline" size="icon-sm" className="size-10 rounded-full border-slate-200 bg-white/90 shadow-sm">
										<MenuIcon className="size-4" />
										<span className="sr-only">Open menu</span>
									</Button>
								</SheetTrigger>
								<SheetContent side="right" className="border-slate-200 bg-white/96 px-5 backdrop-blur-xl sm:px-6">
									<SheetHeader className="p-0">
										<SheetTitle className="text-left text-lg font-semibold tracking-tight">
											<img src="/logo.svg" alt="Aurion Labs" className="h-16 w-auto object-contain" />
										</SheetTitle>
									</SheetHeader>
									<div className="mt-6 flex flex-col gap-3">
										{links.map((link) => (
											<SheetClose asChild key={link.label}>
												<Link href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={`rounded-2xl px-3 py-3 text-base font-medium transition-colors hover:bg-slate-50 hover:text-slate-950 ${pathname === link.href ? "text-slate-950" : "text-slate-700"}`}>
													{link.label}
												</Link>
											</SheetClose>
										))}
									</div>
									<div className="mt-auto pt-6">
										<div className="grid gap-3">
											<Button className="h-11 w-full rounded-full shadow-sm" asChild>
												<Link href="/contact">
													Get Started
													<ArrowUpRight className="size-4" />
												</Link>
											</Button>
										</div>
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</div>

					<div className="hidden items-center gap-7 xl:gap-8 lg:flex">
						{links.map((link) => (
							<Link key={link.label} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={`text-sm font-medium transition-colors duration-200 hover:text-slate-950 ${pathname === link.href ? "text-slate-950" : "text-slate-600"}`}>
								{link.label}
							</Link>
						))}
					</div>

					<div className="hidden items-center gap-3 lg:flex">
						<Button size="sm" className="h-10 rounded-full px-4 shadow-sm" asChild>
							<Link href="/contact">
								Get Started
								<ArrowUpRight className="size-4" />
							</Link>
						</Button>
					</div>
				</nav>
			</Container>
		</header>
	);
}
