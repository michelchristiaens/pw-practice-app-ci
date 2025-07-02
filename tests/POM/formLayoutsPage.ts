import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase{
    
    constructor(page: Page){
        super(page);    
    };
    
    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: "Using the Grid"});
        const credentialEmail = usingTheGridForm.getByRole('textbox', {name: 'Email'});
        const credentialPassword = usingTheGridForm.getByRole('textbox', {name: 'Password'});        
 
        await credentialEmail.fill(email);
        await credentialPassword.fill(password);
        
        const radioButton1 = usingTheGridForm.getByRole('radio', {name: optionText});
        await radioButton1.check({force: true});

        await usingTheGridForm.getByRole('button').click();     
    }

    /**
     * This method fills out the Inline Form with user details
     * @param name should be the first and last name
     * @param email valid email for the test user
     * @param rememberMe true or false if user session to be persisted
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: "Inline form"});
        const credentialName = inlineForm.getByRole('textbox', {name: 'Jane Doe'});
        const credentialEmail = inlineForm.getByRole('textbox', {name: 'Email'});        
 
        await credentialName.fill(name);
        await credentialEmail.fill(email);
                
        const rememberMeCheckBox = inlineForm.getByRole('checkbox', {name: 'Remember me'});
        if(rememberMe)
            await rememberMeCheckBox.check({force: true});
        else
            await rememberMeCheckBox.uncheck({force: true});

        await inlineForm.getByRole('button').click();     

    }
}