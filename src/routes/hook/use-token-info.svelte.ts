import {
	Connection,
	PublicKey,
	clusterApiUrl,
	type AccountInfo,
	type ParsedAccountData
} from '@solana/web3.js';

export class TokenResponse {
	tokenInfo: AccountInfo<Buffer | ParsedAccountData> | null = $state(null);
	isLoading = $state(false);
	error: string | undefined = $state(undefined);
}

type TFetchTokenInfo = {
	tokenAddress: string;
};

export function useFetchTokenInfo() {
	const tokenResponse = new TokenResponse();
	const connection = new Connection(clusterApiUrl('devnet'));

	async function fetchTokenInfo({ tokenAddress }: TFetchTokenInfo) {
		if (!tokenAddress) {
			return;
		}

		try {
			tokenResponse.isLoading = true;
			tokenResponse.error = undefined;
			const publicKey = new PublicKey(tokenAddress);
			const tokenInfo = await connection.getParsedAccountInfo(publicKey);
			tokenResponse.tokenInfo = tokenInfo.value;
		} catch (error) {
			if (error instanceof Error) {
				tokenResponse.error = 'Failed to fetch token info: ' + error.message;
			} else {
				tokenResponse.error = 'Failed to fetch token info';
			}
		} finally {
			tokenResponse.isLoading = false;
		}
	}

	return { tokenResponse, fetchTokenInfo };
}
