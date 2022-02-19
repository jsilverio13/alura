using Alura.ByteBank.WebApp.Testes.PageObjects;
using Alura.ByteBank.WebApp.Testes.Util;
using OpenQA.Selenium;
using Xunit;
using Xunit.Abstractions;

namespace Alura.ByteBank.WebApp.Testes
{
    public class AposRealizarLogin : IClassFixture<Fixture>
    {
        private readonly IWebDriver _driver;
        public ITestOutputHelper SaidaConsoleTeste;

        public AposRealizarLogin(Fixture fixture, ITestOutputHelper saidaConsoleTeste)
        {
            _driver = fixture.Driver;
            SaidaConsoleTeste = saidaConsoleTeste;
        }

        [Fact]
        public void AposRealizarLoginVerificaSeExisteOpcaoAgenciaMenu()
        {
            //Arrange
            var loginPo = new LoginPo(_driver);
            loginPo.Navegar("https://localhost:44309/UsuarioApps/Login");

            //Act
            loginPo.PreencherCampos("jeff@email.com", "senha01");
            loginPo.Logar();

            //Assert
            Assert.Contains("Agência", _driver.PageSource);
        }

        [Fact]
        public void TentaRealizarLoginSemPreencherCampos()
        {
            //Arrange
            var loginPo = new LoginPo(_driver);
            loginPo.Navegar("https://localhost:44309/UsuarioApps/Login");

            //Act
            loginPo.PreencherCampos("", "");
            loginPo.Logar();

            //Assert
            Assert.Contains("The Email field is required.", _driver.PageSource);
            Assert.Contains("The Senha field is required.", _driver.PageSource);
        }

        [Fact]
        public void TentaRealizarLoginComSenhaInvalida()
        {
            //Arrange
            var loginPo = new LoginPo(_driver);
            loginPo.Navegar("https://localhost:44309/UsuarioApps/Login");

            //Act
            loginPo.PreencherCampos("jeff@email.com", "senha01x");
            loginPo.Logar();

            //Assert
            Assert.Contains("Login", _driver.PageSource);
        }

        [Fact]
        public void AposRealizarLoginAcessaMenuAgencia()
        {
            //Arrange
            var loginPo = new LoginPo(_driver);
            var homePo = new HomePo(_driver);
            loginPo.Navegar("https://localhost:44309/UsuarioApps/Login");

            //Act
            loginPo.PreencherCampos("jeff@email.com", "senha01");
            loginPo.Logar();
            homePo.LinkAgenciaslick();

            //Assert
            Assert.Contains("Adicionar Agência", _driver.PageSource);
        }

        [Fact]
        public void RealizarLoginAcessaListagemDeContas()
        {
            //Arrange
            var loginPo = new LoginPo(_driver);
            loginPo.Navegar("https://localhost:44309/UsuarioApps/Login");

            //Act
            loginPo.PreencherCampos("jeff@email.com", "senha01");
            loginPo.Logar();

            var homePo = new HomePo(_driver);
            homePo.LinkContaCorrenteClick();

            //Assert
            Assert.Contains("Adicionar Conta-Corrente", _driver.PageSource);
        }
    }
}