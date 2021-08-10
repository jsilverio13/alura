using Alura.LeilaoOnline.Selenium.Tests.Fixtures;
using Alura.LeilaoOnline.Selenium.Tests.PageObjects;
using OpenQA.Selenium;
using Xunit;

namespace Alura.LeilaoOnline.Selenium.Tests
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

            _loginPo.Visitar();
            _loginPo.PreencherFormulario("jeff@gmail.com", "741963");
            // Act

            _loginPo.SubmeterFormulario();

            // Assert

            Assert.Contains("Dashboard", _driver.Title);
        }

        [Fact]
        public void DadoCredenciaisInvalidasDeveContinuarLogin()
        {
            // Arrange

            _loginPo.Visitar();
            _loginPo.PreencherFormulario("jeff@gmail.com", "");
            // Act

            _loginPo.SubmeterFormulario();

            // Assert

            Assert.Contains("Login", _driver.PageSource);
        }
    }
}