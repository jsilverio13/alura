using Alura.LeilaoOnline.Selenium.Tests.Config.Fixtures;
using Alura.LeilaoOnline.Selenium.Tests.PageObjects;
using OpenQA.Selenium;
using System;
using Xunit;

namespace Alura.LeilaoOnline.Selenium.Tests.Testes
{
    [Collection("Chrome Driver")]
    public class AoCriarLeilao
    {
        private readonly IWebDriver _driver;
        private readonly LoginPo _loginPo;
        private readonly NovoLeilaoPo _novoLeilaoPo;

        public AoCriarLeilao(TestFixture fixture)
        {
            _driver = fixture.Driver;
            _loginPo = fixture.LoginPo;
            _novoLeilaoPo = fixture.NovoLeilaoPo;
        }

        [Fact]
        public void DadoLoginValidoDeveIrParaHomeNaoLogada()
        {
            //arrange
            _loginPo.EfetuarLoginComCredenciais("admin@example.org", "123");

            _novoLeilaoPo.Visitar();
            _novoLeilaoPo.PreencherFormulario("Leilão de coleção 1", "Teste", "Item de Colecionador", 4000,
                @"c:\users\jsilverio\pictures\1.jpg", DateTime.Today,
                DateTime.Today.AddDays(60));

            //act
            _novoLeilaoPo.SubmeterFormulario();

            //assert
            Assert.Contains("Leilões cadastrados no sistema", _driver.PageSource);
        }
    }
}