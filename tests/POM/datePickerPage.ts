import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatePickerPage extends HelperBase {
    
    constructor(page: Page) {
       super(page);       
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker');
        await calendarInputField.click();

        const futureDate = await this.selectDateInTheCalendar(numberOfDaysFromToday);

        await expect(calendarInputField).toHaveValue(futureDate);
    }

    async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker');
        await calendarInputField.click();

        const startFutureDate = await this.selectDateInTheCalendar(startDayFromToday);
        const endFutureDate = await this.selectDateInTheCalendar(endDayFromToday);

        const futureRange = `${startFutureDate} - ${endFutureDate}`
        await expect(calendarInputField).toHaveValue(futureRange);
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday); //Tomorrow

        const futureDay = date.getDate().toString();
        const futureMonthShort = date.toLocaleString('en-us', { month:"short" }); 
        const futureMonthLong = date.toLocaleString('en-us', { month:"long" });         
        const futureYear = date.getFullYear();
        const futureDate = `${futureMonthShort} ${futureDay}, ${futureYear}`;

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        const expectedMonthAndYear = ` ${futureMonthLong} ${futureYear}`
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        }

        const dayToSelect = this.page.locator('.day-cell.ng-star-inserted').getByText(futureDay, {exact:true});
        await dayToSelect.click();

        return futureDate;
    }
}