<!-- A button that takes the entire width of its parent container and has a blue background, used in form submissions. -->

<script lang="ts">
	/**
	 * FullButton component for creating a button with a full width and blue background.
	 * @param {string} type - The type of the button (e.g., button, submit, reset).
	 * @param {string} label - The label for the button.
	 */
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
