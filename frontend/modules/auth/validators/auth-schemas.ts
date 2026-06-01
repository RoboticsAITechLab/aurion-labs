import { z } from "zod";

export const signInSchema = z.object({
	identifier: z.string().min(3, "Enter your email or phone"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpSchema = z
	.object({
		name: z.string().min(2, "Enter your name"),
		identifier: z.string().min(3, "Enter your email or phone"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Add at least one uppercase letter")
			.regex(/[a-z]/, "Add at least one lowercase letter")
			.regex(/[0-9]/, "Add at least one number"),
		confirmPassword: z.string().min(8),
		acceptTerms: z.literal(true, {
			message: "Accept the terms to continue",
		}),
	})
	.refine((values) => values.password === values.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const forgotPasswordSchema = z.object({
	email: z.string().email("Enter a valid email"),
});

export const resetPasswordSchema = z
	.object({
		token: z.string().min(1, "Missing reset token"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Add at least one uppercase letter")
			.regex(/[a-z]/, "Add at least one lowercase letter")
			.regex(/[0-9]/, "Add at least one number"),
		confirmPassword: z.string().min(8),
	})
	.refine((values) => values.password === values.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const verifyOtpSchema = z.object({
	destination: z.string().min(3, "Enter the email or phone receiving the code"),
	code: z.string().regex(/^\d{6}$/, "Enter the 6-digit code"),
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
export type VerifyOtpValues = z.infer<typeof verifyOtpSchema>;