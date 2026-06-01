import type { Metadata } from "next";

import AuthPage from "@/modules/auth/components/auth-page";

export const metadata: Metadata = {
	title: "Aurion Labs | Sign In",
	description: "Sign in to Aurion Labs without interrupting guest browsing.",
};

export default function Page() {
	return <AuthPage mode="signin" />;
}