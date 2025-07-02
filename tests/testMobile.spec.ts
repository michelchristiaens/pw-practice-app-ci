 import {test, expect} from '@playwright/test';


 test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200');
});

 test('input fields', async ({page}, testInfo) => {       
        if(testInfo.project.name == 'Mobile')
            await page.locator('.sidebar-toggle').click();

        await page.getByText('Forms').click();
        await page.getByText('Form layouts').click();

        if(testInfo.project.name == 'Mobile')
            await page.locator('.sidebar-toggle').click();

        
        if(testInfo.retry > 0){
            console.log('cleanup db on retry')
        }
        
        const emailTextbox = page.locator('nb-card', { hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'});
        
        await emailTextbox.fill('mc@hotmail.com');
        await emailTextbox.clear();
        await emailTextbox.pressSequentially('aha@hotmail.com', {delay: 100 /* milliseconds */});        

        expect(await emailTextbox.inputValue()).toEqual('aha@hotmail.com')
    });