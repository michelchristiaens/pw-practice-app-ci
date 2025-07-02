//import { test } from "@playwright/test";
import { test } from '../test-options'
import { PageManager } from "./POM/pageManager"
import { faker } from '@faker-js/faker'

test('parameterized methods', async({pageManager}) => {    
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(/ /g, '')}${faker.number.int(100)}@test.com`

    //await pm.navigateTo().formLayoutsPage();
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('mc@hotmail.com', '1234', 'Option 2');
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true);

})