"use client";

import { motion } from "framer-motion";
import { XIcon } from "lucide-react";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useIntentStore } from "@/store/intent-store";
import { useIsMobile } from "@/hooks/use-is-mobile";
import AuthPage from "@/modules/auth/components/auth-page";

export default function AuthModal() {
	const { isOpen, mode, closeAuthModal, setAuthMode } = useAuthModal();
	const pendingIntent = useIntentStore((state) => state.pendingIntent);
	const isMobile = useIsMobile();

	const content = (
		<div className="relative min-h-0">
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.22 }}
				className="relative min-h-0"
			>
				<div className="mb-4 flex flex-wrap gap-2 sm:mb-5">
					{([
						["signin", "Sign In"],
						["signup", "Get Started"],
						["forgot-password", "Forgot Password"],
						["reset-password", "Reset Password"],
						["verify-otp", "Verify OTP"],
					] as const).map(([value, label]) => (
						<Button key={value} type="button" variant={mode === value ? "default" : "outline"} size="sm" className="h-10 rounded-full px-3 text-xs sm:h-9 sm:px-4 sm:text-sm" onClick={() => setAuthMode(value)}>
							{label}
						</Button>
					))}
				</div>

				<AuthPage mode={mode} intent={pendingIntent} variant="surface" compact />
			</motion.div>
		</div>
	);

	return (
		<>
			{isMobile ? (
				<Sheet open={isOpen} onOpenChange={(open) => (open ? undefined : closeAuthModal())}>
					<SheetContent side="bottom" className="h-[100dvh] max-h-[100dvh] overflow-hidden rounded-none border-0 bg-white p-0 shadow-none">
						<div className="flex h-full min-h-0 flex-col">
							<div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 pt-[max(env(safe-area-inset-top),0.75rem)] sm:px-6">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Aurion Labs</p>
								<p className="mt-1 text-sm font-medium text-slate-900">Guest-first auth</p>
							</div>
								<Button variant="ghost" size="icon-sm" className="size-10 rounded-full" onClick={closeAuthModal} aria-label="Close auth modal">
									<XIcon className="size-4" />
								</Button>
							</div>
							<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-4 sm:px-6">
								{content}
							</div>
						</div>
					</SheetContent>
				</Sheet>
			) : (
				<Dialog open={isOpen} onOpenChange={(open) => (open ? undefined : closeAuthModal())}>
					<DialogContent className="max-w-6xl overflow-hidden border-slate-200 bg-white p-4 text-slate-900 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.5)] sm:max-h-[90dvh] sm:max-w-6xl sm:p-6">
						<DialogHeader className="sr-only">
							<DialogTitle>Guest-first auth modal</DialogTitle>
						</DialogHeader>
						<div className="max-h-[calc(90dvh-2rem)] overflow-y-auto overscroll-contain pr-1">
							{content}
						</div>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}