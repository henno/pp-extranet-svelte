<script context="module">
    import Header from '$lib/header/Header.svelte';
    import '../app.css';
    import {loadTranslations} from '$lib/translations/translations';
    import LogRocket from 'logrocket';
    LogRocket.init('r4tux5/pp_extranet');

    LogRocket.identify('1', {
        name: 'Test User'
    });

    // const Sentry = require("@sentry/node");
    // // or use es6 import statements
    // // import * as Sentry from '@sentry/node';
    //
    // const Tracing = require("@sentry/tracing");
    // // or use es6 import statements
    // // import * as Tracing from '@sentry/tracing';
    //
    // Sentry.init({
    //     dsn: "https://e438b434bf46454fb331af471921e652@o1249105.ingest.sentry.io/6409458",
    //
    //     // Set tracesSampleRate to 1.0 to capture 100%
    //     // of transactions for performance monitoring.
    //     // We recommend adjusting this value in production
    //     tracesSampleRate: 1.0,
    // });
    //
    // const transaction = Sentry.startTransaction({
    //     op: "test",
    //     name: "My First Test Transaction",
    // });
    //
    // setTimeout(() => {
    //     try {
    //         foo();
    //     } catch (e) {
    //         Sentry.captureException(e);
    //     } finally {
    //         transaction.finish();
    //     }
    // }, 99);

    /** @type {import('@sveltejs/kit').Load} */
    export async function load({session, url}) {
        // if (!session?.user && url.pathname !== '/sign-in' && url.pathname !== '/api/sign-in' && url.pathname !== '/api/sign-out') {
        //     console.log('__layout.svelte.load():' + url.pathname);
        //     return {
        //         status: 302,
        //         redirect: '/sign-in',
        //         headers: {
        //             'x-foo': 'bar',
        //         },
        //     };
        // }
        const initialLocale = 'et'; // get from cookie / url / fetch from server...
        await loadTranslations(initialLocale); // keep this just before the `return`
        return {};
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="/bootstrap.min.css">
</svelte:head>

<Header/>
<main>
    <slot/>
</main>


<footer>

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
