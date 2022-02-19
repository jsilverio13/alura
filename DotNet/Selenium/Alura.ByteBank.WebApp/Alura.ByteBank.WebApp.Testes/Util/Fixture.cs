using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;

namespace Alura.ByteBank.WebApp.Testes.Util
{
    public class Fixture : IDisposable
    {
        public IWebDriver Driver { get; }

        public Fixture()
        {
            var chromeOptions = new ChromeOptions();
            chromeOptions.AddArgument("--headless");

            Driver = new ChromeDriver(Helper.CaminhoDriverNavegador(), chromeOptions);
            Driver.Manage().Window.Maximize();
        }

        public void Dispose()
        {
            Driver.Quit();
            Driver.Dispose();

            GC.SuppressFinalize(this);
        }
    }
}