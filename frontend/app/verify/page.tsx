import type { Metadata } from "next";

import AuthPage from "@/modules/auth/components/auth-page";

type PageProps = {
	searchParams?: Record<string, string | string[] | undefined>;
};

export const metadata: Metadata = {
	title: "Aurion Labs | Verify Account",
	description: "Verify your email or phone using a mobile-friendly OTP flow.",
};

export default function Page({ searchParams }: PageProps) {
	const destination = typeof searchParams?.destination === "string" ? searchParams.destination : undefined;
	return <AuthPage mode="verify-otp" destination={destination} />;
}