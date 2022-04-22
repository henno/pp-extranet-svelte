<script context="module">
	export const prerender = true;
</script>

<script>
	import {_} from 'svelte-i18n'
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	{$_('SelectEmployee')}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}



	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
