"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/modules/auth/services/auth-service";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/modules/auth/validators/auth-schemas";
import { useAuthModal } from "@/hooks/use-auth-modal";

export default function ForgotPasswordForm() {
	const [serverMessage, setServerMessage] = useState<string | null>(null);
	const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
	const { openSignIn } = useAuthModal();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordValues>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: { email: "" },
	});

	async function onSubmit(values: ForgotPasswordValues) {
		setServerMessage(null);

		try {
			await authService.requestPasswordReset(values);
			setSubmittedEmail(values.email);
			setServerMessage("If the email exists, we sent a reset link with the next step.");
		} catch (error) {
			setServerMessage(error instanceof Error ? error.message : "Unable to send reset email right now");
		}
	}

	return (
		<form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="forgot-email">Email address</label>
				<Input id="forgot-email" className="h-11 rounded-2xl px-3.5 py-2.5 text-base sm:text-sm" type="email" placeholder="you@company.com" autoComplete="email" {...register("email")} />
				{errors.email ? <p className="text-xs text-red-600">{errors.email.message}</p> : null}
			</div>

			{serverMessage ? <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">{serverMessage}</div> : null}

			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<Button type="submit" className="h-11 w-full rounded-full px-5 sm:w-auto" disabled={isSubmitting}>
					{isSubmitting ? "Sending reset link..." : submittedEmail ? "Resend reset link" : "Send reset link"}
				</Button>
				<Link href="/signin" className="text-sm font-medium text-slate-950 hover:underline" onClick={openSignIn}>Back to sign in</Link>
			</div>
		</form>
	);
}