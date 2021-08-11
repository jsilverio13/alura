using OpenQA.Selenium;
using System.Collections.Generic;
using System.Linq;

namespace Alura.LeilaoOnline.Selenium.Tests.Helpers
{
    public class SelectMaterialize
    {
        private readonly IWebDriver _driver;
        private readonly IWebElement _selectWrapper;
        private readonly IEnumerable<IWebElement> _opcoes;

        public SelectMaterialize(IWebDriver driver, By locatorSelectWrapper)
        {
            _selectWrapper = driver.FindElement(locatorSelectWrapper);
            _opcoes = _selectWrapper.FindElements(By.CssSelector("li>span"));
        }

        public IEnumerable<IWebElement> Options => _opcoes;

        private void OpenWrapper()
        {
            _selectWrapper.Click();
        }

        private void LoseFocus()
        {
            _selectWrapper
                .FindElement(By.TagName("li"))
                .SendKeys(Keys.Tab);
        }

        public void DeselectAll()
        {
            OpenWrapper();
            _opcoes.ToList().ForEach(o =>
            {
                o.Click();
            });
            LoseFocus();
        }

        public void SelectByText(string option)
        {
            OpenWrapper();
            _opcoes
                .Where(o => o.Text.Contains(option))
                .ToList()
                .ForEach(o =>
                {
                    o.Click();
                });
            LoseFocus();
        }
    }
}