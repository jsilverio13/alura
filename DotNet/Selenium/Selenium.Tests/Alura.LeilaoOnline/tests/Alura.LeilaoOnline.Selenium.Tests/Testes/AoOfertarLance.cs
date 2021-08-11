using Alura.LeilaoOnline.Selenium.Tests.Config.Fixtures;
using Alura.LeilaoOnline.Selenium.Tests.PageObjects;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using Xunit;

namespace Alura.LeilaoOnline.Selenium.Tests.Testes
{
    [Collection("Chrome Driver")]
    public class AoOfertarLance
    {
        private readonly IWebDriver _driver;
        private readonly DetalheLeilaoPo _detalheLeilaoPo;
        private readonly LoginPo _loginPo;

        public AoOfertarLance(TestFixture fixture)
        {
            _driver = fixture.Driver;
            _detalheLeilaoPo = fixture.DetalheLeilaoPo;
            _loginPo = fixture.LoginPo;
        }

        [Fact]
        public void DadoLoginInteressadaDeveAtualizarLanceAtual()
        {
            //arrange
            _loginPo.EfetuarLoginComCredenciais("fulano@example.org", "123");

            _detalheLeilaoPo.Visitar(1);

            //act
            _detalheLeilaoPo.OfertarLance(300);

            //assert
            var wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(8));

            Assert.True(wait.Until(drv => _detalheLeilaoPo.LanceAtual.Equals(300D)));
        }
    }
}