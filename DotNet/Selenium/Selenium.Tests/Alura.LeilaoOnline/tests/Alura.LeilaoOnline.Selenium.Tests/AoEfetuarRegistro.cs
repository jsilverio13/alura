using Alura.LeilaoOnline.Selenium.Tests.Fixtures;
using Alura.LeilaoOnline.Selenium.Tests.PageObjects;
using OpenQA.Selenium;
using Xunit;

namespace Alura.LeilaoOnline.Selenium.Tests
{
    [Collection("Chrome Driver")]
    public class AoEfetuarRegistro
    {
        private readonly IWebDriver _driver;
        private readonly RegistroPo _registroPo;

        //Setup
        public AoEfetuarRegistro(TestFixture fixture)
        {
            _driver = fixture.Driver;
            _registroPo = fixture.RegistroPo;
        }

        [Theory]
        [InlineData("", "jeff@gmail.com", "741963", "741963")]
        [InlineData("Jefferson Silverio", "jeff", "741963", "741963")]
        [InlineData("Jefferson Silverio", "jeff@gmail.com", "741963", "741741")]
        [InlineData("Jefferson Silverio", "jeff@gmail.com", "741963", "")]
        public void DadoInformacoesInvalidasDeveContinuarNaHome(string nome, string email, string senha, string confirmarSenha)
        {
            // Arrange
            _registroPo.Visitar();
            _registroPo.PreencherFormulario(nome, email, senha, confirmarSenha);

            // Act
            _registroPo.SubmeterFormulario();

            // Assert

            Assert.Contains("Registre-se para participar dos leilões!", _driver.PageSource);
        }

        [Fact]
        public void DadoInformacoesValidasDeveIrParaPaginaDeAgradecimento()
        {
            // Arrange
            _registroPo.Visitar();
            _registroPo.PreencherFormulario("Jefferson Silverio", "jeff@gmail.com", "741963", "741963");

            // Act
            _registroPo.SubmeterFormulario();

            // Assert

            Assert.Contains("Obrigado", _driver.PageSource);
        }

        [Fact]
        public void DadoNomeEmBrancoDeveMostrarMensagemDeErro()
        {
            // Arrange
            _registroPo.Visitar();

            // Act
            _registroPo.SubmeterFormulario();

            // Assert
            Assert.Equal("The Nome field is required.", _registroPo.NomeMensagemErro);
        }

        [Fact]
        public void DadoEmailInvalidoDeveMostrarMensagemDeErro()
        {
            // Arrange
            _registroPo.Visitar();

            _registroPo.PreencherFormulario("", "jeff", "", "");

            // Act
            _registroPo.SubmeterFormulario();

            // Assert
            Assert.Equal("Please enter a valid email address.", _registroPo.EmailMensagemErro);
        }

        [Fact]
        public void DadoChromeAbertoFormRegistroNaoDeveMostrarMensagensDeErro()
        {
            // Arrange

            // Act
            _registroPo.Visitar();

            // Assert

            var mensagens = _registroPo.RetornarMensagens();

            foreach (var mensagem in mensagens)
            {
                Assert.True(string.IsNullOrWhiteSpace(mensagem));
            }
        }
    }
}