import { browser, logging } from "protractor";
import { SignInPage } from "../signin/signin.po";
import { SignUpPage } from "./signup.po";
import { HomePage } from "../home/home.po";

describe('Sign Up', () => {
  let signUpPage: SignUpPage;
  let signInPage: SignInPage;
  let homePage: HomePage;

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain
    (
      jasmine.objectContaining
      (
        {
          level: logging.Level.SEVERE
        } as logging.Entry
      )
    );
  })
  beforeEach(async () => {
    signUpPage = new SignUpPage();
    signInPage = new SignInPage();
    homePage = new HomePage();
    await signUpPage.navigateTo();
  });

  it('Should be on signup page', async () => {
    const title = await signUpPage.getWindowTitle();

    expect(title).toEqual(SignUpPage.PAGE_TILE);
  })

  it('Should Register a user', async ()=>{
    const randomPrefix = Math.round(Math.random() * 100000)
    await signUpPage.fillField('email', `email${randomPrefix}@email.com`);
    await signUpPage.fillField('fullName', `some name ${randomPrefix}`);
    const userName = `user${randomPrefix}`;
    await signUpPage.fillField('userName', userName);
    const password = '1234567890';
    await signUpPage.fillField('password', password);
    await signUpPage.register();
    let title = await signInPage.getWindowTitle();
    expect(title).toEqual(SignInPage.PAGE_TITLE);

    await signInPage.fillUserNameField(userName);
    await signInPage.fillPasswordField(password);
    await signInPage.login();

    title = await homePage.getWindowTitle();

    expect(title).toEqual(HomePage.PAGE_TITLE);


  })

})
