<script lang="ts">
	import { onMount } from 'svelte';
	import { init, tx, id } from '@instantdb/core';
	import { Button } from '$lib/components/shadcn/ui/button';
	import Input from '$lib/components/shadcn/ui/input/input.svelte';
	import Checkbox from '$lib/components/shadcn/ui/checkbox/checkbox.svelte';

	const { db } = $props();

	let todos: Todo[] = $state([]);
	let newTodo = $state('');

	onMount(() => {
		db.subscribeQuery({ todos: {} }, (resp) => {
			if (resp.error) {
				console.error(resp.error.message); // Pro-tip: Check you have the right appId!
				return;
			}
			if (resp.data) {
				todos = resp.data.todos;
			}
		});
	});

	function addTodo(text: string) {
		console.log('add todo:', text);
		db.transact(
			tx.todos[id()].update({
				text,
				done: false,
				createdAt: Date.now()
			})
		);
	}

	function deleteTodoItem(todo: Todo) {
		db.transact(tx.todos[todo.id].delete());
	}

	function toggleDone(todo: Todo) {
		console.log('clicou');
		db.transact(tx.todos[todo.id].update({ done: !todo.done }));
	}

	function deleteCompleted(todos: Todo[]) {
		const completed = todos.filter((todo) => todo.done);
		const txs = completed.map((todo) => tx.todos[todo.id].delete());
		db.transact(txs);
	}

	function toggleAllTodos(e, todos: Todo[]) {
		const newVal = !todos.every((todo) => todo.done);
		db.transact(todos.map((todo) => tx.todos[todo.id].update({ done: newVal })));
	}

	// function focusInput() {
	//   const input = document.querySelector<HTMLInputElement>('input[type="text"]');
	//   if (input) {
	//     input.focus();
	//   }
	// }

	function submitForm(event: Event) {
		event.preventDefault();
		if (newTodo.trim()) {
			addTodo(newTodo);
			newTodo = ''; // Limpa o input após adicionar a tarefa
		}
	}
</script>

<main class="md:w-4/5">
	<header>
		<h2>Task List</h2>
		<div class="flex flex-col">
			{#key todos}
				<span>Remaining tasks: {todos.filter((todo) => !todo.done).length}</span>
				<span>Done tasks: {todos.filter((todo) => todo.done).length}</span>
			{/key}
		</div>
		<Button variant="destructive" size="sm" onclick={() => deleteCompleted(todos)}
			>Delete Completed</Button
		>
	</header>
	<section class="mt-4">
		<h3>Tasks:</h3>
		<ul class="flex flex-col mb-2">
			{#each todos as todo (todo.id)}
				<li class="flex flex-row border-b border-b-slate-200 items-center gap-2">
					<Checkbox
						id={`toggle-${todo.id}`}
						checked={todo.done}
						onCheckedChange={() => toggleDone(todo)}
					/>
					<span class="flex flex-grow">{todo.text}</span>
					<span
						class="cursor-pointer text-red-400 font-extrabold"
						id={`delete-${todo.id}`}
						onclick={() => deleteTodoItem(todo)}>𝘟</span
					>
				</li>
			{/each}
		</ul>
	</section>
	<section>
		<form onsubmit={submitForm} class="flex flex-row gap-2">
			<Input type="text" placeholder="What needs to be done?" autofocus bind:value={newTodo} />
			<Button type="submit">Add</Button>
		</form>
	</section>
</main>
