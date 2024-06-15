describe('E2E Test for Login Functionality', () => {
    beforeAll(async () => {
      await page.goto('https://example.com/login');
    });
  
    it('should log in successfully with valid credentials', async () => {
      await page.type('input[name="username"]', 'validUsername');
      await page.type('input[name="password"]', 'validPassword');
      await page.click('button[type="submit"]');
  
      // Wait for navigation
      await page.waitForNavigation();
  
      // Verify that the user is redirected to the dashboard
      expect(await page.url()).toContain('/dashboard');
      await expect(page).toMatch('Welcome, validUsername');
    });
  });
  