<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	// Props: label text and a callback to handle import
	interface ImportButtonProps {
		label?: string;
		url: string;
	}

	let { label = 'Import CSV/JSON', url }: ImportButtonProps = $props();
	let isOpen = $state(false);
	let uploading = $state(false);
	let buttonRef: HTMLButtonElement;
	let popupRef: HTMLDivElement | undefined = $state();
	let fileInputRef: HTMLInputElement;

	function togglePopup() {
		isOpen = !isOpen;
	}

	function handleClickOutside(event: MouseEvent) {
		const path = event.composedPath();
		if (isOpen && buttonRef && popupRef && !path.includes(buttonRef) && !path.includes(popupRef)) {
			isOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	function triggerImport(format: 'csv' | 'json') {
		fileInputRef.accept = format === 'csv' ? '.csv' : '.json';
		fileInputRef.onchange = async () => {
			const files = fileInputRef.files;
			if (files?.length) {
				const file = files[0];

				console.log(file);

				// build form data
				const form = new FormData();
				form.append('file', file);
				form.append('format', format);

				isOpen = false;
				uploading = true;

				try {
					const res = await fetch(url, {
						method: 'POST',
						body: form
					});

					if (!res.ok) {
						const err = await res.text();
						throw new Error(`Upload failed: ${err}`);
					}
				} catch (e) {
					console.error(e);
					alert(`Error uploading ${file.name}: ${e}`);
				} finally {
					uploading = false;
					await invalidateAll();
				}
			}

			fileInputRef.value = '';
		};
		isOpen = false;
		fileInputRef.click();
	}
</script>

<div class="relative inline-block text-left">
	<!-- Hidden native file input -->
	<input bind:this={fileInputRef} class="hidden" type="file" />

	<!-- Main button -->
	<button
		bind:this={buttonRef}
		class="rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
		disabled={uploading}
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
				onclick={() => triggerImport('csv')}
			>
				Import CSV
			</button>
			<button
				class="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
				onclick={() => triggerImport('json')}
			>
				Import JSON
			</button>
		</div>
	{/if}
</div>
