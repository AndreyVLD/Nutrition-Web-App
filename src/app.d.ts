import type { SessionUser } from '$lib/types/user';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			/** Set by src/hooks.server.ts after verifying the session */
			user?: SessionUser;
		}

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
