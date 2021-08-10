using Alura.LeilaoOnline.Selenium.Tests.Helpers;
using Alura.LeilaoOnline.Selenium.Tests.PageObjects;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;

namespace Alura.LeilaoOnline.Selenium.Tests.Fixtures
{
    public class TestFixture : IDisposable
    {
        public IWebDriver Driver { get; private set; }
        public RegistroPo RegistroPo { get; private set; }
        public LoginPo LoginPo { get; private set; }

        //Setup
        public TestFixture()
        {
            Driver = CreateWebDriver();
            Driver.Manage().Window.Maximize();
            RegistroPo = new RegistroPo(Driver);
            LoginPo = new LoginPo(Driver);
        }

        private static IWebDriver CreateWebDriver(bool headless = true)
        {
            var chromeOptions = new ChromeOptions();
            if (headless)
            {
                chromeOptions.AddArgument("--headless");
            }

            return new ChromeDriver(TestHelper.PastaDoExecutavel, chromeOptions);
        }

        //TearDown
        public void Dispose()
        {
            Driver.Quit();
            Driver.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}