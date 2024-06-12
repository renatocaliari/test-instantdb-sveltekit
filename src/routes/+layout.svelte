<script lang="ts">
	import '../app.postcss';
	import { Toaster } from '$lib/components/shadcn/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<div class="p-5">
	<Toaster />
	<slot />
</div>
