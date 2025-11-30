import { test } from "@playwright/test";
import BaseTest from "./BaseTest";
import Woo_BaseTest from "./Woo_BaseTest";
import Woo_HomePage from "../pages/Woo_HomePage";
import Woo_MyAccountPage from "../pages/Woo_MyAccountPage";
import Woo_ProductPage from "../pages/Woo_ProductPage";
import DashboardPage from "../pages/DashboardPage";
import loginPage from "../pages/loginPage";
import Woo_adminOrderPage from "../pages/Woo_adminOrderPage";
import dotenv from "dotenv";
dotenv.config();


test.setTimeout(1800000);

const randomNum = Math.floor(Math.random() * 10000);
const email = `roy${randomNum}@yopmail.com`;
const password = "'Sa@123456!'";

const username = process.env.ADMIN_USERNAME ?? "";
const passwordEnv = process.env.ADMIN_PASSWORD ?? "";

test.describe.serial("Run these tests one after another", () => {
    test("TS1 - End-to-End Checkout Flow", async ({ page }) => {
        const base = new Woo_BaseTest();
        await base.setup();
        const homePage = new Woo_HomePage(base.page);
        const myAccountPage = new Woo_MyAccountPage(base.page);
        const productPage = new Woo_ProductPage(base.page);

        //register as new user
        await homePage.profileIcon.waitFor({ state: "visible" });
        await homePage.profileIcon.click();
        // const randomNum = Math.floor(Math.random() * 10000);
        // const email = `roy${randomNum}@yopmail.com`;
        console.log("\n Generated Email: " + email);
        await myAccountPage.registerNewUser(email, password);

        // Add further steps for the checkout flow here
        await homePage.shopOption.waitFor({ state: "visible" });
        await homePage.shopOption.click();

        await productPage.orderProduct();

        const orderConfirmation = base.page.getByText('Thank you. Your order has').describe('Order Confirmation Message');
        await orderConfirmation.waitFor({ state: "visible" });
        const messageText = await orderConfirmation.textContent();

        if (messageText?.includes('Thank you. Your order has been received.')) {
            console.log("\n Test passed: Order placed successfully.");
        } else {
            console.log("\n Test failed: Order placement failed.");
        }

    });

    test("TS2 - User Account Order History", async ({ page }) => {
        const base = new BaseTest();
        await base.setup();
        const login_Page = new loginPage(base.page);
        const dashboard_Page = new DashboardPage(base.page);
        const adminOrderPage = new Woo_adminOrderPage(base.page);
        const homePage = new Woo_HomePage(base.page);
        const myAccountPage = new Woo_MyAccountPage(base.page);

        // Login to WordPress Admin
        await login_Page.login(username, passwordEnv);

        //order status change to complete
        await dashboard_Page.wooCommerceOption.waitFor({ state: "visible" });
        await dashboard_Page.wooCommerceOption.click();
        await dashboard_Page.ordersOption.waitFor({ state: "visible" });
        await dashboard_Page.ordersOption.click();

        await adminOrderPage.changeOrderStatusToComplete();

        //verify order staus changed to complete in user account
        await base.page.goto("http://www.sagorsaha.free.nf/");

        await homePage.myAccountOption.waitFor({ state: "visible" });
        await homePage.myAccountOption.click();

        await myAccountPage.logoutLink.waitFor({ state: "visible" });
        await myAccountPage.logoutLink.click();

        await myAccountPage.loginExistingUser(email, password);
        await myAccountPage.ordersLink.waitFor({ state: "visible" });
        await myAccountPage.ordersLink.click();
        const orderStatus = base.page.getByRole('cell', { name: 'Completed' });
        await orderStatus.waitFor({ state: "visible" });
        const statusText = await orderStatus.textContent();

        if (statusText?.includes('Completed')) {
            console.log("\n Test passed: Order status is Completed in user account.");
        } else {
            console.log("\n Test failed: Order status is not Completed in user account.");
        }

    });

});