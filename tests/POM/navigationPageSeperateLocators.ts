import { Locator, Page } from "@playwright/test";

export class NavigationPage {
    readonly page: Page
    readonly formLayoutsMenuItem: Locator
    readonly datepickerLayoutsMenuItem: Locator
    readonly smarttableLayoutsMenuItem: Locator
    readonly toastrLayoutsMenuItem: Locator
    readonly tooltipLayoutsMenuItem: Locator

    constructor(page: Page){
        this.page = page;  
        //locators  
        this.formLayoutsMenuItem = this.page.getByText('Form layouts');
        this.datepickerLayoutsMenuItem = this.page.getByRole('link', { name: 'Datepicker' });
        this.toastrLayoutsMenuItem = this.page.getByText('Toastr');
        this.smarttableLayoutsMenuItem = this.page.getByText('Smart Table');
        this.tooltipLayoutsMenuItem = this.page.getByText('Tooltip');
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle);
        const expandedState = await groupMenuItem.getAttribute('aria-expanded');

        if(expandedState == "false")
            await groupMenuItem.click();
    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem("Forms");
        await this.formLayoutsMenuItem.click();
    }

    async datepickerPage(){
        await this.selectGroupMenuItem("Forms");
        await this.datepickerLayoutsMenuItem.click();
    }

    async smarttablePage(){
        await this.selectGroupMenuItem("Tables & Data");
        await this.smarttableLayoutsMenuItem.click();
    }
    async toastrPage() {
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.toastrLayoutsMenuItem.click();
    }

    async tooltipPage(){
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.tooltipLayoutsMenuItem.click();
    }



    
}