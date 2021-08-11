using OpenQA.Selenium;

namespace Alura.LeilaoOnline.Selenium.Tests.PageObjects
{
    public class MenuNaoLogadoPo
    {
        private readonly IWebDriver driver;
        private By byMenuMobile;
        public bool MenuMobileVisivel
        {
            get
            {
                var elemento = driver.FindElement(byMenuMobile);
                return elemento.Displayed;
            }
        }

        public MenuNaoLogadoPo(IWebDriver driver)
        {
            this.driver = driver;
            byMenuMobile = By.ClassName("sidenav-trigger");
        }
    }
}