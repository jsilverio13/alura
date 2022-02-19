using Alura.ByteBank.WebApp.Testes.Util;
using OpenQA.Selenium;
using System.Collections.Generic;
using Xunit;

namespace Alura.ByteBank.WebApp.Testes
{
    public class RealizarLogin : IClassFixture<Fixture>
    {
        public IWebDriver Driver { get; }
        public IDictionary<string, object> Vars { get; }
        public IJavaScriptExecutor Js { get; }

        public RealizarLogin(Fixture fixture)
        {
            Driver = fixture.Driver;
            Js = (IJavaScriptExecutor)Driver;
            Vars = new Dictionary<string, object>();
        }

        [Fact]
        public void ExecutandoLoginWebApp()
        {
            // Test name: ExecutandoLoginWebApp
            // Step # | name | target | value
            // 1 | open | / |
            Driver.Navigate().GoToUrl("https://localhost:44309/");
            // 2 | setWindowSize | 1309x712 |
            Driver.Manage().Window.Size = new System.Drawing.Size(1309, 712);
            // 3 | assertElementPresent | linkText=Home |
            {
                IReadOnlyCollection<IWebElement> elements = Driver.FindElements(By.LinkText("Home"));
                Assert.True(elements.Count > 0);
            }
            // 4 | assertElementPresent | linkText=ByteBank-WebApp |
            {
                IReadOnlyCollection<IWebElement> elements = Driver.FindElements(By.LinkText("ByteBank-WebApp"));
                Assert.True(elements.Count > 0);
            }
            // 5 | click | linkText=Login |
            Driver.FindElement(By.LinkText("Login")).Click();
            // 6 | click | id=Email |
            Driver.FindElement(By.Id("Email")).Click();
            // 7 | type | id=Email | jeff@email.com
            Driver.FindElement(By.Id("Email")).SendKeys("jeff@email.com");
            // 8 | click | id=Senha |
            Driver.FindElement(By.Id("Senha")).Click();
            // 9 | type | id=Senha | senha01
            Driver.FindElement(By.Id("Senha")).SendKeys("senha01");
            // 10 | click | id=btn-logar |
            Driver.FindElement(By.Id("btn-logar")).Click();
            // 11 | assertElementPresent | id=agencia |
            {
                IReadOnlyCollection<IWebElement> elements = Driver.FindElements(By.Id("agencia"));
                Assert.True(elements.Count > 0);
            }
            // 12 | verifyElementPresent | css=.btn |
            {
                IReadOnlyCollection<IWebElement> elements = Driver.FindElements(By.CssSelector(".btn"));
                Assert.True(elements.Count > 0);
            }
            // 13 | click | css=.btn |
            Driver.FindElement(By.CssSelector(".btn")).Click();
        }
    }
}