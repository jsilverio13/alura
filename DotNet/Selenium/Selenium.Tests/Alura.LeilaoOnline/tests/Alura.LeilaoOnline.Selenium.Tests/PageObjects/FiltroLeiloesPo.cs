using Alura.LeilaoOnline.Selenium.Tests.Helpers;
using OpenQA.Selenium;
using System.Collections.Generic;

namespace Alura.LeilaoOnline.Selenium.Tests.PageObjects
{
    public class FiltroLeiloesPO
    {
        private readonly IWebDriver _driver;
        private readonly By _bySelectCategorias;
        private readonly By _byInputTermo;
        private readonly By _byInputAndamento;
        private readonly By _byBotaoPesquisar;

        public FiltroLeiloesPO(IWebDriver driver)
        {
            _driver = driver;
            _bySelectCategorias = By.ClassName("select-wrapper");
            _byInputTermo = By.Id("termo");
            _byInputAndamento = By.ClassName("switch");
            _byBotaoPesquisar = By.CssSelector("form>button.btn");
        }

        public void PesquisarLeiloes(List<string> categorias, string termo, bool emAndamento)
        {
            var select = new SelectMaterialize(_driver, _bySelectCategorias);

            select.DeselectAll();

            foreach (var categoria in categorias)
            {
                select.SelectByText(categoria);
            }

            _driver.FindElement(_byInputTermo).SendKeys(termo);

            if (emAndamento)
            {
                _driver.FindElement(_byInputAndamento).Click();
            }

            _driver.FindElement(_byBotaoPesquisar).Click();
        }
    }
}