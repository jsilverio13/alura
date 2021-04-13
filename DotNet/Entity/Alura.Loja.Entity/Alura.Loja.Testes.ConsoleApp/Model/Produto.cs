using System.Collections.Generic;

namespace Alura.Loja.Testes.ConsoleApp.Model
{
    public class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Categoria { get; set; }
        public double PrecoUnitario { get; set; }
        public string Unidade { get; set; }

        public List<PromocaoProduto> Promocoes { get; set; }

        public List<Compra> Compras { get; set; }

        public override string ToString()
        {
            return $"Produto: {Id}, {Nome}, {Categoria}, {PrecoUnitario}, {Unidade}";
        }
    }
}