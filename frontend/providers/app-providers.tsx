"use client";

import type { ReactNode } from "react";

import AuthModal from "@/components/auth/auth-modal";
import AuthProvider from "@/providers/auth-provider";

type AppProvidersProps = {
	children: ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
	return (
		<AuthProvider>
			{children}
			<AuthModal />
		</AuthProvider>
	);
}