"use client";

import { Code2, Globe, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

type AuthSocialButtonsProps = {
	onGoogle?: () => void;
	onGithub?: () => void;
	onMagicLink?: () => void;
};

export default function AuthSocialButtons({ onGoogle, onGithub, onMagicLink }: AuthSocialButtonsProps) {
	return (
		<div className="grid gap-3 sm:grid-cols-3">
			<Button type="button" variant="outline" className="h-11 w-full rounded-2xl border-slate-200 text-slate-700" onClick={onGoogle}>
				<Globe className="size-4" />
				Google
			</Button>
			<Button type="button" variant="outline" className="h-11 w-full rounded-2xl border-slate-200 text-slate-700" onClick={onGithub}>
				<Code2 className="size-4" />
				GitHub
			</Button>
			<Button type="button" variant="outline" className="h-11 w-full rounded-2xl border-slate-200 text-slate-700" onClick={onMagicLink}>
				<Sparkles className="size-4" />
				Magic Link
			</Button>
		</div>
	);
}