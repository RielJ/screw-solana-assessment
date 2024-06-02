<script lang="ts">
	import { fetchTokenInfo } from './fetch-token-info';
	import {
		Connection,
		clusterApiUrl,
		type AccountInfo,
		type ParsedAccountData
	} from '@solana/web3.js';

	let tokenAddress = $state('');

	let isLoading = $state(false);
	let tokenInfo: AccountInfo<Buffer | ParsedAccountData> | null = $state(null);
	let error: string | null = $state(null);

	const connection = new Connection(clusterApiUrl('devnet'));

	const fetchToken = async () => {
		error = null;
		tokenInfo = null;
		isLoading = true;
		const { err, data } = await fetchTokenInfo({ tokenAddress, connection });
		if (err) {
			error = err;
		} else {
			tokenInfo = data;
		}
		isLoading = false;
	};
</script>

<div>
	<h1>Solana Token Info</h1>
	<input type="text" placeholder="Enter token address" bind:value={tokenAddress} />
	<button onclick={() => fetchToken()}>Get Token Info</button>
	{#if isLoading}
		<p>Loading...</p>
	{:else if error !== null}
		<p>{error}</p>
	{:else if tokenInfo}
		<p>{JSON.stringify(tokenInfo, null, 2)}</p>
	{/if}
</div>

<style></style>
