<script context="module">
    import Header from '$lib/header/Header.svelte';
    import '../app.css';
    import {loadTranslations} from '$lib/translations/translations';

    /** @type {import('@sveltejs/kit').Load} */
    export async function load({session, url}) {
        if (!session?.user && url.pathname !== '/sign-in' && url.pathname !== '/api/sign-in' && url.pathname !== '/api/sign-out') {
            console.log('load' + url.pathname);
            return {
                status: 302,
                redirect: '/sign-in',
                headers: {
                    'x-foo': 'bar',
                },
            };
        }
        const initialLocale = 'et'; // get from cookie / url / fetch from server...
        await loadTranslations(initialLocale); // keep this just before the `return`
        return {};
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
</svelte:head>

<Header/>
<main>
    <slot/>
</main>


<footer>
    <p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style>
    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 1024px;
        margin: 0 auto;
        box-sizing: border-box;
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 40px;
    }

    footer a {
        font-weight: bold;
    }

    @media (min-width: 480px) {
        footer {
            padding: 40px 0;
        }
    }
</style>
