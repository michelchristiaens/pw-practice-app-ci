import {test, expect} from '@playwright/test';

test('APPLITOOLS radio buttons VISUAL assertion', async ({page}) => {
    await page.goto('http://localhost:4200');

    await page.getByText('Forms').click();
    await page.getByText('Form layouts').click();        
});