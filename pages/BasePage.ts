// pages/BasePage.ts
import { Page } from "@playwright/test";

// BasePage class to be extended by other page classes
export default class BasePage {
  protected page: Page;
  
  // Initialize the page object
  constructor(page: Page) {
    this.page = page;
  }
}