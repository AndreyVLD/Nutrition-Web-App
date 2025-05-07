<script>
	import { goto } from '$app/navigation';
</script>

<div class="relative mt-5 flex w-full items-center justify-center">
	<button
		class="absolute right-0 mr-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none
      focus:ring-2 focus:ring-blue-300 focus-visible:ring-2 focus-visible:ring-blue-300 active:bg-blue-800"
		on:click={() => goto('/auth/login')}
		>Login
	</button>

	<h1 class="text-2xl font-bold">Food Search</h1>

	<button
		class="absolute left-0 ml-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none
      focus:ring-2 focus:ring-blue-300 focus-visible:ring-2 focus-visible:ring-blue-300 active:bg-blue-800"
		on:click={() => goto('/')}
		>Home
	</button>
</div>
