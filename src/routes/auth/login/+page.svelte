<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import HollowButton from '../components/HollowButton.svelte';
	import Field from '../components/Field.svelte';
	import FullButton from '../components/FullButton.svelte';

	const goToRegister = () => {
		goto('/auth/register');
	};
</script>

<div class="mt-10 flex items-center justify-center">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<h2 class="mb-6 text-center text-2xl font-bold text-gray-800">Login to Your Account</h2>
		<form class="space-y-4" method="POST" use:enhance>
			<Field id="email" label="Email" labelFor="email" required type="email" />
			<Field id="password" label="Password" labelFor="password" required type="password" />
			<FullButton label="Login" type="submit" />
		</form>

		<div class="mt-6 text-center">
			<p class="text-gray-600">Don't have an account?</p>
			<HollowButton label="Register" onClick={goToRegister} type="button" />
		</div>
	</div>
</div>
