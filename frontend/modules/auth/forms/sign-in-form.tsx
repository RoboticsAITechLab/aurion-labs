"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/modules/auth/services/auth-service";
import { signInSchema, type SignInValues } from "@/modules/auth/validators/auth-schemas";
import { useAuthFlow } from "@/modules/auth/hooks/use-auth-flow";
import { useAuthModal } from "@/hooks/use-auth-modal";
import AuthSocialButtons from "@/components/auth/auth-social-buttons";

export default function SignInForm() {
	const [serverError, setServerError] = useState<string | null>(null);
	const { completeAuth } = useAuthFlow();
	const { openForgotPassword, openSignUp } = useAuthModal();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInValues>({
		resolver: zodResolver(signInSchema),
		defaultValues: { identifier: "", password: "" },
	});

	async function onSubmit(values: SignInValues) {
		setServerError(null);

		try {
			const session = await authService.signIn({
				email: values.identifier,
				password: values.password,
			});
			completeAuth(session);
		} catch (error) {
			setServerError(error instanceof Error ? error.message : "Unable to sign in right now");
		}
	}

	return (
		<form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="signin-identifier">Email or phone</label>
				<Input id="signin-identifier" className="h-11 rounded-2xl px-3.5 py-2.5 text-base sm:text-sm" placeholder="you@company.com or +91 98xx..." autoComplete="username" {...register("identifier")} />
				{errors.identifier ? <p className="text-xs text-red-600">{errors.identifier.message}</p> : null}
			</div>

			<div className="grid gap-2">
				<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
					<label className="text-sm font-medium text-slate-700" htmlFor="signin-password">Password</label>
					<button type="button" className="self-start text-xs font-medium text-slate-500 hover:text-slate-900 sm:self-auto" onClick={openForgotPassword}>
						Forgot password?
					</button>
				</div>
				<Input id="signin-password" className="h-11 rounded-2xl px-3.5 py-2.5 text-base sm:text-sm" type="password" placeholder="Your password" autoComplete="current-password" {...register("password")} />
				{errors.password ? <p className="text-xs text-red-600">{errors.password.message}</p> : null}
			</div>

			{serverError ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700">{serverError}</div> : null}

			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
					<input type="checkbox" className="mt-1 size-5 rounded border-slate-300 text-slate-950 focus:ring-slate-950/30" />
					Keep me signed in on this device
				</label>
				<Button type="submit" className="h-11 w-full rounded-full px-5 sm:w-auto" disabled={isSubmitting}>
					{isSubmitting ? "Signing in..." : "Sign In"}
				</Button>
			</div>

			<AuthSocialButtons onGoogle={() => undefined} onGithub={() => undefined} onMagicLink={openForgotPassword} />

			<div className="flex flex-col gap-3 border-t border-slate-200 pt-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
				<span>New here?</span>
				<Link href="/signup" className="font-medium text-slate-950 hover:underline" onClick={openSignUp}>Create an account</Link>
			</div>
		</form>
	);
}