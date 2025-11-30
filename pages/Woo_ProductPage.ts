import {Page} from "@playwright/test";
import BasePage from "./BasePage";

export default class Woo_ProductPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    //locators
    public catProduct = this.page.getByRole('link', { name: 'Persian cat Product on sale' });
    public addToCartBtn = this.page.getByRole('button', { name: 'Add to cart' });
    public viewCartBtn = this.page.getByRole('link', { name: 'View cart' });
    public proceedToCheckoutBtn = this.page.getByRole('link', { name: 'Proceed to checkout' });

    public firstNameInput = this.page.getByRole('textbox', { name: 'First name' });
    public lastNameInput = this.page.getByRole('textbox', { name: 'Last name' });
    public addressInput = this.page.getByRole('textbox', { name: 'Address', exact: true });
    public cityInput = this.page.getByRole('textbox', { name: 'City' });
    public postcodeInput = this.page.getByRole('textbox', { name: 'Postal code (optional)' });
    public placeOrderBtn = this.page.getByRole('button', { name: 'Place order' });
    
    public async orderProduct() {
        await this.catProduct.waitFor({ state: "visible" });
        await this.catProduct.click();
        await this.addToCartBtn.click();
        await this.viewCartBtn.waitFor({ state: "visible" });
        await this.viewCartBtn.click();
        await this.proceedToCheckoutBtn.waitFor({ state: "visible" });
        await this.proceedToCheckoutBtn.click();
        await this.firstNameInput.waitFor({ state: "visible" });
        await this.firstNameInput.fill("rony");
        await this.lastNameInput.fill("Saha");
        await this.addressInput.fill("Magura");
        await this.cityInput.fill("Magura");
        await this.postcodeInput.fill("7600");
        await this.placeOrderBtn.click();
    }

}
