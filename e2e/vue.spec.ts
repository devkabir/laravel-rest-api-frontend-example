import { test, expect } from '@playwright/test';



test('test registration with validation', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/register');
  // All field required.
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByText('The name field is required.', { exact: true })).toBeVisible;
  await expect(page.getByText('The E-mail address field is required.', { exact: true })).toBeVisible;
  await expect(page.getByText('The password field is required.', { exact: true })).toBeVisible;
});


test('test registration with email validation', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/register');
  // Invalid Email
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('admin@email');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByText('The E-mail Address field must be a valid email address.', { exact: true })).toBeVisible;
});


test('test registration with password confirmation validation', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/register');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByLabel('Confirm Password').click();
  await page.getByLabel('Confirm Password').fill('passworda');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByText('The password field confirmation does not match.', { exact: true })).toBeVisible;
});



test('test registration with verification', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/register');
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('Admin');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('admin@email.com');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByLabel('Confirm Password').click();
  await page.getByLabel('Confirm Password').fill('password');
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText('Please check your spam folder in case it\'s been sent there.')).toBeVisible;
  await page.getByRole('button', { name: 'Resend Verification Email' }).click();
  await expect(page.getByText('A new verification link has been sent to the email address you provided during r')).toBeVisible;
});
