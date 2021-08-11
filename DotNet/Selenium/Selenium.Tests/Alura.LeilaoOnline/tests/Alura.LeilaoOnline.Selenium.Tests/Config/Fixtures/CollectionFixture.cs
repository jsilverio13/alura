using Xunit;

namespace Alura.LeilaoOnline.Selenium.Tests.Config.Fixtures
{
    [CollectionDefinition("Chrome Driver")]
    public class CollectionFixture : ICollectionFixture<TestFixture>
    {
    }
}