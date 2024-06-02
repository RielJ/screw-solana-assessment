import { test, expect } from '@playwright/test';

test.describe('GET /api/token-info', () => {
	test('no tokenAddress', async ({ page }) => {
		const response = await page.goto('/api/token-info');

		const responseBody = await response?.json();

		expect(responseBody).toEqual({
			err: 'Token address is required',
			data: null
		});

		expect(response?.status()).toBe(400);
	});

	test('invalid tokenAddress', async ({ page }) => {
		const response = await page.goto('/api/token-info?tokenAddress=invalid');

		const responseBody = await response?.json();

		expect(responseBody).toEqual({
			err: 'Non-base58 character',
			data: null
		});

		expect(response?.status()).toBe(400);
	});

	test('valid tokenAddress', async ({ page }) => {
		const response = await page.goto(
			'/api/token-info?tokenAddress=4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'
		);

		const responseBody = await response?.json();

		expect(responseBody).not.toBeNull();
		expect(responseBody.data).not.toBeNull();
		expect(responseBody.err).toBeNull();

		expect(response?.status()).toBe(200);
	});
});
