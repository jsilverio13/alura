using Alura.Loja.Testes.ConsoleApp.Model;
using System;
using System.Collections.Generic;

namespace Alura.Loja.Testes.ConsoleApp.Repository.Interfaces
{
    public interface IProdutoDAOEntity : IDisposable
    {
        void Adicionar(Produto produto);

        void Atualizar(Produto produto);

        void Remover(Produto produto);

        IList<Produto> Produtos();
    }
}