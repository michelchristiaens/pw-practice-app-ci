import { test } from "@playwright/test";
import { PageManager } from "./POM/pageManager"
import { faker } from '@faker-js/faker'

test.beforeEach(async({page}) => {
    await page.goto('/') //here the baseurl defined in playwright.config.ts will be used
});

test('navigate to forms page @smoke', async({page}) => {
    const pm = new PageManager(page);

    await pm.navigateTo().formLayoutsPage();    
    await pm.navigateTo().datepickerPage();
    await pm.navigateTo().smarttablePage();
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().tooltipPage();    
});

test('parameterized methods', async({page}) => {
    const pm = new PageManager(page);

    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(/ /g, '')}${faker.number.int(100)}@test.com`

    await pm.navigateTo().formLayoutsPage();
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('mc@hotmail.com', '1234', 'Option 2');

    //await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})

    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true);

    //await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/card.png'});
    //const buffer = await page.screenshot()    

    // await pm.navigateTo().datepickerPage();
    // await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(1);    
    // await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(2, 5);
})