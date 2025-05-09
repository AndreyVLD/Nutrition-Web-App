<!-- This component provides a generic input field for the authentication forms. -->

<script lang="ts">
	/**
	 * Field component for creating a generic input field.
	 * @param {string} labelFor - The ID of the input field.
	 * @param {string} label - The label for the input field.
	 * @param {string} id - The ID of the input field.
	 * @param {string} type - The type of the input field (e.g., text, password).
	 * @param {boolean} required - Whether the input field is required.
	 */
	interface FieldProps {
		labelFor: string;
		label: string;
		id: string;
		type: string;
		required: boolean;
	}

	let { labelFor, label, id, type, required }: FieldProps = $props();
</script>

<div>
	<label class="mb-1 block text-gray-600" for={labelFor}>{label}</label>
	<input
		class="w-full rounded border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
		{id}
		name={id}
		{required}
		{type}
	/>
</div>
