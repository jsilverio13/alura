using Alura.Filmes.App.Negocio;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Alura.Filmes.App.Dados.Configuration
{
    public class ClienteConfiguration : PessoaConfiguration<Cliente>
    {
        public override void Configure(EntityTypeBuilder<Cliente> builder)
        {
            base.Configure(builder);

            builder
                .ToTable("customer");

            builder
                .Property(f => f.Id)
                .HasColumnName("customer_id");

            builder
                .Property<DateTime>("create_date")
                .HasColumnType("datetime")
                .HasDefaultValueSql("getdate()")
                .IsRequired();
        }
    }
}