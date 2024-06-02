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
	let error: string | undefined = $state();

	const connection = new Connection(clusterApiUrl('devnet'));

	const fetchTokenInfo = async ({ tokenAddress }: { tokenAddress: string }) => {
		isLoading = true;
		try {
			const publicKey = new PublicKey(tokenAddress);
			const tokenInfoRes = await connection.getParsedAccountInfo(publicKey);
			tokenInfo = tokenInfoRes.value;
			error = undefined;
		} catch (err) {
			if (err instanceof Error) {
				error = 'Error fetching token info: ' + err.message;
			} else {
				error = 'Error fetching token info';
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
	{:else if error}
		<p>{error}</p>
	{:else if tokenInfo}
		<p>{JSON.stringify(tokenInfo, null, 4)}</p>
	{/if}
</div>

<style></style>
