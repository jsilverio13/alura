using System;
using System.Collections.Generic;

namespace Alura.LeilaoOnline.XUnit.Core
{
    public class Leilao
    {
        private readonly IList<Lance> _lances;
        public IEnumerable<Lance> Lances => _lances;
        public string Peca { get; }
        public Lance Ganhador { get; private set; }
        public EstadoLeilao Estado { get; private set; }
        private Interessada _ultimoCliente;
        private double ValorDestino { get; }
        private readonly IModalidadeAvaliacao _avaliador;

        public enum EstadoLeilao
        {
            LeilaoEmAndamento,
            LeilaoFinalizado,
            LeilaoAntesDoPregao
        }

        public Leilao(string peca, IModalidadeAvaliacao avaliador)
        {
            Peca = peca;
            _lances = new List<Lance>();
            Estado = EstadoLeilao.LeilaoAntesDoPregao;
            _avaliador = avaliador;
        }

        public void RecebeLance(Interessada cliente, double valor)
        {
            if (LanceAceito(cliente))
            {
                _ultimoCliente = cliente;
                _lances.Add(new Lance(cliente, valor));
            }
        }

        private bool LanceAceito(Interessada cliente)
        {
            bool aceito = Estado == EstadoLeilao.LeilaoEmAndamento && (cliente != _ultimoCliente);

            return aceito;
        }

        public void IniciaPregao()
        {
            Estado = EstadoLeilao.LeilaoEmAndamento;
        }

        public void TerminaPregao()
        {
            if (Estado != EstadoLeilao.LeilaoEmAndamento)
            {
                throw new InvalidOperationException("Não é possível terminar o pregão sem que ele tenha começado. Para isso, utilize o método IniciaPregao().");
            }

            Ganhador = _avaliador.Avalia(this);
            Estado = EstadoLeilao.LeilaoFinalizado;
        }
    }
}