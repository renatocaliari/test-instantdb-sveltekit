<script lang="ts">
	import { user } from '$lib/store.svelte.js';
	import Peers from '$lib/components/Peers.svelte';
	import { Button } from '$lib/components/shadcn/ui/button';
	import { Badge } from '$lib/components/shadcn/ui/badge';
	import { Input } from '$lib/components/shadcn/ui/input';

	let emojis = $state([]);
	let messages = $state([]);
	let msg = $state('');
	let { db, room, peers } = $props();

	function submitForm(event: Event) {
		event.preventDefault();
		room.publishTopic('ephemeral-chat', { user: user.value, message: msg });
		messages.push('you: ' + msg);
		msg = '';
	}

	const chat = room.subscribeTopic('ephemeral-chat', (data) => {
		messages.push(data.user.name + ': ' + data.message);
	});

	function showEmoji(data) {
		emojis.push(data);
		setTimeout(() => {
			emojis.pop();
		}, 7000);
	}

	const emoji = room.subscribeTopic('emoji', (data) => {
		showEmoji(data);
	});

	function sendEmoji(emoji) {
		room.publishTopic('emoji', { user, emoji });
		showEmoji({ user, emoji });
	}
</script>

<aside class="sidebar">
	<Peers {user} {peers} />
	<section class="mt-4">
		<h5>Temporary Chat</h5>
		<div class="flex flex-row gap-1 items-center">
			<small
				>Reactions:
				<Badge variant="outline" onclick={() => sendEmoji('🔥')}>🔥</Badge><Badge
					variant="outline"
					onclick={() => sendEmoji('❤')}>❤</Badge
				>
			</small>
		</div>
		<form onsubmit={submitForm} class="flex flex-col gap-2">
			<label class="flex flex-col gap-1"
				>Message:
				<Input name="msg" bind:value={msg} /></label
			>
			<Button class="w-ful" type="submit">Send</Button>
		</form>
		{#each emojis as emoji}
			<div>
				<small>{emoji.user.value.name} sent <span class="animate-pulse">{emoji.emoji}</span></small>
			</div>
		{/each}

		<ul>
			{#each messages as message}
				<li><small>{message}</small></li>
			{/each}
		</ul>
	</section>
</aside>
