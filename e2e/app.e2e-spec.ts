import { TMBLPage } from './app.po';

describe('tmbl App', () => {
  let page: TMBLPage;

  beforeEach(() => {
    page = new TMBLPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
