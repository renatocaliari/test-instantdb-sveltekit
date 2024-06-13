<script lang="ts">
	import { user } from '$lib/store.svelte.js';
	import { onMount } from 'svelte';
	import Login from '$lib/components/Login.svelte';
	import Tasks from '$lib/components/Tasks.svelte';
	import RoomChat from '$lib/components/RoomChat.svelte';
	import { db } from '$lib/db.svelte';
	import { tx, id } from '@instantdb/core';

	// import { uuidv7 } from "uuidv7";

	import { Button } from '$lib/components/shadcn/ui/button';
	import Badge from '$lib/components/shadcn/ui/badge/badge.svelte';

	let loading = $state(true);
	let loginSuccess = $state(false);

	let room = $state();
	let peers = $state();

	let x = $state(0);
	let y = $state(0);

	let cursors = $state({});
	let unsubPresence = $state();

	onMount(() => {
		// const ipinfo = new IPinfoWrapper('9b717c09549446');

		db.subscribeAuth((auth) => {
			loginSuccess = !!auth.user;
			user.value = undefined;
			if (auth.user) {
				db.subscribeQuery({ users: { $: { where: { email: auth.user.email } } } }, (resp) => {
					if (resp.data) {
						const userExists = !!resp.data.users[0];
						if (!userExists) {
							db.transact(
								tx.users[auth.user.id].update({
									email: auth.user.email,
									handle: '',
									createdAt: Date.now()
								})
							);
						}
					}
				});

				user.value = auth.user;
				const randomId = Math.random().toString(36).slice(2, 6);
				user.value.name = user.value.email.substring(0, 5) + randomId;

				room = db.joinRoom('general', 'main');
				unsubPresence = room.subscribePresence({}, (data) => {
					peers = room.getPresence()?.peers;
					console.log('peers:', peers);
					removeCursorsFromPeersLeftRoom(peers, cursors);
				});
				const mousePosition = room.subscribeTopic('mousePosition', (data) => {
					setCursorPosition(data.user.id, data.user.name, data.x, data.y);
				});

				if (!peers || Object.keys(peers).length === 0) {
					room.publishPresence(user.value);
				} else {
					Object.keys(peers).forEach((peerId) => {
						console.log('peerId:', peerId);
						let foundPeer = Object.keys(peers).find((key) => {
							return peers[key].id === peerId;
						});
						if (!foundPeer && peers[peerId].email) {
							room.publishPresence(user.value);
						}
					});
				}
			}
			loading = false;
		});
		return () => {
			unsubPresence();
			room.leaveRoom();
		};
	});

	function sendMousePosition(x, y) {
		if (room && !loading) {
			room.publishTopic('mousePosition', { user: user.value, x, y });
		}
	}

	function handleMouseMove(event) {
		x = event.clientX;
		y = event.clientY;
		sendMousePosition(x, y);
	}

	function setCursorPosition(peerId, name, x, y) {
		if (!cursors[peerId]) {
			const cursor = document.createElement('div');
			cursor.classList.add('cursor');
			document.body.appendChild(cursor);
			cursors[peerId] = cursor;
		}
		cursors[peerId].innerHTML = '👉' + name;
		cursors[peerId].classList.add('cursor');
		cursors[peerId].style.position = 'fixed';
		cursors[peerId].style.left = `${x}px`;
		cursors[peerId].style.top = `${y}px`;
	}

	function removeCursorsFromPeersLeftRoom(peers, cursors) {
		Object.keys(cursors).forEach((peerId) => {
			console.log('peerId:', peerId);
			let foundPeer = Object.keys(peers).find((key) => {
				return peers[key].id === peerId;
			});
			if (!foundPeer) {
				const cursor = cursors[peerId];
				document.body.removeChild(cursor);
				cursors[peerId].remove();
				delete cursors[peerId];
			}
		});
	}

	let status = $state('🟢 online');
	window.addEventListener('online', () => {
		status = '🟢 online';
	});
	window.addEventListener('offline', () => {
		status = '🔴 offline';
	});
</script>

<svelte:body on:mousemove={handleMouseMove} />
<main>
	{#if !loading}
		{#if !user || !user.value}
			<!-- Usuário não logado. -->
		{:else}
			<nav class="flex flex-row items-center justify-between mb-2">
				<ul class="flex flex-row items-center"><li><strong>InstantDB + SvelteKit</strong></li></ul>
				<ul class="flex flex-row items-center gap-2">
					<li class="hidden md:flex">User: {user.value.email}</li>
					<li class="whitespace-nowrap">
						{#key status}<Badge variant="secondary">{status}</Badge>{/key}
					</li>
					<li><Button size="sm" onclick={() => db.auth.signOut()}>Logout</Button></li>
				</ul>
			</nav>
		{/if}
		{#if !loading}
			{#if !loginSuccess}
				<Login />
			{:else if loginSuccess}
				<div class="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
					<div class="flex md:border-r-slate-300 md:border-r p-2 w-full">
						<RoomChat {room} {peers} />
					</div>
					<div class="flex justify-start p-2 w-full">
						<Tasks />
					</div>
				</div>
			{/if}
		{/if}

		<!-- <slot/> -->
	{:else}
		Loading
	{/if}
</main>
