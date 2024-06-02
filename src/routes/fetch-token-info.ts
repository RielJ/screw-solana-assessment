import { PublicKey, type Connection } from '@solana/web3.js';

type IFetchTokenInfoReq = {
	tokenAddress: string;
	connection: Connection;
};

export async function fetchTokenInfo({ tokenAddress, connection }: IFetchTokenInfoReq) {
	try {
		const publicKey = new PublicKey(tokenAddress);
		const tokenInfoRes = await connection.getParsedAccountInfo(publicKey);
		return {
			err: null,
			data: tokenInfoRes.value
		};
	} catch (err) {
		if (err instanceof Error) {
			return { err: err.message, data: null };
		} else {
			return { err: 'Error fetching token info', data: null };
		}
	}
}
