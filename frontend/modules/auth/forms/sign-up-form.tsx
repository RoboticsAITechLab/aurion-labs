"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthPasswordStrength from "@/components/auth/auth-password-strength";
import AuthSocialButtons from "@/components/auth/auth-social-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/modules/auth/services/auth-service";
import { signUpSchema, type SignUpValues } from "@/modules/auth/validators/auth-schemas";
import { useAuthFlow } from "@/modules/auth/hooks/use-auth-flow";
import { useAuthModal } from "@/hooks/use-auth-modal";

export default function SignUpForm() {
	const [serverError, setServerError] = useState<string | null>(null);
	const { completeAuth } = useAuthFlow();
	const { openSignIn } = useAuthModal();

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: { name: "", identifier: "", password: "", confirmPassword: "", acceptTerms: true },
	});

	const password = watch("password");

	async function onSubmit(values: SignUpValues) {
		setServerError(null);

		try {
			const session = await authService.signUp({
				name: values.name,
				email: values.identifier,
				password: values.password,
			});
			completeAuth(session);
		} catch (error) {
			setServerError(error instanceof Error ? error.message : "Unable to create your account right now");
		}
	}

	return (
		<form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="signup-name">Full name</label>
				<Input id="signup-name" className="h-11 rounded-2xl px-3.5 py-2.5 text-base sm:text-sm" placeholder="Your name" autoComplete="name" {...register("name")} />
				{errors.name ? <p className="text-xs text-red-600">{errors.name.message}</p> : null}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="signup-identifier">Email or phone</label>
				<Input id="signup-identifier" className="h-11 rounded-2xl px-3.5 py-2.5 text-base sm:text-sm" placeholder="you@company.com or +91 98xx..." autoComplete="email" {...register("identifier")} />
				{errors.identifier ? <p className="text-xs text-red-600">{errors.identifier.message}</p> : null}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="signup-password">Password</label>
				<Input id="signup-password" className="h-11 rounded-2xl px-3.5 py-2.5 text-base sm:text-sm" type="password" placeholder="Create a password" autoComplete="new-password" {...register("password")} />
				<AuthPasswordStrength value={password || ""} />
				{errors.password ? <p className="text-xs text-red-600">{errors.password.message}</p> : null}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="signup-confirmPassword">Confirm password</label>
				<Input id="signup-confirmPassword" className="h-11 rounded-2xl px-3.5 py-2.5 text-base sm:text-sm" type="password" placeholder="Confirm your password" autoComplete="new-password" {...register("confirmPassword")} />
				{errors.confirmPassword ? <p className="text-xs text-red-600">{errors.confirmPassword.message}</p> : null}
			</div>

			<label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
				<input type="checkbox" className="mt-1 size-5 rounded border-slate-300 text-slate-950 focus:ring-slate-950/30" {...register("acceptTerms")} />
				<span>
					I agree to the terms and understand that protected actions may require session verification.
				</span>
			</label>
			{errors.acceptTerms ? <p className="text-xs text-red-600">{errors.acceptTerms.message}</p> : null}

			{serverError ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700">{serverError}</div> : null}

			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<Button type="submit" className="h-11 w-full rounded-full px-5 sm:w-auto" disabled={isSubmitting}>
					{isSubmitting ? "Creating account..." : "Get Started"}
				</Button>
				<p className="text-xs text-slate-500">Protected actions continue after sign up.</p>
			</div>

			<AuthSocialButtons onGoogle={() => undefined} onGithub={() => undefined} onMagicLink={openSignIn} />

			<div className="flex flex-col gap-3 border-t border-slate-200 pt-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
				<span>Already have an account?</span>
				<Link href="/signin" className="font-medium text-slate-950 hover:underline" onClick={openSignIn}>Sign in</Link>
			</div>
		</form>
	);
}