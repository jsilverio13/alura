using Alura.LeilaoOnline.XUnit.Core;
using Xunit;

namespace Alura.LeilaoOnline.XUnit.Tests
{
    public class LanceConstrutorTest
    {
        [Fact]
        public void LancaArgumentExceptionDadoValorNegativo()
        {
            //Arrange - cenário
            var valorNegativo = -100;

            //Assert
            Assert.Throws<System.ArgumentException>
            (
                () => new Lance(null, valorNegativo)
            );
        }
    }
}