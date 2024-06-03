import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { type RequestHandler, error, json } from '@sveltejs/kit';
import { PoolInfoLayout } from '@raydium-io/raydium-sdk';

const PROGRAM_ID = 'devi51mZmdwUJGU9hjN27vEz64Gps7uUefqxg27EAtH';

export const GET: RequestHandler = async ({ url }) => {
	const poolAddress = url.searchParams.get('poolAddress');
	if (!poolAddress) {
		return error(400, 'Pool address is required');
	}

	try {
		const connection = new Connection(clusterApiUrl('mainnet-beta'));
		const pubKey = new PublicKey(poolAddress);
		const accountInfo = await connection.getAccountInfo(pubKey);
		if (!accountInfo) {
			return error(400, 'Invalid Pool address');
		}
		if (accountInfo.owner.toBase58() !== PROGRAM_ID) {
			return error(400, 'Invalid Pool address');
		}

		const poolData = PoolInfoLayout.decode(accountInfo.data);
		return json({ data: poolData });
	} catch (err) {
		if (err instanceof Error) {
			return error(400, err.message);
		} else {
			return error(400, 'Unknown error');
		}
	}
};
