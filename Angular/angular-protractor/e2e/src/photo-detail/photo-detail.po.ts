import { browser, by, element } from 'protractor';

export class PhotoDetailPage {
  static PAGE_TITLE = 'Photo detail';

  async navigateTo(id: Number){
    return await browser.get(`${browser.baseUrl}#/p/${id}`);
  }
  getWindowTitle() {
    return browser.getTitle();
  }

  fillComment(text: string){
    return element(by.css('textarea.form-control')).sendKeys(text);
  }

  publishComment(){
    return element(by.css('button[type=submit]')).click();
  }

  getCommentListSize(){
    return element.all(by.css('ap-photo-comments li')).count()
  }
}
