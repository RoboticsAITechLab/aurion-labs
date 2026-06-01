"use client";

import { useCallback } from "react";

import { createProtectedIntent, type ProtectedIntentType } from "@/lib/auth/auth-intents";
import { useAuthStore } from "@/store/auth-store";
import { useIntentStore } from "@/store/intent-store";
import { useUiStore } from "@/store/ui-store";

type ProtectedActionOptions = {
	type: ProtectedIntentType;
	label: string;
	returnTo?: string;
	payload?: Record<string, unknown>;
};

export function useProtectedAction<TArgs extends unknown[]>(action: (...args: TArgs) => void, options: ProtectedActionOptions) {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const captureIntent = useIntentStore((state) => state.captureIntent);
	const openAuthModal = useUiStore((state) => state.openAuthModal);

	return useCallback(
		(...args: TArgs) => {
			if (isAuthenticated) {
				action(...args);
				return;
			}

			captureIntent(
				createProtectedIntent({
					type: options.type,
					label: options.label,
					returnTo: options.returnTo,
					payload: options.payload,
					resume: () => action(...args),
				}),
			);
			openAuthModal("signin");
		},
		[action, captureIntent, isAuthenticated, openAuthModal, options.label, options.payload, options.returnTo, options.type],
	);
}