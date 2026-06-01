import type { Metadata } from "next";

import AuthPage from "@/modules/auth/components/auth-page";

export const metadata: Metadata = {
	title: "Aurion Labs | Get Started",
	description: "Create an account only when you need to act on Aurion Labs.",
};

export default function Page() {
	return <AuthPage mode="signup" />;
}