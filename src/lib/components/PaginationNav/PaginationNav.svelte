<script lang="ts">
	import { enhance } from '$app/forms';
	import NavButton from './NavButton.svelte';

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
		return async ({ update }: { update: any }) => {
			await update({ reset: false });
			loading = false;
		};
	}
</script>

{#if totalPages}
	<form
		class="mt-4 flex flex-row items-center justify-center gap-1"
		action="?/search"
		method="POST"
		use:enhance={handleEnhance}
	>
		<NavButton
			disabled={currentPage === 1}
			name="direction"
			value="previous"
			content="Previous"
			{loading}
		/>

		<div class="text-s border border-gray-100 bg-gray-100 px-3 py-1 font-medium text-gray-700">
			{currentPage}
			{#if totalPages > 1}
				/ {totalPages}
			{/if}
		</div>

		<NavButton
			disabled={currentPage === totalPages}
			name="direction"
			value="next"
			content="Next"
			{loading}
		/>
	</form>
{/if}
