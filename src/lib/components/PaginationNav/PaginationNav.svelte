<!-- This component provides the system for the pagination navigation buttons for the list of foods. -->

<script lang="ts">
	import { enhance } from '$app/forms';
	import NavButton from './NavButton.svelte';

	/**
	 * PaginationNav component for navigating through a paginated list of foods.
	 * @param {number} totalPages - The total number of pages.
	 * @param {number} currentPage - The current page number.
	 * @param {string} [query] - Optional search query.
	 * @param {boolean} [loading] - Whether the button is in a loading state.
	 */
	interface PaginationNavProps {
		totalPages: number;
		currentPage: number;
		query?: string;
		loading?: boolean;
	}

	let {
		totalPages,
		currentPage = $bindable(1),
		query,
		loading = $bindable(false)
	}: PaginationNavProps = $props();

	/**
	 * Handles the enhancement of the form submission for pagination.
	 * @param formData - The form data containing the current page and query.
	 * @returns - A promise that resolves when the update is complete.
	 */
	function handleEnhance({ formData }: { formData: FormData }) {
		loading = true;

		const direction = formData.get('direction') as string;

		if (direction === 'previous' && currentPage > 1) {
			currentPage--;
		} else if (direction === 'next' && currentPage < totalPages) {
			currentPage++;
		}

		formData.append('page', currentPage.toString());
		formData.append('query', query ?? '');

		return async ({
			update
		}: {
			update: (opts?: { reset?: boolean; invalidateAll?: boolean }) => Promise<void>;
		}) => {
			await update({ reset: false });
			loading = false;
		};
	}
</script>

{#if totalPages}
	<form
		class="flex flex-row items-center gap-1"
		action="?/search"
		method="POST"
		use:enhance={handleEnhance}
	>
		<!-- Previous button -->
		<NavButton
			disabled={currentPage === 1}
			name="direction"
			value="previous"
			content="Previous"
			{loading}
		/>

		<!-- Current page indicator -->
		<div class="text-s border border-gray-100 bg-gray-100 px-3 py-1 font-medium text-gray-700">
			{currentPage}
			{#if totalPages > 1}
				/ {totalPages}
			{/if}
		</div>

		<!-- Next button -->
		<NavButton
			disabled={currentPage === totalPages}
			name="direction"
			value="next"
			content="Next"
			{loading}
		/>
	</form>
{/if}
