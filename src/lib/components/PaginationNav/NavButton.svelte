<!-- This component provides a button to navigate through a paginated list of foods. -->

<script lang="ts">
	/**
	 * NavButton component for navigating through a paginated list of foods.
	 * @param {string} content - The text to display on the button.
	 * @param {boolean} disabled - Whether the button is disabled.
	 * @param {() => void} [onclick] - Optional click handler for the button.
	 * @param {boolean} [loading] - Whether the button is in a loading state.
	 * @param {string} [name] - Optional name attribute for the button.
	 * @param {string} [value] - Optional value attribute for the button.
	 */
	interface NavButtonProps {
		content: string;
		disabled: boolean;
		onclick?: () => void;
		loading?: boolean;
		name?: string;
		value?: string;
	}

	const { content, disabled, onclick, loading, name, value }: NavButtonProps = $props();
</script>

<button
	class="text-s rounded border border-gray-100 bg-gray-50 px-2 py-1
text-gray-600 transition-colors hover:bg-gray-100
disabled:bg-gray-50 disabled:text-gray-300 disabled:hover:bg-gray-50"
	disabled={disabled || loading}
	{name}
	{onclick}
	{value}
>
	<!-- Loading spinner if it is loading -->
	{#if loading}
		<svg
			class="h-4 w-4 animate-spin text-gray-600"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
			></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
		</svg>
		<span class="sr-only">Loading...</span>
	{:else}
		<!-- Else button content -->
		{content}
	{/if}
</button>
