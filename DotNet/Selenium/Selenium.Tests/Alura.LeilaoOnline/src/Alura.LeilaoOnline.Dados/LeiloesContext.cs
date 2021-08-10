using Alura.LeilaoOnline.Core;
using Microsoft.EntityFrameworkCore;

namespace Alura.LeilaoOnline.Dados
{
    public class LeiloesContext : DbContext
    {
        public DbSet<Leilao> Leiloes { get; set; }
        public DbSet<Interessada> Interessada { get; set; }
        public DbSet<Lance> Lance { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Favorito> Favoritos { get; set; }

        public LeiloesContext(DbContextOptions<LeiloesContext> dbContextOptions) :
            base(dbContextOptions)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new LeilaoEFConfig());
            modelBuilder.ApplyConfiguration(new LanceEFConfig());
            modelBuilder.ApplyConfiguration(new InteressadaEFConfig());
            modelBuilder.ApplyConfiguration(new UsuarioEFConfig());
            modelBuilder.ApplyConfiguration(new FavoritoEFConfig());
        }
    }
}