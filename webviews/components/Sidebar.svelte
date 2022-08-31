<script lang="ts">
    import { onMount } from "svelte";
    
    let todos: Array<{ text: string; completed: boolean }> = [];
    let text = "";

    onMount(() => {
        window.addEventListener("message", (event) => {
            const message = event.data; // The json data that the extension sent
            switch (message.type) {
                case "new-todo":
                    todos = [
                        { text: message.value, completed: false },...todos,
                    ];
                break;
            }
        });
    });
</script>

<form
    on:submit|preventDefault={() => {
        todos = [{ text, completed: false }, ...todos];
        text = "";
    }}
>
    <input bind:value={text} />
</form>

<ul>
    {#each todos as todo (todo.text)}
        <li
            class:completed={todo.completed}
            on:click={() => {
                todo.completed = !todo.completed;
            }}
        >
            {todo.text}
        </li>
    {/each}
</ul>

<!-- svelte-ignore missing-declaration -->
<button
    on:click={() => {
        tsvscode.postMessage({
            type: "onInfo",
            value: "info",
        });
    }}>click me</button
>

<!-- svelte-ignore missing-declaration -->
<button
    on:click={() => {
        tsvscode.postMessage({
            type: "onError",
            value: "frick",
        });
    }}>click merrr</button
>

<style>
    .completed {
        text-decoration: line-through;
        color: lightgreen;
    }
</style>
