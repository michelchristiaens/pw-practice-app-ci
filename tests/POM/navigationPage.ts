import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase{

    constructor(page: Page){
        super(page);    
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle);
        const expandedState = await groupMenuItem.getAttribute('aria-expanded');

        if(expandedState == "false")
            await groupMenuItem.click();
    }

    async formLayoutsPage(){        
        await this.selectGroupMenuItem("Forms");
        //await this.waitForNumberOfSeconds(3);
        await this.page.getByText('Form layouts').click();   
        //await this.waitForNumberOfSeconds(3);   
    }

    async datepickerPage(){
        await this.selectGroupMenuItem("Forms");
        await this.page.getByRole('link', { name: 'Datepicker' }).click();
    }

    async smarttablePage(){
        await this.selectGroupMenuItem("Tables & Data");
        await this.page.getByText('Smart Table').click();
    }

    async toastrPage() {
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.page.getByText('Toastr').click();
    }

    async tooltipPage(){
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.page.getByText('Tooltip').click();
    }



    
}