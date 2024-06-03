import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { type RequestHandler, error, json } from '@sveltejs/kit';

// /api/pool-data?poolAddress=&programId=
// poolAddress: string
// programId: string
export const GET: RequestHandler = async ({ url }) => {
	const poolAddress = url.searchParams.get('poolAddress');
	if (!poolAddress) {
		return error(400, 'Pool address is required');
	}
	const programId = url.searchParams.get('programId');
	if (!programId) {
		return error(400, 'Program ID are required');
	}
	try {
		const connection = new Connection(clusterApiUrl('devnet'));
		const poolPubKey = new PublicKey(poolAddress);
		const programIdPubKey = new PublicKey(programId);

		const poolInfoRes = await connection.getParsedAccountInfo(poolPubKey);

		if (!poolInfoRes || !poolInfoRes.value || !poolInfoRes.value.owner.equals(programIdPubKey)) {
			return error(400, 'Invalid Pool address or Program ID');
		}

		return json({
			poolInfo: poolInfoRes.value.data
		});
	} catch (err) {
		if (err instanceof Error) {
			return error(400, err.message);
		} else {
			return error(400, 'Unknown error');
		}
	}
};
