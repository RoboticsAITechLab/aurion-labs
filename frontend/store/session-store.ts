import { create } from "zustand";

import type { AuthSession } from "@/lib/auth/auth-intents";

export type SessionStatus = "idle" | "bootstrapping" | "ready" | "refreshing" | "error";

type SessionStore = {
	status: SessionStatus;
	lastValidatedAt: string | null;
	expiresAt: string | null;
	refreshAttempts: number;
	bootstrapFromSession: (session: AuthSession | null) => void;
	markRefreshing: () => void;
	markError: () => void;
	reset: () => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
	status: "idle",
	lastValidatedAt: null,
	expiresAt: null,
	refreshAttempts: 0,
	bootstrapFromSession: (session) =>
		set({
			status: session ? "ready" : "idle",
			lastValidatedAt: new Date().toISOString(),
			expiresAt: session?.expiresAt ?? null,
		}),
	markRefreshing: () => set((state) => ({ status: "refreshing", refreshAttempts: state.refreshAttempts + 1 })),
	markError: () => set({ status: "error" }),
	reset: () => set({ status: "idle", lastValidatedAt: null, expiresAt: null, refreshAttempts: 0 }),
}));