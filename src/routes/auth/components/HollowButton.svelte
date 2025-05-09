<!-- A button that takes that is hollow with a blue border, used in form submissions. -->

<script lang="ts">
	/**
	 * HollowButton component for creating a button with a hollow style and blue border.
	 * @param {string} type - The type of the button (e.g., button, submit, reset).
	 * @param {string} label - The label for the button.
	 * @param {function} onClick - The function to call when the button is clicked.
	 */
	interface ButtonProps {
		type: 'button' | 'submit' | 'reset' | null | undefined;
		label: string;
		onClick: () => void;
	}

	let { type, label, onClick }: ButtonProps = $props();
</script>

<button
	class="mt-2 inline-flex items-center justify-center rounded border-2 border-blue-500 px-4 py-2 font-bold
				text-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
	onclick={onClick}
	{type}
>
	{label}
</button>
