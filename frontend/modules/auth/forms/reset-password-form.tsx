"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthPasswordStrength from "@/components/auth/auth-password-strength";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/modules/auth/services/auth-service";
import { resetPasswordSchema, type ResetPasswordValues } from "@/modules/auth/validators/auth-schemas";
import { useAuthModal } from "@/hooks/use-auth-modal";

type ResetPasswordFormProps = {
	token?: string;
};

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
	const [serverMessage, setServerMessage] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const { openForgotPassword, openSignIn } = useAuthModal();

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ResetPasswordValues>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: { token: token || "", password: "", confirmPassword: "" },
	});

	const password = watch("password");

	async function onSubmit(values: ResetPasswordValues) {
		setServerMessage(null);

		if (!token) {
			setServerMessage("Missing reset token. Request a new reset link.");
			return;
		}

		try {
			await authService.resetPassword(values);
			setSuccess(true);
			setServerMessage("Your password has been updated. You can sign in again now.");
		} catch (error) {
			setServerMessage(error instanceof Error ? error.message : "Unable to reset your password right now");
		}
	}

	return (
		<form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit(onSubmit)}>
			{!token ? (
				<div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
					No reset token detected. Request a new link and continue from there.
				</div>
			) : null}

			<input type="hidden" {...register("token")} />

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="reset-password">New password</label>
				<Input id="reset-password" className="h-11 rounded-2xl px-3.5 py-2.5 text-base sm:text-sm" type="password" placeholder="Create a secure password" autoComplete="new-password" {...register("password")} />
				<AuthPasswordStrength value={password || ""} />
				{errors.password ? <p className="text-xs text-red-600">{errors.password.message}</p> : null}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="reset-confirm">Confirm password</label>
				<Input id="reset-confirm" className="h-11 rounded-2xl px-3.5 py-2.5 text-base sm:text-sm" type="password" placeholder="Confirm password" autoComplete="new-password" {...register("confirmPassword")} />
				{errors.confirmPassword ? <p className="text-xs text-red-600">{errors.confirmPassword.message}</p> : null}
			</div>

			{serverMessage ? <div className={success ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700" : "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"}>{serverMessage}</div> : null}

			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<Button type="submit" className="h-11 w-full rounded-full px-5 sm:w-auto" disabled={isSubmitting || !token}>
					{isSubmitting ? "Saving password..." : "Save password"}
				</Button>
				<div className="flex flex-col gap-3 text-sm font-medium sm:flex-row sm:gap-3">
					<Link href="/forgot-password" className="text-slate-600 hover:text-slate-950" onClick={openForgotPassword}>Request again</Link>
					<Link href="/signin" className="text-slate-950 hover:underline" onClick={openSignIn}>Sign in</Link>
				</div>
			</div>
		</form>
	);
}