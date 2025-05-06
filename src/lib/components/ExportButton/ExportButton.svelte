<script lang="ts">
	import { onMount } from 'svelte';

	// Optional data prop if you want to pass data directly to the component
	interface ExportButtonProps {
		label?: string;
		exportFunc: (format: 'csv' | 'json') => void;
	}

	let { label = 'Export as CSV/JSON', exportFunc }: ExportButtonProps = $props();
	let isOpen = $state(false);

	function togglePopup() {
		isOpen = !isOpen;
	}

	function exportAsCSV() {
		exportFunc('csv');
		isOpen = false;
	}

	function exportAsJSON() {
		exportFunc('json');
		isOpen = false;
	}

	function handleClickOutside(event: MouseEvent) {
		const path = event.composedPath();
		if (isOpen && buttonRef && popupRef && !path.includes(buttonRef) && !path.includes(popupRef)) {
			isOpen = false;
		}
	}

	let buttonRef: HTMLButtonElement;
	let popupRef: HTMLDivElement | undefined = $state();

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div>
	<button
		bind:this={buttonRef}
		class="rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
		onclick={togglePopup}
		type="button"
	>
		{label}
	</button>

	{#if isOpen}
		<div
			bind:this={popupRef}
			class="absolute left-0 z-10 mt-2 w-48 rounded-md bg-white py-2 shadow-2xl"
		>
			<button
				class="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
				onclick={exportAsCSV}
			>
				Export as CSV
			</button>
			<button
				class="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
				onclick={exportAsJSON}
			>
				Export as JSON
			</button>
		</div>
	{/if}
</div>
