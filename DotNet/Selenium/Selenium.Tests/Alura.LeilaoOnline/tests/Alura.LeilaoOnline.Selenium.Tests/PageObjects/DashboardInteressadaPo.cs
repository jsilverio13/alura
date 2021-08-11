using OpenQA.Selenium;

namespace Alura.LeilaoOnline.Selenium.Tests.PageObjects
{
    public class DashboardInteressadaPo

    {
        private readonly IWebDriver _driver;

        public FiltroLeiloesPO Filtro { get; }
        public MenuLogadoPO Menu { get; }

        public DashboardInteressadaPo(IWebDriver driver)
        {
            _driver = driver;
            Filtro = new FiltroLeiloesPO(driver);
            Menu = new MenuLogadoPO(driver);
        }
    }
}