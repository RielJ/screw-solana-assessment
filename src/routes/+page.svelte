<script lang="ts">
	import {
		Connection,
		PublicKey,
		clusterApiUrl,
		type AccountInfo,
		type ParsedAccountData
	} from '@solana/web3.js';
	let tokenAddress = $state('');
	let tokenInfo: AccountInfo<Buffer | ParsedAccountData> | null = $state(null);
	let isLoading = $state(false);
	let error = $state(null);
	const connection = new Connection(clusterApiUrl('devnet'));

	const fetchTokenInfo = async ({ tokenAddress }: { tokenAddress: string }) => {
		isLoading = true;
		try {
			const publicKey = new PublicKey(tokenAddress);
			const tokenInfoRes = await connection.getParsedAccountInfo(publicKey);
			console.log('tokenInfo', tokenInfo);
			tokenInfo = tokenInfoRes.value;
			error = null;
		} catch (error) {
			console.error('error', error);
			if (error instanceof Error) {
				error = 'Error: ' + error.message;
			} else {
				error = 'Error';
			}
		} finally {
			isLoading = false;
		}
	};
</script>

<div>
	<h1>Solana Token Info</h1>
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

