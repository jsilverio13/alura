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

        public LoginPo Visitar()
        {
            _driver.Navigate().GoToUrl("http://localhost:5000/Autenticacao/Login");
            return this;
        }

        public LoginPo PreencheFormulario(string login, string senha)
        {
            return
                InformarEmail(login)
                    .InformarSenha(senha);
        }

        public LoginPo InformarEmail(string login)
        {
            _driver.FindElement(_byInputLogin).SendKeys(login);
            return this;
        }

        public LoginPo InformarSenha(string senha)
        {
            _driver.FindElement(_byInputSenha).SendKeys(senha);
            return this;
        }

        public LoginPo EfetuarLogin()
        {
            return SubmeteFormulario();
        }

        public LoginPo SubmeteFormulario()
        {
            _driver.FindElement(_byBotaoLogin).Submit();
            return this;
        }

        public void EfetuarLoginComCredenciais(string login, string senha)
        {
            Visitar()
                .PreencheFormulario(login, senha)
                .SubmeteFormulario();
        }
    }
}