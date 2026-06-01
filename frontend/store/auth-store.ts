import { create } from "zustand";

import type { AuthSession, AuthUser } from "@/lib/auth/auth-intents";

export type AuthStatus = "guest" | "loading" | "authenticated" | "error";

type AuthStore = {
	status: AuthStatus;
	user: AuthUser | null;
	session: AuthSession | null;
	errorMessage: string | null;
	isAuthenticated: boolean;
	setLoading: () => void;
	setGuest: () => void;
	setSession: (session: AuthSession) => void;
	clearSession: () => void;
	setError: (message: string | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	status: "guest",
	user: null,
	session: null,
	errorMessage: null,
	isAuthenticated: false,
	setLoading: () => set({ status: "loading", errorMessage: null }),
	setGuest: () => set({ status: "guest", user: null, session: null, errorMessage: null, isAuthenticated: false }),
	setSession: (session) =>
		set({
			status: "authenticated",
			user: session.user,
			session,
			errorMessage: null,
			isAuthenticated: true,
		}),
	clearSession: () => set({ status: "guest", user: null, session: null, errorMessage: null, isAuthenticated: false }),
	setError: (message) => set({ status: "error", errorMessage: message, isAuthenticated: false }),
}));
