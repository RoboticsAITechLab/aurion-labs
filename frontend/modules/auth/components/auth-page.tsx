"use client";

import Link from "next/link";

import { ArrowLeft, LogIn, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AuthShell from "@/components/auth/auth-shell";
import AuthLoadingState from "@/components/auth/auth-loading-state";
import AuthSessionBanner from "@/components/auth/auth-session-banner";
import SessionExpiredState from "@/components/auth/session-expired-state";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useAuthStore } from "@/store/auth-store";
import { useSessionStore } from "@/store/session-store";
import SignInForm from "@/modules/auth/forms/sign-in-form";
import SignUpForm from "@/modules/auth/forms/sign-up-form";
import ForgotPasswordForm from "@/modules/auth/forms/forgot-password-form";
import ResetPasswordForm from "@/modules/auth/forms/reset-password-form";
import VerifyOtpForm from "@/modules/auth/forms/verify-otp-form";
import type { AuthMode, ProtectedIntent } from "@/lib/auth/auth-intents";

type AuthPageProps = {
	mode: AuthMode;
	intent?: ProtectedIntent | null;
	resetToken?: string;
	destination?: string;
	compact?: boolean;
	variant?: "page" | "surface";
};

const modeCopy: Record<AuthMode, { title: string; description: string }> = {
	signin: { title: "Welcome back", description: "Sign in quietly and return to browsing, saving, chatting, or contacting from where you left off." },
	signup: { title: "Create your account", description: "Keep the site open, then authenticate only when you need to act." },
	"forgot-password": { title: "Recover access", description: "Request a reset link and continue without leaving the current page." },
	"reset-password": { title: "Set a new password", description: "Finish a secure reset flow with a fresh credential." },
	"verify-otp": { title: "Verify your account", description: "Confirm ownership with a mobile-friendly code entry flow." },
};

export default function AuthPage({ mode, intent, resetToken, destination, compact = false, variant = "page" }: AuthPageProps) {
	const authError = useAuthStore((state) => state.errorMessage);
	const sessionStatus = useSessionStore((state) => state.status);
	const { openSignIn } = useAuthModal();
	const bannerStatus = sessionStatus === "ready" ? "authenticated" : sessionStatus === "bootstrapping" ? "loading" : sessionStatus === "refreshing" ? "refreshing" : sessionStatus === "error" ? "error" : "idle";

	const surface = (
		<>
			{bannerStatus === "loading" || bannerStatus === "refreshing" ? <AuthLoadingState /> : null}
			{bannerStatus === "error" ? <SessionExpiredState onRetry={openSignIn} /> : null}
			{bannerStatus === "loading" || bannerStatus === "refreshing" ? null : <AuthSessionBanner status={bannerStatus} message={authError} />}

			<div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Authentication</p>
					<h1 className="mt-3 text-[clamp(2rem,4vw,3.4rem)] font-semibold tracking-tight text-slate-950">{modeCopy[mode].title}</h1>
					<p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{modeCopy[mode].description}</p>
				</div>
				{mode === "signin" ? (
					<div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
						<LogIn className="size-4" />
						Protected actions will resume after login.
					</div>
				) : null}
			</div>

			<AuthShell mode={mode} title={modeCopy[mode].title} description={modeCopy[mode].description} intent={intent} compact={compact} className="mt-2">
				{mode === "signin" ? <SignInForm /> : null}
				{mode === "signup" ? <SignUpForm /> : null}
				{mode === "forgot-password" ? <ForgotPasswordForm /> : null}
				{mode === "reset-password" ? <ResetPasswordForm token={resetToken} /> : null}
				{mode === "verify-otp" ? <VerifyOtpForm destination={destination} /> : null}
			</AuthShell>
		</>
	);

	if (variant === "surface") {
		return <div className="space-y-4">{surface}</div>;
	}

	return (
		<div className="min-h-[100dvh] bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.05),transparent_42%),linear-gradient(180deg,rgba(248,250,252,1),rgba(255,255,255,1))] px-3 py-3 sm:px-4 sm:py-4 lg:px-8 lg:py-10">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:gap-4">
				<div className="flex items-center justify-between gap-3">
					<Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-950">
						<img src="/logo.svg" alt="Aurion Labs" className="h-5 w-5 object-contain" />
						Aurion Labs
					</Link>
					<div className="flex items-center gap-2">
						<Badge variant="outline" className="border-slate-200 bg-white text-slate-600">Guest-first</Badge>
						<Button asChild variant="outline" size="sm" className="rounded-full border-slate-200 text-slate-700">
							<Link href="/">
								<ArrowLeft className="size-4" />
								Back to site
							</Link>
						</Button>
					</div>
				</div>

				{surface}

				<p className="mx-auto max-w-3xl pb-[max(env(safe-area-inset-bottom),0.5rem)] text-center text-xs leading-6 text-slate-500">
					By continuing, you keep browsing public content normally. Authentication only becomes active when you need to contact, save, chat, create, or access private areas.
				</p>
			</div>
		</div>
	);
}