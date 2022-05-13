import { browser, logging } from 'protractor';
import { PhotoDetailPage } from '../photo-detail/photo-detail.po';
import { HomePage } from './home.po';

let homePage: HomePage;
let photoDetailPage: PhotoDetailPage;

describe('Home Page', () => {

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
    photoDetailPage = new PhotoDetailPage();
    await homePage.navigateTo();
  });

  it('Should navigate to user profile', async () => {
    const title = await homePage.getWindowTitle();

    expect(title).toEqual(HomePage.PAGE_TITLE);
  });

  it('Should display a list of phothos', async () => {
    const photoListSize = await homePage.getPhotoListSize();

    expect(photoListSize).toBeGreaterThan(0);
  });

  it('Should navite to photo detail when photo navigation is triggered', async () => {
    await homePage.clickOnFirstItemFromPhotoList();

    const title = await photoDetailPage.getWindowTitle();

    expect(title).toBe(PhotoDetailPage.PAGE_TITLE);
  });

  it('Should list one item when filtering by word "farol" ', async () => {
    await homePage.fillSearchInputWindow('farol');

    const photoListSize = await homePage.getPhotoListSize();

    expect(photoListSize).toBe(1);
  });
});
