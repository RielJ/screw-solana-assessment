<script lang="ts">
	import { useFetchTokenInfo } from './use-token-info.svelte';
	let tokenAddress = $state('');

	const {
		tokenResponse: { tokenInfo, isLoading, error },
		fetchTokenInfo
	} = useFetchTokenInfo();

	$effect(() => console.log('tokenInfo', { tokenInfo, isLoading, error }));
</script>

<div>
	<h1>Solana Token Info Using Hooks</h1>
	<input type="text" placeholder="Enter token address" bind:value={tokenAddress} />
	<button onclick={() => fetchTokenInfo({ tokenAddress })}>Get Token Info</button>
	{#if isLoading}
		<p>Loading...</p>
	{:else if error !== null}
		<p>{error}</p>
	{:else if tokenInfo}
		<p>{JSON.stringify(tokenInfo, null, 2)}</p>
	{/if}
</div>

<style></style>
