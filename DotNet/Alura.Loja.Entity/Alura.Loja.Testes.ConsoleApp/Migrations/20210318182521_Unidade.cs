using Microsoft.EntityFrameworkCore.Migrations;

namespace Alura.Loja.Testes.ConsoleApp.Migrations
{
    public partial class Unidade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Preco",
                table: "Produtos",
                newName: "PrecoUnitario");

            migrationBuilder.AddColumn<int>(
                name: "Unidade",
                table: "Produtos",
                nullable: false,
                defaultValue: 1);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Unidade",
                table: "Produtos");

            migrationBuilder.RenameColumn(
                name: "PrecoUnitario",
                table: "Produtos",
                newName: "Preco");
        }
    }
}