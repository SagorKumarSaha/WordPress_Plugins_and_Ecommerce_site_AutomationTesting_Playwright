import { Page } from "@playwright/test";
import BasePage from "../pages/BasePage";

export default class Woo_adminOrderPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    //locators
    public firstOrder = this.page.locator('#the-list > tr').first().locator('.order-view');
    public orderStatusDropdown = this.page.getByRole('textbox', { name: 'Processing' });
    public completeOrderSelect = this.page.getByRole('option', { name: 'Completed' });
    public updateBtn = this.page.locator('button[name="save"]').describe('Update Button');

    public async changeOrderStatusToComplete() {
        await this.firstOrder.waitFor({ state: "visible" });
        await this.firstOrder.click();
        await this.orderStatusDropdown.waitFor({state: "visible"});
        await this.orderStatusDropdown.click();
        await this.page.waitForTimeout(5000); //wait for 5 seconds to load the options
        await this.completeOrderSelect.waitFor({ state: "visible" });
        await this.completeOrderSelect.click();
        await this.page.waitForTimeout(5000); //wait for 5 seconds to load the selection
        await this.updateBtn.click();
        await this.page.waitForTimeout(10000); //wait for 10 seconds to reflect the changes
    }

};