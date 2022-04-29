<script context="module">
	import { t, locales, locale, loadTranslations } from '$lib/translations';
	/** @type {import('@sveltejs/kit').Load} */
	export const load = async () => {
		const initialLocale ='en'; // get from cookie / url / fetch from server...
		await loadTranslations(initialLocale); // keep this just before the `return`
		return {};
	}
</script>
<script>
	import Header from '$lib/header/Header.svelte';
	import '../app.css';


</script>

<Header />
<main>
	<slot />
</main>
{$t('account', { count: 2 })}<br />
<select bind:value="{$locale}">
	{#each $locales as value}
		<option value="{value}">{$t(`lang.${value}`)}</option>
	{/each}
</select>


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
