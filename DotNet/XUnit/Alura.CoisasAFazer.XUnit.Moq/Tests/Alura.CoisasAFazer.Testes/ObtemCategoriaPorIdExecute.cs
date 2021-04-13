using Alura.CoisasAFazer.Core.Commands;
using Alura.CoisasAFazer.Core.Models;
using Alura.CoisasAFazer.Infrastructure;
using Alura.CoisasAFazer.Services.Handlers;
using Moq;
using System;
using Xunit;

namespace Alura.CoisasAFazer.Testes
{
    public class ObtemCategoriaPorIdExecute
    {
        [Fact]
        public void QuandoIdForExistentenDeveChamarUnicaVez()
        {
            //arrange: determinada massa de tarefas na base, algumas com prazo vencido
            const int idCategoria = 20;

            var mock = new Mock<IRepositorioTarefas>();
            var repo = mock.Object;
            var comando = new ObtemCategoriaPorId(idCategoria);
            var handler = new ObtemCategoriaPorIdHandler(repo);

            handler.Execute(comando);

            mock.Verify(r => r.ObtemCategoriaPorId(idCategoria), Times.Once());
        }

        [Fact]
        public void AoExecutarDeveAtualizarTarefasNoRepo()
        {
            //arrange/setup do mock
            var dataHoraAtual = new DateTime(2021, 1, 1);
            var mock = new Mock<IRepositorioTarefas>();
            var repo = mock.Object;
            var comando = new GerenciaPrazoDasTarefas(dataHoraAtual);
            var handler = new GerenciaPrazoDasTarefasHandler(repo);

            //act
            handler.Execute(comando);

            //assert
            mock.Verify(r => r.AtualizarTarefas(It.IsAny<Tarefa[]>()), Times.Once());
        }
    }
}