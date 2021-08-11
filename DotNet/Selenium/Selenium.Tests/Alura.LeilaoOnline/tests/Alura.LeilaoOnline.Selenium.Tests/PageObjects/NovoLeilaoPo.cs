using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Alura.LeilaoOnline.Selenium.Tests.PageObjects
{
    public class NovoLeilaoPo

    {
        private readonly IWebDriver _driver;
        private readonly By _byInputTitulo;
        private readonly By _byInputDescricao;
        private readonly By _byInputCatetegoria;
        private readonly By _byInputValorInicial;
        private readonly By _byInputImagem;
        private readonly By _byInputInicioPregao;
        private readonly By _byInputTerminoPregao;
        private readonly By _byBotaoSalvar;

        public IEnumerable<string> Categorias
        {
            get
            {
                var elementoCategoria = new SelectElement(_driver.FindElement(_byInputCatetegoria));
                return elementoCategoria.Options.Where(o => o.Enabled).Select(o => o.Text);
            }
        }

        public NovoLeilaoPo(IWebDriver driver)
        {
            _driver = driver;
            _byInputTitulo = By.Id("Titulo");
            _byInputDescricao = By.Id("Descricao");
            _byInputCatetegoria = By.Id("Categoria");
            _byInputValorInicial = By.Id("ValorInicial");
            _byInputImagem = By.Id("ArquivoImagem");
            _byInputInicioPregao = By.Id("InicioPregao");
            _byInputTerminoPregao = By.Id("TerminoPregao");
            _byBotaoSalvar = By.CssSelector("button[type=submit]");
        }

        public void Visitar()
        {
            _driver.Navigate().GoToUrl("http://localhost:5000/Leiloes/Novo");
        }

        public void PreencherFormulario(string titulo, string descricao, string categoria, double valor, string imagem, DateTime inicio, DateTime fim)
        {
            _driver.FindElement(_byInputTitulo).SendKeys(titulo);
            _driver.FindElement(_byInputDescricao).SendKeys(descricao);
            _driver.FindElement(_byInputCatetegoria).SendKeys(categoria);
            _driver.FindElement(_byInputValorInicial).SendKeys(valor.ToString(CultureInfo.CurrentCulture));
            _driver.FindElement(_byInputImagem).SendKeys(imagem);
            _driver.FindElement(_byInputInicioPregao).SendKeys(inicio.ToShortDateString());
            _driver.FindElement(_byInputTerminoPregao).SendKeys(fim.ToShortDateString());
        }

        public void SubmeterFormulario()
        {
            _driver.FindElement(_byBotaoSalvar).Click();
        }
    }
}