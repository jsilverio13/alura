using Alura.LeilaoOnline.Selenium.Tests.Config.Fixtures;
using Alura.LeilaoOnline.Selenium.Tests.PageObjects;
using OpenQA.Selenium;
using Xunit;

namespace Alura.LeilaoOnline.Selenium.Tests.Testes
{
    [Collection("Chrome Driver")]
    public class AoEfetuarLogout
    {
        private readonly IWebDriver _driver;
        private readonly DashboardInteressadaPo _dashboardInteressadaPo;
        private readonly LoginPo _loginPo;

        public AoEfetuarLogout(TestFixture fixture)
        {
            _driver = fixture.Driver;
            _dashboardInteressadaPo = fixture.DashboardInteressadaPo;
            _loginPo = fixture.LoginPo;
        }

        [Fact]
        public void DadoLoginValidoDeveIrParaHomeNaoLogada()
        {
            //arrange
            _loginPo.EfetuarLoginComCredenciais("fulano@example.org", "123");

            //act - efetuar logout
            _dashboardInteressadaPo.Menu.EfetuarLogout();

            //assert
            Assert.Contains("Próximos Leilões", _driver.PageSource);
        }
    }
}