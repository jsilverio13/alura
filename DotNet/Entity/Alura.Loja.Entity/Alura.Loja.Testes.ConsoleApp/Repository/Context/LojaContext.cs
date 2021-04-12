using Alura.Loja.Testes.ConsoleApp.Model;
using Microsoft.EntityFrameworkCore;

namespace Alura.Loja.Testes.ConsoleApp.Repository.Context
{
    public class LojaContext : DbContext
    {
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Compra> Compras { get; set; }
        public DbSet<Promocao> Promocoes { get; set; }
        public DbSet<Cliente> Clientes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PromocaoProduto>().HasKey(pro => new { pro.ProdutoId, pro.PromocaoId });

            modelBuilder.Entity<Endereco>().ToTable("Enderecos");
            modelBuilder.Entity<Endereco>().Property<int>("ClienteId");
            modelBuilder.Entity<Endereco>().HasKey("ClienteId");

            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=LojaDB;Trusted_Connection=true;");
        }
    }
}