using System;
using System.Collections.Generic;

namespace Alura.Loja.Testes.ConsoleApp.Model
{
    public class Promocao
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public List<PromocaoProduto> Produtos { get; set; }

        public Promocao()
        {
            Produtos = new List<PromocaoProduto>();
        }

        public void IncluiProduto(Produto produto)
        {
            Produtos.Add(new PromocaoProduto() { Produto = produto });
        }
    }
}