<script>
    import SignInForm from '$lib/components/SignInForm.svelte';
    import {goto} from '$app/navigation';
    import {session} from '$app/stores';

    let error;

    async function handleSubmit({detail: {email, password}}) {
        console.log('sign-in.handleSubmit(): sending POST /api/sign-in request')

        try {
            const response = await fetch('/api/sign-in', {
                method: 'POST',
                body: JSON.stringify({email, password}),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const body = await response.json();
            console.log('sign-in.handleSubmit(): received response from POST /api/sign-in');
            if (response.ok) {
                console.log('sign-in.handleSubmit(): response is positive')
                $session = body;
                await goto('/');
            }
            error = body.message;
        } catch (e) {
            console.log('sign-in.handleSubmit(): catch ' + JSON.stringify(e))
        }
    }
</script>

<h1 class="text-2xl font-semclassName text-center">Sign In</h1>
{#if error}
    <p class="mt-3 text-red-500className-center font-semibold">{error}</p>
{/if}
<SignInForm class="max-w-xl mx-auto mt-8" on:submit={handleSubmit}/>
