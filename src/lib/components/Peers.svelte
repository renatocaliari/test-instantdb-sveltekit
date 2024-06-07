<script>
	let { user, peers } = $props();
</script>

<section>
	<h5>Participants:</h5>
	<ul class="list-disc list-inside">
		{#if user.value}
			<li>{user.value.name} (you)</li>
		{/if}
		{#if peers && Object.keys(peers).length}
			{#each Object.keys(peers) as participant}
				<li>{peers[participant].name}</li>
			{/each}
		{/if}
	</ul>
</section>
