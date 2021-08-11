using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Edge;
using OpenQA.Selenium.Firefox;

namespace Alura.LeilaoOnline.Selenium.Tests.Config
{
    public static class WebDriverFactory
    {
        public static IWebDriver CreateWebDriver(Browser browser, string caminhoDriver, bool headless)
        {
            IWebDriver webDriver = null;

            switch (browser)
            {
                case Browser.Firefox:
                    {
                        var optionsFireFox = new FirefoxOptions();
                        if (headless)
                            optionsFireFox.AddArgument("--headless");

                        webDriver = new FirefoxDriver(caminhoDriver, optionsFireFox);

                        break;
                    }
                case Browser.Chrome:
                    {
                        var options = new ChromeOptions();
                        if (headless)
                            options.AddArgument("--headless");

                        webDriver = new ChromeDriver(caminhoDriver, options);

                        break;
                    }
                case Browser.Edge:
                    {
                        var options = new EdgeOptions();

                        webDriver = new EdgeDriver(caminhoDriver, options);

                        break;
                    }

                default:
                    throw new System.Exception("Unexpected Case");
            }

            return webDriver;
        }
    }
}