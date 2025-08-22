import {expect} from '@playwright/test';
import {test} from '../test-options';
import { argosScreenshot } from "@argos-ci/playwright";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200');
});

test.describe('Form Layouts page', () => {
    //test.describe.configure({retries: 2})    

    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click();
        await page.getByText('Form layouts').click();
    });

     test('test with argos.ci @regression', async ({page}, testInfo) => {       
        if(testInfo.retry > 0){
            console.log('cleanup db on retry')
        }
        
        await argosScreenshot(page, "before input");

        const emailTextbox = page.locator('nb-card', { hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'});
        
        await emailTextbox.fill('mc@hotmail.com');

        await argosScreenshot(page, "after mc@hotmail.com input");

        await emailTextbox.clear();
        await emailTextbox.pressSequentially('aha@hotmail.com', {delay: 100 /* milliseconds */});        

        await argosScreenshot(page, "after aha@hotmail.com input");

        expect(await emailTextbox.inputValue()).toEqual('aha@hotmail.com')
    });

    test('input fields', async ({page}, testInfo) => {       
        if(testInfo.retry > 0){
            console.log('cleanup db on retry')
        }
        
        const emailTextbox = page.locator('nb-card', { hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'});
        
        await emailTextbox.fill('mc@hotmail.com');
        await emailTextbox.clear();
        await emailTextbox.pressSequentially('aha@hotmail.com', {delay: 100 /* milliseconds */});        

        expect(await emailTextbox.inputValue()).toEqual('aha@hotmail.com')
    });

    test('radio buttons', async ({page}) => {
        const card = page.locator('nb-card', { hasText: "Using the Grid"});
        
        const radioButton1 = card.getByRole('radio', {name: 'Option 1'});
        const radioButton2 = card.getByLabel('Option 2');
        
        await radioButton1.check({ force: true });
        const radio1Status = radioButton1.isChecked();
        expect(radio1Status).toBeTruthy();

        await radioButton2.check({ force: true });
        await expect(radioButton1).not.toBeChecked();
        await expect(radioButton2).toBeChecked();
    });

    test('radio buttons VISUAL assertion', async ({page}) => {
        const card = page.locator('nb-card', { hasText: "Using the Grid"});
        
        const radioButton1 = card.getByRole('radio', {name: 'Option 1'});
        const radioButton2 = card.getByLabel('Option 2');
        
        await radioButton1.check({ force: true });
        
        //await expect(card).toHaveScreenshot();

        const radio1Status = radioButton1.isChecked();
        expect(radio1Status).toBeTruthy();

        await radioButton2.check({ force: true });
        await expect(radioButton1).not.toBeChecked();
        await expect(radioButton2).toBeChecked();
    });

    
    test('checkboxes', async ({page}) => {
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Toastr').click();

        await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({force: true });
        await page.locator('label').filter({ hasText: 'Show toast with icon' }).click();

        const allCheckboxes = page.getByRole('checkbox');

        for(const box of await allCheckboxes.all()) {
            await box.check({force: true});
            await expect(box).toBeChecked();
        };

        //  (await allCheckboxes.all()).forEach(async (box) => {
        //      await box.check({ force: true });
        //  });
    });

    test('comboxbox', async ({page}) => {
        //by text
        await page.getByRole('button', { name: 'Light' }).click();
        await page.getByText('Dark').click();

        expect(await page.locator('body').getAttribute('class')).toContain('nb-theme-dark');

        //by function
        const dropDownButton = page.locator('ngx-header nb-select');
        await dropDownButton.click();

        //page.getByRole('list'); //for UL
        //page.getByRole('listitem'); //for LI

        //const dropDownList = page.getByRole('list').locator('nb-option');
        const dropDownList = page.locator('nb-option-list nb-option');

        await expect(dropDownList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']);

        const cosmic = dropDownList.filter({ hasText: 'Cosmic' });
        await cosmic.click();

        const bodyClass = await page.locator('body').getAttribute('class');
        expect(bodyClass).toContain('nb-theme-cosmic');

        await expect(page.locator('nb-layout-header')).toHaveCSS('background-color', 'rgb(50, 50, 89)'); 
    });

    test('tooltip', async ({page}) => {
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Tooltip').click();

        const card = page.locator('nb-card', { hasText: 'Tooltip Placements' });
        await card.getByRole('button', { name: 'Top' }).hover();

        const tooltip = await page.locator('nb-tooltip').textContent();
        expect(tooltip).toEqual('This is a tooltip');
    });

    test('browser dialog @regression', async ({page}) => {
        await page.getByText('Tables & Data').click();
        await page.getByText('Smart Table').click();

        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?');
            dialog.accept();
        });

        await page.locator('table').locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click();         

        await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com');
    });

    test('tables', async ({page}) => {
        await page.getByText('Tables & Data').click();
        await page.getByText('Smart Table').click();

        const table = page.locator('table');
        const row = table.locator('tr', { hasText: 'twitter@outlook.com'});

        const editRow = row.locator('.nb-edit');
        await editRow.click();

        const ageEdit = page.locator('input-editor').getByPlaceholder('Age');
        await ageEdit.fill('66');     
        
        await page.locator('.nb-checkmark').click();
    });

    test('nav and select by id', async ({page}) => {
        await page.getByText('Tables & Data').click();
        await page.getByText('Smart Table').click();

        //await page.locator('.ng2-smart-pagination-nav li').filter({ hasText: '2' }).click();
        await page.locator('.ng2-smart-pagination-nav').getByText('2').click();

        const targetRow = page.getByRole('row').filter({ has: page.locator('td').nth(1).getByText('11')});

         const editRow = targetRow.locator('.nb-edit');
        await editRow.click();

        const emailEdit = page.locator('input-editor').getByPlaceholder('E-mail');
        await emailEdit.fill('something@else.com');
        
        await page.locator('.nb-checkmark').click();

        await expect(targetRow.locator('td').nth(5)).toHaveText('something@else.com');
    });

    test('search and validate', async ({page}) => {
        await page.getByRole('link', { name: 'Tables & Data' }).click();
        await page.getByRole('link', { name: 'Smart Table' }).click();
        
        await page.getByRole('textbox', { name: 'Age' }).click();
        await page.getByRole('textbox', { name: 'Age' }).fill('20');

        const ages = ["20", "30", "40", "200"];

        for (let age of ages) {
            await page.getByRole('textbox', { name: 'Age' }).fill(age); 
           
            await page.waitForTimeout(500); //wait for the table to update

            const rows = page.locator('tbody tr');
            
            for (let row of await rows.all()) {
                const cellValue = await row.locator('td').last().textContent();
                if (age == "200")
                {
                    expect(await page.getByRole('table').textContent()).toContain('No data found');
                }
                else{
                    expect(cellValue).toEqual(age);
                }
            }
        }
    });

    test.skip('datepicker', async ({page}) => {
        
        await page.getByRole('link', { name: 'Forms' }).click();
        await page.getByRole('link', { name: 'Datepicker' }).click();

        //const picker = page.locator('nb-card', {hasText: "Common Datepicker"}).locator('input');
        const picker = page.getByPlaceholder('Form Picker');
        await picker.click();

        const dayTwo = page.locator('.day-cell.ng-star-inserted').getByText('2', {exact:true}).first();
        await dayTwo.click();

        await expect(picker).toHaveValue('Jul 2, 2025')
    });

    test('datepicker tomorrow', async ({page}) => {
        await page.getByRole('link', { name: 'Forms' }).click();
        await page.getByRole('link', { name: 'Datepicker' }).click();

        const calendarInputField = page.getByPlaceholder('Form Picker');
        await calendarInputField.click();

        let date = new Date();
        date.setDate(date.getDate() + 100); //Tomorrow

        const futureDay = date.getDate().toString();
        const futureMonthShort = date.toLocaleString('en-us', { month:"short" }); 
        const futureMonthLong = date.toLocaleString('en-us', { month:"long" });         
        const futureYear = date.getFullYear();
        const futureDate = `${futureMonthShort} ${futureDay}, ${futureYear}`;

        let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
        const expectedMonthAndYear = ` ${futureMonthLong} ${futureYear}`
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
        }

        const dayToSelect = page.locator('[class="day-cell ng-star-inserted"]').getByText(futureDay, {exact:true});
        await dayToSelect.click();
        
        await expect(calendarInputField).toHaveValue(futureDate);
    });

    test('temp slider', async ({page}) => {
        //explicit value
        await page.getByTitle('IoT Dashboard').click();
        const gauge = page.locator('nb-tab[tabtitle="Temperature"] ngx-temperature-dragger circle');
        await gauge.evaluate(node => {
            node.setAttribute('cx', '12.619540427904372');       
            node.setAttribute('cy', '170.58134266512363'); 
        });        
        await gauge.click();

        //move mouse
        const gaugeBox = page.locator('nb-tab[tabtitle="Temperature"] ngx-temperature-dragger');
        await gaugeBox.scrollIntoViewIfNeeded();        

        const box = await gaugeBox.boundingBox();
        const x = box.x + box.width /2;
        const y = box.y + box.height / 2;
        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.move(x + 100, y);
        await page.mouse.move(x+100, y+100);
        await page.mouse.up();

        await expect(gaugeBox).toContainText('30');
    })
});

test.describe('dragdrop with iframes', () => {
    test.beforeEach(async ({page, globalsQaURL}) => {
        await page.goto(globalsQaURL);
    });

    test('iframe', async ({page}) => {
        await page.getByRole('button', {name:"Consent"}).click();

        const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
        await frame.locator('li', {hasText: "High Tatras 2"}).dragTo(frame.locator('#trash'));

        await frame.locator('li', {hasText: "High Tatras 4"}).hover();
        await page.mouse.down();
        await frame.locator('#trash').hover();
        await page.mouse.up();

        await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2","High Tatras 4"]);
       
    });
});
