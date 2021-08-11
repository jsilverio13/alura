using Alura.LeilaoOnline.Selenium.Tests.Config.Fixtures;
using Alura.LeilaoOnline.Selenium.Tests.PageObjects;
using OpenQA.Selenium;
using System.Linq;
using Xunit;

namespace Alura.LeilaoOnline.Selenium.Tests.Testes
{
    [Collection("Chrome Driver")]
    public class AoNavegarParaFormNovoLeilao
    {
        private readonly IWebDriver _driver;
        private readonly LoginPo _loginPo;
        private readonly NovoLeilaoPo _novoLeilaoPo;

        //Setup
        public AoNavegarParaFormNovoLeilao(TestFixture fixture)
        {
            _driver = fixture.Driver;
            _loginPo = fixture.LoginPo;
            _novoLeilaoPo = fixture.NovoLeilaoPo;
        }

        [Fact]
        public void DadoLoginAdmDeveMostrarTresCategorias()
        {
            //arrange
            //arrange
            _loginPo.EfetuarLoginComCredenciais("admin@example.org", "123");

            //act
            _novoLeilaoPo.Visitar();

            //assert
            Assert.Equal(3, _novoLeilaoPo.Categorias.Count());
        }
    }
}