using System.Linq;

namespace Alura.LeilaoOnline.XUnit.Core
{
    public class OfertaSuperiorMaisProxima : IModalidadeAvaliacao
    {
        public double _valorDestino { get; }

        public OfertaSuperiorMaisProxima(double valorDestino)
        {
            _valorDestino = valorDestino;
        }

        public Lance Avalia(Leilao leilao)
        {
            return leilao.Lances
                .DefaultIfEmpty(new Lance(null, 0))
                .Where(l => l.Valor > _valorDestino)
                .OrderBy(l => l.Valor)
                .FirstOrDefault();
        }
    }
}