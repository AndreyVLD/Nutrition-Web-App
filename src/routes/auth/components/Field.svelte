<script lang="ts">
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
		{required}
		{type}
	/>
</div>
