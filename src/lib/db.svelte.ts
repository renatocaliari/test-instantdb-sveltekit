import { init } from '@instantdb/core';
import { type Schema, type RoomSchema } from '$lib/schema';
import { PUBLIC_APP_ID } from '$env/static/public';

export const db = $state(init<Schema, RoomSchema>({ appId: PUBLIC_APP_ID }));
