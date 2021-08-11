using Alura.LeilaoOnline.Selenium.Tests.Config.Fixtures;
using Alura.LeilaoOnline.Selenium.Tests.PageObjects;
using OpenQA.Selenium;
using System.Collections.Generic;
using Xunit;

namespace Alura.LeilaoOnline.Selenium.Tests.Testes
{
    [Collection("Chrome Driver")]
    public class AoFiltrarLeiloes
    {
        private readonly IWebDriver _driver;
        private readonly DashboardInteressadaPo _dashboardInteressadaPo;
        private readonly LoginPo _loginPo;

        public AoFiltrarLeiloes(TestFixture fixture)
        {
            _driver = fixture.Driver;
            _dashboardInteressadaPo = fixture.DashboardInteressadaPo;
            _loginPo = fixture.LoginPo;
        }

        [Fact]
        public void DadoLoginInteressadaDeveMostrarPainelDeResultado()
        {
            //arrange
            _loginPo.EfetuarLoginComCredenciais("fulano@example.org", "123");

            //act - efetuar logout
            var categorias = new List<string> { "Arte", "Coleções" };
            _dashboardInteressadaPo.Filtro.PesquisarLeiloes(categorias, "", true);

            //assert
            Assert.Contains("Resultado da pesquisa", _driver.PageSource);
        }
    }
}