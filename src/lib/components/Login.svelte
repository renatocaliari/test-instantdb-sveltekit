<script lang="ts">
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { user } from '$lib/store.svelte.js';
	import { Button } from '$lib/components/shadcn/ui/button';
	import { Input } from '$lib/components/shadcn/ui/input';
	import { Label } from '$lib/components/shadcn/ui/label';
	import * as Card from '$lib/components/shadcn/ui/card/index.js';
	import { Pincode, PincodeInput } from 'svelte-pincode';
	import { onMount } from 'svelte';
	import { db } from '$lib/db.svelte';

	let { loginSuccess = $bindable(false) } = $props();

	let loading = $state(false);
	let inputToken: Pincode | undefined = $state();
	let codeToken = $state([]);
	let completeToken = $state(false);
	let token = $state('');
	let emailOK = $state(false);
	let msgEmail = $state("You'll get a magic code in your email to continue");
	let email = $state();

	onMount(() => {
		db.subscribeAuth((auth) => {
			user.value = undefined;
			if (auth.error) {
				console.log('auth error:', auth.error.message);
			}
		});
	});

	$effect(() => {
		if (emailOK) {
			inputToken?.focusFirstInput();
		}
	});

	async function magic(event: Event) {
		event.preventDefault();

		try {
			loading = true;
			const magiccode = await db.auth.sendMagicCode({ email: email });
			loading = false;
			msgEmail = 'Check your email and copy/paste the magic code to proceed';
			emailOK = true;
		} catch (error) {
			msgEmail = 'Invalid email or error sending the magic code';
			emailOK = false;
		}
	}

	async function login() {
		loading = true;
		user.value = await db.auth.signInWithMagicCode({ email: email, code: token });

		loading = false;
		loginSuccess = true;
	}
</script>

<div class="flex w-full items-center justify-center">
	<form onsubmit={!emailOK ? magic : login}>
		<Card.Root class="w-full max-w-sm">
			<Card.Header>
				<Card.Title class="text-2xl">Access</Card.Title>
				<Card.Description
					>{#if !emailOK}Enter your email below to continue.{:else}Confirm the code sent to your
						email{/if}</Card.Description
				>
			</Card.Header>
			<Card.Content class="grid gap-4">
				{#if !emailOK}
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
				{:else}
					<div class="gap-2 flex w-full justify-center">
						<Pincode
							class="w-min"
							bind:this={inputToken}
							bind:code={codeToken}
							bind:value={token}
							bind:complete={completeToken}
						>
							<PincodeInput />
							<PincodeInput />
							<PincodeInput />
							<PincodeInput />
							<PincodeInput />
							<PincodeInput />
						</Pincode>
					</div>
				{/if}
			</Card.Content>
			<Card.Footer class="flex flex-col">
				<Button type="submit" class="w-full">
					{#if loading}
						<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					{#if !emailOK}Continue{:else}Confirm{/if}</Button
				>
				{msgEmail}
			</Card.Footer>
		</Card.Root>
	</form>
</div>
