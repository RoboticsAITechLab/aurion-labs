export type AuthMode = "signin" | "signup" | "forgot-password" | "reset-password" | "verify-otp";

export type ProtectedIntentType =
	| "contact-business"
	| "start-chat"
	| "save-bookmark"
	| "create-listing"
	| "open-dashboard"
	| "custom";

export type AuthUser = {
	id: string;
	name: string;
	email: string;
	avatarUrl?: string | null;
	role?: string;
	tenantId?: string | null;
};

export type AuthSession = {
	user: AuthUser;
	expiresAt?: string | null;
	accessToken?: string | null;
};

export type ProtectedIntent = {
	id: string;
	type: ProtectedIntentType;
	label: string;
	returnTo?: string;
	payload?: Record<string, unknown>;
	resume?: () => void;
};

export function createProtectedIntent(intent: Omit<ProtectedIntent, "id">): ProtectedIntent {
	return {
		id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `intent_${Date.now()}`,
		...intent,
	};
}