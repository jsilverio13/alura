using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;

namespace Alura.LeilaoOnline.Selenium.Tests.PageObjects
{
    public class MenuLogadoPO
    {
        private readonly IWebDriver _driver;
        private readonly By _byLogoutLink;
        private readonly By _byMeuPerfilLink;

        public MenuLogadoPO(IWebDriver driver)
        {
            _driver = driver;
            _byLogoutLink = By.Id("logout");
            _byMeuPerfilLink = By.Id("meu-perfil");
        }

        public void EfetuarLogout()
        {
            var linkMeuPerfil = _driver.FindElement(_byMeuPerfilLink);
            var linkLogout = _driver.FindElement(_byLogoutLink);

            var acaoLogout = new Actions(_driver)
                //mover para o elemento meu-perfil
                .MoveToElement(linkMeuPerfil)
                //mover para o link de logout
                .MoveToElement(linkLogout)
                //clicar no link de logout
                .Click()
                .Build();

            acaoLogout.Perform();
        }
    }
}