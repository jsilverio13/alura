﻿// <auto-generated />
using System;
using Alura.LeilaoOnline.Dados;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Alura.LeilaoOnline.Dados.Migrations
{
    [DbContext(typeof(LeiloesContext))]
    partial class LeiloesContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.8")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Alura.LeilaoOnline.Core.Favorito", b =>
                {
                    b.Property<int>("IdLeilao")
                        .HasColumnType("int");

                    b.Property<int>("IdInteressada")
                        .HasColumnType("int");

                    b.HasKey("IdLeilao", "IdInteressada");

                    b.HasIndex("IdInteressada");

                    b.ToTable("Favoritos");
                });

            modelBuilder.Entity("Alura.LeilaoOnline.Core.Interessada", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Interessada");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Nome = "Fulano de Tal"
                        },
                        new
                        {
                            Id = 2,
                            Nome = "Mariana Mary"
                        },
                        new
                        {
                            Id = 3,
                            Nome = "Sicrana Silva"
                        });
                });

            modelBuilder.Entity("Alura.LeilaoOnline.Core.Lance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ClienteId")
                        .HasColumnType("int");

                    b.Property<int>("LeilaoId")
                        .HasColumnType("int");

                    b.Property<double>("Valor")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("ClienteId");

                    b.HasIndex("LeilaoId");

                    b.ToTable("Lance");
                });

            modelBuilder.Entity("Alura.LeilaoOnline.Core.Leilao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Categoria")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Estado")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("GanhadorId")
                        .HasColumnType("int");

                    b.Property<string>("Imagem")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("InicioPregao")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("TerminoPregao")
                        .HasColumnType("datetime2");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("ValorInicial")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("GanhadorId");

                    b.ToTable("Leiloes");
                });

            modelBuilder.Entity("Alura.LeilaoOnline.Core.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("InteressadaId")
                        .HasColumnType("int");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("InteressadaId");

                    b.ToTable("Usuarios");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "fulano@example.org",
                            InteressadaId = 1,
                            Senha = "123"
                        },
                        new
                        {
                            Id = 2,
                            Email = "mariana@example.org",
                            InteressadaId = 2,
                            Senha = "456"
                        },
                        new
                        {
                            Id = 3,
                            Email = "admin@example.org",
                            Senha = "123"
                        });
                });

            modelBuilder.Entity("Alura.LeilaoOnline.Core.Favorito", b =>
                {
                    b.HasOne("Alura.LeilaoOnline.Core.Interessada", "Seguidor")
                        .WithMany("Favoritos")
                        .HasForeignKey("IdInteressada")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Alura.LeilaoOnline.Core.Leilao", "LeilaoFavorito")
                        .WithMany("Seguidores")
                        .HasForeignKey("IdLeilao")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("LeilaoFavorito");

                    b.Navigation("Seguidor");
                });

            modelBuilder.Entity("Alura.LeilaoOnline.Core.Lance", b =>
                {
                    b.HasOne("Alura.LeilaoOnline.Core.Interessada", "Cliente")
                        .WithMany("Lances")
                        .HasForeignKey("ClienteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Alura.LeilaoOnline.Core.Leilao", "Leilao")
                        .WithMany("Lances")
                        .HasForeignKey("LeilaoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Cliente");

                    b.Navigation("Leilao");
                });

            modelBuilder.Entity("Alura.LeilaoOnline.Core.Leilao", b =>
                {
                    b.HasOne("Alura.LeilaoOnline.Core.Lance", "Ganhador")
                        .WithMany()
                        .HasForeignKey("GanhadorId");

                    b.Navigation("Ganhador");
                });

            modelBuilder.Entity("Alura.LeilaoOnline.Core.Usuario", b =>
                {
                    b.HasOne("Alura.LeilaoOnline.Core.Interessada", "Interessada")
                        .WithMany()
                        .HasForeignKey("InteressadaId");

                    b.Navigation("Interessada");
                });

            modelBuilder.Entity("Alura.LeilaoOnline.Core.Interessada", b =>
                {
                    b.Navigation("Favoritos");

                    b.Navigation("Lances");
                });

            modelBuilder.Entity("Alura.LeilaoOnline.Core.Leilao", b =>
                {
                    b.Navigation("Lances");

                    b.Navigation("Seguidores");
                });
#pragma warning restore 612, 618
        }
    }
}
