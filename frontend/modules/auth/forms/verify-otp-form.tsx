"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OtpInput from "@/modules/auth/components/otp-input";
import { authService } from "@/modules/auth/services/auth-service";
import { verifyOtpSchema, type VerifyOtpValues } from "@/modules/auth/validators/auth-schemas";
import { useAuthFlow } from "@/modules/auth/hooks/use-auth-flow";
import { useAuthModal } from "@/hooks/use-auth-modal";

type VerifyOtpFormProps = {
	destination?: string;
};

export default function VerifyOtpForm({ destination }: VerifyOtpFormProps) {
	const [serverError, setServerError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [resendTimer, setResendTimer] = useState(30);
	const { completeAuth } = useAuthFlow();
	const { openSignIn } = useAuthModal();

	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<VerifyOtpValues>({
		resolver: zodResolver(verifyOtpSchema),
		defaultValues: { destination: destination || "", code: "" },
	});

	useEffect(() => {
		if (resendTimer <= 0) {
			return;
		}

		const timeout = window.setTimeout(() => setResendTimer((value) => value - 1), 1000);
		return () => window.clearTimeout(timeout);
	}, [resendTimer]);

	async function onSubmit(values: VerifyOtpValues) {
		setServerError(null);

		try {
			const session = await authService.verifyOtp(values);
			setSuccess(true);
			completeAuth(session);
		} catch (error) {
			setServerError(error instanceof Error ? error.message : "Unable to verify the code right now");
		}
	}

	async function resendCode() {
		if (resendTimer > 0) {
			return;
		}

		setResendTimer(30);
		setServerError(null);
		setSuccess(false);
	}

	return (
		<form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="otp-destination">Email or phone</label>
				<Input id="otp-destination" className="h-11 rounded-2xl px-3.5 py-2.5 text-base sm:text-sm" placeholder="you@company.com or +91 98xx..." autoComplete="email" {...register("destination")} />
				{errors.destination ? <p className="text-xs text-red-600">{errors.destination.message}</p> : null}
			</div>

			<div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-3 sm:p-4">
				<Controller
					control={control}
					name="code"
					render={({ field, fieldState }) => <OtpInput value={field.value || ""} onChange={field.onChange} error={fieldState.error?.message} />}
				/>
			</div>

			{serverError ? <div className={success ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700" : "rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700"}>{serverError}</div> : null}

			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<Button type="submit" className="h-11 w-full rounded-full px-5 sm:w-auto" disabled={isSubmitting}>
					{isSubmitting ? "Verifying..." : "Verify code"}
				</Button>
				<div className="flex flex-col gap-3 text-sm font-medium sm:flex-row sm:items-center sm:gap-3">
					<button type="button" className="min-h-11 rounded-full px-0 text-left text-slate-600 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0 sm:text-center" disabled={resendTimer > 0} onClick={() => void resendCode()}>
						{resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend code"}
					</button>
					<Link href="/signin" className="text-slate-950 hover:underline" onClick={openSignIn}>Back to sign in</Link>
				</div>
			</div>
		</form>
	);
}