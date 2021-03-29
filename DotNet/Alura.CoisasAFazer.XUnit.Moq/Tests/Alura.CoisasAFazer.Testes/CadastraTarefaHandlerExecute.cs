using Alura.CoisasAFazer.Core.Commands;
using Alura.CoisasAFazer.Core.Models;
using Alura.CoisasAFazer.Infrastructure;
using Alura.CoisasAFazer.Services.Handlers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Linq;
using Xunit;

namespace Alura.CoisasAFazer.Testes
{
    public class CadastraTarefaHandlerExecute
    {
        [Fact]
        public void QuandoSQLExceptionEhLancadaDeveComunicarResultadoNoComando()
        {
            //arrange
            var comando = new CadastraTarefa("Estudar Xunit", new Categoria("Estudo"), new DateTime(2019, 12, 31));
            //setup do dubl�
            var mock = new Mock<IRepositorioTarefas>();
            var repo = mock.Object;
            //como configurar o lan�amento da exce��o? no pr�prio teste!
            mock.Setup(r => r.IncluirTarefas(It.IsAny<Tarefa[]>())).Throws(new Exception("Houve um erro na inclus�o..."));

            var logger = new Mock<ILogger<CadastraTarefaHandler>>().Object;

            var handler = new CadastraTarefaHandler(mock.Object, logger);

            //act

            var resultado = handler.Execute(comando);

            Assert.False(resultado.IsSuccess);
        }

        [Fact]
        public void DadaTarefaComInformacoesValidasDeveIncluirNoRepositorio()
        {
            //arrange
            var comando = new CadastraTarefa("Estudar Xunit", new Categoria("Estudo"), new DateTime(2019, 12, 31));

            var options = new DbContextOptionsBuilder<DbTarefasContext>()
                .UseInMemoryDatabase(nameof(DbTarefasContext))
                .Options;

            var contexto = new DbTarefasContext(options);
            var repo = new RepositorioTarefa(contexto);
            var mock = new Mock<ILogger<CadastraTarefaHandler>>();
            var logger = mock.Object;

            var handler = new CadastraTarefaHandler(repo, logger);

            //act
            handler.Execute(comando);

            var tarefa = repo.ObtemTarefas(t => t.Categoria.Descricao == "Estudo").FirstOrDefault();
            Assert.NotNull(tarefa);
            Assert.Equal("Estudar Xunit", tarefa.Titulo);
            Assert.Equal(new DateTime(2019, 12, 31), tarefa.Prazo);
        }

        [Fact]
        public void DadaTarefaComInformacoesValidasDeveLogarAOperacao()
        {
            //arrange
            var comando = new CadastraTarefa("Estudar Xunit", new Categoria("Estudo"), new DateTime(2019, 12, 31));

            //setup dos dubl�s
            var options = new DbContextOptionsBuilder<DbTarefasContext>()
                .UseInMemoryDatabase("Teste de Integra��o")
                .Options;
            var contexto = new DbTarefasContext(options);
            var repo = new RepositorioTarefa(contexto);

            var mock = new Mock<ILogger<CadastraTarefaHandler>>();

            string logOutput = string.Empty;
            CaptureLogMessage capture = (l, i, v, e, f) =>
            {
                logOutput = logOutput + v.ToString();
            };

            mock.Setup(x => x.Log(LogLevel.Debug, It.IsAny<EventId>(), It.IsAny<object>(), It.IsAny<Exception>(), It.IsAny<Func<object, Exception, string>>())).Callback(capture);
            var logger = mock.Object;

            var handler = new CadastraTarefaHandler(repo, logger);

            //act
            handler.Execute(comando);

            //assert
            //COMO VERIFICAR SE O LOG FOI REALIZADO?
            Assert.Contains("Persistindo a tarefa...", logOutput);
        }

        private delegate void CaptureLogMessage(LogLevel l, EventId id, object o, Exception e, Func<object, Exception, string> func);
    }
}