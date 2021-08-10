using OpenQA.Selenium;
using System.Collections.Generic;
using System.Linq;

namespace Alura.LeilaoOnline.Selenium.Tests.PageObjects
{
    public class RegistroPo
    {
        private readonly IWebDriver _driver;
        private readonly By _byFormRegistro;
        private readonly By _bySpan;
        private readonly By _byInputNome;
        private readonly By _byInputEmail;
        private readonly By _byInputSenha;
        private readonly By _byInputConfirmarSenha;
        private readonly By _byInputBotaoRegistro;
        private readonly By _bySpanErroNome;
        private readonly By _bySpanErroEmail;
        public string NomeMensagemErro => _driver.FindElement(_bySpanErroNome).Text;
        public string EmailMensagemErro => _driver.FindElement(_bySpanErroEmail).Text;

        public RegistroPo(IWebDriver driver)
        {
            _driver = driver;
            _byFormRegistro = By.TagName("form");
            _bySpan = By.TagName("Span");
            _byInputNome = By.Id("Nome");
            _byInputEmail = By.Id("Email");
            _byInputSenha = By.Id("Password");
            _byInputConfirmarSenha = By.Id("ConfirmPassword");
            _byInputBotaoRegistro = By.Id("btnRegistro");
            _bySpanErroNome = By.CssSelector("span.msg-erro[data-valmsg-for=Nome]");
            _bySpanErroEmail = By.CssSelector("span.msg-erro[data-valmsg-for=Email]");
        }

        public void Visitar()
        {
            _driver.Navigate().GoToUrl("http://localhost:5000");
        }

        public void SubmeterFormulario()
        {
            _driver.FindElement(_byInputBotaoRegistro).Click();
        }

        public void PreencherFormulario(string nome, string email, string senha, string confirmarSenha)
        {
            _driver.FindElement(_byInputNome).SendKeys(nome);
            _driver.FindElement(_byInputEmail).SendKeys(email);
            _driver.FindElement(_byInputSenha).SendKeys(senha);
            _driver.FindElement(_byInputConfirmarSenha).SendKeys(confirmarSenha);
        }

        public IEnumerable<string> RetornarMensagens()
        {
            var spans = _driver.FindElement(_byFormRegistro).FindElements(_bySpan);

            return spans.Select(span => span.Text);
        }
    }
}