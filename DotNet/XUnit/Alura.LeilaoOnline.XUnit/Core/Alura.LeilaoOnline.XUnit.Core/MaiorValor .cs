using System.Linq;

namespace Alura.LeilaoOnline.XUnit.Core
{
    public class MaiorValor : IModalidadeAvaliacao
    {
        public double _valorDestino { get; }

        public Lance Avalia(Leilao leilao)
        {
            return leilao.Lances
                .DefaultIfEmpty(new Lance(null, 0))
                .OrderBy(l => l.Valor)
                .LastOrDefault();
        }
    }
}