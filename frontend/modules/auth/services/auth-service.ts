import {
	fetchSession,
	requestPasswordReset,
	resetPassword,
	signIn,
	signOut,
	signUp,
	verifyOtp,
} from "@/lib/api/auth";
import type {
	ForgotPasswordInput,
	ResetPasswordInput,
	SignInInput,
	SignUpInput,
	VerifyOtpInput,
} from "@/lib/api/auth";

export const authService = {
	bootstrapSession: fetchSession,
	signIn: (input: SignInInput) => signIn(input),
	signUp: (input: SignUpInput) => signUp(input),
	requestPasswordReset: (input: ForgotPasswordInput) => requestPasswordReset(input),
	resetPassword: (input: ResetPasswordInput) => resetPassword(input),
	verifyOtp: (input: VerifyOtpInput) => verifyOtp(input),
	signOut: () => signOut(),
};