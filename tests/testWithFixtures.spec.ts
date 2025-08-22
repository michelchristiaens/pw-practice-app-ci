//import { test } from "@playwright/test";
import { test } from '../test-options'
import { faker } from '@faker-js/faker'

test('parameterized methods with POM fixture @regression', async({pageManager
}) => {    
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(/ /g, '')}${faker.number.int(100)}@test.com`

    await pageManager.navigateTo().datepickerPage();   
    await pageManager.onDatePickerPage().selectCommonDatePickerDateFromToday(1);

    await pageManager.navigateTo().formLayoutsPage();    
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('mc@hotmail.com', '1234', 'Option 2');
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true);

})