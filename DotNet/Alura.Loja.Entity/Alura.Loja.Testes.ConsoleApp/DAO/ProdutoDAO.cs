using Alura.Loja.Testes.ConsoleApp.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Alura.Loja.Testes.ConsoleApp.DAO
{
    public class ProdutoDAO : IDisposable
    {
        private readonly SqlConnection conexao;

        public ProdutoDAO()
        {
            conexao = new SqlConnection("Server=(localdb)\\mssqllocaldb;Database=LojaDB;Trusted_Connection=true;");
            conexao.Open();
        }

        public void Dispose()
        {
            conexao.Close();
        }

        internal void Adicionar(Produto produto)
        {
            try
            {
                var insertCmd = conexao.CreateCommand();
                insertCmd.CommandText = "INSERT INTO Produtos (Nome, Categoria, Preco) VALUES (@nome, @categoria, @preco)";

                var paramNome = new SqlParameter("nome", produto.Nome);
                insertCmd.Parameters.Add(paramNome);

                var paramCategoria = new SqlParameter("categoria", produto.Categoria);
                insertCmd.Parameters.Add(paramCategoria);

                var paramPreco = new SqlParameter("preco", produto.Preco);
                insertCmd.Parameters.Add(paramPreco);

                insertCmd.ExecuteNonQuery();
            }
            catch (SqlException e)
            {
                throw new SystemException(e.Message, e);
            }
        }

        internal void Atualizar(Produto p)
        {
            try
            {
                var updateCmd = conexao.CreateCommand();
                updateCmd.CommandText = "UPDATE Produtos SET Nome = @nome, Categoria = @categoria, Preco = @preco WHERE Id = @id";

                var paramNome = new SqlParameter("nome", p.Nome);
                var paramCategoria = new SqlParameter("categoria", p.Categoria);
                var paramPreco = new SqlParameter("preco", p.Preco);
                var paramId = new SqlParameter("id", p.Id);
                updateCmd.Parameters.Add(paramNome);
                updateCmd.Parameters.Add(paramCategoria);
                updateCmd.Parameters.Add(paramPreco);
                updateCmd.Parameters.Add(paramId);

                updateCmd.ExecuteNonQuery();
            }
            catch (SqlException e)
            {
                throw new SystemException(e.Message, e);
            }
        }

        internal void Remover(Produto p)
        {
            try
            {
                var deleteCmd = conexao.CreateCommand();
                deleteCmd.CommandText = "DELETE FROM Produtos WHERE Id = @id";

                var paramId = new SqlParameter("id", p.Id);
                deleteCmd.Parameters.Add(paramId);

                deleteCmd.ExecuteNonQuery();
            }
            catch (SqlException e)
            {
                throw new SystemException(e.Message, e);
            }
        }

        internal IList<Produto> Produtos()
        {
            var lista = new List<Produto>();

            var selectCmd = conexao.CreateCommand();
            selectCmd.CommandText = "SELECT * FROM Produtos";

            var resultado = selectCmd.ExecuteReader();
            while (resultado.Read())
            {
                var p = new Produto
                {
                    Id = Convert.ToInt32(resultado["Id"]),
                    Nome = Convert.ToString(resultado["Nome"]),
                    Categoria = Convert.ToString(resultado["Categoria"]),
                    Preco = Convert.ToDouble(resultado["Preco"])
                };
                lista.Add(p);
            }
            resultado.Close();

            return lista;
        }
    }
}