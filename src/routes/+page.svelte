<script lang="ts">
	import { type AccountInfo, type ParsedAccountData } from '@solana/web3.js';

	let tokenAddress = $state('');

	let isLoading = $state(false);
	let tokenInfo: AccountInfo<Buffer | ParsedAccountData> | null = $state(null);
	let error: string | null = $state(null);

	const fetchTokenAPI = async () => {
		try {
			isLoading = true;
			const response = await fetch(`/api/token-info?tokenAddress=${tokenAddress}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
			tokenInfo = data;
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
		} finally {
			isLoading = false;
		}
	};
</script>

<div>
	<h1>Solana Token Info</h1>
	<input type="text" placeholder="Enter token address" bind:value={tokenAddress} />
	<button onclick={() => fetchTokenAPI()}>Get Token Info</button>
	{#if isLoading}
		<p>Loading...</p>
	{:else if error !== null}
		<p>{error}</p>
	{:else if tokenInfo}
		<p>{JSON.stringify(tokenInfo, null, 2)}</p>
	{/if}
</div>

<style></style>
