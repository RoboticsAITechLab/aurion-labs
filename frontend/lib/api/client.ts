export class ApiError extends Error {
	status: number;
	code?: string;
	details?: unknown;

	constructor(message: string, status: number, code?: string, details?: unknown) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.code = code;
		this.details = details;
	}
}

type ApiRequestOptions = RequestInit & {
	json?: unknown;
	baseUrl?: string;
};

function getBaseUrl() {
	return (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9000").replace(/\/$/, "");
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
	const { json, baseUrl, headers, ...requestInit } = options;
	const resolvedBaseUrl = baseUrl ?? getBaseUrl();
	const url = path.startsWith("http") ? path : `${resolvedBaseUrl}${path}`;
	const requestHeaders = new Headers(headers);

	if (json !== undefined && !requestHeaders.has("Content-Type")) {
		requestHeaders.set("Content-Type", "application/json");
	}

	const response = await fetch(url, {
		...requestInit,
		headers: requestHeaders,
		credentials: "include",
		body: json === undefined ? requestInit.body : JSON.stringify(json),
	});

	if (!response.ok) {
		let payload: { message?: string; code?: string; details?: unknown } | null = null;

		try {
			payload = await response.json();
		} catch {
			payload = null;
		}

		throw new ApiError(payload?.message || response.statusText || "Request failed", response.status, payload?.code, payload?.details);
	}

	if (response.status === 204) {
		return undefined as T;
	}

	return (await response.json()) as T;
}