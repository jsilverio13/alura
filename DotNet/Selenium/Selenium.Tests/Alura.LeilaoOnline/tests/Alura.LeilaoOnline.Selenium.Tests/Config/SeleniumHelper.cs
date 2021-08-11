using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;

namespace Alura.LeilaoOnline.Selenium.Tests.Config
{
    public class SeleniumHelper : IDisposable
    {
        public IWebDriver WebDriver;
        public WebDriverWait Wait;

        public SeleniumHelper(Browser browser, bool headless = true)
        {
            WebDriver = WebDriverFactory.CreateWebDriver(browser, "C:\\WebDriver\\", headless);
            WebDriver.Manage().Window.Maximize();
            Wait = new WebDriverWait(WebDriver, TimeSpan.FromSeconds(30));
        }

        public void Dispose()
        {
            WebDriver.Quit();
            WebDriver.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}