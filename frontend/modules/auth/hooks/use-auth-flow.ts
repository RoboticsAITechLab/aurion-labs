"use client";

import { useCallback } from "react";

import type { AuthSession } from "@/lib/auth/auth-intents";
import { useAuthStore } from "@/store/auth-store";
import { useIntentStore } from "@/store/intent-store";
import { useSessionStore } from "@/store/session-store";
import { useUiStore } from "@/store/ui-store";

export function useAuthFlow() {
	const setSession = useAuthStore((state) => state.setSession);
	const clearSession = useAuthStore((state) => state.clearSession);
	const setError = useAuthStore((state) => state.setError);
	const setLoading = useAuthStore((state) => state.setLoading);
	const setGuest = useAuthStore((state) => state.setGuest);

	const bootstrapFromSession = useSessionStore((state) => state.bootstrapFromSession);
	const markRefreshing = useSessionStore((state) => state.markRefreshing);
	const markError = useSessionStore((state) => state.markError);
	const resetSessionState = useSessionStore((state) => state.reset);

	const pendingIntent = useIntentStore((state) => state.pendingIntent);
	const replayIntent = useIntentStore((state) => state.replayIntent);
	const clearIntent = useIntentStore((state) => state.clearIntent);
	const closeAuthModal = useUiStore((state) => state.closeAuthModal);

	const applySession = useCallback(
		(session: AuthSession) => {
			setSession(session);
			bootstrapFromSession(session);
		},
		[bootstrapFromSession, setSession],
	);

	const completeAuth = useCallback(
		(session: AuthSession) => {
			applySession(session);
			closeAuthModal();
			if (pendingIntent) {
				replayIntent();
			}
		},
		[applySession, closeAuthModal, pendingIntent, replayIntent],
	);

	const bootstrapGuest = useCallback(() => {
		setGuest();
		resetSessionState();
	}, [resetSessionState, setGuest]);

	const beginSessionRefresh = useCallback(() => {
		markRefreshing();
		setLoading();
	}, [markRefreshing, setLoading]);

	const handleSessionError = useCallback(
		(message: string) => {
			setError(message);
			markError();
		},
		[markError, setError],
	);

	const resetAuthState = useCallback(() => {
		clearSession();
		resetSessionState();
		clearIntent();
	}, [clearIntent, clearSession, resetSessionState]);

	return {
		completeAuth,
		applySession,
		bootstrapGuest,
		beginSessionRefresh,
		handleSessionError,
		resetAuthState,
	};
}