import { browser, by, element } from 'protractor';
export class HomePage {

  static PAGE_TITLE = 'Timeline';

  async navigateTo() {
    return await browser.get(`${browser.baseUrl}#/user/flavio`);
  }

  getWindowTitle() {
    return browser.getTitle();
  }

  getPhotoListSize() {
    return element.all(by.css('.photo')).count();
  }

  fillSearchInputWindow(text) {
    return element(by.css('ap-search input[type=search]')).sendKeys(text);
  }

  clickOnFirstItemFromPhotoList() {
    return element.all(by.css('.photo')).first().click();
  }
}
