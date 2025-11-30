import { Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class Woo_MyAccountPage extends BasePage {

    constructor(page: Page) {
        super(page);
    } 

    //locators
    public emailInput = this.page.getByRole('textbox', { name: 'Email address  Required', exact: true });
    public passwordInput = this.page.locator('#reg_password').describe('Password Input Field');
    public registerBtn = this.page.getByRole('button', { name: 'Register' });

    public async registerNewUser(email: string, password: string) {
        await this.emailInput.waitFor({ state: "visible" });
        await this.emailInput.click();
        await this.emailInput.fill(email);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.registerBtn.click();
    }

    public loginEmailInput = this.page.getByRole('textbox', { name: 'Username or email address' });
    public loginPasswordInput = this.page.locator('#password').describe('Password Input Field');
    public loginBtn = this.page.getByRole('button', { name: 'Log in' });

    public async loginExistingUser(email: string, password: string) {
        await this.loginEmailInput.waitFor({ state: "visible" });
        await this.loginEmailInput.click();
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.click();
        await this.loginPasswordInput.fill(password);
        await this.loginBtn.click();
    }

    public logoutLink = this.page.getByLabel('Account pages').getByRole('link', { name: 'Log out' });
    public ordersLink = this.page.getByRole('link', { name: 'Orders', exact: true });


}