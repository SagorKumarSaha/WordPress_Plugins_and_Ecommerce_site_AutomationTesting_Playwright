import { Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class PostNewPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    //locators
    public postTitleInput = this.page.getByRole('textbox', { name: 'Add title' });
    public addBlockButton = this.page.getByRole('button', { name: 'Add block' });
    public searchForBlockInput = this.page.getByRole('searchbox', { name: 'Search' });
    public shortcodeBlockOption = this.page.getByRole('option', { name: 'Shortcode' });
    public shortcodeTextArea = this.page.getByRole('textbox', { name: 'Shortcode text' });
    public publishButton = this.page.getByRole('button', { name: 'Publish', exact: true });
    public confirmPublishButton = this.page.getByLabel('Editor publish').getByRole('button', { name: 'Publish', exact: true });
    public viewPostLink = this.page.getByLabel('Editor publish').getByRole('link', { name: 'View Post' });

    public async addShortcodeAndPublishPost(postTitle: string, shortcode: string) {
        await this.postTitleInput.waitFor({ state: "visible" });
        await this.postTitleInput.click();
        await this.postTitleInput.fill(postTitle);

        await this.addBlockButton.click();
        await this.searchForBlockInput.waitFor({ state: "visible" });
        await this.searchForBlockInput.click();
        await this.searchForBlockInput.fill("Shortcode");
        await this.shortcodeBlockOption.click();

        await this.shortcodeTextArea.waitFor({ state: "visible" });
        await this.shortcodeTextArea.click();
        await this.shortcodeTextArea.fill(shortcode);

        await this.publishButton.click();
        await this.page.waitForTimeout(4000);
        //await this.confirmPublishButton.waitFor({ state: "visible" });
        await this.confirmPublishButton.click();

        await this.viewPostLink.waitFor({ state: "visible" });
        await this.viewPostLink.click();
    }

};