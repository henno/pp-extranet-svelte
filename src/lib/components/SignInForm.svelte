<script>

    import { createEventDispatcher } from 'svelte';
    import {Button, Input} from "sveltestrap";

    let email = '';
    let password = '';

    const dispatch = createEventDispatcher();

    function submit() {
        dispatch('submit', {
            email,
            password
        })
    }
</script>

        <form on:submit|preventDefault={submit} class="{$$props.class}">
            <Input label='Email' id='email' name='email' type='email' bind:value={email} required/>
            <Input label='Password' id='password' name='password' type='password' bind:value={password} required/>
            <Button type='submit'>Sign In</Button>
        </form>
