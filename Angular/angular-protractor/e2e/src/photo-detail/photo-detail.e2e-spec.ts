import { browser, logging } from 'protractor';
import { PhotoDetailPage } from './photo-detail.po';
describe('Photo Detail Page', () => {
  let photoDetailPage: PhotoDetailPage;

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  beforeEach(async () => {
    photoDetailPage = new PhotoDetailPage();
    await photoDetailPage.navigateTo(14);
  });

  it('Should be on photo Detail Page', async () => {
    const title = await photoDetailPage.getWindowTitle();
    expect(title).toEqual(PhotoDetailPage.PAGE_TITLE);
  });

  it('Should publish a comment', async () => {
    const initialCommentListSize = await photoDetailPage.getCommentListSize();

    await photoDetailPage.fillComment('Some Comment');
    await photoDetailPage.publishComment();

    const currentCommentListSise = await photoDetailPage.getCommentListSize();

    expect(currentCommentListSise).toBeGreaterThan(initialCommentListSize);
  });
});
