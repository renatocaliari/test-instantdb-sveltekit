<script lang="ts">
import { browser } from '$app/environment';
import {user} from '$lib/store.svelte.js';

import { init } from '@instantdb/core';
const APP_ID = '7c87360a-b00c-4d34-85c9-8fdb89ebe9d0';
const db = init({ appId: APP_ID });
  
let {closeLogin = $bindable(false)} = $props();

let token = $state();
let tokenOK = $state(false);
let emailOK = $state(false);
let msgEmail = $state("You'll get a magic code in your email to continue");
let email;
let codigo;

async function magic(event: Event) {
    event.preventDefault();
    
    try {
        const magiccode = await db.auth.sendMagicCode({email: email});
        console.log('magiccode:', magiccode);
        msgEmail = 'Check your email and copy/paste the magic code below to proceed';
        emailOK = true;
    } catch (error) {
        msgEmail = 'Invalid email or error sending the magic code';
        emailOK = false;
    }
}

async function login() {
    user.value = await db.auth.signInWithMagicCode({email: email, code: codigo});
    tokenOK = !!user.value;
    closeLogin = true;
}

</script>
<form onsubmit={magic}>
    <label>Email:</label><input required type="email" aria-invalid={!emailOK} name="email" placeholder="Email" bind:value={email} aria-describedby="valid-helper"/>
    <button>Login</button>
    <small id="valid-helper">{msgEmail}</small>
</form>
{#if emailOK}
    <label>Token:</label> <input aria-invalid={!tokenOK} type="text" name="token" placeholder="token" bind:value={codigo} />
    <button type="button" onclick={() => login()}>Confirm</button>
{/if}
