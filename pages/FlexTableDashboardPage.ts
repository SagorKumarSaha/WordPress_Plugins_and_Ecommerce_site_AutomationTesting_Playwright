import { Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class FlexTableDashboardPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    //locators
    public flexTableDashboardHeading = this.page.getByRole('heading', { name: 'All Tables' }).describe('FlexTable Dashboard Heading');
    public createNewTableBtn = this.page.getByRole('link', { name: 'Create new table' });

    public sheetLinkInput = this.page.getByRole('textbox', { name: 'Paste your Google Sheet URL' });
    public createTableBtn = this.page.getByRole('button', { name: 'Create table from URL' });

    public tableTitleInput = this.page.locator('#table-name').describe('Table Title Input Field');
    public tableDescInput = this.page.getByRole('textbox', { name: 'Enter your table description' });
    public saveTableBtn = this.page.getByRole('button', { name: 'Save changes' });

    public addedTableTitle = this.page.getByRole('link', { name: 'Test_Table' }).first();

    public async createNewTableFromGoogleSheet(googleSheetURL: string, tableTitle: string, tableDesc: string) {
        await this.createNewTableBtn.waitFor({ state: "visible" });
        await this.createNewTableBtn.click();
        await this.sheetLinkInput.waitFor({ state: "visible" });
        await this.sheetLinkInput.click();
        await this.sheetLinkInput.fill(googleSheetURL);
        await this.createTableBtn.click();
        await this.tableTitleInput.waitFor({ state: "visible" });
        await this.tableTitleInput.click();
        await this.tableTitleInput.clear();
        await this.tableTitleInput.fill(tableTitle);
        await this.tableDescInput.click();
        await this.tableDescInput.clear();
        await this.tableDescInput.fill(tableDesc);
        await this.saveTableBtn.click();
        await this.page.waitForTimeout(5000); // Wait for 5 seconds to ensure the table is saved
    }

    public copyShortcodeOfAddedTable = this.page.locator('button.copy-shortcode span', { hasText: /gswpts_table/ }).first().describe('Copy Shortcode Button of the first table');
    public editTableOption = this.page.getByRole('link').filter({ hasText: /^$/ }).first();
    public deleteTableOption = this.page.locator('.table-delete').first().describe('Delete Table Option');
    public confirmDeleteBtn = this.page.getByRole('button', { name: 'Delete' });

}