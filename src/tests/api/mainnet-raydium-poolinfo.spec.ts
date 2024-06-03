import { test, expect } from '@playwright/test';

test.describe('GET /api/mainnet-raydium-poolinfo', () => {
	test('no poolAddress', async ({ page }) => {
		const response = await page.goto('/api/mainnet-raydium-poolinfo');

		const responseBody = await response?.text();

		expect(response?.status()).toBe(400);
		expect(responseBody).toContain('Pool address is required');
	});

	test('invalid poolAddress', async ({ page }) => {
		const response = await page.goto('/api/mainnet-raydium-poolinfo?poolAddress=invalid');

		const responseBody = await response?.text();

		expect(response?.status()).toBe(400);
		expect(responseBody).toContain('Non-base58 character');
	});

	test('valid poolAddress', async ({ page }) => {
		const response = await page.goto(
			'/api/mainnet-raydium-poolinfo?poolAddress=8sLbNZoA1cfnvMJLPfp98ZLAnFSYCFApfJKMbiXNLwxj'
		);

		const responseBody = await response?.json();

		expect(responseBody).not.toBeNull();
		expect(responseBody.data).not.toBeNull();
		expect(responseBody.err).toBeUndefined();

		expect(response?.status()).toBe(200);
	});
});
