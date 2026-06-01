"use client";

import { useCallback } from "react";

import type { AuthMode } from "@/lib/auth/auth-intents";
import { useUiStore } from "@/store/ui-store";

export function useAuthModal() {
	const isOpen = useUiStore((state) => state.isAuthModalOpen);
	const mode = useUiStore((state) => state.authMode);
	const openAuthModal = useUiStore((state) => state.openAuthModal);
	const closeAuthModal = useUiStore((state) => state.closeAuthModal);
	const setAuthMode = useUiStore((state) => state.setAuthMode);

	const openWithMode = useCallback(
		(nextMode: AuthMode) => {
			openAuthModal(nextMode);
		},
		[openAuthModal],
	);

	return {
		isOpen,
		mode,
		setAuthMode,
		closeAuthModal,
		openAuthModal: openWithMode,
		openSignIn: () => openWithMode("signin"),
		openSignUp: () => openWithMode("signup"),
		openForgotPassword: () => openWithMode("forgot-password"),
		openResetPassword: () => openWithMode("reset-password"),
		openVerifyOtp: () => openWithMode("verify-otp"),
	};
}