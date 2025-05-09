<!-- Main layout file for the application -->

<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { goto, invalidateAll } from '$app/navigation';

	let props = $props();
	let user = $derived(props.data.user);

	async function handleLogout() {
		await fetch('/auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		await invalidateAll();
		await goto('/auth/login');
	}
</script>

<Header onLogout={handleLogout} {user} />
{@render props.children()}
