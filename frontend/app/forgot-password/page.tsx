import type { Metadata } from "next";

import AuthPage from "@/modules/auth/components/auth-page";

export const metadata: Metadata = {
	title: "Aurion Labs | Forgot Password",
	description: "Request a reset link without leaving the current flow.",
};

export default function Page() {
	return <AuthPage mode="forgot-password" />;
}