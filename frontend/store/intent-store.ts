import { create } from "zustand";

import type { ProtectedIntent } from "@/lib/auth/auth-intents";

type IntentStore = {
	pendingIntent: ProtectedIntent | null;
	captureIntent: (intent: ProtectedIntent) => void;
	clearIntent: () => void;
	replayIntent: () => void;
};

export const useIntentStore = create<IntentStore>((set, get) => ({
	pendingIntent: null,
	captureIntent: (intent) => set({ pendingIntent: intent }),
	clearIntent: () => set({ pendingIntent: null }),
	replayIntent: () => {
		const intent = get().pendingIntent;

		if (!intent) {
			return;
		}

		set({ pendingIntent: null });
		intent.resume?.();
	},
}));
