import {expect, test} from '@playwright/test';

test.beforeEach(async ({page}, testInfo) => {
    await page.goto('http://localhost:4200');
    await page.getByRole('link', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Form Layouts' }).click();

    testInfo.setTimeout(25000); // Set a timeout of 10 seconds for this test
});


test('locator syntax rules' , async ({page}) => {    
    //by tag
    //expect(page.locator('input')).toHaveText(''); //input is a tag, not a text element

    //by id : hash
    //await page.locator('#inputEmail1').click()

    //by class : dot
    page.locator('.shape-rectangle')

    //by attribute : square brackets
    page.locator('[placeholder="Email"]')

    //by entire class value
    page.locator('[class="input-full-width shape-rectangle"]')

    //by combination
    page.locator('input[placeholder="Email"]')    
});

test('user facing locators', async ({page}) => {
    await page.getByRole('textbox', { name: 'Email' }).first().click();
    await page.getByRole('button', { name: 'Sign in' }).first().click();

    await page.getByLabel('Email').first().click();
    await page.getByPlaceholder('Jane Doe').click();
    await page.getByText('Sign in').first().click();

    //await page.getByTestId('test-email').click(); //niet user-facing, maar zeer veerkrachtig
});

test('locating childs', async ({page}) => {
    //by tag
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();

    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();
    
    await page.locator('label').filter({ hasText: 'Option 2' }).locator('span').nth(1).click();

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click();
});

test('locating parents', async ({page}) => {
    await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' }).click();

    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: 'Email' }).click();

    await page.locator('nb-card').filter({ has: page.locator('nb-checkbox')}).filter({ hasText: 'Sign in' })
        .getByRole('textbox', { name: 'Email' }).click();
});

test('reuse locators', async ({page}) => {
    const card = await page.locator('nb-card', { hasText: 'Using the Grid' });

    const emailInput = card.getByRole('textbox', { name: 'Email' });
    const passwordInput = card.getByRole('textbox', { name: 'Password' });  

    await emailInput.fill('mc@hotmail.com');
    await passwordInput.fill('12345678');

    await expect(emailInput).toHaveValue('mc@hotmail.com');

    const emailFieldValue = await emailInput.inputValue();
    expect(emailFieldValue).toEqual('mc@hotmail.com');

    await expect(emailInput).not.toHaveText('mc@hotmail.com'); //Because textbox does not have text, it has a value

});

test('extractions', async ({page}) => {
    const card = await page.locator('nb-card', { hasText: 'Using the Grid' });

    const btnText = await card.locator('button').textContent();

    await expect(btnText).toEqual('Sign in');


    const radios = await card.locator('nb-radio').allTextContents();
    expect(radios).toEqual(['Option 1', 'Option 2', 'Disabled Option']);
    expect(radios).toContain('Option 1');
});

test('assertions', async ({page}) => {
    const card = await page.locator('nb-card', { hasText: 'Using the Grid' });
    const button = card.locator('button');

    const btnText = await button.textContent();
    expect(btnText).toEqual('Sign in');

    await expect(button).toHaveText('Sign in');    

    //await expect.soft(button).toHaveText('Sign in mistake'); //soft assertion, test will not fail, but will show a warning
    await button.click();
});

test('ajax waitFor state', async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajax');

    await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click();
     
    const successMessage = page.locator('.bg-success');
    
    await successMessage.waitFor({ state: 'attached' , timeout: 20000});

    await expect(successMessage).toHaveText('Data loaded with AJAX get request.');
});

test('ajax locator timeout', async ({page}) => {
    await page.goto(process.env.uiTestingPlaygroundURL);

    await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click();
     
    const successMessage = page.locator('.bg-success');

    await expect(successMessage).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 });
});

test('ajax waitForSelector', async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajax');

    await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click();
     
    const successMessage = page.locator('.bg-success');

    await page.waitForSelector('.bg-success', { timeout: 200000 });

    await expect(successMessage).toHaveText('Data loaded with AJAX get request.');
});

test('ajax waitForResponse', async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajax');

    await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click();
     
    const successMessage = page.locator('.bg-success');

    await page.waitForResponse('http://uitestingplayground.com/ajaxdata');

    await expect(successMessage).toHaveText('Data loaded with AJAX get request.');
});

test('timeouts', async ({page}) => {
    //test.setTimeout(30000); // Set a timeout of 30 seconds for this test
    //test.use({ actionTimeout: 5000, navigationTimeout: 5000 });

    //test.slow(); // Mark this test as slow : multiplies all timeouts by 3x

    await page.goto('http://uitestingplayground.com/ajax');

    await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click();
     
    const successMessage = page.locator('.bg-success');

    await successMessage.click();
});
