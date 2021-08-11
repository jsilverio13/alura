using Alura.LeilaoOnline.Selenium.Tests.Config.Fixtures;
using Alura.LeilaoOnline.Selenium.Tests.PageObjects;
using OpenQA.Selenium;
using Xunit;

namespace Alura.LeilaoOnline.Selenium.Tests.Testes
{
    [Collection("Chrome Driver")]
    public class AoEfetuarLogin
    {
        private readonly IWebDriver _driver;
        private readonly LoginPo _loginPo;

        public AoEfetuarLogin(TestFixture fixture)
        {
            _driver = fixture.Driver;
            _loginPo = fixture.LoginPo;
        }

        [Fact]
        public void DadoCredenciaisValidasDeveIrParaDashboard()
        {
            // Arrange
            // Act

            _loginPo
                .Visitar()
                .InformarEmail("jeff@gmail.com")
                .InformarSenha("741963")
                .SubmeteFormulario();

            // Assert

            Assert.Contains("Dashboard", _driver.Title);
        }

        [Fact]
        public void DadoCredenciaisInvalidasDeveContinuarLogin()
        {
            // Arrange
            // Act
            _loginPo
                .Visitar()
                .InformarEmail("jeff@gmail.com")
                .InformarSenha("")
                .SubmeteFormulario();

            // Assert

            Assert.Contains("Login", _driver.PageSource);
        }
    }
}