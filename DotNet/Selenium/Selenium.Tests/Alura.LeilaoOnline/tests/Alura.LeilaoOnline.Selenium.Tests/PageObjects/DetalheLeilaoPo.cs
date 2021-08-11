using OpenQA.Selenium;
using System.Globalization;

namespace Alura.LeilaoOnline.Selenium.Tests.PageObjects
{
    public class DetalheLeilaoPo

    {
        private readonly IWebDriver _driver;
        private readonly By _byInputValor;
        private readonly By _byBotaoOfertar;
        private readonly By _byLanceAtual;

        public DetalheLeilaoPo(IWebDriver driver)
        {
            _driver = driver;
            _byInputValor = By.Id("Valor");
            _byBotaoOfertar = By.Id("btnDarLance");
            _byLanceAtual = By.Id("lanceAtual");
        }

        public double LanceAtual
        {
            get
            {
                var valorTexto = _driver.FindElement(_byLanceAtual).Text;
                var valor = double.Parse(valorTexto, System.Globalization.NumberStyles.Currency);
                return valor;
            }
        }

        public void Visitar(int idLeilao)
        {
            _driver.Navigate().GoToUrl($"http://localhost:5000/Home/Detalhes/{idLeilao}");
        }

        public void OfertarLance(double valor)
        {
            var campoValor = _driver.FindElement(_byInputValor);
            campoValor.Clear();
            campoValor.SendKeys(valor.ToString(CultureInfo.CurrentCulture));
            _driver.FindElement(_byBotaoOfertar).Click();
        }
    }
}