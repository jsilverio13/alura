using Alura.LeilaoOnline.Selenium.Tests.PageObjects;
using OpenQA.Selenium;
using System;

namespace Alura.LeilaoOnline.Selenium.Tests.Config.Fixtures
{
    public class TestFixture : IDisposable
    {
        public IWebDriver Driver { get; private set; }
        public SeleniumHelper Helper { get; }
        public RegistroPo RegistroPo { get; private set; }
        public LoginPo LoginPo { get; private set; }
        public DashboardInteressadaPo DashboardInteressadaPo { get; private set; }
        public NovoLeilaoPo NovoLeilaoPo { get; private set; }
        public DetalheLeilaoPo DetalheLeilaoPo { get; private set; }

        //Setup
        public TestFixture()
        {
            Helper = new SeleniumHelper(Browser.Chrome, false);
            Driver = Helper.WebDriver;
            Driver.Manage().Window.Maximize();
            RegistroPo = new RegistroPo(Driver);
            LoginPo = new LoginPo(Driver);
            DashboardInteressadaPo = new DashboardInteressadaPo(Driver);
            NovoLeilaoPo = new NovoLeilaoPo(Driver);
            DetalheLeilaoPo = new DetalheLeilaoPo(Driver);
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