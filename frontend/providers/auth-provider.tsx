"use client";

import { useEffect } from "react";

import { ApiError } from "@/lib/api/client";
import { authService } from "@/modules/auth/services/auth-service";
import { useAuthFlow } from "@/modules/auth/hooks/use-auth-flow";
import { useAuthStore } from "@/store/auth-store";
import { useIntentStore } from "@/store/intent-store";

type AuthProviderProps = {
	children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
	const status = useAuthStore((state) => state.status);
	const pendingIntent = useIntentStore((state) => state.pendingIntent);
	const replayIntent = useIntentStore((state) => state.replayIntent);
	const setLoading = useAuthStore((state) => state.setLoading);
	const { completeAuth, bootstrapGuest, beginSessionRefresh, handleSessionError } = useAuthFlow();

	useEffect(() => {
		let isMounted = true;

		async function bootstrap() {
			beginSessionRefresh();
			try {
				const session = await authService.bootstrapSession();
				if (!isMounted) {
					return;
				}

				if (session) {
					completeAuth(session);
				} else {
					bootstrapGuest();
				}
			} catch (error) {
				if (!isMounted) {
					return;
				}
				if (error instanceof ApiError && error.status === 401) {
					handleSessionError("Your session expired. Please sign in again to continue protected actions.");
				}
				bootstrapGuest();
			}
		}

		void bootstrap();

		return () => {
			isMounted = false;
		};
	}, [beginSessionRefresh, bootstrapGuest, completeAuth, handleSessionError, setLoading]);

	useEffect(() => {
		if (status === "authenticated" && pendingIntent) {
			replayIntent();
		}
	}, [pendingIntent, replayIntent, status]);

	return <>{children}</>;
}