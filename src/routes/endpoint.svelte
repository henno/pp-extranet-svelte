<script>

    import {Button} from "sveltestrap";
    import {session} from "$app/stores";
    import {goto} from "$app/navigation";

    let email = 'a';
    let password = 'b';



    async function submit() {
        const response = await fetch('/api/endpoint', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json',
                'foo': 'bar',
            },
        });

        const body = await response.json();
        if (response.ok) {
            // session from getSession hook will otherwise not be set before navigation
            // that would trigger redirect from /protected back to /sign-in
            $session = body;
            await goto('/');
        }
    }
</script>

<form on:submit|preventDefault={submit}>
    <Button type='submit'>Sign In</Button>
</form>
