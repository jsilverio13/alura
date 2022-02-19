using Alura.ByteBank.WebApp.Testes.Util;
using OpenQA.Selenium;
using Xunit;

namespace Alura.ByteBank.WebApp.Testes
{
    public class NavegandoNaPaginaHome : IClassFixture<Fixture>
    {
        private readonly IWebDriver _driver;

        //Setup
        public NavegandoNaPaginaHome(Fixture fixture)
        {
            _driver = fixture.Driver;
        }

        [Fact]
        public void CarregaPaginaHomeEVerificaTituloDaPagina()
        {
            //Arrange

            //Act
            _driver.Navigate().GoToUrl("https://localhost:44309");
            //Assert
            Assert.Contains("WebApp", _driver.Title);
        }

        [Fact]
        public void CarregadaPaginaHomeVerificaExistenciaLinkLoginEHome()
        {
            //Arrange
            ;
            //Act
            _driver.Navigate().GoToUrl("https://localhost:44309");
            //Assert
            Assert.Contains("Login", _driver.PageSource);
            Assert.Contains("Home", _driver.PageSource);
        }
    }
}