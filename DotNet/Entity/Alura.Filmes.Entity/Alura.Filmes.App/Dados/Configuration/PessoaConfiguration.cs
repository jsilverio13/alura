using Alura.Filmes.App.Negocio;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Alura.Filmes.App.Dados.Configuration
{
    public class PessoaConfiguration<T> : IEntityTypeConfiguration<T> where T : Pessoa
    {
        public virtual void Configure(EntityTypeBuilder<T> builder)
        {
            builder
                .Property(f => f.PrimeiroNome)
                .HasColumnName("first_name")
                .HasColumnType("varchar(45)")
                .IsRequired();

            builder
               .Property(f => f.UltimoNome)
               .HasColumnName("last_name")
               .HasColumnType("varchar(45)")
               .IsRequired();

            builder
               .Property(f => f.Email)
               .HasColumnName("email")
               .HasColumnType("varchar(50)");

            builder
               .Property(f => f.Ativo)
               .HasColumnName("active")
               .IsRequired();

            builder
                .Property<DateTime>("last_update")
                .HasColumnType("datetime")
                .HasDefaultValueSql("getdate()")
                .IsRequired();
        }
    }
}