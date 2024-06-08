<script lang="ts">
	import { user } from '$lib/store.svelte.js';
	import { init } from '@instantdb/core';
	import { onMount } from 'svelte';
	import Login from '$lib/components/Login.svelte';
	import Tasks from '$lib/components/Tasks.svelte';
	import RoomChat from '$lib/components/RoomChat.svelte';
	// import { uuidv7 } from "uuidv7";
	// import IPinfoWrapper, { IPinfo } from "node-ipinfo";

	import { Button } from '$lib/components/shadcn/ui/button';

	const APP_ID = '7c87360a-b00c-4d34-85c9-8fdb89ebe9d0';

	interface Todo {
		id: string;
		text: string;
		done: boolean;
		createdAt: number;
	}

	type Schema = {
		todos: Todo;
		user: { id: string; name: string };
	};

	let db = $state();

	let loading = $state(true);
	let closeLogin = $state(false);

	let room = $state();
	let peers = $state();

	let x = $state(0);
	let y = $state(0);

	let cursors = $state({});
	let presence = $state();

	onMount(async () => {
		// const ipinfo = new IPinfoWrapper('9b717c09549446');

		db = init<Schema, RoomSchema>({ appId: APP_ID });
		db.subscribeAuth((auth) => {
			closeLogin = !!auth.user;
			user.value = undefined;
			if (auth.error) {
				console.log('auth error:', auth.error.message);
			} else if (auth.user) {
				user.value = auth.user as User;
				const randomId = Math.random().toString(36).slice(2, 6);

				user.value.name = user.value.email.substring(0, 5) + randomId;

				room = db.joinRoom('general', 'main');
				presence = room.subscribePresence({}, (data) => {
					peers = room.getPresence()?.peers; //data.peers;
					// console.log('peers:', peers);
					removeCursorsFromPeersLeftRoom(room.getPresence()?.peers, cursors);
				});
				const mousePosition = room.subscribeTopic('mousePosition', (data) => {
					setCursorPosition(data.user.id, data.user.name, data.x, data.y);
				});
				room.publishPresence(user.value);
				// } else {
				//     goto('/login');
			}
		});

		// let moreInfo = await ipinfo.lookupIp(); //.then((response) => {
		// user.value.name.concat(moreInfo?.countryFlag);
		// console.log(moreInfo.countryFlag);
		loading = false;
	});

	function sendMousePosition(x, y) {
		room.publishTopic('mousePosition', { user: user.value, x, y });
	}

	function handleMouseMove(event) {
		if (!loading) {
			x = event.clientX;
			y = event.clientY;
			sendMousePosition(x, y);
		}
	}

	function setCursorPosition(peerId, name, x, y) {
		if (!cursors[peerId]) {
			const cursor = document.createElement('div');
			cursor.classList.add('cursor');
			document.body.appendChild(cursor);
			cursors[peerId] = cursor;
		}
		cursors[peerId].innerHTML = name || ' ';
		cursors[peerId].classList.add('cursor');
		cursors[peerId].style.position = 'fixed';
		cursors[peerId].style.left = `${x}px`;
		cursors[peerId].style.top = `${y}px`;
	}

	function removeCursorsFromPeersLeftRoom(peers, cursors) {
		Object.keys(cursors).forEach((peerId) => {
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
</script>

<svelte:body on:mousemove={handleMouseMove} />

<main>
	{#if !loading}
		{#if !user || !user.value}
			<!-- Usuário não logado. -->
		{:else}
			<nav class="flex flex-row justify-between mb-2">
				<ul><li><strong>Svelte + InstantDB</strong></li></ul>
				<ul class="flex flex-row items-center gap-2">
					<li class="hidden md:flex">User: {user.value.email}</li>
					<li><Button onclick={() => db.auth.signOut()}>Logout</Button></li>
				</ul>
			</nav>
		{/if}
		{#if !closeLogin}
			<Login {closeLogin} />
		{:else if closeLogin}
			<div class="flex flex-col md:flex-row w-full gap-8">
				<div class="flex border-r-slate-300 border-r p-2 md:w-1/3">
					<RoomChat {db} {room} {peers} />
				</div>
				<div class="col-span-2 flex justify-start p-2 flex-grow w-full">
					<Tasks {db} />
				</div>
			</div>
		{/if}

		<!-- <slot/> -->
	{:else}
		Loading
	{/if}
</main>
