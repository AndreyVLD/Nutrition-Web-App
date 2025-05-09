<script lang="ts">
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';

	let { data }: PageProps = $props();
</script>

<section class="p-6">
	<h1 class="mb-6 text-2xl font-bold">Admin Dashboard</h1>

	<!-- Summary Cards -->
	<div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
		<div class="rounded bg-white p-4 shadow">
			<p class="text-gray-600">Total Users</p>
			<p class="mt-2 text-3xl font-semibold">{data.userCount}</p>
		</div>
		<div class="rounded bg-white p-4 shadow">
			<p class="text-gray-600">Total Foods</p>
			<p class="mt-2 text-3xl font-semibold">{data.foodCount}</p>
		</div>
		<div class="rounded bg-white p-4 shadow">
			<p class="text-gray-600">Total Favorites</p>
			<p class="mt-2 text-3xl font-semibold">{data.favoriteCount}</p>
		</div>
	</div>

	<!-- Users Table -->
	<section class="mb-8">
		<h2 class="mb-4 text-xl font-semibold">Users</h2>
		<table class="mb-4 min-w-full overflow-hidden rounded bg-white shadow">
			<thead class="bg-gray-50">
				<tr>
					<th class="px-4 py-2 text-left">Email</th>
					<th class="px-4 py-2 text-left">Admin</th>
					<th class="px-4 py-2 text-left">Joined</th>
					<th class="px-4 py-2 text-center">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.allUsers as u}
					<tr class="border-t">
						<td class="px-4 py-2">{u.email}</td>
						<td class="px-4 py-2">{u.isAdmin ? 'Yes' : 'No'}</td>
						<td class="px-4 py-2">{new Date(u.createdAt).toLocaleDateString()}</td>
						<td class="px-4 py-2 text-center">
							<form action="?/deleteUser" method="POST" use:enhance>
								<input type="hidden" name="userId" value={u.id} />
								<button class="text-red-600 hover:text-red-700 hover:underline"> Delete</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>

	<!-- Foods Table -->
	<section>
		<h2 class="mb-4 text-xl font-semibold">Foods</h2>
		<table class="min-w-full overflow-hidden rounded bg-white shadow">
			<thead class="bg-gray-50">
				<tr>
					<th class="px-4 py-2 text-left">FDC ID</th>
					<th class="px-4 py-2 text-left">Description</th>
					<th class="px-4 py-2 text-left">Category</th>
					<th class="px-4 py-2 text-left">Added</th>
					<th class="px-4 py-2 text-center">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.foods as f}
					<tr class="border-t">
						<td class="px-4 py-2">{f.fdcId}</td>
						<td class="px-4 py-2">{f.description}</td>
						<td class="px-4 py-2">{f.foodCategory}</td>
						<td class="px-4 py-2">{new Date(f.createdAt).toLocaleDateString()}</td>
						<td class="px-4 py-2 text-center">
							<form action="?/deleteFood" method="POST" use:enhance>
								<input type="hidden" name="fdcId" value={f.fdcId} />
								<button class="text-red-600 hover:text-red-700 hover:underline"> Delete</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</section>
