import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const tokenAddress = url.searchParams.get('tokenAddress');
	if (!tokenAddress) {
		return new Response('Token address is required', { status: 400 });
	}
	try {
		const connection = new Connection(clusterApiUrl('devnet'));
		const publicKey = new PublicKey(tokenAddress);
		const tokenInfoRes = await connection.getParsedAccountInfo(publicKey);
		return json({
			data: tokenInfoRes.value
		});
	} catch (error) {
		if (error instanceof Error) {
			return json({
				err: error.message,
				data: null
			});
		} else {
			return json({
				err: 'Error fetching token info',
				data: null
			});
		}
	}
};
