using OpenQA.Selenium;

namespace Alura.ByteBank.WebApp.Testes.PageObjects
{
    public class LoginPo
    {
        private readonly IWebDriver _driver;
        private readonly By _campoEmail;
        private readonly By _campoSenha;
        private readonly By _btnLogar;

        public LoginPo(IWebDriver driver)
        {
            _driver = driver;
            _campoEmail = By.Id("Email");
            _campoSenha = By.Id("Senha");
            _btnLogar = By.Id("btn-logar");
        }

        public void Navegar(string url)
        {
            _driver.Navigate().GoToUrl(url);
        }

        public void PreencherCampos(string email, string senha)
        {
            _driver.FindElement(_campoSenha).SendKeys(senha);
            _driver.FindElement(_campoEmail).SendKeys(email);
        }

        public void Logar()
        {
            _driver.FindElement(_btnLogar).Click();
        }
    }
}