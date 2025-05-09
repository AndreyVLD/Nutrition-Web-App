<!-- Main profile dashboard page for displaying user information and favorites -->

<script lang="ts">
	import ImportButton from '$lib/components/ExportImportButtons/ImportButton.svelte';
	import FoodTable from '$lib/components/FoodTable.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="p-6">
	<h2 class="mb-4 text-2xl font-bold text-blue-900">Hello, {data.user.email}!</h2>

	<!-- Import Favorites Section -->
	<section class="mb-8 rounded-lg bg-white p-6 shadow">
		<h3 class="mb-2 text-xl font-semibold">Import Favorites</h3>
		<div class="mb-4 text-gray-700">
			You can import your favorites as either:
			<ul class="mb-2 mt-2 list-inside list-disc">
				<li>
					<strong>JSON</strong> – a flat array of objects, each matching the
					<code>Food</code> interface:
					<code
						>{'{'} fdcId, description, dataType, foodCategory, brandOwner?, foodNutrients {'}'}</code
					>
				</li>
				<li>
					<strong>CSV</strong> – a header row with these columns:
					<code>fdcId,description,dataType,foodCategory,brandOwner,foodNutrients</code><br />
					&nbsp;&nbsp;• <em>foodNutrients</em> should be a JSON-stringified array of nutrient
					objects, e.g.
					<code>"[{'"nutrientName":"Protein","value":3.5,"unitName":"g"'},…]"</code>
				</li>
			</ul>
			Files with any extra columns will ignore the unknown fields. After selecting your file, choose
			“Import JSON” or “Import CSV” to load and save them to your favorites.
		</div>

		<ImportButton label="Import CSV / JSON" url="/dashboard/import" />
	</section>

	<!-- Favorites Section -->
	<h3 class="mb-2 text-xl font-semibold">Your favorites</h3>
	<FoodTable favorites={data.favorites} />
</div>
