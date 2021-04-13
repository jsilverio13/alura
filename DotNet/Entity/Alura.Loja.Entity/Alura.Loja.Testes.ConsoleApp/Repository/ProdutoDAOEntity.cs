using Alura.Loja.Testes.ConsoleApp.Model;
using Alura.Loja.Testes.ConsoleApp.Repository.Context;
using Alura.Loja.Testes.ConsoleApp.Repository.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Alura.Loja.Testes.ConsoleApp.Repository
{
    public class ProdutoDAOEntity : IProdutoDAOEntity
    {
        private readonly LojaContext _contexto;

        public ProdutoDAOEntity()
        {
            _contexto = new LojaContext();
        }

        public void Adicionar(Produto produto)
        {
            _contexto.Produtos.Add(produto);
            _contexto.SaveChanges();
        }

        public void Atualizar(Produto produto)
        {
            _contexto.Produtos.Update(produto);
            _contexto.SaveChanges();
        }

        public void Remover(Produto produto)
        {
            _contexto.Produtos.Remove(produto);
            _contexto.SaveChanges();
        }

        public IList<Produto> Produtos()
        {
            return _contexto.Produtos.ToList();
        }

        public void Dispose()
        {
            _contexto.Dispose();
        }
    }
}