<script lang="ts">
	interface ButtonProps {
		type: 'button' | 'submit' | 'reset' | null | undefined;
		label: string;
	}

	let { type, label }: ButtonProps = $props();
</script>

<button
	class="flex w-full items-center justify-center rounded bg-blue-500 px-4 py-2 font-bold text-white
				hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-800"
	{type}
>
	{label}
</button>
