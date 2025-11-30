import { Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    //locators
    public profileIcon = this.page.getByRole('link', { name: 'Login' });
    public shopOption = this.page.locator('#modal-1-content').getByRole('link', { name: 'Shop' }).describe('Shop Option');
    public myAccountOption = this.page.getByRole('link', { name: 'My account', exact: true });


}



