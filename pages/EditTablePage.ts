import { Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class EditTablePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    //locators
    public tableCustomizationOption = this.page.locator('a').filter({ hasText: 'Table customization' }).describe('Table Customization Option Link');
    public tableTitleCheckbox = this.page.getByRole('checkbox', { name: 'Show Table title' });
    public tableDescriptionCheckbox = this.page.getByRole('checkbox', { name: 'Show Table description' });
    public aboveOrBelowSelect = this.page.locator('[name="description_position"]').describe('Above or Below Select Dropdown');
    public belowOption = this.page.locator('#description-position');
    public saveChangesBtn = this.page.getByRole('button', { name: 'Save Changes' });

    public async TableTitleDescriptionDisplayOptions() {
        await this.tableCustomizationOption.waitFor({ state: "visible" });
        await this.tableCustomizationOption.click();
        await this.tableTitleCheckbox.waitFor({ state: "visible" });
        await this.tableTitleCheckbox.click();
        await this.tableDescriptionCheckbox.click();
        await this.page.waitForTimeout(2000);
        await this.aboveOrBelowSelect.click();
        await this.belowOption.selectOption('below');
        await this.page.waitForTimeout(2000);
        await this.saveChangesBtn.click();
        await this.page.waitForTimeout(5000); // Wait for 5 seconds to ensure changes are saved
    }

    public entryInfoOption = this.page.getByRole('checkbox', { name: 'Show entry info' });
    public paginationOption = this.page.getByRole('checkbox', { name: 'Show pagination' });

    public async EntryAndPaginationDisplayOptions() {
        await this.tableCustomizationOption.waitFor({ state: "visible" });
        await this.tableCustomizationOption.click();
        await this.entryInfoOption.waitFor({ state: "visible" });
        await this.entryInfoOption.click();
        await this.paginationOption.click();
        await this.page.waitForTimeout(2000);
        await this.saveChangesBtn.click();
        await this.page.waitForTimeout(5000); // Wait for 5 seconds to ensure changes are saved
    }

    public stylingOption = this.page.getByRole('button', { name: 'Styling' });
    // locators for selects — don't call selectOption during class initialization
    public rowPerPageSelect = this.page.getByLabel('Rows to show per page');
    public tableHeightSelect = this.page.getByLabel('Table height');

    public async StylingOptions() {
        await this.tableCustomizationOption.waitFor({ state: "visible" });
        await this.tableCustomizationOption.click();
        await this.stylingOption.waitFor({ state: "visible" });
        await this.stylingOption.click();
        await this.page.waitForTimeout(2000);
        await this.rowPerPageSelect.selectOption('5');
        await this.page.waitForTimeout(2000);
        await this.tableHeightSelect.selectOption('500');
        await this.page.waitForTimeout(2000);
        await this.saveChangesBtn.click();
        await this.page.waitForTimeout(5000); // Wait for 5 seconds to ensure changes are saved
    }


};