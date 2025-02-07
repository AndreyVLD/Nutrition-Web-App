<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form action="?/search" class="flex flex-row mt-5" method="POST" use:enhance>
	<input class="border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus-visible:ring-2
				 focus-visible:ring-blue-300 rounded py-2 px-4 w-96" name="query" placeholder="Enter your search query"
				 type="text">
	<button
		class="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus-visible:ring-2
		focus-visible:ring-blue-300 text-white font-bold py-2 px-4 rounded flex items-center ml-5">
		<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" stroke-linecap="round" stroke-linejoin="round"
						stroke-width="2"></path>
		</svg>
		Search
	</button>
</form>