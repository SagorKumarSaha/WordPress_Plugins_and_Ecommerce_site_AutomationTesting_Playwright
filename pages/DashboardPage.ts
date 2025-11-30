import { Page } from "@playwright/test";
import BasePage from "../pages/BasePage";

export default class DashboardPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    //locators
    public welcomeMessage = this.page.getByRole('heading', { name: 'Welcome to WordPress!' }).describe('Heading of the Dashboard Page');

    public pluginsOption = this.page.getByRole('link', { name: 'Plugins', exact: true });
    public addPluginBtn = this.page.getByLabel('Main menu', { exact: true }).getByRole('link', { name: 'Add Plugin' });

    public flexTablePluginOption = this.page.getByRole('link', { name: 'FlexTable', exact: true });

    public newPageOption = this.page.getByRole('menuitem', { name: 'New' });

    public wooCommerceOption = this.page.getByRole('link', { name: 'WooCommerce', exact: true });
    public ordersOption = this.page.locator('a[href="admin.php?page=wc-orders"]').describe('Orders Option');

}