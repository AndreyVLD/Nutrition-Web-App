<!-- This component provides the form for searching food items. -->

<script lang="ts">
	import { enhance } from '$app/forms';

	/**
	 * InputForm component for searching food items.
	 * @param {string} query - The search query.
	 * @param {number} [currentPage] - The current page number.
	 * @param {boolean} [loading] - Whether the button is in a loading state.
	 */
	interface InputFormProps {
		query: string;
		currentPage?: number;
		loading?: boolean;
	}

	let {
		query = $bindable(''),
		currentPage = $bindable(1),
		loading = $bindable(false)
	}: InputFormProps = $props();

	/**
	 * Handles the enhancement of the form submission for searching food items.
	 * @returns - A function that handles the form submission.
	 */
	function handleEnhance() {
		loading = true;
		currentPage = 1;
		return async ({
			update
		}: {
			update: (opts?: { reset?: boolean; invalidateAll?: boolean }) => Promise<void>;
		}) => {
			await update({ reset: false, invalidateAll: false });
			loading = false;
		};
	}
</script>

<form action="?/search" class="mt-5 flex flex-row" method="POST" use:enhance={handleEnhance}>
	<!-- Main input field for searching food items -->
	<input
		autocomplete="off"
		bind:value={query}
		class="w-48 rounded border-2 border-gray-300 px-4 py-2
				 focus:outline-none focus:ring-2 focus:ring-blue-300 focus-visible:ring-2 focus-visible:ring-blue-300
				 sm:w-64 md:w-80 lg:w-96 xl:w-96"
		name="query"
		placeholder="Enter your food name"
		required
		type="text"
	/>

	<!-- Search button with loading state -->
	<button
		class="ml-5 flex items-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none
		focus:ring-2 focus:ring-blue-300 focus-visible:ring-2 focus-visible:ring-blue-300 active:bg-blue-800"
		disabled={loading}
	>
		{#if loading}
			<!-- Loading spinner -->
			<svg class="mr-2 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8v4l3.536-3.536A8 8 0 004 12z"
				/>
			</svg>
			Loading...
		{:else}
			<!-- Search icon and text -->
			<svg
				class="mr-2 h-5 w-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
				/>
			</svg>
			Search
		{/if}
	</button>
</form>
