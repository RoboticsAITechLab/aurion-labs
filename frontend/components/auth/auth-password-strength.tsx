"use client";

import { ShieldCheck, ShieldOff } from "lucide-react";

import { cn } from "@/lib/utils";

type PasswordStrengthProps = {
	value: string;
};

function evaluateStrength(value: string) {
	let score = 0;
	if (value.length >= 8) score += 1;
	if (/[A-Z]/.test(value)) score += 1;
	if (/[a-z]/.test(value)) score += 1;
	if (/[0-9]/.test(value)) score += 1;
	if (/[^A-Za-z0-9]/.test(value)) score += 1;

	if (score <= 1) {
		return { label: "Weak", color: "bg-rose-500", tone: "text-rose-600", Icon: ShieldOff };
	}

	if (score <= 3) {
		return { label: "Good", color: "bg-amber-500", tone: "text-amber-600", Icon: ShieldCheck };
	}

	return { label: "Strong", color: "bg-emerald-500", tone: "text-emerald-600", Icon: ShieldCheck };
}

export default function AuthPasswordStrength({ value }: PasswordStrengthProps) {
	if (!value) {
		return <p className="text-xs text-slate-500">Use 8+ characters with mixed case and numbers.</p>;
	}

	const strength = evaluateStrength(value);
	const Icon = strength.Icon;

	return (
		<div className="space-y-2">
			<div className="flex items-center gap-2 text-xs font-medium">
				<Icon className={cn("size-3.5", strength.tone)} />
				<span className={strength.tone}>{strength.label} password</span>
			</div>
			<div className="grid grid-cols-5 gap-1.5">
				{Array.from({ length: 5 }).map((_, index) => (
					<div key={index} className={cn("h-1.5 rounded-full bg-slate-200", index < evaluateStrength(value).label.length / 2 ? strength.color : "bg-slate-200")} />
				))}
			</div>
		</div>
	);
}