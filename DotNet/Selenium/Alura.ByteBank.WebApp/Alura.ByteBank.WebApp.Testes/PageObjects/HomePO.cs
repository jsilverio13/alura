using OpenQA.Selenium;

namespace Alura.ByteBank.WebApp.Testes.PageObjects
{
    public class HomePo
    {
        private readonly IWebDriver _driver;
        private readonly By _linkHome;
        private readonly By _linkContaCorrentes;
        private readonly By _linkClientes;
        private readonly By _linkAgencias;

        public HomePo(IWebDriver driver)
        {
            _driver = driver;
            _linkHome = By.Id("home");
            _linkContaCorrentes = By.Id("contacorrente");
            _linkClientes = By.Id("clientes");
            _linkAgencias = By.Id("agencia");
        }

        public void Navegar(string url)
        {
            _driver.Navigate().GoToUrl(url);
        }

        public void LinkHomeClick()
        {
            _driver.FindElement(_linkHome).Click();
        }

        public void LinkContaCorrenteClick()
        {
            _driver.FindElement(_linkContaCorrentes).Click();
        }

        public void LinkClientesClick()
        {
            _driver.FindElement(_linkClientes).Click();
        }

        public void LinkAgenciaslick()
        {
            _driver.FindElement(_linkAgencias).Click();
        }
    }
}