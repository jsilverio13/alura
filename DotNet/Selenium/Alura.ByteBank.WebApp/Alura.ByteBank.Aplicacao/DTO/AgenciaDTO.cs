using System;

namespace Alura.ByteBank.Aplicacao.DTO
{
    public class AgenciaDTO
    {
        public int Id { get; set; }
        public int Numero { get; set; }
        public string Nome { get; set; }
        public string Endereco { get; set; }
        public Guid Identificador { get; set; }

        public AgenciaDTO()
        {
            Identificador = Guid.NewGuid();
        }
    }
}