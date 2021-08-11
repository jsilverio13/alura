using Alura.LeilaoOnline.Selenium.Tests.Config.Fixtures;
using Alura.LeilaoOnline.Selenium.Tests.PageObjects;
using OpenQA.Selenium;
using Xunit;

namespace Alura.LeilaoOnline.Selenium.Tests.Testes
{
    [Collection("Chrome Driver")]
    public class AoNavegarParaHome
    {
        private readonly IWebDriver _driver;
        private readonly RegistroPo _registroPo;

        //Setup
        public AoNavegarParaHome(TestFixture fixture)
        {
            _driver = fixture.Driver;
            _registroPo = fixture.RegistroPo;
        }

        [Fact]
        public void DadoChromeAbertoDeveMostrarLeiloesNoTitulo()
        {
            //arrange

            //act
            _registroPo.Visitar();

            //assert
            Assert.Contains("Leilões", _driver.Title);
        }

        [Fact]
        public void DadoChromeAbertoDeveMostrarProximosLeiloesNaPagina()
        {
            //arrange

            //act
            _registroPo.Visitar();

            //assert
            Assert.Contains("Próximos Leilões", _driver.PageSource);
        }
    }
}