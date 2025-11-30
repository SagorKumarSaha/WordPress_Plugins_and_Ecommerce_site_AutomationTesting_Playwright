import { Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class AddPluginsPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    //locators
    public searchPluginsInput = this.page.getByRole('searchbox', { name: 'Search Plugins' });
    public flexTable_status = this.page.getByRole('button', { name: 'Active' }).describe('Flex Table Status Button');


    public async searchPlugin(pluginName: string) {
        await this.searchPluginsInput.waitFor();
        await this.searchPluginsInput.click();
        await this.searchPluginsInput.fill(pluginName);
        await this.page.keyboard.press('Enter');
    }

}