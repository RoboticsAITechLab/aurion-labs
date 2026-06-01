import { apiRequest } from "@/lib/api/client";
import type { AuthSession } from "@/lib/auth/auth-intents";

export type SignInInput = {
	email: string;
	password: string;
};

export type SignUpInput = {
	name: string;
	email: string;
	password: string;
};

export type ForgotPasswordInput = {
	email: string;
};

export type ResetPasswordInput = {
	token: string;
	password: string;
};

export type VerifyOtpInput = {
	destination: string;
	code: string;
};

export function fetchSession() {
	return apiRequest<AuthSession | null>("/api/auth/session");
}

export function signIn(input: SignInInput) {
	return apiRequest<AuthSession>("/api/auth/sign-in", {
		method: "POST",
		json: input,
	});
}

export function signUp(input: SignUpInput) {
	return apiRequest<AuthSession>("/api/auth/sign-up", {
		method: "POST",
		json: input,
	});
}

export function requestPasswordReset(input: ForgotPasswordInput) {
	return apiRequest<{ sent: boolean }>("/api/auth/forgot-password", {
		method: "POST",
		json: input,
	});
}

export function resetPassword(input: ResetPasswordInput) {
	return apiRequest<{ reset: boolean }>("/api/auth/reset-password", {
		method: "POST",
		json: input,
	});
}

export function verifyOtp(input: VerifyOtpInput) {
	return apiRequest<AuthSession>("/api/auth/verify-otp", {
		method: "POST",
		json: input,
	});
}

export function signOut() {
	return apiRequest<{ signedOut: boolean }>("/api/auth/sign-out", {
		method: "POST",
	});
}