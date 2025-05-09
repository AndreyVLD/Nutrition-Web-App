<!-- This component provides a header shared among all pages. -->

<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SessionUser } from '$lib/types/user';

	/**
	 * Header component for displaying the application header.
	 * @param {SessionUser | undefined} user - The current user session.
	 * @param {() => void} onLogout - Function to handle logout.
	 */
	interface HeaderProps {
		user: SessionUser | undefined;
		onLogout: () => void;
	}

	const { user, onLogout }: HeaderProps = $props();
</script>

<div class="relative mt-5 flex w-full items-center justify-center">
	<!-- Logout/Login Button -->
	{#if user}
		<button
			class="absolute right-0 mr-5 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600
			focus:outline-none focus:ring-2 focus:ring-red-300 active:bg-red-800"
			onclick={onLogout}
		>
			Logout
		</button>
	{:else}
		<button
			class="absolute right-0 mr-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600
			focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-800"
			onclick={() => goto('/auth/login')}
		>
			Login
		</button>
	{/if}

	<!-- Header Title -->
	<h1 class="text-2xl font-bold">Food Search</h1>

	<!-- Navigation Buttons -->
	<div class="absolute left-0 ml-5 flex items-center space-x-4">
		<button
			class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none
      focus:ring-2 focus:ring-blue-300 focus-visible:ring-2 focus-visible:ring-blue-300 active:bg-blue-800"
			onclick={() => goto('/')}
			>Home
		</button>

		<!-- User Profile Button -->
		{#if user}
			<button
				class="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600 focus:outline-none focus:ring-2
		focus:ring-green-300 active:bg-green-800"
				onclick={() => goto('/dashboard')}
			>
				Dashboard
			</button>
		{/if}
	</div>
</div>
