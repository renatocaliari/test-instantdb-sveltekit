<script lang="ts">
	import { user } from '$lib/store.svelte.js';
	import { Button } from '$lib/components/shadcn/ui/button';
	import { Input } from '$lib/components/shadcn/ui/input';
	import { Label } from '$lib/components/shadcn/ui/label';
	import * as Card from '$lib/components/shadcn/ui/card/index.js';

	import { init } from '@instantdb/core';
	const APP_ID = '7c87360a-b00c-4d34-85c9-8fdb89ebe9d0';
	const db = init({ appId: APP_ID });

	let { closeLogin = $bindable(false) } = $props();

	let token = $state();
	let tokenOK = $state(false);
	let emailOK = $state(false);
	let msgEmail = $state("You'll get a magic code in your email to continue");
	let email;

	async function magic(event: Event) {
		event.preventDefault();

		try {
			const magiccode = await db.auth.sendMagicCode({ email: email });
			console.log('magiccode:', magiccode);
			msgEmail = 'Check your email and copy/paste the magic code below to proceed';
			emailOK = true;
		} catch (error) {
			msgEmail = 'Invalid email or error sending the magic code';
			emailOK = false;
		}
	}

	async function login() {
		user.value = await db.auth.signInWithMagicCode({ email: email, code: token });
		tokenOK = !!user.value;
		closeLogin = true;
	}
</script>

<div class="flex w-full items-center justify-center">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Access</Card.Title>
			<Card.Description
				>{#if !emailOK}Enter your email below to continue.{:else}Confirm the code in your email{/if}</Card.Description
			>
		</Card.Header>
		<Card.Content class="grid gap-4">
			{#if !emailOK}
				<form onsubmit={magic}>
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							required
							type="email"
							aria-invalid={!emailOK}
							name="email"
							bind:value={email}
							aria-describedby="valid-helper"
							placeholder="m@example.com"
						/>
					</div>
				</form>
			{:else}
				<form onsubmit={login}>
					<div class="grid gap-2">
						<Label for="email">Code</Label>
						<Input
							aria-invalid={!tokenOK}
							type="text"
							name="token"
							placeholder="token"
							bind:value={token}
						/>
					</div>
				</form>
			{/if}
		</Card.Content>
		<Card.Footer>
			<Button type="submit" class="w-full"
				>{#if !emailOK}Continue{:else}Confirm{/if}</Button
			>
		</Card.Footer>
	</Card.Root>
</div>
