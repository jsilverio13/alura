using OpenQA.Selenium;

namespace Alura.LeilaoOnline.Selenium.Tests.PageObjects
{
    public class HomeNaoLogadaPo
    {
        private readonly IWebDriver _driver;
        public MenuNaoLogadoPo Menu { get; set; }

        public HomeNaoLogadaPo(IWebDriver driver)
        {
            _driver = driver;
            Menu = new MenuNaoLogadoPo(driver);
        }

        public void Visitar()
        {
            _driver.Navigate().GoToUrl("http://localhost:5000");
        }
    }
}