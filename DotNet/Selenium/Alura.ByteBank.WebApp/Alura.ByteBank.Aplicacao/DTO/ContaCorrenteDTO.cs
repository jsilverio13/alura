using System;

namespace Alura.ByteBank.Aplicacao.DTO
{
    public class ContaCorrenteDTO
    {
        public int Id { get; set; }
        public int Numero { get; set; }
        public int ClienteId { get; set; }
        public ClienteDTO Cliente { get; set; }
        public int AgenciaId { get; set; }
        public AgenciaDTO Agencia { get; set; }
        public Guid Identificador { get; set; }
        public double Saldo { get; set; }

        public ContaCorrenteDTO()
        {
            Identificador = Guid.NewGuid();
        }

        public override string ToString()
        {
            return "===Dados da Conta===\n" +
                   $"Numero Conta: {Numero}\n" +
                   $"Saldo Conta: {Saldo}\n" +
                   $"Id Conta: {Identificador}\n" +
                   $"Titular Conta(Cliente): {Cliente.Nome}";
        }

        public Guid PixConta { get; set; }
    }
}