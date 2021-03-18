using System.ComponentModel;

namespace Alura.Loja.Testes.ConsoleApp.Model
{
    public class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Categoria { get; set; }
        public double PrecoUnitario { get; set; }

        [DefaultValue(1)]
        public int Unidade { get; set; } = 1;

        public override string ToString()
        {
            return $"Produto: {Id}, {Nome}, {Categoria}, {PrecoUnitario}, {Unidade}";
        }
    }
}