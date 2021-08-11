using Alura.LeilaoOnline.Selenium.Tests.Helpers;
using Alura.LeilaoOnline.Selenium.Tests.PageObjects;
using OpenQA.Selenium.Chrome;
using System;
using Xunit;

namespace Alura.LeilaoOnline.Selenium.Tests.Testes
{
    public class AoNavegarParaHomeMobile : IDisposable
    {
        private ChromeDriver _driver;

        public AoNavegarParaHomeMobile()
        {
        }

        [Fact]
        public void DadaLargura992DeveMostrarMenuMobile()
        {
            //arange
            var deviceSettings = new ChromeMobileEmulationDeviceSettings
            {
                Width = 992,
                Height = 800,
                UserAgent = "Customizada"
            };
            var options = new ChromeOptions();
            options.EnableMobileEmulation(deviceSettings);
            _driver = new ChromeDriver(TestHelper.PastaDoExecutavel, options);
            var homePo = new HomeNaoLogadaPo(_driver);

            //act
            homePo.Visitar();

            //assert
            Assert.True(homePo.Menu.MenuMobileVisivel);
        }

        [Fact]
        public void DadaLargura993NaoDeveMostrarMenuMobile()
        {
            //arange
            var deviceSettings = new ChromeMobileEmulationDeviceSettings
            {
                Width = 993,
                Height = 800,
                UserAgent = "Customizada"
            };

            var options = new ChromeOptions();
            options.EnableMobileEmulation(deviceSettings);
            _driver = new ChromeDriver(TestHelper.PastaDoExecutavel, options);
            var homePo = new HomeNaoLogadaPo(_driver);

            //act
            homePo.Visitar();

            //assert
            Assert.False(homePo.Menu.MenuMobileVisivel);
        }

        public void Dispose()
        {
            _driver.Quit();
            _driver.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}