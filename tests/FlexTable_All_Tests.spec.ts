import { test } from "@playwright/test";
import BaseTest from "./BaseTest";
import loginPage from "../pages/loginPage";
import DashboardPage from "../pages/DashboardPage";
import AddPluginsPage from "../pages/AddPluginsPage";
import FlexTableDashboardPage from "../pages/FlexTableDashboardPage";
import PostNewPage from "../pages/PostNewPage";
import { execSync } from "child_process";
import EditTablePage from "../pages/EditTablePage";
import dotenv from "dotenv";
dotenv.config();


test.setTimeout(1800000);

const username = process.env.ADMIN_USERNAME ?? "";
const password = process.env.ADMIN_PASSWORD ?? "";

test.describe.serial("Run these tests one after another", () => {
  test("TC1 - Verify WordPress Login Functionality", async ({ page }) => {
    const base = new BaseTest();
    await base.setup();
    const login_Page = new loginPage(base.page);
    const dashboard_Page = new DashboardPage(base.page);

    await login_Page.login(username, password);
    await dashboard_Page.welcomeMessage.waitFor({ state: "visible" });

    // Add assertion to verify successful login
    // await test.expect(dashboard_Page.welcomeMessage).toContainText('Welcome to WordPress!');
    const txt = await dashboard_Page.welcomeMessage.textContent();
    const verify = txt?.includes("Welcome to WordPress!");

    if (verify === true) {
      console.log("\n Login successful and Test passed");
    } else {
      console.log("\n Test failed");
    }

  });

  test("TC2 - Verify FlexTable Plugin Activation Status", async ({ page }) => {
    const base = new BaseTest();
    await base.setup();
    const login_Page = new loginPage(base.page);
    const dashboard_Page = new DashboardPage(base.page);
    const addPlugins_Page = new AddPluginsPage(base.page);

    // Login to WordPress Admin
    await login_Page.login(username, password);

    // Navigate to Plugins Page --> Add Plugins Page
    await dashboard_Page.pluginsOption.waitFor({ state: "visible" });
    await dashboard_Page.pluginsOption.click();
    await dashboard_Page.addPluginBtn.waitFor({ state: "visible" });
    await dashboard_Page.addPluginBtn.click();

    // Search for FlexTable Plugin
    await addPlugins_Page.searchPlugin("FlexTable");

    // Verify Activation Status of FlexTable Plugin
    await addPlugins_Page.flexTable_status.waitFor({ state: "visible" });
    const txt = await addPlugins_Page.flexTable_status.textContent();
    const verify = txt?.includes("Active");

    //verify flexTable plugin is present in sidebar
    await dashboard_Page.flexTablePluginOption.waitFor({ state: "visible" });
    const verifyPlugin = await dashboard_Page.flexTablePluginOption.isVisible();

    if (verify === true && verifyPlugin === true) {
      console.log("\n FlexTable plugin is active and visible under the WordPress Plugins list.");
    } else {
      console.log("\n Test failed");
    }


  });

  test("TC3 - Verify Navigation to FlexTable Dashboard Page", async ({ page }) => {
    const base = new BaseTest();
    await base.setup();
    const login_Page = new loginPage(base.page);
    const dashboard_Page = new DashboardPage(base.page);
    const flexTableDashboard_Page = new FlexTableDashboardPage(base.page);

    // Login to WordPress Admin
    await login_Page.login(username, password);

    // Navigate to FlexTable Dashboard Page
    await dashboard_Page.flexTablePluginOption.waitFor({ state: "visible" });
    await dashboard_Page.flexTablePluginOption.click();

    // Verify navigation to FlexTable Dashboard Page
    await flexTableDashboard_Page.flexTableDashboardHeading.waitFor({ state: "visible" });
    const isFlexTableDashboardVisible = await flexTableDashboard_Page.flexTableDashboardHeading.isVisible();

    if (isFlexTableDashboardVisible) {
      console.log("\n FlexTable Dashboard UI is displayed without errors and Test passed.");
    } else {
      console.log("\n Test failed");
    }


  });

  test("TC4 - Create a New Table Using Google Sheet Input", async ({ page }) => {
    const base = new BaseTest();
    await base.setup();
    const login_Page = new loginPage(base.page);
    const dashboard_Page = new DashboardPage(base.page);
    const flexTableDashboard_Page = new FlexTableDashboardPage(base.page);

    // Login to WordPress Admin
    await login_Page.login(username, password);

    // Navigate to FlexTable Dashboard Page
    await dashboard_Page.flexTablePluginOption.waitFor({ state: "visible" });
    await dashboard_Page.flexTablePluginOption.click();

    // Create a New Table Using Google Sheet Input
    // const randomNum = Math.floor(Math.random() * 1000);
    // const tableTitle = `Test_Table_${randomNum}`;
    await flexTableDashboard_Page.createNewTableFromGoogleSheet("https://docs.google.com/spreadsheets/d/11qRH9xUuglOTIZa7JnWTVBYuGMT32ZhFuJ5_xypApGM/edit?gid=0#gid=0", "Test_Table", "This is a test table description.");

    // Verify Table Creation Success Message
    await dashboard_Page.flexTablePluginOption.click();
    await base.page.waitForTimeout(70000);                    //this wait is required for github action otherwise we are facing test failed
    await flexTableDashboard_Page.addedTableTitle.waitFor({ state: "visible" });
    const isTableTitleVisible = await flexTableDashboard_Page.addedTableTitle.isVisible();

    if (isTableTitleVisible) {
      console.log("\n Test Passed: Table created successfully and  Table name is displayed correctly.");
    } else {
      console.log("\n Test Failed: Table not found on the dashboard.");
    }


  });

  const randomNum = Math.floor(Math.random() * 1000);
  const random = randomNum;
  const tableName = "table-" + random;

  test("TC5 -  Verify Table Display Using Shortcode", async ({ page }) => {
    const base = new BaseTest();
    await base.setup();
    const login_Page = new loginPage(base.page);
    const dashboard_Page = new DashboardPage(base.page);
    const flexTableDashboard_Page = new FlexTableDashboardPage(base.page);
    const postNew_Page = new PostNewPage(base.page);

    // Login to WordPress Admin
    await login_Page.login(username, password);

    // Navigate to FlexTable Dashboard Page
    await dashboard_Page.flexTablePluginOption.waitFor({ state: "visible" });
    await dashboard_Page.flexTablePluginOption.click();

    //copy shortcode of the added table
    await flexTableDashboard_Page.addedTableTitle.waitFor({ state: "visible" });
    await flexTableDashboard_Page.copyShortcodeOfAddedTable.waitFor({ state: "visible" });
    await flexTableDashboard_Page.copyShortcodeOfAddedTable.click();
    await base.page.waitForTimeout(3000);

    //const copiedText = await flexTableDashboard_Page.copyShortcodeOfAddedTable.innerText();
    //console.log("Copied Shortcode: ", copiedText);

    //new page for adding and publishing table using shortcode
    // Read the shortcode from the system clipboard using PowerShell (Windows)

    const copiedShortcode = execSync('powershell -NoProfile -Command "Get-Clipboard"').toString().trim();
    await dashboard_Page.newPageOption.click();
    await postNew_Page.addShortcodeAndPublishPost(tableName, copiedShortcode);
    await base.page.waitForTimeout(5000);

    // Verify if the table is displayed in the published post and table data is correct
    const dataOfRow1Col1 = "Tahsin";
    const dataOfRow10Col1 = "Abdur Rahman";
    const dataOfRow6Col2 = "15";
    const row1Col1 = base.page.getByText('Tahsin', { exact: true }).describe('Row 1 Column 1 Data');
    const row10Col1 = base.page.getByText('Abdur Rahman', { exact: true }).describe('Row 10 Column 1 Data');
    const row6Col2 = base.page.locator('#create_tables').getByText('15').describe('Row 6 Column 2 Data');

    await row1Col1.waitFor({ state: "visible" });
    await row10Col1.waitFor({ state: "visible" });
    await row6Col2.waitFor({ state: "visible" });

    const row1Col1Text = await row1Col1.textContent();
    const row10Col1Text = await row10Col1.textContent();
    const row6Col2Text = await row6Col2.textContent();

    if (row1Col1Text?.includes(dataOfRow1Col1) && row10Col1Text?.includes(dataOfRow10Col1) && row6Col2Text?.includes(dataOfRow6Col2)) {
      console.log("\n Test passed: Table is displayed correctly using shortcode in the published post.\n");
    } else {
      console.log("\n Test failed: Table data is incorrect or table not displayed in the published post.");
    }


  });

  test("TC6 -  Enable 'Show Table Title' and 'Show Table Description Below Table", async ({ page }) => {
    const base = new BaseTest();
    await base.setup();
    const login_Page = new loginPage(base.page);
    const dashboard_Page = new DashboardPage(base.page);
    const flexTableDashboard_Page = new FlexTableDashboardPage(base.page);
    const editTable_Page = new EditTablePage(base.page);

    // Login to Dashboard
    await login_Page.login(username, password);

    // Navigate to FlexTable Plugin Dashboard
    await dashboard_Page.flexTablePluginOption.waitFor({ state: "visible" });
    await dashboard_Page.flexTablePluginOption.click();

    //table customization
    await flexTableDashboard_Page.editTableOption.waitFor({ state: "visible" });
    await flexTableDashboard_Page.editTableOption.click();
    await editTable_Page.TableTitleDescriptionDisplayOptions();

    //verify table title and description showing on the post page
    await base.page.goto("http://www.sagorsaha.free.nf/" + tableName + "/");

    const tableTitle = base.page.locator('[id="swptls-table-title"]').describe('Table Title on Post Page');
    const tableDescription = base.page.locator('[id="swptls-table-description"]').describe('Table Description on Post Page');
    await tableTitle.waitFor({ state: "visible" });
    await tableDescription.waitFor({ state: "visible" });

    const title = await tableTitle.textContent();
    const description = await tableDescription.textContent();

    console.log("\n Table Title:", title);
    console.log("\n Table Description:", description);

    if (title?.trim() === "Test_Table" && description?.trim() === "This is a test table description.") {
      console.log("\n Test Passed: Table title appears above and Table description appears below the table.");
    } else {
      console.log("\n Test Failed: Table Title and Description are not displayed correctly.");
    }


  });

  test("TC7 -  Enable Entry Info & Pagination", async ({ page }) => {
    const base = new BaseTest();
    await base.setup();
    const login_Page = new loginPage(base.page);
    const dashboard_Page = new DashboardPage(base.page);
    const flexTableDashboard_Page = new FlexTableDashboardPage(base.page);
    const editTable_Page = new EditTablePage(base.page);

    // Login to WordPress Admin
    await login_Page.login(username, password);

    // Navigate to FlexTable Dashboard Page
    await dashboard_Page.flexTablePluginOption.waitFor({ state: "visible" });
    await dashboard_Page.flexTablePluginOption.click();

    //table customization
    await flexTableDashboard_Page.editTableOption.waitFor({ state: "visible" });
    await flexTableDashboard_Page.editTableOption.click();
    await editTable_Page.EntryAndPaginationDisplayOptions();

    //verify table title and description showing on the post page
    await base.page.goto("http://www.sagorsaha.free.nf/" + tableName + "/");

    const tableEntryInfo = base.page.locator('[id="create_tables_info"]').describe('Table Entry Info on Post Page');
    const tablePagination = base.page.locator('[id="create_tables_paginate"]').describe('Table Pagination on Post Page');
    await tableEntryInfo.waitFor({ state: "visible" });
    await tablePagination.waitFor({ state: "visible" });

    const entryInfoOption = await tableEntryInfo.isVisible();
    const paginationOption = await tablePagination.isVisible();

    if (entryInfoOption && paginationOption === true) {
      console.log("\n Test Passed: Table entry info and pagination are displayed correctly.");
    } else {
      console.log("\n Test Failed: Table entry info and pagination are not displayed correctly.");
    }


  });

  test("TC8 - Update 'Rows Per Page & Table Height'", async ({ page }) => {
    const base = new BaseTest();
    await base.setup();
    const login_Page = new loginPage(base.page);
    const dashboard_Page = new DashboardPage(base.page);
    const flexTableDashboard_Page = new FlexTableDashboardPage(base.page);
    const editTable_Page = new EditTablePage(base.page);

    // Login to WordPress Admin
    await login_Page.login(username, password);

    // Navigate to FlexTable Dashboard Page
    await dashboard_Page.flexTablePluginOption.waitFor({ state: "visible" });
    await dashboard_Page.flexTablePluginOption.click();

    //table customization
    await flexTableDashboard_Page.editTableOption.waitFor({ state: "visible" });
    await flexTableDashboard_Page.editTableOption.click();
    await editTable_Page.StylingOptions();

    //verify table row per page and table height showing on the post page
    await base.page.goto("http://www.sagorsaha.free.nf/" + tableName + "/");

    const tableHeightVerify = base.page.locator('.dataTables_scrollBody').describe('Table Height on Post Page');
    await tableHeightVerify.waitFor({ state: "visible" });
    const height = await tableHeightVerify.evaluate(el => {
      return window.getComputedStyle(el).height;
    });
    console.log("\n Height of the table is: " + height);

    const rows = base.page.locator('.dataTables_scrollBody table tbody tr').describe('Table Rows on Post Page');
    const rowCount = await rows.count();
    console.log("\n Total rows: " + rowCount);

    if (height <= '500px' && rowCount == 5) {
      console.log("\n Test passed: Table height and rows per page are set correctly.");
    } else {
      console.log("\n Test failed: Table height or rows per page are not set correctly.");
    }


  });

  test("TC9 - Delete the Table and Verify Frontend Removal", async ({ page }) => {
    const base = new BaseTest();
    await base.setup();
    const login_Page = new loginPage(base.page);
    const dashboard_Page = new DashboardPage(base.page);
    const flexTableDashboard_Page = new FlexTableDashboardPage(base.page);

    // Login to WordPress Admin
    await login_Page.login(username, password);

    // Navigate to FlexTable Dashboard Page
    await dashboard_Page.flexTablePluginOption.waitFor({ state: "visible" });
    await dashboard_Page.flexTablePluginOption.click();

    //table customization
    await flexTableDashboard_Page.deleteTableOption.waitFor({ state: "visible" });
    await flexTableDashboard_Page.deleteTableOption.click();
    //await base.page.waitForTimeout(10000);
    await flexTableDashboard_Page.confirmDeleteBtn.waitFor({ state: "visible" });
    await flexTableDashboard_Page.confirmDeleteBtn.click();
    await base.page.waitForTimeout(5000); // Wait for 5 seconds to ensure deletion is processed

    //verify table is deleted successfully and not showing on the post page
    await base.page.goto("http://www.sagorsaha.free.nf/" + tableName + "/");
    const table = base.page.locator('h1').describe('Table name on Post Page');
    const tableNameText = await table.textContent();
    await table.waitFor({ state: "visible" });
    const afterDelete = base.page.getByText('Table maybe deleted or can’t');
    const afterDeleteMsg = await afterDelete.textContent();
    await afterDelete.waitFor({ state: "visible" });

    if (tableNameText?.includes(tableName) && afterDeleteMsg?.includes('Table maybe deleted or can’t be loaded.')) {
      console.log("\n Test passed: Table is deleted successfully and not showing on the post page.\n");
    } else {
      console.log("\n Test failed: Table is still showing on the post page.");
    }
  

  });


});
