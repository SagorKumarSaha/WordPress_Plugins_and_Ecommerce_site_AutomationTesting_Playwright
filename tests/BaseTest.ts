// tests/BaseTest.ts
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';

export default class BaseTest {
  public browser!: Browser;
  public context!: BrowserContext;
  public page!: Page;


  public async setup() {
    // Launch browser (Chrome equivalent -> Chromium)
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext({
    permissions: ['clipboard-read', 'clipboard-write']
});
    this.page = await this.context.newPage();

    // Maximize window
    await this.page.setViewportSize({ width: 1168, height: 568 });

    // Navigate to URL
    await this.page.goto("http://www.sagorsaha.free.nf/wp-admin/");
    // await this.page.setDefaultTimeout(3000);


  }

  // public async tearDown() {
  //   await this.page.close();
  //   await this.context.close();
  //   await this.browser.close();
  // }
}