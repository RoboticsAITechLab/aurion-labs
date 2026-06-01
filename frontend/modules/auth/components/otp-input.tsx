"use client";

import type { ClipboardEvent } from "react";
import { useEffect, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";

type OtpInputProps = {
	value: string;
	onChange: (nextValue: string) => void;
	length?: number;
	className?: string;
	disabled?: boolean;
	error?: string;
};

export default function OtpInput({ value, onChange, length = 6, className, disabled, error }: OtpInputProps) {
	const refs = useRef<Array<HTMLInputElement | null>>([]);
	const digits = useMemo(() => Array.from({ length }, (_, index) => value[index] ?? ""), [length, value]);

	useEffect(() => {
		const firstEmpty = digits.findIndex((digit) => !digit);
		if (firstEmpty >= 0) {
			refs.current[firstEmpty]?.focus();
		}
	}, [digits, length]);

	function updateDigit(index: number, nextDigit: string) {
		const nextDigits = [...digits];
		nextDigits[index] = nextDigit.slice(-1);
		onChange(nextDigits.join("").slice(0, length));
	}

	function handlePaste(index: number, event: ClipboardEvent<HTMLInputElement>) {
		event.preventDefault();
		const pastedDigits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length - index).split("");
		if (!pastedDigits.length) {
			return;
		}
		const nextDigits = [...digits];
		pastedDigits.forEach((digit, offset) => {
			nextDigits[index + offset] = digit;
		});
		onChange(nextDigits.join("").slice(0, length));
		const nextIndex = Math.min(index + pastedDigits.length, length - 1);
		refs.current[nextIndex]?.focus();
	}

	return (
		<div className={cn("space-y-3", className)}>
			<div className="grid grid-cols-6 gap-1.5 sm:gap-2.5">
				{digits.map((digit, index) => (
					<input
						key={index}
						ref={(element) => {
							refs.current[index] = element;
						}}
						type="text"
						inputMode="numeric"
						pattern="[0-9]*"
						maxLength={1}
						value={digit}
						disabled={disabled}
						onChange={(event) => updateDigit(index, event.target.value.replace(/\D/g, ""))}
						onPaste={(event) => handlePaste(index, event)}
						onKeyDown={(event) => {
							if (event.key === "Backspace" && !digit && index > 0) {
								refs.current[index - 1]?.focus();
							}
							if (event.key === "ArrowLeft" && index > 0) {
								event.preventDefault();
								refs.current[index - 1]?.focus();
							}
							if (event.key === "ArrowRight" && index < length - 1) {
								event.preventDefault();
								refs.current[index + 1]?.focus();
							}
						}}
						aria-label={`OTP digit ${index + 1}`}
						className={cn(
							"h-11 rounded-2xl border border-input bg-background text-center text-lg font-semibold tracking-[0.24em] text-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:tracking-[0.32em]",
							error ? "border-destructive/60 ring-destructive/20" : "",
						)}
					/>
				))}
			</div>
			{error ? <p className="text-xs leading-5 text-red-600">{error}</p> : <p className="text-xs leading-5 text-slate-500">Enter the 6-digit code sent to your email or phone.</p>}
		</div>
	);
}