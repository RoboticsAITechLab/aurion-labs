import { create } from "zustand";

import type { AuthMode } from "@/lib/auth/auth-intents";

type UiStore = {
	isAuthModalOpen: boolean;
	authMode: AuthMode;
	openAuthModal: (mode?: AuthMode) => void;
	closeAuthModal: () => void;
	setAuthMode: (mode: AuthMode) => void;
};

export const useUiStore = create<UiStore>((set) => ({
	isAuthModalOpen: false,
	authMode: "signin",
	openAuthModal: (mode = "signin") => set({ isAuthModalOpen: true, authMode: mode }),
	closeAuthModal: () => set({ isAuthModalOpen: false }),
	setAuthMode: (mode) => set({ authMode: mode }),
}));
