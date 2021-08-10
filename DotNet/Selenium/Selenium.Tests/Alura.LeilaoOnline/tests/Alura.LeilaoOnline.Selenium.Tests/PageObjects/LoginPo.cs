using OpenQA.Selenium;

namespace Alura.LeilaoOnline.Selenium.Tests.PageObjects
{
    public class LoginPo
    {
        private readonly IWebDriver _driver;
        private readonly By _byInputLogin;
        private readonly By _byInputSenha;
        private readonly By _byBotaoLogin;

        public LoginPo(IWebDriver driver)
        {
            _driver = driver;
            _byInputLogin = By.Id("Login");
            _byInputSenha = By.Id("Password");
            _byBotaoLogin = By.Id("btnLogin");
        }

        public void Visitar()
        {
            _driver.Navigate().GoToUrl("http://localhost:5000/Autenticacao/Login");
        }

        public void PreencherFormulario(string login, string senha)
        {
            _driver.FindElement(_byInputLogin).SendKeys(login);
            _driver.FindElement(_byInputSenha).SendKeys(senha);
        }

        public void SubmeterFormulario()
        {
            _driver.FindElement(_byBotaoLogin).Submit();
        }
    }
}