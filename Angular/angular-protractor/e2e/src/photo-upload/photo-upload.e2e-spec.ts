import { PhotoUploadPage } from './photo-upload.po';
import { browser, logging } from 'protractor';
import { HomePage } from '../home/home.po';

let homePage: HomePage;
let photoUploadPage: PhotoUploadPage;

describe('Photo Upload', () => {

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
    homePage = new HomePage();
    photoUploadPage = new PhotoUploadPage();
    await photoUploadPage.navigateTo();
  });

  it('Should navigate to photo upload page', async () => {
    const title = await photoUploadPage.getWindowTitle();

    expect(title).toEqual(PhotoUploadPage.PAGE_TITLE);
  });

  it('Should upload photo with comment', async () => {
    await photoUploadPage.selectImage();
    await photoUploadPage.fillDescription('Some description');
    await photoUploadPage.upload();

    const title = await homePage.getWindowTitle();

    expect(title).toBe(HomePage.PAGE_TITLE);
  });


});
