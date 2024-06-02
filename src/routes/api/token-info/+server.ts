import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { json, type RequestHandler, error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const tokenAddress = url.searchParams.get('tokenAddress');
	if (!tokenAddress) {
		return error(400, 'Token address is required');
	}
	try {
		const connection = new Connection(clusterApiUrl('devnet'));
		const publicKey = new PublicKey(tokenAddress);
		const tokenInfoRes = await connection.getParsedAccountInfo(publicKey);
		return json({
			err: null,
			data: tokenInfoRes.value
		});
	} catch (err) {
		if (err instanceof Error) {
			return error(400, err.message);
		} else {
			return error(400, 'Unknown error');
		}
	}
};
