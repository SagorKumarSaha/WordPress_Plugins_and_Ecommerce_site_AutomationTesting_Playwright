import { Page } from "@playwright/test";
import BasePage from "../pages/BasePage";

export default class loginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    //locators
    public usernameInput = this.page.getByRole('textbox', { name: 'Username or Email Address' });
    public passwordInput = this.page.getByRole('textbox', { name: 'Password' });

    public loginBtn = this.page.locator('[name="wp-submit"]').describe('Login Button');


    public async login(username: string, password: string) {
        await this.usernameInput.waitFor({state: "visible"});
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }

}