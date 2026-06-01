import type { Metadata } from "next";

import AuthPage from "@/modules/auth/components/auth-page";

type PageProps = {
	searchParams?: Record<string, string | string[] | undefined>;
};

export const metadata: Metadata = {
	title: "Aurion Labs | Reset Password",
	description: "Create a new password from a secure reset link.",
};

export default function Page({ searchParams }: PageProps) {
	const token = typeof searchParams?.token === "string" ? searchParams.token : undefined;
	return <AuthPage mode="reset-password" resetToken={token} />;
}