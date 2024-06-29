import { init } from '@instantdb/core';
import { type Schema, type RoomSchema } from '$lib/schema';
import { PUBLIC_APP_ID } from '$env/static/public';

// const APP_ID = '7c87360a-b00c-4d34-85c9-8fdb89ebe9d0';
export const db = $state(init<Schema, RoomSchema>({ appId: PUBLIC_APP_ID }));
